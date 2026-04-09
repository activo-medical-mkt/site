/* ===================================================================
   BLOG PAGE — CMS fetch + filter + search logic
   =================================================================== */
(function () {
    'use strict';

    var API_URL = 'https://app.seermantic.com/api/posts';

    var cfg = window.__CMS_CONFIG__ || {};
    var projectId = cfg.projectId || document.documentElement.getAttribute('data-cms-project-id') || '65bb6d01';
    var publicToken = cfg.publicToken || document.documentElement.getAttribute('data-cms-public-token') || '';

    var state = {
        posts: [],
        page: 1,
        perPage: 6,
        activeCategory: 'all',
        searchQuery: ''
    };

    function esc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function fmt(dateStr) {
        var d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr || '';
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function slugify(text) {
        return String(text || '')
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    }

    var KNOWN_CAT_KEYS = { ai: 1, seo: 1, strategy: 1, data: 1, content: 1, product: 1, automation: 1 };

    var AUTO_CAT_PALETTE = [
        { bg: 'rgba(234,88,12,0.1)',   color: '#ea580c' },
        { bg: 'rgba(6,182,212,0.1)',   color: '#0891b2' },
        { bg: 'rgba(168,85,247,0.1)',  color: '#9333ea' },
        { bg: 'rgba(234,179,8,0.1)',   color: '#ca8a04' },
        { bg: 'rgba(236,72,153,0.1)',  color: '#db2777' },
        { bg: 'rgba(20,184,166,0.1)',  color: '#0f766e' },
        { bg: 'rgba(99,102,241,0.1)',  color: '#6366f1' },
        { bg: 'rgba(245,158,11,0.1)',  color: '#d97706' }
    ];

    function hashCatKey(key) {
        var h = 0;
        for (var i = 0; i < key.length; i++) h = (Math.imul(31, h) + key.charCodeAt(i)) | 0;
        return Math.abs(h);
    }

    function catAutoStyle(key) {
        if (KNOWN_CAT_KEYS[key]) return '';
        var entry = AUTO_CAT_PALETTE[hashCatKey(key) % AUTO_CAT_PALETTE.length];
        return ' style="background:' + entry.bg + ';color:' + entry.color + ';"';
    }

    function catKey(post) {
        if (post.cat_key) return post.cat_key;
        var label = String(post.category || '').toLowerCase().trim();
        if (label === 'ai & automation' || label === 'ai and automation' || label === 'ai') return 'ai';
        if (label === 'automation') return 'automation';
        if (label === 'data & analytics' || label === 'data and analytics' || label === 'analytics') return 'data';
        if (label === 'seo') return 'seo';
        if (label === 'strategy') return 'strategy';
        if (label === 'content') return 'content';
        if (label === 'product') return 'product';
        return slugify(post.category || 'content') || 'content';
    }

    function initials(name) {
        var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return 'AM';
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    function pickGradient(i) {
        var gradients = [
            'linear-gradient(135deg,#6600cc,#0000cc)',
            'linear-gradient(135deg,#0000cc,#0ea5e9)',
            'linear-gradient(135deg,#059669,#0ea5e9)',
            'linear-gradient(135deg,#dc2626,#f59e0b)',
            'linear-gradient(135deg,#6600cc,#9333ea)'
        ];
        return gradients[i % gradients.length];
    }

    function placeholderClass(key) {
        var map = {
            ai: 'blog-img--ai',
            seo: 'blog-img--seo',
            strategy: 'blog-img--strategy',
            data: 'blog-img--data',
            content: 'blog-img--content',
            product: 'blog-img--product'
        };
        return map[key] || 'blog-img--ai2';
    }

    function cmsHeaders() {
        var headers = {};
        if (publicToken) headers['x-cms-public-token'] = publicToken;
        return headers;
    }

    function postUrl(slug) {
        var safeSlug = String(slug || 'demo').trim();
        return '/blog/' + encodeURIComponent(safeSlug);
    }

    function normalizePost(post, index) {
        var authorName = (post.author && post.author.name) || post.author_name || 'Activo Team';
        return {
            slug: post.slug,
            title: post.title || 'Untitled Post',
            excerpt: post.excerpt || '',
            category: post.category || 'Content',
            cat_key: catKey(post),
            hero_image: post.hero_image || '',
            published_at: post.published_at || '',
            read_time: post.read_time || null,
            author: {
                name: authorName,
                initials: (post.author && post.author.initials) || initials(authorName),
                avatar_gradient: (post.author && post.author.avatar_gradient) || pickGradient(index)
            }
        };
    }

    function parsePostsPayload(payload) {
        if (Array.isArray(payload)) return payload;
        if (!payload || typeof payload !== 'object') return [];

        if (Array.isArray(payload.posts)) return payload.posts;
        if (Array.isArray(payload.items)) return payload.items;
        if (payload.data) {
            if (Array.isArray(payload.data)) return payload.data;
            if (Array.isArray(payload.data.posts)) return payload.data.posts;
            if (Array.isArray(payload.data.items)) return payload.data.items;
        }
        return [];
    }

    function isPublished(post) {
        var raw = post.status || post.state || post.publish_status || post.visibility;
        if (raw === undefined || raw === null || raw === '') return true;
        var status = String(raw).toLowerCase();
        return status === 'published' || status === 'live' || status === 'public';
    }

    function sortNewestFirst(posts) {
        return posts.slice().sort(function (a, b) {
            var da = new Date(a.published_at || a.publishedAt || a.created_at || a.createdAt || 0).getTime() || 0;
            var db = new Date(b.published_at || b.publishedAt || b.created_at || b.createdAt || 0).getTime() || 0;
            return db - da;
        });
    }

    function renderFeatured(post) {
        var featured = document.querySelector('.blog-featured');
        if (!featured) return;

        featured.style.display = '';
        featured.style.visibility = 'visible';
        featured.setAttribute('data-cat', post.cat_key);

        var imageHtml = post.hero_image
            ? '<img src="' + esc(post.hero_image) + '" alt="' + esc(post.title) + '" loading="eager" style="width:100%;height:100%;object-fit:cover;display:block;">'
            : '<div class="blog-img-placeholder ' + placeholderClass(post.cat_key) + '">' +
                '<div class="blog-img-grid"><div class="blog-img-dot"></div><div class="blog-img-dot"></div><div class="blog-img-dot"></div><div class="blog-img-dot"></div><div class="blog-img-dot"></div><div class="blog-img-dot"></div></div>' +
                '<svg class="blog-img-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>' +
              '</div>';

        featured.innerHTML =
            '<a href="' + postUrl(post.slug) + '" class="blog-featured-image">' + imageHtml + '</a>' +
            '<div class="blog-featured-body">' +
                '<span class="blog-cat-tag blog-cat--' + esc(post.cat_key) + '"' + catAutoStyle(post.cat_key) + '>' + esc(post.category) + '</span>' +
                '<h2 class="blog-featured-title">' + esc(post.title) + '</h2>' +
                '<p class="blog-featured-excerpt">' + esc(post.excerpt) + '</p>' +
                '<div class="blog-card-meta">' +
                    '<div class="blog-author-av" style="background:' + esc(post.author.avatar_gradient) + ';">' + esc(post.author.initials) + '</div>' +
                    '<div class="blog-author-info">' +
                        '<span class="blog-author-name">' + esc(post.author.name) + '</span>' +
                        '<span class="blog-meta-date">' + esc(fmt(post.published_at)) + '</span>' +
                    '</div>' +
                    '<a href="' + postUrl(post.slug) + '" class="blog-read-more">Read article<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>' +
                '</div>' +
            '</div>';
    }

    function renderGrid(posts) {
        var grid = document.getElementById('blogGrid');
        if (!grid) return;

        grid.innerHTML = posts.map(function (post, i) {
            var imageHtml = post.hero_image
                ? '<img src="' + esc(post.hero_image) + '" alt="' + esc(post.title) + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;">'
                : '<div class="blog-img-placeholder ' + placeholderClass(post.cat_key) + '">' +
                    '<svg class="blog-img-icon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>' +
                  '</div>';

            return '<article class="blog-card" data-cat="' + esc(post.cat_key) + '">' +
                '<a href="' + postUrl(post.slug) + '" class="blog-card-image-link">' + imageHtml + '</a>' +
                '<div class="blog-card-body">' +
                    '<span class="blog-cat-tag blog-cat--' + esc(post.cat_key) + '">' + esc(post.category) + '</span>' +
                    '<h3 class="blog-card-title"><a href="' + postUrl(post.slug) + '">' + esc(post.title) + '</a></h3>' +
                    '<p class="blog-card-excerpt">' + esc(post.excerpt) + '</p>' +
                    '<div class="blog-card-meta">' +
                        '<div class="blog-author-av" style="background:' + esc(post.author.avatar_gradient || pickGradient(i)) + ';">' + esc(post.author.initials) + '</div>' +
                        '<div class="blog-author-info">' +
                            '<span class="blog-author-name">' + esc(post.author.name) + '</span>' +
                            '<span class="blog-meta-date">' + esc(fmt(post.published_at)) + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</article>';
        }).join('');
    }

    function getAllArticleNodes() {
        return document.querySelectorAll('.blog-featured, .blog-card');
    }

    function categoryLabelFromKey(key) {
        var labels = {
            ai: 'AI & Automation',
            seo: 'SEO',
            strategy: 'Strategy',
            data: 'Data & Analytics',
            content: 'Content',
            product: 'Product'
        };
        if (labels[key]) return labels[key];
        return String(key || '')
            .split('-')
            .filter(Boolean)
            .map(function (part) { return part.charAt(0).toUpperCase() + part.slice(1); })
            .join(' ');
    }

    function renderFilterButtons(posts) {
        var filters = document.querySelector('.blog-filters');
        if (!filters) return;

        var byKey = {};
        (posts || []).forEach(function (post) {
            var key = String(post.cat_key || '').trim();
            if (!key || byKey[key]) return;
            byKey[key] = String(post.category || '').trim() || categoryLabelFromKey(key);
        });

        var preferredOrder = ['seo', 'ai', 'strategy', 'data', 'content', 'product'];
        var keys = Object.keys(byKey).sort(function (a, b) {
            var ia = preferredOrder.indexOf(a);
            var ib = preferredOrder.indexOf(b);
            if (ia !== -1 && ib !== -1) return ia - ib;
            if (ia !== -1) return -1;
            if (ib !== -1) return 1;
            return byKey[a].localeCompare(byKey[b]);
        });

        var html = '<button class="blog-filter-btn" data-cat="all">All</button>';
        keys.forEach(function (key) {
            html += '<button class="blog-filter-btn" data-cat="' + esc(key) + '">' + esc(byKey[key]) + '</button>';
        });

        filters.innerHTML = html;
    }

    function applyFilter(cat) {
        if (cat !== 'all' && !document.querySelector('.blog-filter-btn[data-cat="' + cat + '"]')) {
            cat = 'all';
        }
        getAllArticleNodes().forEach(function (el) {
            if (cat === 'all' || el.dataset.cat === cat) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
        document.querySelectorAll('.blog-filter-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.cat === cat);
        });
        state.activeCategory = cat;
    }

    function applySearch(q) {
        var query = String(q || '').trim().toLowerCase();
        getAllArticleNodes().forEach(function (el) {
            if (!query) {
                if (state.activeCategory === 'all' || el.dataset.cat === state.activeCategory) {
                    el.classList.remove('hidden');
                }
                return;
            }
            var text = el.innerText.toLowerCase();
            var byCat = state.activeCategory === 'all' || el.dataset.cat === state.activeCategory;
            el.classList.toggle('hidden', !(byCat && text.includes(query)));
        });
        state.searchQuery = query;
    }

    function wireInteractions() {
        var filters = document.querySelector('.blog-filters');
        if (filters) {
            filters.addEventListener('click', function (event) {
                var btn = event.target.closest('.blog-filter-btn');
                if (!btn) return;
                applyFilter(btn.dataset.cat);
                applySearch(state.searchQuery);
            });
        }

        var searchInput = document.querySelector('.blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                applySearch(searchInput.value);
            });
        }

        var loadMoreBtn = document.querySelector('.blog-load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function () {
                var shown = state.page * state.perPage;
                if (shown >= state.posts.length) {
                    loadMoreBtn.textContent = 'No more articles yet — check back soon!';
                    loadMoreBtn.disabled = true;
                    loadMoreBtn.style.opacity = '0.5';
                    loadMoreBtn.style.cursor = 'default';
                    return;
                }

                state.page += 1;
                var featured = state.posts[0] || null;
                var gridPosts = state.posts.slice(1, 1 + state.page * state.perPage);
                if (featured) renderFeatured(featured);
                renderGrid(gridPosts);
                applyFilter(state.activeCategory);
                applySearch(state.searchQuery);

                if ((1 + state.page * state.perPage) >= state.posts.length) {
                    loadMoreBtn.textContent = 'No more articles yet — check back soon!';
                    loadMoreBtn.disabled = true;
                    loadMoreBtn.style.opacity = '0.5';
                    loadMoreBtn.style.cursor = 'default';
                }
            });
        }
    }

    function fetchPosts() {
        if (!window.CMSClient || typeof window.CMSClient.fetchPosts !== 'function') {
            throw new Error('CMS client not loaded.');
        }

        return window.CMSClient.fetchPosts(1, 20)
            .then(function (res) {
                var payload = res && res.data ? res.data : {};
                var posts = parsePostsPayload(payload)
                    .filter(function (p) { return !!p && !!p.slug; })
                    .filter(isPublished);

                return sortNewestFirst(posts).map(normalizePost);
            });
    }

    function renderCmsConfigError(message) {
        var featured = document.querySelector('.blog-featured');
        var grid = document.getElementById('blogGrid');
        if (featured) featured.style.display = 'none';
        if (!grid) return;

        grid.innerHTML = '<article class="blog-card" style="grid-column:1 / -1;">' +
            '<div class="blog-card-body">' +
                '<span class="blog-cat-tag blog-cat--content">Configuration</span>' +
                '<h3 class="blog-card-title">CMS configuration error</h3>' +
                '<p class="blog-card-excerpt">' + esc(message) + '</p>' +
            '</div>' +
        '</article>';
    }

    function renderCmsLoadError(message) {
        var featured = document.querySelector('.blog-featured');
        var grid = document.getElementById('blogGrid');
        if (featured) featured.style.display = 'none';
        if (!grid) return;

        grid.innerHTML = '<article class="blog-card" style="grid-column:1 / -1;">' +
            '<div class="blog-card-body">' +
                '<span class="blog-cat-tag blog-cat--content">Connection</span>' +
                '<h3 class="blog-card-title">Could not load posts</h3>' +
                '<p class="blog-card-excerpt">' + esc(message) + '</p>' +
            '</div>' +
        '</article>';
    }

    function boot() {
        wireInteractions();

        fetchPosts()
            .then(function (posts) {
                if (!posts.length) {
                    var featured = document.querySelector('.blog-featured');
                    if (featured) featured.style.display = 'none';
                    return;
                }

                state.posts = posts;
                state.page = 1;

                renderFilterButtons(posts);
                renderFeatured(posts[0]);
                renderGrid(posts.slice(1, 1 + state.perPage));
                applyFilter('all');
                applySearch('');
            })
            .catch(function (err) {
                var msg = (err && err.message) ? err.message : 'Failed to load posts from CMS.';
                if (typeof console !== 'undefined' && console.error) {
                    console.error('[blog] CMS fetch failed:', err);
                }
                if (err && (err.code === 'CMS_TOKEN_INVALID' || err.code === 'CMS_TOKEN_MISSING' || err.code === 'CMS_PROJECT_MISSING' || err.code === 'CMS_API_MISSING')) {
                    renderCmsConfigError(msg);
                    return;
                }
                renderCmsLoadError(msg);
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();
