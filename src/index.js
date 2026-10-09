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

/**
 * Fetch just the meta fields needed for OG tags from the CMS.
 * Returns null on any error so the caller can fall back to plain asset serving.
 */
async function fetchPost(slug, env) {
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
            "x-cms-public-token": token
          },
          // Cache only successful lookups. A bare cacheTtl applies to every
          // status, so one transient CMS error was being cached for 5 minutes
          // and replayed on the retry. The retry bypasses the cache entirely.
          cf: attempt === 0
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
  const canonical = `${SITE_ORIGIN}/blog/${slug}/`;
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
    .on("#postSchemaJsonLd",     { element(el) { if (post.raw && post.raw.schema_jsonld) el.setInnerContent(safeJson(post.raw.schema_jsonld), { html: true }); } })
    .on("head",                  { element(el) { if (post.raw) el.append(`<script>window.__CMS_SSR_POST__=${safeJson(post.raw)};</script>`, { html: true }); } })
    .transform(htmlRes);
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
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const assets = env.ASSETS;

      if (!assets || typeof assets.fetch !== "function") {
        return new Response("Assets binding is missing", { status: 500 });
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
        const htmlRes = await assets.fetch(url.origin + "/blog/_blog-post/index.html");
        // Fetch post meta and inject OG tags so Facebook / social crawlers
        // see the correct title, description and cover image without JS.
        const post = await fetchPost(slug, env);
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
