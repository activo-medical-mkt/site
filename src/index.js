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
async function fetchPostMeta(slug, env) {
  const token = String(env.CMS_PUBLIC_TOKEN || "").trim();
  if (!token) return null;

  const apiBase = String(env.CMS_API_BASE || DEFAULT_CMS_API).replace(/\/+$/, "");
  const projectId = String(env.CMS_PROJECT_ID || DEFAULT_PROJECT_ID);
  const apiUrl = `${apiBase}/${encodeURIComponent(slug)}?projectId=${encodeURIComponent(projectId)}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "accept": "application/json",
        "x-cms-public-token": token
      },
      cf: { cacheTtl: 300, cacheEverything: true }
    });
    if (!res.ok) return null;

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

    if (!title) return null;
    return { title, description, image };
  } catch (_) {
    return null;
  }
}

/**
 * Use HTMLRewriter to bake OG / Twitter meta tags into the static shell
 * before the response leaves the edge — so Facebook's crawler sees them
 * without needing to execute JavaScript.
 */
function injectOgTags(htmlRes, post, slug) {
  const canonical = `${SITE_ORIGIN}/blog/${slug}/`;
  const pageTitle = post.title + " | Activo Medical Marketing";
  const desc = post.description || "";
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
    .transform(htmlRes);
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
        return assets.fetch(url.origin + "/blog/blog/index.html");
      }

      // Blog article slug: /blog/<slug> — single segment, no file extension
      const blogSlug = path.match(/^\/blog\/([^/]+)$/);
      if (blogSlug && !blogSlug[1].includes(".")) {
        const slug = blogSlug[1];
        const htmlRes = await assets.fetch(url.origin + "/blog/_blog-post/index.html");
        // Fetch post meta and inject OG tags so Facebook / social crawlers
        // see the correct title, description and cover image without JS.
        const post = await fetchPostMeta(slug, env);
        if (post) return injectOgTags(htmlRes, post, slug);
        return htmlRes;
      }

      // All other requests: serve static assets as-is
      return assets.fetch(request);
    } catch (error) {
      return new Response("Worker routing error", { status: 500 });
    }
  },
};
