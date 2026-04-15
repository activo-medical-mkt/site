(function () {
  var headerTemplate = [
    '<header class="site-header" id="top">',
    '  <div class="container header-inner">',
    '    <a class="brand" href="/" aria-label="Activo Medical Marketing - Inicio">',
    '      <img src="/Assets/Logos/activo-logo-white.svg" width="130" height="38" alt="Activo Medical Marketing" decoding="async">',
    '    </a>',
    '    <nav class="nav" aria-label="Principal">',
    '      <a href="/#servicios" data-match="home-services">Servicios</a>',
    '      <div class="nav-dropdown" id="dd-loc-shared">',
    '        <button class="nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true">',
    '          Ubicaciones',
    '          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    '        </button>',
    '        <div class="nav-dropdown-menu" role="menu">',
    '          <span class="menu-label">Donde operamos</span>',
    '          <a href="/marketing-medico-tijuana/" role="menuitem" data-match="medico">',
    '            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    '            Marketing Medico Tijuana',
    '          </a>',
    '        </div>',
    '      </div>',
    '      <div class="nav-dropdown" id="dd-esp-shared">',
    '        <button class="nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true">',
    '          Practicas',
    '          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    '        </button>',
    '        <div class="nav-dropdown-menu" role="menu">',
    '          <span class="menu-label">Por especialidad medica</span>',
    '          <a href="/marketing-cirujanos-plasticos-tijuana/" role="menuitem" data-match="plasticos">',
    '            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
    '            Cirujanos Plasticos - Tijuana',
    '          </a>',
    '          <a href="/marketing-dentistas-tijuana/" role="menuitem" data-match="dentistas">',
    '            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/><path d="M9 3v4a2 2 0 0 0 2 2h4"/><path d="M13 3V1"/></svg>',
    '            Dentistas - Tijuana',
    '          </a>',
    '        </div>',
    '      </div>',
    '      <a href="/blog" data-match="blog">Blog</a>',
    '      <a href="/#contacto" data-match="home-contact">Contactar</a>',
    '    </nav>',
    '    <a class="btn btn-primary has-icon" href="https://api.whatsapp.com/send?phone=526647149135" target="_blank" rel="noopener noreferrer">',
    '      <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
    '      Solicitar Asesoria',
    '    </a>',
    '    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="__MOBILE_NAV_ID__" aria-label="Abrir menu">',
    '      <span></span><span></span><span></span>',
    '    </button>',
    '  </div>',
    '  <nav class="mobile-nav" id="__MOBILE_NAV_ID__" aria-label="Menu movil" hidden>',
    '    <a href="/#servicios">Servicios</a>',
    '    <div class="nav-dropdown" id="dd-loc-shared-m">',
    '      <button class="nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true">',
    '        Ubicaciones',
    '        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    '      </button>',
    '      <div class="nav-dropdown-menu" role="menu">',
    '        <a href="/marketing-medico-tijuana/" role="menuitem">Marketing Medico Tijuana</a>',
    '      </div>',
    '    </div>',
    '    <div class="nav-dropdown" id="dd-esp-shared-m">',
    '      <button class="nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true">',
    '        Practicas',
    '        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    '      </button>',
    '      <div class="nav-dropdown-menu" role="menu">',
    '        <a href="/marketing-cirujanos-plasticos-tijuana/" role="menuitem">Cirujanos Plasticos - Tijuana</a>',
    '        <a href="/marketing-dentistas-tijuana/" role="menuitem">Dentistas - Tijuana</a>',
    '      </div>',
    '    </div>',
    '    <a href="/blog">Blog</a>',
    '    <a href="/#contacto">Contactar</a>',
    '    <a class="btn btn-primary" href="https://api.whatsapp.com/send?phone=526647149135" target="_blank" rel="noopener noreferrer">Solicitar Asesoria</a>',
    '  </nav>',
    '</header>'
  ].join('');

  var footerTemplate = [
    '<footer class="site-footer">',
    '  <div class="container footer-grid">',
    '    <div class="footer-brand-col">',
    '      <img src="/Assets/Logos/activo-logo-white.svg" width="130" height="40" alt="Activo Medical Marketing" loading="lazy" decoding="async">',
    '      <p>Agencia especializada en marketing digital para medicos, dentistas y clinicas. Tijuana, Mexico y Latinoamerica.</p>',
    '      <div class="footer-social" aria-label="Redes sociales">',
    '        <a href="https://share.google/NoXnMDix4YjGrSeWL" target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></a>',
    '        <a href="https://www.facebook.com/ActivoMedical/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>',
    '        <a href="https://www.instagram.com/activomedical" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>',
    '        <a href="https://www.linkedin.com/company/activo-medical" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>',
    '        <a href="https://www.pinterest.com/activomedical/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.17 2.587 7.747 6.273 9.195-.087-.777-.166-1.967.034-2.813.18-.765 1.2-5.086 1.2-5.086s-.306-.613-.306-1.52c0-1.424.826-2.488 1.853-2.488.874 0 1.297.656 1.297 1.443 0 .879-.56 2.194-.849 3.414-.242 1.02.51 1.849 1.512 1.849 1.814 0 3.211-1.912 3.211-4.675 0-2.444-1.756-4.153-4.26-4.153-2.903 0-4.607 2.177-4.607 4.428 0 .877.337 1.817.758 2.33a.304.304 0 01.071.292c-.077.318-.25 1.02-.284 1.162-.045.187-.15.226-.344.137-1.279-.596-2.079-2.467-2.079-3.969 0-3.228 2.346-6.195 6.766-6.195 3.553 0 6.314 2.531 6.314 5.912 0 3.527-2.224 6.364-5.312 6.364-1.037 0-2.013-.54-2.347-1.175l-.638 2.438c-.231.887-.855 2.002-1.274 2.683.96.297 1.977.457 3.033.457 5.522 0 10-4.477 10-10S17.522 2 12 2z"/></svg></a>',
    '        <a href="https://medium.com/@activomedical" target="_blank" rel="noopener noreferrer" aria-label="Medium"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 15V9l3.5 4.5L14 9v6M16 9v6"/></svg></a>',
    '      </div>',
    '    </div>',
    '    <div>',
    '      <h3>Servicios</h3>',
    '      <ul>',
    '        <li><a href="/#servicios">SEO para clinicas</a></li>',
    '        <li><a href="/#servicios">Google Ads</a></li>',
    '        <li><a href="/#servicios">Sitio web medico</a></li>',
    '        <li><a href="/#servicios">Reputacion y reseñas</a></li>',
    '      </ul>',
    '    </div>',
    '    <div>',
    '      <h3>Explora</h3>',
    '      <ul>',
    '        <li><a href="/">Inicio</a></li>',
    '        <li><a href="/marketing-medico-tijuana/">Marketing medico Tijuana</a></li>',
    '        <li><a href="/marketing-cirujanos-plasticos-tijuana/">Cirujanos plasticos</a></li>',
    '        <li><a href="/marketing-dentistas-tijuana/">Dentistas</a></li>',
    '      </ul>',
    '    </div>',
    '    <div>',
    '      <h3>Mantente actualizado</h3>',
    '      <p>Estrategias de marketing medico, sin spam.</p>',
    '      <form class="newsletter" method="post" action="#">',
    '        <label for="ne-email-shared" class="sr-only">Correo profesional</label>',
    '        <input id="ne-email-shared" type="email" name="email" placeholder="doctor@ejemplo.com" autocomplete="email" required>',
    '        <button class="btn btn-accent btn-sm" type="submit">Suscribirme</button>',
    '      </form>',
    '    </div>',
    '  </div>',
    '  <div class="container footer-bottom">',
    '    <small>&copy; <span id="fyear">2026</span> Activo Medical Marketing. Todos los derechos reservados.</small>',
    '    <nav aria-label="Legal">',
    '      <a href="/politica-de-privacidad/">Privacidad</a>',
    '      <a href="/terminos-de-uso/">Terminos de uso</a>',
    '      <a href="/sitemap.xml">Sitemap</a>',
    '    </nav>',
    '  </div>',
    '</footer>'
  ].join('');

  function setCurrentNavState() {
    var path = window.location.pathname.replace(/index\.html$/, '');
    var map = {
      '/marketing-medico-tijuana/': 'medico',
      '/marketing-cirujanos-plasticos-tijuana/': 'plasticos',
      '/marketing-dentistas-tijuana/': 'dentistas',
      '/blog/': 'blog'
    };
    var match = map[path] || '';
    if (!match && (path === '/' || path === '')) {
      var home = document.querySelector('[data-match="home-services"]');
      if (home) home.setAttribute('aria-current', 'page');
      return;
    }
    if (!match && path.indexOf('/blog') === 0) match = 'blog';
    var current = document.querySelector('[data-match="' + match + '"]');
    if (current) current.setAttribute('aria-current', 'page');
  }

  function initSharedNav() {
    if (document.documentElement.getAttribute('data-shared-nav-init') === '1') return;
    document.documentElement.setAttribute('data-shared-nav-init', '1');

    function closeDropdowns(scope) {
      scope.querySelectorAll('.nav-dropdown.is-open').forEach(function (item) {
        item.classList.remove('is-open');
        var trigger = item.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }

    function closeMobileNav(header) {
      if (!header) return;
      var btn = header.querySelector('.nav-toggle');
      var nav = header.querySelector('.mobile-nav');
      if (!btn || !nav) return;
      btn.setAttribute('aria-expanded', 'false');
      nav.hidden = true;
      closeDropdowns(nav);
    }

    document.addEventListener('click', function (e) {
      var toggle = e.target.closest('.site-header .nav-toggle');
      if (toggle) {
        var toggleHeader = toggle.closest('.site-header');
        var mobileNav = toggleHeader && toggleHeader.querySelector('.mobile-nav');
        if (!mobileNav) return;
        var willOpen = mobileNav.hidden;
        mobileNav.hidden = !willOpen;
        toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (!willOpen) closeDropdowns(mobileNav);
        e.stopPropagation();
        return;
      }

      var trigger = e.target.closest('.site-header .nav-dropdown-trigger');
      if (trigger) {
        var dropdown = trigger.closest('.nav-dropdown');
        var scope = trigger.closest('.mobile-nav') || trigger.closest('.site-header') || document;
        if (!dropdown) return;
        var isOpen = dropdown.classList.contains('is-open');
        closeDropdowns(scope);
        if (!isOpen) {
          dropdown.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
        e.stopPropagation();
        return;
      }

      document.querySelectorAll('.site-header').forEach(function (header) {
        closeDropdowns(header);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.site-header').forEach(function (header) {
        closeDropdowns(header);
        closeMobileNav(header);
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth <= 1100) return;
      document.querySelectorAll('.site-header').forEach(function (header) {
        closeMobileNav(header);
      });
    }, { passive: true });
  }

  function ensureWhatsAppWidget() {
    if (document.getElementById('wa-widget')) return;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = [
      '<div class="wa-widget" id="wa-widget">',
      '  <div class="wa-panel" id="wa-panel" hidden>',
      '    <div class="wa-panel-head">',
      '      <img src="/Assets/WhatsApp.svg.png" alt="WhatsApp" width="28" height="28" loading="lazy" decoding="async">',
      '      <div>',
      '        <strong>Iniciar una conversacion</strong>',
      '        <p>Hola. Escribenos y te responderemos lo antes posible.</p>',
      '      </div>',
      '    </div>',
      '    <a class="wa-panel-cta" href="https://api.whatsapp.com/send?phone=526647149135" target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>',
      '  </div>',
      '  <button class="wa-fab" id="wa-fab" type="button" aria-expanded="false" aria-controls="wa-panel" aria-label="Abrir chat de WhatsApp">',
      '    <img src="/Assets/WhatsApp.svg.png" alt="WhatsApp" width="30" height="30" loading="lazy" decoding="async">',
      '  </button>',
      '</div>'
    ].join('');

    document.body.appendChild(wrapper.firstChild);
  }

  function initWhatsAppWidget() {
    var fab = document.getElementById('wa-fab');
    var panel = document.getElementById('wa-panel');
    var root = document.getElementById('wa-widget');
    if (!fab || !panel || !root) return;
    if (fab.getAttribute('data-shared-init') === '1') return;

    fab.setAttribute('data-shared-init', '1');

    fab.addEventListener('click', function () {
      var willOpen = panel.hidden;
      panel.hidden = !willOpen;
      fab.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (panel.hidden) return;
      if (!root.contains(e.target)) {
        panel.hidden = true;
        fab.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      panel.hidden = true;
      fab.setAttribute('aria-expanded', 'false');
    });
  }

  function injectSharedLayout() {
    var headerSlot = document.getElementById('site-header-placeholder');
    if (headerSlot) {
      var mobileId = headerSlot.getAttribute('data-mobile-nav-id') || 'mobile-nav';
      headerSlot.outerHTML = headerTemplate.replace(/__MOBILE_NAV_ID__/g, mobileId);
    }

    var footerSlot = document.getElementById('site-footer-placeholder');
    if (footerSlot) {
      footerSlot.outerHTML = footerTemplate;
    }

    setCurrentNavState();
    initSharedNav();
    ensureWhatsAppWidget();
    initWhatsAppWidget();

    var year = document.getElementById('fyear');
    if (year) year.textContent = new Date().getFullYear();
  }

  injectSharedLayout();
})();
