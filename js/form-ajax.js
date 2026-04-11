(function () {
  'use strict';

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

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          return res.json().then(function (data) {
            if (res.ok) {
              msgEl.textContent =
                '\u00a1Gracias! Nos pondremos en contacto contigo pronto.';
              msgEl.className = 'form-message form-success';
              form.reset();
            } else {
              if (data.errors) {
                msgEl.textContent = data.errors
                  .map(function (err) {
                    return err.message;
                  })
                  .join(', ');
              } else {
                msgEl.textContent =
                  'Hubo un error al enviar el formulario. Intenta de nuevo.';
              }
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
          // Reset Turnstile token so user can resubmit if needed
          if (window.turnstile) window.turnstile.reset();
        });
    });
  });
})();
