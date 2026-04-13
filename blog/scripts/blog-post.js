/* ===================================================================
   BLOG POST — fetch, render, TOC, scroll-spy, share
   ===================================================================
   API contract:
     GET {API_BASE}/posts/{slug}

   Response shape:
   {
     "slug": "my-post",
     "title": "...",
     "excerpt": "...",
     "category": "SEO",
     "cat_key": "seo",            // maps to blog-cat--* classes
     "hero_image": "https://...", // optional
     "author": {
       "name": "...",
       "initials": "JR",
       "avatar_gradient": "linear-gradient(135deg,#6600cc,#0000cc)",
       "bio": "..."
     },
     "published_at": "2026-03-12",
     "read_time": 6,
     "tags": ["SEO", "Data"],
     "body_html": "<h2>...</h2><p>...</p>...",
     "related": [
       { "slug": "...", "title": "...", "excerpt": "...",
         "category": "...", "cat_key": "...",
         "author": { "name": "...", "initials": "...", "avatar_gradient": "..." },
         "published_at": "..." }
     ]
   }
   =================================================================== */
(function () {
    'use strict';

    /* ── CONFIG ─────────────────────────────────────────────────────── */
    var API_BASE = 'https://app.seermantic.com/api/posts';
    var cfg = window.__CMS_CONFIG__ || {};
    API_BASE = cfg.apiBase || API_BASE;
    var projectId = cfg.projectId || document.documentElement.getAttribute('data-cms-project-id') || '65bb6d01';
    var publicToken = cfg.publicToken || document.documentElement.getAttribute('data-cms-public-token') || '';

    /* ── DEMO CONTENT (shown when no API / local dev) ──────────────── */
    var DEMO_POST = {
        slug: 'demo',
        title: 'How AI Is Transforming the Way Content Teams Turn Data Into Strategy',
        excerpt: 'For years, content strategy meant hours in spreadsheets. AI is changing that equation entirely — the teams moving fastest aren\'t just using AI to write content, they\'re using it to think.',
        category: 'AI & Automation',
        cat_key: 'ai',
        hero_image: '',
        author: {
            name: 'Jordan S.',
            initials: 'JS',
            avatar_gradient: 'linear-gradient(135deg,#6600cc,#0000cc)',
            bio: 'Jordan is Head of Content at seermantic. He writes about AI, SEO strategy, and the tools that help modern content teams move faster without sacrificing quality.'
        },
        published_at: '2026-03-10',
        read_time: 7,
        tags: ['AI', 'Strategy', 'Content', 'SEO'],
        body_html: `
<h2 id="intro">Introduction</h2>
<p>The average content team spends more than <strong>60% of their strategy time</strong> not writing — but figuring out <em>what</em> to write. They're exporting CSVs from Google Search Console, pasting them into spreadsheets, building pivot tables, and ultimately making gut-feel decisions that look data-driven on the surface.</p>
<p>AI is dismantling that workflow. Not by replacing writers, but by collapsing the gap between raw data and clear, actionable decisions. Here's what that actually looks like in practice.</p>

<div class="post-callout">
    <div class="post-callout-icon">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    </div>
    <p>Teams using AI-assisted strategy workflows report saving an average of <strong>8–12 hours per week</strong> on data analysis and brief preparation — time that goes straight back into publishing.</p>
</div>

<h2 id="old-way">The old way was broken by design</h2>
<p>Manual SEO analysis has a fundamental flaw: it's time-lagged. By the time you've pulled the data, cleaned it, spotted the pattern, built the brief, briefed the writer, and published the piece — the opportunity has often moved on. Competitors filled it. The algorithm shifted. The moment passed.</p>
<p>There's also the cognitive load problem. Humans are genuinely bad at spotting weak signals in large datasets. We gravitate toward the metrics that are easiest to read — total clicks, overall traffic — and miss the nuanced signals that actually predict opportunity: impression velocity, CTR decay curves, position clustering.</p>

<blockquote class="post-pullquote">
    <p>"The teams winning at content aren't the ones with the most data. They're the ones who can act on it the fastest."</p>
    <cite>— seermantic research, 2026</cite>
</blockquote>

<h2 id="how-ai-changes">How AI changes the equation</h2>
<p>Modern AI systems don't just retrieve data — they reason about it. When you ask "which of my pages has the most untapped potential?" you're not running a query; you're offloading a multi-step analytical process that would otherwise take an experienced SEO 30–45 minutes per site.</p>
<p>The AI cross-references impressions against click-through rates, compares position distributions against keyword intent clusters, and surfaces a ranked shortlist — with a recommended action attached. That's not a report. That's strategy.</p>

<h3 id="what-this-looks-like">What this looks like in a real workflow</h3>
<p>Here's a concrete example. A content manager opens seermantic on a Monday morning. Instead of pulling weekend GSC data, they type a question:</p>
<figure>
    <div class="blog-img-placeholder blog-img--ai" style="height:220px;position:relative;border-radius:12px;overflow:hidden;">
        <div class="blog-img-grid"></div>
        <svg class="blog-img-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
    </div>
    <figcaption>seermantic's AI chat interface — ask questions about your data in plain language.</figcaption>
</figure>
<p>Within seconds they have a prioritised list of pages, a clear rationale for each, and a one-click path to generating a full content brief. The entire discovery-to-brief loop that used to take half a day now takes under five minutes.</p>

<h2 id="three-shifts">Three concrete shifts AI makes possible</h2>
<p>Across the content teams using seermantic, we see three structural changes in how strategy actually gets done:</p>
<ol>
    <li><strong>From periodic audits to continuous intelligence.</strong> Instead of quarterly content audits, teams get live signals surfaced automatically. Opportunities don't age; they're acted on the week they appear.</li>
    <li><strong>From instinct to evidence.</strong> Briefs stop being based on what the team thinks is interesting and start being grounded in what the data shows users are searching for, clicking on, and converting from.</li>
    <li><strong>From siloed tools to a unified workflow.</strong> Discovery, briefing, writing, compliance checking, and publishing happen in one place. Context isn't lost between handoffs.</li>
</ol>

<h2 id="compliance">The piece most teams overlook: compliance</h2>
<p>Speed without guardrails creates a different kind of problem. Publishing faster only creates value if what you publish is accurate, on-brand, and legally safe. AI-powered compliance checking — running brand voice rules, fact checks, and regulatory flags before a piece goes live — closes the loop that most AI writing tools leave open.</p>
<p>This is particularly important for brands operating in regulated industries: financial services, healthcare, legal. But even outside those sectors, brand consistency at scale is genuinely hard. AI checks every piece against the same standards, every time, without fatigue.</p>

<h2 id="conclusion">Conclusion</h2>
<p>The AI content revolution isn't about replacing writers. It's about eliminating the work that shouldn't require a human in the first place — data prep, gap spotting, brief scaffolding, compliance passes — so that the humans in your team can focus on the craft that actually moves the needle.</p>
<p>The teams that understand this distinction are pulling ahead. The ones still treating AI as a writing shortcut are missing the deeper shift entirely.</p>
        `,
        related: [
            {
                slug: 'ctr-gap',
                title: 'The Hidden CTR Gap: Why Impression-Rich Pages Are Leaving Clicks Behind',
                excerpt: 'Thousands of impressions, almost no clicks. Here\'s what the data actually tells you and how to close the gap fast.',
                category: 'SEO',
                cat_key: 'seo',
                img_class: 'blog-img--seo',
                author: { name: 'Maya L.', initials: 'ML', avatar_gradient: 'linear-gradient(135deg,#0000cc,#6600cc)' },
                published_at: '2026-03-05'
            },
            {
                slug: 'content-briefs',
                title: 'Content Briefs That Actually Get Used: A Data-First Framework',
                excerpt: 'Most content briefs get ignored. We looked at what separates the ones writers actually follow.',
                category: 'Strategy',
                cat_key: 'strategy',
                img_class: 'blog-img--strategy',
                author: { name: 'Ryan P.', initials: 'RP', avatar_gradient: 'linear-gradient(135deg,#059669,#0ea5e9)' },
                published_at: '2026-02-27'
            },
            {
                slug: 'ai-workflow',
                title: 'From Prompt to Published: Building an AI-Assisted Content Workflow',
                excerpt: 'Scattered handoffs and slow approvals are the real bottleneck. Here\'s how leading teams are using AI agents.',
                category: 'AI & Automation',
                cat_key: 'ai',
                img_class: 'blog-img--ai2',
                author: { name: 'Tom O.', initials: 'TO', avatar_gradient: 'linear-gradient(135deg,#0000cc,#0ea5e9)' },
                published_at: '2026-02-06'
            }
        ]
    };

    /* ── HELPERS ────────────────────────────────────────────────────── */
    function fmt(dateStr) {
        var d = new Date(dateStr);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function slug(text) {
        return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
    }

    function $ (sel) { return document.querySelector(sel); }

    function cmsHeaders() {
        var headers = {};
        if (publicToken) headers['x-cms-public-token'] = publicToken;
        return headers;
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

    function toCatKey(post) {
        if (post.cat_key) return post.cat_key;
        var label = String(post.category || '').toLowerCase().trim();
        if (label === 'ai & automation' || label === 'ai and automation' || label === 'ai') return 'ai';
        if (label === 'automation') return 'automation';
        if (label === 'data & analytics' || label === 'data and analytics' || label === 'analytics') return 'data';
        if (label === 'seo') return 'seo';
        if (label === 'strategy') return 'strategy';
        if (label === 'content') return 'content';
        if (label === 'product') return 'product';
        return String(post.category || 'content')
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-') || 'content';
    }

    function initials(name) {
        var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return 'SM';
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    function estimateReadTime(post) {
        if (post.read_time) return post.read_time;
        var plainText = String(post.body_html || '').replace(/<[^>]*>/g, ' ');
        var words = plainText.trim().split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.round(words / 220));
    }

    function pickFirst() {
        for (var i = 0; i < arguments.length; i += 1) {
            var value = arguments[i];
            if (value !== undefined && value !== null && String(value).trim() !== '') {
                return value;
            }
        }
        return '';
    }

    function toArray(value) {
        if (Array.isArray(value)) return value;
        if (typeof value === 'string') {
            return value.split(',').map(function (v) { return String(v || '').trim(); }).filter(Boolean);
        }
        return [];
    }

    function extractPostPayload(data) {
        if (!data || typeof data !== 'object') return data || {};
        if (data.post && typeof data.post === 'object') return data.post;
        if (data.item && typeof data.item === 'object') return data.item;
        if (data.data && typeof data.data === 'object') {
            if (data.data.post && typeof data.data.post === 'object') return data.data.post;
            if (data.data.item && typeof data.data.item === 'object') return data.data.item;
            return data.data;
        }
        return data;
    }

    function normalizePost(raw) {
        var authorBlock = raw.author || raw.authorInfo || raw.author_info || {};
        var authorName = authorBlock.name || raw.author_name || raw.authorName || 'seermantic Team';
        var seoBlock = raw.seo || raw.seo_meta || raw.seoMeta || {};
        var relatedRaw = raw.related || raw.related_posts || raw.relatedPosts || [];

        var normalized = {
            slug: pickFirst(raw.slug, raw.post_slug, raw.postSlug),
            title: pickFirst(raw.title, raw.headline, 'Untitled Post'),
            seo_title: pickFirst(raw.seo_title, raw.seoTitle, raw.seo_heading, seoBlock.title, seoBlock.seo_title, seoBlock.seoTitle),
            excerpt: pickFirst(raw.excerpt, raw.summary, raw.description),
            meta_description: pickFirst(raw.meta_description, raw.metaDescription, raw.seo_description, raw.seoDescription, seoBlock.description, seoBlock.meta_description, seoBlock.metaDescription),
            category: raw.category || 'Content',
            cat_key: toCatKey(raw),
            hero_image: pickFirst(raw.hero_image, raw.heroImage, raw.cover_image, raw.coverImage, raw.image),
            social_image: pickFirst(raw.og_image, raw.ogImage, raw.social_image, raw.socialImage),
            published_at: pickFirst(raw.published_at, raw.publishedAt, raw.publish_date, raw.publishDate, raw.datePublished),
            read_time: estimateReadTime(raw),
            tags: toArray(raw.tags),
            body_html: pickFirst(raw.body_html, raw.bodyHtml, raw.content_html, raw.contentHtml, raw.html, '<p>No content yet.</p>'),
            schema_jsonld: pickFirst(raw.schema_jsonld, raw.schemaJsonLd, raw.structured_data, raw.structuredData, seoBlock.schema_jsonld, seoBlock.schemaJsonLd),
            author: {
                name: authorName,
                initials: authorBlock.initials || initials(authorName),
                avatar_gradient: pickFirst(authorBlock.avatar_gradient, authorBlock.avatarGradient, 'linear-gradient(135deg,#6600cc,#0000cc)'),
                bio: pickFirst(authorBlock.bio, raw.author_bio, raw.authorBio)
            },
            related: relatedRaw.slice(0, 3).map(function (p) {
                var relatedAuthor = (p.author && p.author.name) || p.author_name || 'seermantic Team';
                return {
                    slug: p.slug,
                    title: p.title || 'Untitled Post',
                    excerpt: p.excerpt || '',
                    category: p.category || 'Content',
                    cat_key: toCatKey(p),
                    img_class: p.img_class,
                    hero_image: p.hero_image || '',
                    published_at: p.published_at || '',
                    author: {
                        name: relatedAuthor,
                        initials: (p.author && p.author.initials) || initials(relatedAuthor),
                        avatar_gradient: (p.author && p.author.avatar_gradient) || 'linear-gradient(135deg,#6600cc,#0000cc)'
                    }
                };
            })
        };
        return normalized;
    }

    function applySeo(post) {
        var robotsMeta = document.getElementById('post-robots') || document.querySelector('meta[name="robots"]');
        if (robotsMeta) {
            robotsMeta.setAttribute('content', 'index,follow');
        }

        document.title = (post.seo_title || post.title) + ' | Activo Medical Marketing';

        var metaDesc = document.getElementById('post-meta-desc');
        if (metaDesc) {
            metaDesc.setAttribute('content', post.meta_description || post.excerpt || post.title);
        }

        var canonicalHref = 'https://activomedical.com/blog/' + encodeURIComponent(String(post.slug || '').trim());
        var canonical = document.getElementById('post-canonical');
        if (canonical) canonical.setAttribute('href', canonicalHref);

        var hreflangEn = document.getElementById('post-hreflang-en');
        if (hreflangEn) hreflangEn.setAttribute('href', canonicalHref);

        var hreflangDefault = document.getElementById('post-hreflang-default');
        if (hreflangDefault) hreflangDefault.setAttribute('href', canonicalHref);

        var ogTitle = document.getElementById('post-og-title');
        if (ogTitle) ogTitle.setAttribute('content', (post.seo_title || post.title) + ' | Activo Medical Marketing');

        var ogDesc = document.getElementById('post-og-desc');
        if (ogDesc) ogDesc.setAttribute('content', post.meta_description || post.excerpt || post.title);

        var ogUrl = document.getElementById('post-og-url');
        if (ogUrl) ogUrl.setAttribute('content', canonicalHref);

        var ogType = document.getElementById('post-og-type');
        if (ogType) ogType.setAttribute('content', 'article');

        var socialImage = String(post.social_image || post.hero_image || '').trim() || 'https://activomedical.com/Assets/Images/agencia%20de%20marketing%20para%20profesionales%20de%20la%20salud.jpg';

        var ogImage = document.getElementById('post-og-image');
        if (ogImage) ogImage.setAttribute('content', socialImage);

        var twitterCard = document.getElementById('post-twitter-card');
        if (twitterCard) twitterCard.setAttribute('content', 'summary_large_image');

        var twitterTitle = document.getElementById('post-twitter-title');
        if (twitterTitle) twitterTitle.setAttribute('content', (post.seo_title || post.title) + ' | Activo Medical Marketing');

        var twitterDesc = document.getElementById('post-twitter-desc');
        if (twitterDesc) twitterDesc.setAttribute('content', post.meta_description || post.excerpt || post.title);

        var twitterImage = document.getElementById('post-twitter-image');
        if (twitterImage) twitterImage.setAttribute('content', socialImage);

        // If SSR already injected the schema for this exact slug, skip re-injection
        // to avoid a duplicate-canonical flicker that confuses crawlers.
        var existing = document.getElementById('postSchemaJsonLd');
        var ssrSlug = window.__CMS_SSR_POST__ && window.__CMS_SSR_POST__.slug;
        if (existing && ssrSlug && ssrSlug === post.slug) {
            return;
        }
        if (existing) existing.remove();

        if (!post.slug) return;

        var authorName = (post.author && post.author.name) || 'Activo Team';

        var schemaToUse = post.schema_jsonld || {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.seo_title || post.title,
            description: post.meta_description || post.excerpt || post.title,
            datePublished: post.published_at || undefined,
            dateModified: post.published_at || undefined,
            author: {
                '@type': 'Person',
                name: authorName,
                url: 'https://activomedical.com/blog/'
            },
            image: [
                {
                    '@type': 'ImageObject',
                    url: socialImage,
                    width: 1200,
                    height: 630
                }
            ],
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonicalHref
            },
            publisher: {
                '@type': 'Organization',
                name: 'Activo Medical Marketing',
                url: 'https://activomedical.com/',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://activomedical.com/Assets/Logos/activo-logo-white.png',
                    width: 130,
                    height: 38
                }
            }
        };

        var normalizedSchema = normalizeSchemaForOutput(schemaToUse, canonicalHref);
        var newScript = document.createElement('script');
        newScript.type = 'application/ld+json';
        newScript.id = 'postSchemaJsonLd';
        newScript.textContent = typeof normalizedSchema === 'string' ? normalizedSchema : JSON.stringify(normalizedSchema);
        document.head.appendChild(newScript);
    }

    /* ── RENDER POST ────────────────────────────────────────────────── */
    function renderPost(post) {
        // Meta + SEO fields
        applySeo(post);

        // Hero fields
        var catTag = document.getElementById('post-cat-tag');
        if (catTag) {
            catTag.textContent = post.category;
            catTag.className = 'blog-cat-tag blog-cat--' + (post.cat_key || 'ai');
            var autoStyle = catAutoStyle(post.cat_key || 'ai');
            if (autoStyle) {
                var m = autoStyle.match(/background:([^;]+);color:([^;"]+)/);
                if (m) { catTag.style.background = m[1]; catTag.style.color = m[2]; }
            }
        }
        setText('post-title', post.title);
        setText('post-excerpt', post.excerpt || '');
        setText('post-author-name', post.author.name);
        setText('post-date', fmt(post.published_at));
        setText('post-read-time', post.read_time + ' min read');

        var av = document.getElementById('post-author-av');
        if (av) {
            av.textContent = post.author.initials;
            av.style.background = post.author.avatar_gradient || 'linear-gradient(135deg,#6600cc,#0000cc)';
        }

        // Hero image
        var heroImg = document.getElementById('post-hero-image');
        if (heroImg) {
            if (post.hero_image) {
                heroImg.innerHTML = '<img src="' + esc(post.hero_image) + '" alt="' + esc(post.title) + '" loading="eager" fetchpriority="high">';
            } else {
                heroImg.innerHTML = '<div class="post-hero-image-placeholder"></div>';
            }
        }

        // Article body
        var article = document.getElementById('postArticle');
        if (article) {
            var tags = (post.tags || []).map(function (t) {
                // Decode any HTML entities (e.g. &nbsp;) that may have been saved in tag text
                var decoded = t.replace(/&nbsp;/gi, ' ')
                               .replace(/&amp;/gi, '&')
                               .replace(/&lt;/gi, '<')
                               .replace(/&gt;/gi, '>')
                               .replace(/&quot;/gi, '"')
                               .replace(/&#(\d+);/g, function(_, n) { return String.fromCharCode(n); })
                               .trim();
                return '<a href="/blog" class="post-tag">' + esc(decoded) + '</a>';
            }).join('');

            article.innerHTML =
                '<div class="post-body" id="postBody">' + post.body_html + '</div>' +
                (tags ? '<div class="post-tags">' + tags + '</div>' : '');
        }

        // Author card
        var authorCard = document.getElementById('postAuthorCard');
        if (authorCard) {
            authorCard.innerHTML =
                '<div class="post-author-card-av" style="background:' + esc(post.author.avatar_gradient || 'linear-gradient(135deg,#6600cc,#0000cc)') + '">' +
                    esc(post.author.initials) +
                '</div>' +
                '<div class="post-author-card-info">' +
                    '<span class="post-author-card-label">Written by</span>' +
                    '<div class="post-author-card-name">' + esc(post.author.name) + '</div>' +
                    (post.author.bio ? '<p class="post-author-card-bio">' + esc(post.author.bio) + '</p>' : '') +
                '</div>';
        }

        // Related posts
        renderRelated(post.related || []);

        // TOC
        buildToc();

        // Share buttons
        initShare(post.title);
    }

    function setText(id, val) {
        var el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    function esc(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function absolutizeUrl(value, origin) {
        var str = String(value || '').trim();
        if (!str) return str;
        if (/^https?:\/\//i.test(str)) return str;
        if (str.indexOf('//') === 0) return 'https:' + str;
        if (str.indexOf('/') === 0) {
            try {
                return new URL(str, origin).toString();
            } catch (_) {
                return str;
            }
        }
        return str;
    }

    function absolutizeSchemaUrls(input, origin) {
        if (Array.isArray(input)) {
            return input.map(function (item) { return absolutizeSchemaUrls(item, origin); });
        }

        if (!input || typeof input !== 'object') return input;

        var out = {};
        Object.keys(input).forEach(function (key) {
            var value = input[key];
            if ((key === 'url' || key === '@id') && typeof value === 'string') {
                out[key] = absolutizeUrl(value, origin);
            } else {
                out[key] = absolutizeSchemaUrls(value, origin);
            }
        });
        return out;
    }

    function normalizeSchemaForOutput(schema, origin) {
        if (!schema) return schema;

        if (typeof schema === 'string') {
            try {
                var parsed = JSON.parse(schema);
                return absolutizeSchemaUrls(parsed, origin);
            } catch (_) {
                return schema;
            }
        }

        if (typeof schema === 'object') {
            return absolutizeSchemaUrls(schema, origin);
        }

        return schema;
    }

    /* ── RELATED POSTS ──────────────────────────────────────────────── */
    function renderRelated(posts) {
        if (!posts.length) return;
        var section = document.getElementById('postRelated');
        var grid    = document.getElementById('postRelatedGrid');
        if (!section || !grid) return;

        grid.innerHTML = posts.map(function (p) {
            return '<article class="blog-card">' +
                '<a href="/blog/' + esc(p.slug) + '" class="blog-card-image-link">' +
                    (p.hero_image
                        ? '<img src="' + esc(p.hero_image) + '" alt="' + esc(p.title) + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;">'
                        : '<div class="blog-img-placeholder ' + (p.img_class || 'blog-img--ai') + '">' +
                            '<svg class="blog-img-icon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>' +
                          '</div>') +
                '</a>' +
                '<div class="blog-card-body">' +
                    '<span class="blog-cat-tag blog-cat--' + esc(p.cat_key) + '"' + catAutoStyle(p.cat_key) + '>' + esc(p.category) + '</span>' +
                    '<h3 class="blog-card-title"><a href="/blog/' + esc(p.slug) + '">' + esc(p.title) + '</a></h3>' +
                    '<p class="blog-card-excerpt">' + esc(p.excerpt) + '</p>' +
                    '<div class="blog-card-meta">' +
                        '<div class="blog-author-av" style="background:' + esc(p.author.avatar_gradient) + '">' + esc(p.author.initials) + '</div>' +
                        '<div class="blog-author-info">' +
                            '<span class="blog-author-name">' + esc(p.author.name) + '</span>' +
                            '<span class="blog-meta-date">' + fmt(p.published_at) + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</article>';
        }).join('');

        section.style.display = '';
    }

    /* ── BUILD TOC ──────────────────────────────────────────────────── */
    function buildToc() {
        var body = document.getElementById('postBody');
        var nav  = document.getElementById('postTocNav');
        if (!body || !nav) return;

        var headings = body.querySelectorAll('h2, h3, h4');
        if (!headings.length) return;

        var items = [];
        headings.forEach(function (h) {
            // Ensure each heading has an id
            if (!h.id) {
                h.id = slug(h.textContent);
            }
            items.push({ id: h.id, text: h.textContent, tag: h.tagName });
        });

        nav.innerHTML = items.map(function (item) {
            var depthClass = item.tag === 'H3' ? 'h3' : (item.tag === 'H4' ? 'h4' : '');
            return '<a href="#' + item.id + '" class="post-toc-link ' + depthClass + '" data-target="' + item.id + '">' +
                item.text +
            '</a>';
        }).join('');

        // smooth scroll
        nav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                var target = document.getElementById(a.dataset.target);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        initScrollSpy(items);
    }

    /* ── SCROLL SPY ─────────────────────────────────────────────────── */
    function initScrollSpy(items) {
        var links = document.querySelectorAll('.post-toc-link');
        if (!links.length) return;

        var offset = 120;

        function update() {
            var scrollY = window.scrollY + offset;
            var activeId = items[0] ? items[0].id : null;

            items.forEach(function (item) {
                var el = document.getElementById(item.id);
                if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
                    activeId = item.id;
                }
            });

            links.forEach(function (link) {
                link.classList.toggle('active', link.dataset.target === activeId);
            });
        }

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ── SHARE BUTTONS ──────────────────────────────────────────────── */
    function initShare(title) {
        var url = window.location.href;

        // Copy link
        var copyBtn = document.getElementById('shareCopy');
        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                navigator.clipboard.writeText(url).then(function () {
                    copyBtn.classList.add('copied');
                    setTimeout(function () { copyBtn.classList.remove('copied'); }, 2000);
                });
            });
        }

        // X / Twitter
        var xBtn = document.getElementById('shareX');
        if (xBtn) {
            xBtn.href = 'https://x.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url);
        }

        // LinkedIn
        var liBtn = document.getElementById('shareLinkedIn');
        if (liBtn) {
            liBtn.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
        }
    }

    function renderPostNotFound() {
        document.title = 'Post not found | Activo Medical Marketing';
        var article = document.getElementById('postArticle');
        var related = document.getElementById('postRelated');
        var authorCard = document.getElementById('postAuthorCard');
        if (related) related.style.display = 'none';
        if (authorCard) authorCard.innerHTML = '';

        setText('post-cat-tag', 'Not found');
        setText('post-title', 'This article is not available');
        setText('post-excerpt', 'The article may be unpublished, moved, or the URL is incorrect.');
        setText('post-author-name', '');
        setText('post-date', '');
        setText('post-read-time', '');

        if (article) {
            article.innerHTML = '<div class="post-body"><p>We could not find this article.</p><p><a href="/blog">Back to blog</a></p></div>';
        }
    }

    function renderConfigError(message) {
        var article = document.getElementById('postArticle');
        var related = document.getElementById('postRelated');
        var authorCard = document.getElementById('postAuthorCard');
        if (related) related.style.display = 'none';
        if (authorCard) authorCard.innerHTML = '';

        setText('post-cat-tag', 'Configuration');
        setText('post-title', 'CMS configuration error');
        setText('post-excerpt', message);
        setText('post-author-name', '');
        setText('post-date', '');
        setText('post-read-time', '');

        if (article) {
            article.innerHTML = '<div class="post-body"><p>' + esc(message) + '</p></div>';
        }
    }

    /* ── FETCH & BOOTSTRAP ──────────────────────────────────────────── */
    function boot() {
        var querySlug = (new URLSearchParams(window.location.search).get('slug') || '').trim();

        function resolveSlugFromPathname(pathname) {
            var parts = String(pathname || '').replace(/\/$/, '').split('/').filter(Boolean);
            if (!parts.length) return '';

            var blocked = {
                blog: true,
                post: true,
                'post.html': true,
                '_blog-post': true
            };

            if (parts[0] === 'blog' && parts.length > 1) {
                var candidate = String(parts[1] || '').trim();
                return blocked[candidate] ? '' : candidate;
            }

            var last = String(parts[parts.length - 1] || '').trim();
            return blocked[last] ? '' : last;
        }

        var postSlug = querySlug || resolveSlugFromPathname(window.location.pathname);

        console.log('[blog-post] href:', window.location.href);
        console.log('[blog-post] pathname:', window.location.pathname);
        console.log('[blog-post] resolved slug:', postSlug);

        var isLocal = ['localhost', '127.0.0.1', '[::1]'].indexOf(window.location.hostname) !== -1 ||
                      window.location.hostname.endsWith('.local') ||
                      window.location.protocol === 'file:';

        // Demo is ONLY for localhost with no slug
        if (isLocal && !postSlug) {
            console.log('[blog-post] local dev, no slug → demo');
            renderPost(DEMO_POST);
            return;
        }

        // Production with no slug = not-found (never demo)
        if (!postSlug) {
            console.warn('[blog-post] no slug detected → not found');
            renderPostNotFound();
            return;
        }

        var ssrPost = window.__CMS_SSR_POST__;
        if (ssrPost && typeof ssrPost === 'object') {
            console.log('[blog-post] using SSR post payload for slug:', postSlug);
            var ssrNormalized = normalizePost(ssrPost);
            if (!ssrNormalized.slug) ssrNormalized.slug = postSlug;
            renderPost(ssrNormalized);
            return;
        }

        if (!window.CMSClient || typeof window.CMSClient.fetchPostBySlug !== 'function') {
            console.error('[blog-post] CMSClient not available');
            renderConfigError('CMS client not loaded.');
            return;
        }

        console.log('[blog-post] fetching from CMS:', postSlug);
        window.CMSClient.fetchPostBySlug(postSlug)
            .then(function (res) {
                console.log('[blog-post] CMS response:', res);
                if (!res.ok && res.notFound) {
                    renderPostNotFound();
                    return;
                }
                var payload = extractPostPayload(res.data || {});
                var normalized = normalizePost(payload || {});
                if (!normalized.slug) normalized.slug = postSlug;
                renderPost(normalized);
            })
            .catch(function (err) {
                console.error('[blog-post] CMS fetch error:', err);
                var msg = (err && err.message) ? err.message : 'Failed to load this article from CMS.';
                if (err && (err.code === 'CMS_TOKEN_INVALID' || err.code === 'CMS_TOKEN_MISSING' || err.code === 'CMS_PROJECT_MISSING' || err.code === 'CMS_API_MISSING')) {
                    renderConfigError(msg);
                    return;
                }
                renderPostNotFound();
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();
