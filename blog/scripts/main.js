(function () {
    if (window.location.hostname === 'www.activomedical.com') {
        var target = 'https://activomedical.com' + window.location.pathname + window.location.search + window.location.hash;
        window.location.replace(target);
    }
})();

(function () {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var toggle = header.querySelector('.nav-toggle');
    var mobileId = toggle ? toggle.getAttribute('aria-controls') : null;
    var mobileMenu = mobileId ? document.getElementById(mobileId) : null;

    function setMobileOpen(isOpen) {
        if (!toggle || !mobileMenu) return;
        toggle.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.hidden = !isOpen;
    }

    if (toggle && mobileMenu) {
        toggle.addEventListener('click', function () {
            var isOpen = toggle.getAttribute('aria-expanded') === 'true';
            setMobileOpen(!isOpen);
        });

        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { setMobileOpen(false); });
        });
    }

    function closeAllDropdowns() {
        header.querySelectorAll('.nav-dropdown.is-open').forEach(function (dd) {
            dd.classList.remove('is-open');
            var trigger = dd.querySelector('.nav-dropdown-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
    }

    header.querySelectorAll('.nav-dropdown').forEach(function (dd) {
        var trigger = dd.querySelector('.nav-dropdown-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', function (event) {
            event.preventDefault();
            var isOpen = dd.classList.contains('is-open');
            closeAllDropdowns();
            if (!isOpen) {
                dd.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    document.addEventListener('click', function (event) {
        if (!header.contains(event.target)) {
            closeAllDropdowns();
            setMobileOpen(false);
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeAllDropdowns();
            setMobileOpen(false);
        }
    });

    var darkSections = document.querySelectorAll('[data-nav-dark]');
    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 16);

        var isDark = false;
        darkSections.forEach(function (section) {
            if (isDark) return;
            var rect = section.getBoundingClientRect();
            if (rect.top <= 80 && rect.bottom >= 0) isDark = true;
        });
        header.classList.toggle('nav-dark', isDark);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

(function () {
    var yearNode = document.getElementById('fyear');
    if (yearNode) yearNode.textContent = String(new Date().getFullYear());
})();
