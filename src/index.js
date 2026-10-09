const DEFAULT_CMS_API = "https://app.seermantic.com/api/posts";
const DEFAULT_PROJECT_ID = "65bb6d01";
const FALLBACK_IMAGE = "https://activomedical.com/Assets/Images/agencia%20de%20marketing%20para%20profesionales%20de%20la%20salud.jpg";
const SITE_ORIGIN = "https://activomedical.com";

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

/** Turn a CMS response (live or KV copy) into { title, description, image, raw }. */
function parsePost(data) {
  // Unwrap various response envelope shapes
  const raw = (data && (
    (data.post && typeof data.post === "object" ? data.post : null) ||
    (data.item && typeof data.item === "object" ? data.item : null) ||
    (data.data && typeof data.data === "object"
      ? (data.data.post || data.data.item || data.data)
      : null) ||
    data
  )) || {};

  const title = raw.seo_title || raw.seoTitle || raw.title || "";
  const description =
    raw.meta_description || raw.metaDescription ||
    raw.seo_description || raw.seoDescription ||
    raw.excerpt || raw.summary || "";
  const image =
    raw.og_image || raw.ogImage ||
    raw.social_image || raw.socialImage ||
    raw.hero_image || raw.heroImage ||
    raw.cover_image || raw.coverImage ||
    raw.image || "";

  if (!title) return { error: "no-title" };
  return { title, description, image, raw };
}

const KV_PREFIX = "post:";

/**
 * KV first. The CMS pushes changes through /api/revalidate (webhook) and the
 * 5-minute sync catches anything missed, so page views don't depend on the CMS,
 * whose Bot Fight Mode challenges requests that originate from Googlebot. The
 * live CMS is only asked on a KV miss (e.g. a post published seconds ago).
 */
async function fetchPost(slug, env, ctx) {
  const kv = env.POSTS_CACHE;
  if (kv) {
    try {
      const cached = await kv.get(KV_PREFIX + slug, "json");
      if (cached) {
        const post = parsePost(cached);
        if (!post.error) return post;
      }
    } catch (_) {}
  }
  const live = await fetchLivePost(slug, env);
  if (kv && live && !live.error && !live.notFound) {
    ctx.waitUntil(storePost(kv, slug, live.data).catch(() => {}));
  }
  return live;
}

function storePost(kv, slug, data) {
  return kv.put(KV_PREFIX + slug, JSON.stringify(data), {
    metadata: { updated_at: String((data && data.updated_at) || "") }
  });
}

/** Re-fetch one post from the CMS (no caches) and update or remove its KV copy. */
async function syncPost(slug, env) {
  const live = await fetchLivePost(slug, env, { fresh: true });
  if (live.notFound) {
    await env.POSTS_CACHE.delete(KV_PREFIX + slug);
    return "deleted";
  }
  if (live.error) throw new Error(String(live.error).slice(0, 160));
  await storePost(env.POSTS_CACHE, slug, live.data);
  return "stored";
}

/**
 * Cron: store new/changed posts and drop unpublished ones. Only posts whose
 * updated_at differs from the KV copy are fetched and written, which keeps a
 * 5-minute schedule well inside the KV free tier.
 */
async function syncAllPosts(env) {
  const kv = env.POSTS_CACHE;
  const token = String(env.CMS_PUBLIC_TOKEN || "").trim();
  if (!kv || !token) return;
  const apiBase = String(env.CMS_API_BASE || DEFAULT_CMS_API).replace(/\/+$/, "");
  const projectId = String(env.CMS_PROJECT_ID || DEFAULT_PROJECT_ID);
  const headers = { accept: "application/json", "user-agent": "ActivoMedical-Site-Worker/1.0", "x-cms-public-token": token };

  const listed = new Map(); // slug -> updated_at
  for (let page = 1; page <= 50; page++) {
    const res = await fetch(`${apiBase}?projectId=${encodeURIComponent(projectId)}&page=${page}&per_page=50`, { headers, cf: { cacheTtl: -1 } });
    if (!res.ok) throw new Error("list failed: " + res.status);
    const data = await res.json();
    const posts = data.posts || data.items || [];
    posts.forEach((p) => p && p.slug && !listed.has(p.slug) && listed.set(p.slug, String(p.updated_at || "")));
    if (posts.length < 50 || listed.size >= (data.total || Infinity)) break;
  }

  const known = new Map(); // slug -> updated_at stored with the KV copy
  let cursor;
  do {
    const page = await kv.list({ prefix: KV_PREFIX, cursor });
    page.keys.forEach((k) => known.set(k.name.slice(KV_PREFIX.length), (k.metadata && k.metadata.updated_at) || ""));
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);

  let stored = 0, deleted = 0, failed = 0;
  for (const [slug, updatedAt] of listed) {
    // Without updated_at we can't detect edits; only fill missing posts (webhooks cover edits).
    if (known.has(slug) && (!updatedAt || known.get(slug) === updatedAt)) continue;
    try {
      await syncPost(slug, env);
      stored++;
    } catch (e) {
      failed++;
      console.error("syncAllPosts " + slug + ": " + e.message);
    }
  }
  for (const slug of known.keys()) {
    if (!listed.has(slug)) {
      await kv.delete(KV_PREFIX + slug);
      deleted++;
    }
  }
  console.log(`syncAllPosts: ${listed.size} published, ${stored} stored, ${deleted} deleted, ${failed} failed`);
}

/**
 * /sitemap.xml = the static sitemap (pages) + one entry per published post in
 * KV, so new posts are listed automatically. lastmod comes from the CMS
 * updated_at stored with each KV copy.
 */
async function handleSitemap(request, env) {
  const base = await env.ASSETS.fetch(new URL("/sitemap.xml", request.url));
  if (!base.ok || !env.POSTS_CACHE) return base;
  let xml = await base.text();

  const entries = [];
  let cursor;
  do {
    const page = await env.POSTS_CACHE.list({ prefix: KV_PREFIX, cursor });
    for (const key of page.keys) {
      const slug = key.name.slice(KV_PREFIX.length);
      if (!/^[a-z0-9-]+$/i.test(slug)) continue;
      const updated = String((key.metadata && key.metadata.updated_at) || "").slice(0, 10);
      entries.push(
        "  <url>\n" +
        `    <loc>${SITE_ORIGIN}/blog/${slug}</loc>\n` +
        (/^\d{4}-\d{2}-\d{2}$/.test(updated) ? `    <lastmod>${updated}</lastmod>\n` : "") +
        "    <changefreq>monthly</changefreq>\n" +
        "    <priority>0.7</priority>\n" +
        "  </url>\n"
      );
    }
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);

  xml = xml.replace("</urlset>", entries.join("") + "</urlset>");
  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=300"
    }
  });
}

async function safeEqual(a, b) {
  const enc = new TextEncoder();
  const [x, y] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b))
  ]);
  return crypto.subtle.timingSafeEqual(x, y);
}

/**
 * CMS webhook: POST {"projectId", "slugs": [...]} with x-cms-webhook-secret.
 * Answers 502 if any slug failed so the CMS retries.
 */
async function handleRevalidate(request, env) {
  if (request.method !== "POST") return json({ error: "method not allowed" }, 405);
  const expected = String(env.CMS_WEBHOOK_SECRET || "");
  const provided = request.headers.get("x-cms-webhook-secret") || "";
  if (!expected || !env.POSTS_CACHE || !(await safeEqual(provided, expected))) {
    return json({ error: "unauthorized" }, 401);
  }
  let body;
  try {
    body = await request.json();
  } catch (_) {
    return json({ error: "invalid json" }, 400);
  }
  const projectId = String(env.CMS_PROJECT_ID || DEFAULT_PROJECT_ID);
  if (body.projectId && String(body.projectId) !== projectId) {
    return json({ error: "unknown project" }, 400);
  }
  const slugs = (Array.isArray(body.slugs) ? body.slugs : [])
    .map(String)
    .filter((slug) => /^[a-z0-9-]{1,160}$/i.test(slug))
    .slice(0, 20);

  const results = {};
  let failed = false;
  for (const slug of slugs) {
    try {
      results[slug] = await syncPost(slug, env);
    } catch (e) {
      results[slug] = "error: " + e.message;
      failed = true;
    }
  }
  return json({ ok: !failed, results }, failed ? 502 : 200);
}

/**
 * Fetch just the meta fields needed for OG tags from the CMS.
 * Returns null on any error so the caller can fall back to plain asset serving.
 */
async function fetchLivePost(slug, env, { fresh = false } = {}) {
  const token = String(env.CMS_PUBLIC_TOKEN || "").trim();
  if (!token) return { error: "no-token" };

  const apiBase = String(env.CMS_API_BASE || DEFAULT_CMS_API).replace(/\/+$/, "");
  const projectId = String(env.CMS_PROJECT_ID || DEFAULT_PROJECT_ID);
  const apiUrl = `${apiBase}/${encodeURIComponent(slug)}?projectId=${encodeURIComponent(projectId)}`;

  try {
    // Retry once on network errors / 429 / 5xx so a transient CMS hiccup
    // doesn't leave a crawler with an empty shell.
    let res;
    let lastErr = "";
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        res = await fetch(apiUrl, {
          headers: {
            "accept": "application/json",
            "user-agent": "ActivoMedical-Site-Worker/1.0",
            "x-cms-public-token": token
          },
          // Cache only successful lookups. A bare cacheTtl applies to every
          // status, so one transient CMS error was being cached for 5 minutes
          // and replayed on the retry. The retry bypasses the cache entirely.
          cf: attempt === 0 && !fresh
            ? { cacheEverything: true, cacheTtlByStatus: { "200-299": 300, "404": 60, "400-403": -1, "405-599": -1 } }
            : { cacheTtl: -1 }
        });
        if (res.status !== 429 && res.status < 500) break;
      } catch (e) {
        res = null;
        lastErr = String((e && e.message) || e).slice(0, 80);
      }
    }
    if (!res) return { error: "fetch-failed: " + lastErr };
    if (res.status === 404) return { notFound: true };
    if (!res.ok) {
      let detail = "";
      try { detail = (await res.text()).replace(/\s+/g, " ").slice(0, 300); } catch (_) {}
      const h = ["cf-mitigated", "server", "cf-ray", "content-type"].map(k => k + "=" + res.headers.get(k)).join(" ");
      return { error: "cms-status-" + res.status + " [" + h + "] " + detail };
    }

    const data = await res.json();
    const parsed = parsePost(data);
    if (!parsed.error) parsed.data = data;
    return parsed;
  } catch (e) {
    return { error: "exception: " + String((e && e.message) || e).slice(0, 80) };
  }
}

/**
 * Use HTMLRewriter to bake OG / Twitter meta tags into the static shell
 * before the response leaves the edge — so Facebook's crawler sees them
 * without needing to execute JavaScript.
 */
function injectOgTags(htmlRes, post, slug) {
  // No trailing slash: matches the sitemap and every internal link.
  const canonical = `${SITE_ORIGIN}/blog/${slug}`;
  const pageTitle = post.title
    ? post.title + " | Activo Medical Marketing"
    : "Blog de Marketing Médico | Activo Medical Marketing";
  const desc = post.description || "Estrategias de marketing digital para médicos y clínicas en México.";
  const image = post.image || FALLBACK_IMAGE;

  /** Shorthand handler that sets a single attribute */
  function attr(name, value) {
    return { element(el) { el.setAttribute(name, value); } };
  }

  return new HTMLRewriter()
    .on("#post-title-tag",       { element(el) { el.setInnerContent(pageTitle); } })
    .on("#post-meta-desc",       attr("content", desc))
    .on("#post-canonical",       attr("href", canonical))
    .on("#post-hreflang-en",     attr("href", canonical))
    .on("#post-hreflang-default",attr("href", canonical))
    .on("#post-og-title",        attr("content", pageTitle))
    .on("#post-og-desc",         attr("content", desc))
    .on("#post-og-url",          attr("content", canonical))
    .on("#post-og-image",        attr("content", image))
    .on("#post-twitter-title",   attr("content", pageTitle))
    .on("#post-twitter-desc",    attr("content", desc))
    .on("#post-twitter-image",   attr("content", image))
    .on("#post-cat-tag",         { element(el) { if (post.raw) el.setInnerContent(String(post.raw.category || "")); } })
    .on("#post-title",           { element(el) { if (post.raw) el.setInnerContent(String(post.raw.title || post.title)); } })
    .on("#post-excerpt",         { element(el) { if (post.raw) el.setInnerContent(String(post.raw.excerpt || "")); } })
    .on("#postArticle",          { element(el) { if (post.raw && post.raw.body_html) el.setInnerContent(`<div class="post-body">${post.raw.body_html}</div>`, { html: true }); } })
    .on("#postBreadcrumbJsonLd", { element(el) {
      if (!post.raw) return;
      el.setInnerContent(safeJson({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/blog/` },
          { "@type": "ListItem", position: 3, name: String(post.raw.title || post.title), item: canonical }
        ]
      }), { html: true });
    } })
    .on("#postSchemaJsonLd",     { element(el) { if (post.raw) el.setInnerContent(safeJson(articleSchema(post, canonical)), { html: true }); } })
    .on("head",                  { element(el) { if (post.raw) el.append(`<script>window.__CMS_SSR_POST__=${safeJson(post.raw)};</script>`, { html: true }); } })
    .transform(htmlRes);
}

/**
 * The site owns its identity in structured data: whatever the CMS sends, the
 * Article points at this canonical, is published by Activo Medical Marketing
 * (linked to the home page Organization), is in Spanish, and has an author URL.
 */
function articleSchema(post, canonical) {
  const raw = post.raw || {};
  const base = raw.schema_jsonld && typeof raw.schema_jsonld === "object" && !Array.isArray(raw.schema_jsonld)
    ? { ...raw.schema_jsonld }
    : {};
  delete base.keywords; // CMS fills this with the article's H2 headings
  const author = base.author && typeof base.author === "object" && !Array.isArray(base.author) ? base.author : {};
  return {
    ...base,
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: base.headline || raw.title || post.title,
    description: base.description || post.description || undefined,
    image: base.image && base.image.length ? base.image : (post.image ? [post.image] : [FALLBACK_IMAGE]),
    datePublished: base.datePublished || raw.published_at || undefined,
    dateModified: base.dateModified || raw.updated_at || base.datePublished || raw.published_at || undefined,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    inLanguage: "es",
    author: authorSchema(author.name || (raw.author && raw.author.name) || ""),
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: "Activo Medical Marketing",
      url: `${SITE_ORIGIN}/`,
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/Assets/Logos/activo-logo-white.svg` }
    }
  };
}

/**
 * Joshua's author entity. Same @id as the founder on the home and landing
 * pages, so search engines and AI systems resolve every byline to one person
 * with his credentials. Other authors keep a plain Person.
 */
const AUTHOR_ID = `${SITE_ORIGIN}/#joshua-ramirez`;
function authorSchema(name) {
  const normalized = String(name || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
  if (normalized && normalized !== "joshua ramirez") {
    return { "@type": "Person", name };
  }
  return {
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: "Joshua Ramírez",
    jobTitle: "Especialista en Marketing Digital para el Sector Salud",
    url: `${SITE_ORIGIN}/marketing-medico-tijuana/`,
    worksFor: { "@id": `${SITE_ORIGIN}/#organization` },
    sameAs: ["https://www.linkedin.com/in/joshuaramirez-l/"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Xochicalco" },
    knowsAbout: ["Marketing médico", "SEO", "Google Ads", "SEO local", "Search Marketing"],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Maestría en Mercadotecnia",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "Universidad Xochicalco" }
      },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Licenciatura en Administración de Empresas" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Licenciatura en Comercio Internacional" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Google Ads Certification" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Google Analytics 4 Certification" }
    ]
  };
}

/** JSON safe to embed inside an inline <script>. */
function safeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

async function handleCmsProxy(request, env, url) {
  const token = String(env.CMS_PUBLIC_TOKEN || "").trim();
  if (!token) {
    return json({ error: "CMS proxy token missing" }, 500);
  }

  const configuredBase = String(env.CMS_API_BASE || DEFAULT_CMS_API).trim() || DEFAULT_CMS_API;
  const upstream = new URL(configuredBase.replace(/\/+$/, ""));
  const suffix = url.pathname.replace(/^\/api\/cms\/posts/, "");
  upstream.pathname = upstream.pathname + suffix;

  url.searchParams.forEach((value, key) => upstream.searchParams.set(key, value));
  if (!upstream.searchParams.get("projectId")) {
    upstream.searchParams.set("projectId", String(env.CMS_PROJECT_ID || DEFAULT_PROJECT_ID));
  }

  const upstreamRes = await fetch(upstream.toString(), {
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-cms-public-token": token
    }
  });

  const headers = new Headers(upstreamRes.headers);
  headers.set("cache-control", "no-store");
  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    headers
  });
}

function withUtf8Html(res) {
  const ct = res.headers.get("content-type");
  if (ct && ct.includes("text/html") && !ct.toLowerCase().includes("charset")) {
    const headers = new Headers(res.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers
    });
  }
  return res;
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(syncAllPosts(env).catch((e) => console.error("syncAllPosts failed: " + e.message)));
  },

  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const assets = env.ASSETS;

      if (!assets || typeof assets.fetch !== "function") {
        return new Response("Assets binding is missing", { status: 500 });
      }

      if (path === "/sitemap.xml") {
        return handleSitemap(request, env);
      }

      if (path === "/api/revalidate") {
        return handleRevalidate(request, env);
      }

      if (path.startsWith("/api/cms/posts")) {
        return handleCmsProxy(request, env, url);
      }

      // Redirect bare /marketing-medico-tijuana to trailing slash
      if (path === "/marketing-medico-tijuana") {
        return Response.redirect(url.origin + "/marketing-medico-tijuana/", 301);
      }

      // Blog listing
      if (path === "/blog" || path === "/blog/") {
        return withUtf8Html(await assets.fetch(url.origin + "/blog/blog/index.html"));
      }

      // Blog article slug: /blog/<slug> or /blog/<slug>/ — single segment, no file extension
      const blogSlug = path.match(/^\/blog\/([^/]+)\/?$/);
      if (blogSlug && !blogSlug[1].includes(".")) {
        const slug = blogSlug[1];
        // One URL per post: /blog/<slug>/ -> /blog/<slug>
        if (path.endsWith("/")) {
          return Response.redirect(`${url.origin}/blog/${slug}${url.search}`, 301);
        }
        const htmlRes = await assets.fetch(url.origin + "/blog/_blog-post/index.html");
        // Fetch post meta and inject OG tags so Facebook / social crawlers
        // see the correct title, description and cover image without JS.
        const post = await fetchPost(slug, env, ctx);
        // Unknown slug: return a real 404 (not a 200 shell) so Google doesn't flag a soft 404.
        if (post && post.notFound) {
          const notFound = new HTMLRewriter()
            .on("#post-robots", { element(el) { el.setAttribute("content", "noindex,follow"); } })
            .on("#post-canonical", { element(el) { el.remove(); } })
            .transform(htmlRes);
          const res404 = withUtf8Html(notFound);
          return new Response(res404.body, { status: 404, headers: res404.headers });
        }
        // CMS lookup failed (not a 404): answer 503 so Google retries later
        // instead of indexing the empty shell as a soft 404. The shell still
        // loads for humans, whose browser can fetch the post client-side.
        if (!post || post.error) {
          console.error("CMS lookup failed for " + slug + ": " + ((post && post.error) || "unknown"));
          const shell = withUtf8Html(injectOgTags(htmlRes, { title: "", description: "", image: "" }, slug));
          const headers = new Headers(shell.headers);
          headers.set("retry-after", "120");
          headers.set("cache-control", "no-store");
          headers.set("x-ssr", "cms-unavailable");
          headers.set("x-ssr-reason", (post && post.error) || "unknown");
          return new Response(shell.body, { status: 503, headers });
        }
        const ok = withUtf8Html(injectOgTags(htmlRes, post, slug));
        const okHeaders = new Headers(ok.headers);
        okHeaders.set("x-ssr", "hit");
        return new Response(ok.body, { status: ok.status, headers: okHeaders });
      }

      // All other requests: serve static assets as-is
      const res = await assets.fetch(request);
      return withUtf8Html(res);
    } catch (error) {
      return new Response("Worker routing error", { status: 500 });
    }
  },
};
