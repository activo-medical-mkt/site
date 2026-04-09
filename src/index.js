export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const assets = env.ASSETS;

      if (!assets || typeof assets.fetch !== "function") {
        return new Response("Assets binding is missing", { status: 500 });
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
