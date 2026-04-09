(function () {
    'use strict';

    function getCfg() {
        var cfg = window.__CMS_CONFIG__ || {};
        return {
            apiBase: String(cfg.apiBase || '/api/cms/posts').trim(),
            projectId: String(cfg.projectId || '65bb6d01').trim(),
            publicToken: String(cfg.publicToken || '').trim()
        };
    }

    function configError(message, code) {
        var err = new Error(message);
        err.code = code || 'CMS_CONFIG_ERROR';
        return err;
    }

    function assertCfg() {
        var cfg = getCfg();
        if (!cfg.apiBase) throw configError('Missing CMS API URL.', 'CMS_API_MISSING');
        if (!cfg.projectId) throw configError('Missing CMS project ID.', 'CMS_PROJECT_MISSING');
        return cfg;
    }

    function buildApiUrl(pathSuffix) {
        var cfg = assertCfg();
        var base = new URL(cfg.apiBase, window.location.origin);

        if (pathSuffix) {
            var suffix = String(pathSuffix || '').replace(/^\/+/, '');
            base.pathname = base.pathname.replace(/\/+$/, '') + '/' + suffix;
        }

        return base;
    }

    async function request(url) {
        var cfg = assertCfg();

        var headers = {
            'Content-Type': 'application/json'
        };
        if (cfg.publicToken) headers['x-cms-public-token'] = cfg.publicToken;

        var res = await fetch(url, {
            method: 'GET',
            cache: 'no-store',
            headers: headers
        });

        var data = {};
        try {
            data = await res.json();
        } catch (_) {
            data = {};
        }

        if (res.status === 404) {
            return { ok: false, notFound: true, status: 404, data: null };
        }

        if (!res.ok) {
            var msg = (data && data.error) ? data.error : ('CMS request failed (' + res.status + ')');
            var err = new Error(msg);
            err.status = res.status;
            err.code = 'CMS_REQUEST_FAILED';

            if (
                res.status === 401 &&
                (msg.indexOf('CMS public token is required') !== -1 || msg.indexOf('Invalid CMS public token') !== -1)
            ) {
                err.code = 'CMS_TOKEN_INVALID';
            }

            throw err;
        }

        return { ok: true, status: res.status, data: data };
    }

    async function fetchPosts(page, perPage) {
        var cfg = assertCfg();
        var p = page || 1;
        var pp = perPage || 10;

        var url = buildApiUrl();
        url.searchParams.set('projectId', cfg.projectId);
        url.searchParams.set('page', String(p));
        url.searchParams.set('per_page', String(pp));

        return request(url.toString());
    }

    async function fetchPostBySlug(slug) {
        var cfg = assertCfg();
        var safeSlug = encodeURIComponent(String(slug || '').trim());

        var url = buildApiUrl(safeSlug);
        url.searchParams.set('projectId', cfg.projectId);

        return request(url.toString());
    }

    window.CMSClient = {
        fetchPosts: fetchPosts,
        fetchPostBySlug: fetchPostBySlug,
        getConfig: getCfg
    };
})();
