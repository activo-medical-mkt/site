export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Redirect bare /marketing-medico-tijuana to trailing slash
    if (path === "/marketing-medico-tijuana") {
      return Response.redirect(url.origin + "/marketing-medico-tijuana/", 301);
    }

    // Blog listing
    if (path === "/blog" || path === "/blog/") {
      return env.ASSETS.fetch(url.origin + "/blog/blog/index.html");
    }

    // Blog article slug: /blog/<slug> — single segment, no file extension
    const blogSlug = path.match(/^\/blog\/([^/]+)$/);
    if (blogSlug && !blogSlug[1].includes(".")) {
      return env.ASSETS.fetch(url.origin + "/blog/_blog-post/index.html");
    }

    // All other requests: serve static assets as-is
    return env.ASSETS.fetch(request);
  },
};
