/* =========================================================================
   CHAI ADDA — Contact page: FAQ accordion + form validation (demo)
   ========================================================================= */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

  /* ------------------------------ FAQ ---------------------------------- */
  $$('.faq-q').forEach((q) => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const ans = item.querySelector('.faq-a');
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '';
    });
  });

  /* --------------------------- validation ------------------------------ */
  function markField(input, valid) {
    const field = input.closest('.field');
    if (!field) return;
    field.classList.toggle('invalid', !valid);
  }

  function validate(form, rules) {
    let ok = true;
    rules.forEach(({ el, test }) => {
      const input = $(el, form);
      if (!input) return;
      const valid = test(input.value.trim());
      markField(input, valid);
      if (!valid && ok) input.focus();
      ok = ok && valid;
    });
    return ok;
  }

  function liveClear(form) {
    $$('input, select, textarea', form).forEach((input) => {
      input.addEventListener('input', () => markField(input, true));
      input.addEventListener('change', () => markField(input, true));
    });
  }

  /* --------------------------- contact form ---------------------------- */
  const contactForm = $('#contactForm');
  if (contactForm) {
    liveClear(contactForm);
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = validate(contactForm, [
        { el: '#cName', test: (v) => v.length > 1 },
        { el: '#cEmail', test: isEmail },
        { el: '#cSubject', test: (v) => v !== '' },
        { el: '#cMessage', test: (v) => v.length > 4 }
      ]);
      if (!ok) return;
      const success = $('#contactSuccess');
      success.classList.add('show');
      contactForm.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (window.ChaiToast) window.ChaiToast.show('Message sent — thank you!');
    });
  }

  /* --------------------------- reservation ----------------------------- */
  const reserveForm = $('#reserveForm');
  if (reserveForm) {
    // set date min to today, default to today
    const dateInput = $('#rDate', reserveForm);
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }
    liveClear(reserveForm);
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = validate(reserveForm, [
        { el: '#rName', test: (v) => v.length > 1 },
        { el: '#rPhone', test: (v) => v.replace(/\D/g, '').length >= 7 },
        { el: '#rDate', test: (v) => v !== '' },
        { el: '#rTime', test: (v) => v !== '' }
      ]);
      if (!ok) return;
      const guests = $('#rGuests', reserveForm).value;
      const loc = $('#rLocation', reserveForm).value.split('—')[0].trim();
      const date = $('#rDate', reserveForm).value;
      const time = $('#rTime', reserveForm).value;
      const success = $('#reserveSuccess');
      $('#reserveSuccessText').textContent =
        `Table for ${guests} at ${loc} on ${date}, ${time} — we'll confirm by email shortly.`;
      success.classList.add('show');
      reserveForm.reset();
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (window.ChaiToast) window.ChaiToast.show('Table requested!');
    });
  }
})();
