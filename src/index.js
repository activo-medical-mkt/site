const DEFAULT_CMS_API = "https://app.seermantic.com/api/posts";
const DEFAULT_PROJECT_ID = "65bb6d01";

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
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
        return assets.fetch(url.origin + "/blog/_blog-post/index.html");
      }

      // All other requests: serve static assets as-is
      return assets.fetch(request);
    } catch (error) {
      return new Response("Worker routing error", { status: 500 });
    }
  },
};
