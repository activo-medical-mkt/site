export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Redirect bare /marketing-medico-tijuana to trailing slash
    if (path === "/marketing-medico-tijuana") {
      return Response.redirect(new URL("/marketing-medico-tijuana/", url), 301);
    }

    // Blog listing
    if (path === "/blog" || path === "/blog/") {
      return env.ASSETS.fetch(
        new Request(new URL("/blog/blog/index.html", url), request)
      );
    }

    // Blog article slug: /blog/<slug> (no dot = not a file, no sub-path)
    if (path.startsWith("/blog/") && !path.slice(6).includes(".")) {
      return env.ASSETS.fetch(
        new Request(new URL("/blog/_blog-post/index.html", url), request)
      );
    }

    // All other requests: serve static assets as-is
    return env.ASSETS.fetch(request);
  },
};
