(function () {
  'use strict';

  var HS_PORTAL   = '51333853';
  var HS_FORM     = '4e2ebbc8-4c36-4205-8c96-21a77b675888';
  var HS_ENDPOINT = 'https://api.hsforms.com/submissions/v3/integration/submit/'
                    + HS_PORTAL + '/' + HS_FORM;

  // Maps form field name → HubSpot internal property name
  var FIELD_MAP = {
    'nombre':         'firstname',
    'telefono':       'phone',
    'email':          'email',
    'sitio':          'sitio_web_actual',
    'especialidad':   'especialidad',
    'procedimientos': 'especialidad',
    'tratamientos':   'especialidad',
    'reto':           'principal_reto',
    'publico':        'publico_prioridad'
  };

  document.querySelectorAll('form.contact-form').forEach(function (form) {
    var msgEl = form.querySelector('.form-message');
    if (!msgEl) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('[type="submit"]');
      var btnHTML = btn.innerHTML;

      // Guard: wait for Turnstile token before submitting
      var tokenInput = form.querySelector('[name="cf-turnstile-response"]');
      if (tokenInput && !tokenInput.value) {
        msgEl.textContent = 'Por favor, espera un momento y vuelve a intentarlo.';
        msgEl.className = 'form-message form-error';
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Enviando\u2026';
      msgEl.textContent = '';
      msgEl.className = 'form-message';

      // Build HubSpot fields array, skipping unmapped and empty values
      var formData = new FormData(form);
      var fields = [];
      var seen = {};
      formData.forEach(function (value, key) {
        var hsName = FIELD_MAP[key];
        if (!hsName || !String(value).trim() || seen[hsName]) return;
        seen[hsName] = true;
        fields.push({ name: hsName, value: String(value).trim() });
      });

      var payload = {
        fields: fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      };

      fetch(HS_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(function (res) {
          return res.json().then(function (data) {
            if (res.ok) {
              msgEl.textContent =
                '\u00a1Gracias! Nos pondremos en contacto contigo pronto.';
              msgEl.className = 'form-message form-success';
              form.reset();
            } else {
              var errMsg = 'Hubo un error al enviar el formulario. Intenta de nuevo.';
              if (data.errors && data.errors.length) {
                errMsg = data.errors.map(function (err) { return err.message; }).join(', ');
              } else if (data.message) {
                errMsg = data.message;
              }
              msgEl.textContent = errMsg;
              msgEl.className = 'form-message form-error';
            }
          });
        })
        .catch(function () {
          msgEl.textContent =
            'Error de conexi\u00f3n. Verifica tu internet e intenta de nuevo.';
          msgEl.className = 'form-message form-error';
        })
        .then(function () {
          btn.disabled = false;
          btn.innerHTML = btnHTML;
          if (window.turnstile) window.turnstile.reset();
        });
    });
  });
})();
