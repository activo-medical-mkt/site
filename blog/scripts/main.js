(function () {
    if (window.location.hostname === 'www.activomedical.com') {
        var target = 'https://activomedical.com' + window.location.pathname + window.location.search + window.location.hash;
        window.location.replace(target);
    }
})();

(function () {
    var header = document.querySelector('.site-header');
    if (!header) return;

    // Nav toggle + dropdowns handled by shared-layout.js
    // Only scroll/dark-mode detection is needed here
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
