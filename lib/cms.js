const CMS_API = process.env.NEXT_PUBLIC_CMS_API || 'https://app.seermantic.com/api/posts';
const PROJECT_ID = process.env.NEXT_PUBLIC_CMS_PROJECT_ID || '65bb6d01';
const TOKEN = process.env.NEXT_PUBLIC_CMS_PUBLIC_TOKEN || '';

function cmsHeaders() {
  return { 'x-cms-public-token': TOKEN };
}

// List published posts -> { posts[], total, page, per_page }
export async function fetchPosts(page = 1, perPage = 10) {
  const url =
    CMS_API +
    '?projectId=' +
    encodeURIComponent(PROJECT_ID) +
    '&page=' +
    page +
    '&per_page=' +
    perPage;
  const res = await fetch(url, { headers: cmsHeaders(), cache: 'no-store' });
  if (!res.ok) throw new Error('CMS list failed (' + res.status + ')');
  return res.json();
}

// Get single post by slug -> post object or null (404)
export async function fetchPostBySlug(slug) {
  const url =
    CMS_API +
    '/' +
    encodeURIComponent(slug) +
    '?projectId=' +
    encodeURIComponent(PROJECT_ID);
  const res = await fetch(url, { headers: cmsHeaders(), cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('CMS fetch failed (' + res.status + ')');
  return res.json();
}
