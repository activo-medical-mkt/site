(function () {
    if (window.location.hostname === 'www.activomedical.com') {
        var target = 'https://activomedical.com' + window.location.pathname + window.location.search + window.location.hash;
        window.location.replace(target);
    }
})();

document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        });

        // Mobile nav menu toggle
        (function () {
            var toggle = document.getElementById('navMenuToggle');
            var menu = document.getElementById('mobileNavMenu');
            if (!toggle || !menu) return;

            function setOpen(isOpen) {
                toggle.setAttribute('aria-expanded', String(isOpen));
                menu.hidden = !isOpen;
            }

            toggle.addEventListener('click', function () {
                var isOpen = toggle.getAttribute('aria-expanded') === 'true';
                setOpen(!isOpen);
            });

            menu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () { setOpen(false); });
            });

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') setOpen(false);
            });
        })();

        // How-it-works tabs � transitions + auto-rotate
        (function() {
            const btns   = [...document.querySelectorAll('.how-tab-btn')];
            const panels = document.querySelectorAll('.how-panel');
            const DURATION = 4000;
            let timer, paused = false;

            function activate(btn) {
                if (!btn) return;
                btns.forEach(b => b.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const panel = document.getElementById('how-panel-' + btn.dataset.tab);
                if (panel) panel.classList.add('active');
            }

            function next() {
                if (paused || !btns.length) return;
                const cur = btns.findIndex(b => b.classList.contains('active'));
                activate(btns[(cur + 1) % btns.length]);
            }

            function restartTimer() {
                clearInterval(timer);
                timer = setInterval(next, DURATION);
            }

            btns.forEach(btn => {
                btn.addEventListener('click', () => { activate(btn); restartTimer(); });
            });

            const tabNav = document.querySelector('.how-tabs-nav');
            if (tabNav) {
                tabNav.addEventListener('mouseenter', () => {
                    paused = true;
                    btns.forEach(b => b.classList.add('paused'));
                });
                tabNav.addEventListener('mouseleave', () => {
                    paused = false;
                    btns.forEach(b => b.classList.remove('paused'));
                    restartTimer();
                });
            }

            if (btns.length) restartTimer();
        })();

        // Compliance SVG scroll-in animations
        (function() {
            // --- Compliance Check (left/dark half) ---
            const compSvg = document.getElementById('compliance-svg');
            if (compSvg) {
                let firedComp = false;
                const obsComp = new IntersectionObserver(function(entries) {
                    if (firedComp || !entries[0].isIntersecting) return;
                    firedComp = true;
                    obsComp.disconnect();

                    // Animate score arc
                    const arc = document.getElementById('score-arc');
                    if (arc) arc.style.strokeDashoffset = '32';

                    // Count up score number 0 ? 83
                    const numEl = document.getElementById('score-num');
                    if (numEl) {
                        let s = null;
                        const run = function(ts) {
                            if (!s) s = ts;
                            const p = Math.min((ts - s) / 1500, 1);
                            numEl.textContent = Math.round((1 - Math.pow(1 - p, 3)) * 83);
                            if (p < 1) requestAnimationFrame(run);
                        };
                        requestAnimationFrame(run);
                    }

                    // Stagger compliance rows
                    document.querySelectorAll('#compliance-svg .svg-row').forEach(function(el, i) {
                        setTimeout(function() { el.classList.add('sv-vis'); }, 300 + i * 250);
                    });

                }, { threshold: 0.5 });
                obsComp.observe(compSvg);
            }

            // --- Magic Fix (right/light half) ---
            const magicSvg = document.getElementById('magic-svg');
            if (magicSvg) {
                let firedMagic = false;
                const obsMagic = new IntersectionObserver(function(entries) {
                    if (firedMagic || !entries[0].isIntersecting) return;
                    firedMagic = true;
                    obsMagic.disconnect();

                    // Animate progress bar width 0 ? 310
                    const pb = document.getElementById('prog-bar');
                    if (pb) {
                        let s = null;
                        const run = function(ts) {
                            if (!s) s = ts;
                            const p = Math.min((ts - s) / 1100, 1);
                            pb.setAttribute('width', Math.round((1 - Math.pow(1 - p, 2)) * 310));
                            if (p < 1) requestAnimationFrame(run);
                        };
                        setTimeout(function() { requestAnimationFrame(run); }, 300);
                    }

                    // Stagger magic fix rows
                    document.querySelectorAll('#magic-svg .svg-row').forEach(function(el, i) {
                        setTimeout(function() { el.classList.add('sv-vis'); }, 500 + i * 220);
                    });

                    // Score badge pop-in
                    const badge = document.querySelector('#magic-svg .svg-badge-g');
                    if (badge) setTimeout(function() { badge.classList.add('sv-vis'); }, 500 + 4 * 220 + 200);

                }, { threshold: 0.5 });
                obsMagic.observe(magicSvg);
            }
        })();

        // Stats background video � lazy load + slow playback
        (function() {
            const v = document.querySelector('.stats-bg-video');
            if (!v) return;
            // Skip video on mobile or reduced-motion
            // Read innerWidth once here (before any DOM mutations) to avoid forced reflow
            var vw = window.innerWidth;
            if (vw < 900 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                v.remove();
                return;
            }
            const observer = new IntersectionObserver(function(entries) {
                if (entries[0].isIntersecting) {
                    const source = v.querySelector('source[data-src]');
                    if (source) {
                        source.src = source.dataset.src;
                        v.load();
                        v.playbackRate = 0.35;
                        v.play().catch(function(){});
                    }
                    observer.disconnect();
                }
            }, { rootMargin: '200px' });
            observer.observe(v);
            v.addEventListener('timeupdate', function() {
                if (v.duration && v.currentTime >= v.duration - 0.3) {
                    v.currentTime = 0.05;
                }
            });
        })();

        // Liquid glass nav on scroll
        (function() {
            const nav = document.querySelector('nav');
            if (!nav) return;
            let ticking = false;
            const darkSections = document.querySelectorAll('[data-nav-dark]');
            const onScroll = () => {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(() => {
                    nav.classList.toggle('scrolled', window.scrollY > 20);
                    // Replaced elementsFromPoint (forced reflow) with getBoundingClientRect loop
                    let isDark = false;
                    for (const s of darkSections) {
                        const r = s.getBoundingClientRect();
                        if (r.top <= 70 && r.bottom >= 0) { isDark = true; break; }
                    }
                    nav.classList.toggle('nav-dark', isDark);
                    ticking = false;
                });
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        })();

        // Auto-redirect removed: users should be able to view the landing page freely.

        // Quick Actions popup
        (function() {
            const input = document.getElementById('chatInputFake');
            const popup = document.getElementById('quickActions');
            const messages = document.querySelector('.chat-messages');
            if (!input || !popup) return;

            const aiReplies = {
                'Find my biggest quick-win opportunities': 'Running analysis across all your pages... Found <span class="stat">7 quick wins</span>. Top pick: <strong>/blog/seo-checklist</strong> — position <span class="stat">#11</span> with <span class="stat">3.4K impressions/mo</span>. One targeted H1 rewrite could push it to page 1.',
                'Audit my top 5 pages and suggest improvements': 'Audited your top 5 pages. Key finding: 3 of 5 have <span class="stat">title tag keyword mismatch</span>. Your highest-traffic page is missing a meta description entirely. Want me to draft fixes for all five?',
                'Generate a full content brief for my best opportunity': 'Generating brief for <strong>/services/digital-strategy</strong>... Done ✅ Includes: target keyword cluster, recommended H2 structure, word count (<span class="stat">1,400–1,800</span>), competitor gap analysis, and 3 internal linking recommendations.',
                'Which of my pages has the most untapped potential?': '<strong>/services/content-strategy</strong> is at position <span class="stat">#8</span> for 3 high-intent keywords. It gets <span class="stat">1.2K impressions/mo</span> but only a <span class="stat">2.1% CTR</span>. A title tag update and one strong H2 could push it into the top 3.',
                'What keywords am I almost ranking for?': 'Found <span class="stat">14 keywords</span> in positions 8–15 with over 500 monthly impressions. Top opportunity: <strong>"content strategy agency"</strong> — position <span class="stat">#12</span>, <span class="stat">1.8K impressions/mo</span>, low competition.',
                'Show me my traffic trend over the last 3 months': 'Clicks are up <span class="stat">+18%</span> month-over-month. Impressions grew <span class="stat">+34%</span> but CTR dipped slightly — suggesting rankings improved but titles need work. Biggest mover: organic blog traffic, <span class="stat">+42%</span>.'
            };

            function openPopup() {
                input.classList.add('active');
                popup.classList.add('open');
                // re-trigger item animations without forced sync layout
                const items = [...popup.querySelectorAll('.qa-item')];
                items.forEach(el => { el.style.animation = 'none'; });
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        items.forEach((el, i) => {
                            el.style.animation = '';
                            el.style.animationDelay = (0.03 + i * 0.04) + 's';
                        });
                    });
                });
            }

            function closePopup() {
                input.classList.remove('active');
                popup.classList.remove('open');
            }

            input.addEventListener('click', (e) => {
                e.stopPropagation();
                popup.classList.contains('open') ? closePopup() : openPopup();
            });

            document.addEventListener('click', (e) => {
                if (!popup.contains(e.target) && e.target !== input) closePopup();
            });

            popup.querySelectorAll('.qa-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const prompt = item.dataset.prompt;
                    input.textContent = prompt;
                    closePopup();

                    // Add user message
                    const userMsg = document.createElement('div');
                    userMsg.className = 'chat-msg user';
                    userMsg.innerHTML = `
                        <div class="chat-avatar user-av">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <div class="chat-bubble">${prompt}</div>`;
                    messages.appendChild(userMsg);
                    messages.scrollTop = messages.scrollHeight;

                    // Typing indicator
                    const typing = document.createElement('div');
                    typing.className = 'chat-msg ai';
                    typing.innerHTML = `
                        <div class="chat-avatar ai">S</div>
                        <div class="chat-bubble" style="opacity:0.5;letter-spacing:2px;font-size:16px">&hellip;</div>`;
                    messages.appendChild(typing);
                    messages.scrollTop = messages.scrollHeight;

                    // AI response
                    setTimeout(() => {
                        typing.remove();
                        const aiMsg = document.createElement('div');
                        aiMsg.className = 'chat-msg ai';
                        aiMsg.innerHTML = `
                            <div class="chat-avatar ai">S</div>
                            <div class="chat-bubble">${aiReplies[prompt] || 'Analysing your data...'}</div>`;
                        messages.appendChild(aiMsg);
                        messages.scrollTop = messages.scrollHeight;
                        input.textContent = 'Ask anything about your data...';
                        input.classList.remove('active');
                    }, 1100);
                });
            });
        })();
        (function() {
            const phrases = [
                'What would it tell you?',
                'What would you ask it?',
                'What would it warn you?',
                'What would you change?'
            ];
            let idx = 0;
            const el = document.querySelector('.hero-subline-text');
            if (!el) return;
            setInterval(() => {
                el.classList.add('out');
                setTimeout(() => {
                    idx = (idx + 1) % phrases.length;
                    el.textContent = phrases[idx];
                    el.classList.remove('out');
                    // re-trigger rollIn without forced sync layout
                    el.style.animation = 'none';
                    requestAnimationFrame(() => {
                        el.style.animation = '';
                    });
                }, 320);
            }, 3200);
        })();

        /* Reviews horizontal slider — dot sync */
        (function(){
            const grid = document.querySelector('.reviews-grid');
            const dots = document.querySelectorAll('.reviews-dots .dot');
            if (!grid || !dots.length) return;
            let ticking = false;
            const firstCard = grid.querySelector('.review-card');
            if (!firstCard) return;
            let cardWidth = firstCard.offsetWidth + 16;

            window.addEventListener('resize', function(){
                cardWidth = firstCard.offsetWidth + 16;
            }, { passive: true });

            grid.addEventListener('scroll', function(){
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(function(){
                    const scrollLeft = grid.scrollLeft;
                    const idx = Math.round(scrollLeft / cardWidth);
                    dots.forEach(function(d, i){ d.classList.toggle('active', i === idx); });
                    ticking = false;
                });
            });
            dots.forEach(function(dot, i){
                dot.addEventListener('click', function(){
                    grid.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                });
            });
        })();

        /* CONTACT FORM */
        (function(){
            var form = document.getElementById('contactForm');
            var success = document.getElementById('cfSuccess');
            var error = document.getElementById('cfError');
            var startedAt = document.getElementById('cf-started-at');
            var sourcePage = document.getElementById('cf-source-page');
            if (!form || !success) return;

            if (startedAt) {
                startedAt.value = String(Date.now());
            }

            if (sourcePage) {
                sourcePage.value = window.location.href;
            }

            function showError(message) {
                if (!error) {
                    alert(message);
                    return;
                }
                error.textContent = message;
                error.removeAttribute('hidden');
            }

            function clearError() {
                if (!error) return;
                error.textContent = '';
                error.setAttribute('hidden', 'hidden');
            }

            // Use Formspree as primary to avoid Cloudflare edge 403 on /api/contact.
            var primaryEndpoint = 'https://formspree.io/f/mwvryjnv';

            function buildParams() {
                var fd = new FormData(form);
                var params = new URLSearchParams();
                fd.forEach(function(value, key) { params.append(key, value); });
                return params;
            }

            function postForm(endpoint) {
                return fetch(endpoint, {
                    method: 'POST',
                    body: buildParams(),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    return res.json().catch(function(){
                        return {};
                    }).then(function(payload){
                        return { ok: res.ok, status: res.status, payload: payload };
                    });
                });
            }

            form.addEventListener('submit', function(e){
                e.preventDefault();
                clearError();

                if (window.location.protocol === 'file:') {
                    showError('This form cannot run from file://. Open the site over http/https (local server or deployed URL).');
                    return;
                }

                if (!form.reportValidity()) {
                    return;
                }

                var btn = form.querySelector('.cf-submit-btn');
                var originalText = btn.textContent;
                btn.disabled = true;
                btn.textContent = 'Sending…';

                postForm(primaryEndpoint).then(function(result){
                    if (result.ok) {
                        form.reset();
                        form.style.display = 'none';
                        success.removeAttribute('hidden');
                    } else {
                        btn.disabled = false;
                        btn.textContent = originalText;
                        showError(result.payload && result.payload.error ? result.payload.error : 'Something went wrong. Please try again or email us directly.');
                    }
                }).catch(function(){
                    btn.disabled = false;
                    btn.textContent = originalText;
                    showError('Something went wrong. Please check your connection and try again.');
                });
            });
        })();

        /* ── HOMEPAGE BLOG PREVIEW ── */
        (function () {
            var grid = document.getElementById('hmBlogGrid');
            if (!grid) return;

            var KNOWN_KEYS = { ai: 1, seo: 1, strategy: 1, data: 1, content: 1, product: 1, automation: 1 };
            var AUTO_PALETTE = [
                { bg: 'rgba(234,88,12,0.1)',  color: '#ea580c' },
                { bg: 'rgba(6,182,212,0.1)',  color: '#0891b2' },
                { bg: 'rgba(168,85,247,0.1)', color: '#9333ea' },
                { bg: 'rgba(234,179,8,0.1)',  color: '#ca8a04' },
                { bg: 'rgba(236,72,153,0.1)', color: '#db2777' },
                { bg: 'rgba(20,184,166,0.1)', color: '#0f766e' },
                { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' },
                { bg: 'rgba(245,158,11,0.1)', color: '#d97706' }
            ];

            function hashKey(key) {
                var h = 0;
                for (var i = 0; i < key.length; i++) h = (Math.imul(31, h) + key.charCodeAt(i)) | 0;
                return Math.abs(h);
            }

            function esc(str) {
                return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            }

            function fmt(dateStr) {
                var d = new Date(dateStr);
                if (isNaN(d.getTime())) return dateStr || '';
                return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            }

            function toCatKey(post) {
                var label = String(post.category || '').toLowerCase().trim();
                if (label === 'ai & automation' || label === 'ai and automation' || label === 'ai') return 'ai';
                if (label === 'automation') return 'automation';
                if (label === 'data & analytics' || label === 'data and analytics' || label === 'analytics') return 'data';
                if (label === 'seo') return 'seo';
                if (label === 'strategy') return 'strategy';
                if (label === 'content') return 'content';
                if (label === 'product') return 'product';
                return String(post.category || 'content').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-') || 'content';
            }

            function knownCatStyle(key) {
                var map = {
                    ai:         { bg: 'rgba(0,0,204,0.09)',   color: '#3355ff' },
                    seo:        { bg: 'rgba(0,102,204,0.09)', color: '#0066cc' },
                    strategy:   { bg: 'rgba(5,150,105,0.1)',  color: '#059669' },
                    data:       { bg: 'rgba(220,38,38,0.09)', color: '#dc2626' },
                    content:    { bg: 'rgba(102,0,204,0.1)',  color: '#6600cc' },
                    product:    { bg: 'rgba(5,150,105,0.09)', color: '#0d9488' },
                    automation: { bg: 'rgba(234,88,12,0.1)',  color: '#ea580c' }
                };
                return map[key] || AUTO_PALETTE[hashKey(key) % AUTO_PALETTE.length];
            }

            function avatarGrad(i) {
                var g = ['linear-gradient(135deg,#6600cc,#0000cc)', 'linear-gradient(135deg,#0000cc,#0ea5e9)', 'linear-gradient(135deg,#059669,#0ea5e9)', 'linear-gradient(135deg,#dc2626,#f59e0b)', 'linear-gradient(135deg,#6600cc,#9333ea)'];
                return g[i % g.length];
            }

            function initials(name) {
                var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
                if (!parts.length) return 'AM';
                if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
                return (parts[0][0] + parts[1][0]).toUpperCase();
            }

            function phClass(key) {
                var known = ['ai', 'seo', 'strategy', 'data', 'content', 'product', 'automation'];
                return 'hm-blog-ph--' + (known.indexOf(key) !== -1 ? key : 'default');
            }

            function cardHtml(post, i) {
                var key = toCatKey(post);
                var catSty = knownCatStyle(key);
                var thumbHtml = post.hero_image
                    ? '<img src="' + esc(post.hero_image) + '" alt="' + esc(post.title) + '" loading="lazy">'
                    : '<div class="hm-blog-thumb-placeholder ' + phClass(key) + '"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>';
                var authorName = (post.author && post.author.name) || post.author_name || 'Activo Team';
                var authorInits = (post.author && post.author.initials) || initials(authorName);
                var grad = (post.author && post.author.avatar_gradient) || avatarGrad(i);

                return '<a href="/blog/' + esc(String(post.slug || '').trim()) + '" class="hm-blog-card">'
                    + '<div class="hm-blog-thumb">' + thumbHtml + '</div>'
                    + '<div class="hm-blog-body">'
                    + '<span class="hm-blog-cat" style="background:' + catSty.bg + ';color:' + catSty.color + '">' + esc(post.category || 'Content') + '</span>'
                    + '<p class="hm-blog-title">' + esc(post.title || 'Untitled') + '</p>'
                    + (post.excerpt ? '<p class="hm-blog-excerpt">' + esc(post.excerpt) + '</p>' : '')
                    + '<div class="hm-blog-meta">'
                    + '<div class="hm-blog-av" style="background:' + grad + '">' + esc(authorInits) + '</div>'
                    + '<div><div class="hm-blog-author">' + esc(authorName) + '</div><div class="hm-blog-date">' + fmt(post.published_at) + '</div></div>'
                    + '</div>'
                    + '</div>'
                    + '</a>';
            }

            function isPublished(post) {
                var raw = post.status || post.state || post.publish_status || post.visibility;
                if (raw === undefined || raw === null || raw === '') return true;
                var s = String(raw).toLowerCase();
                return s === 'published' || s === 'live' || s === 'public';
            }

            function sortNewest(posts) {
                return posts.slice().sort(function (a, b) {
                    return (new Date(b.published_at || b.created_at || 0).getTime() || 0)
                         - (new Date(a.published_at || a.created_at || 0).getTime() || 0);
                });
            }

            function parsePayload(payload) {
                if (Array.isArray(payload)) return payload;
                if (payload && Array.isArray(payload.posts)) return payload.posts;
                if (payload && payload.data) {
                    if (Array.isArray(payload.data)) return payload.data;
                    if (Array.isArray(payload.data.posts)) return payload.data.posts;
                }
                return [];
            }

            function render(posts) {
                var top3 = sortNewest(posts.filter(isPublished).filter(function (p) { return !!p.slug; })).slice(0, 3);
                if (!top3.length) return; // leave skeletons; real env will populate
                grid.innerHTML = top3.map(cardHtml).join('');
            }

            if (!window.CMSClient || typeof window.CMSClient.fetchPosts !== 'function') return;

            window.CMSClient.fetchPosts(1, 6)
                .then(function (res) {
                    render(parsePayload(res && res.data ? res.data : {}));
                })
                .catch(function () {
                    // Silently keep skeleton cards visible — section stays in DOM
                });
        })();