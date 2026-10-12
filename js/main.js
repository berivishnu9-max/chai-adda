/* =========================================================================
   CHAI ADDA — Core interactions
   Cart (localStorage), nav, scroll reveals, toasts, image fallbacks.
   Shared across every page.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------- Helpers -------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const gbp = (n) => '£' + n.toFixed(2);
  const CART_KEY = 'chaiadda_cart_v1';
  const WISH_KEY = 'chaiadda_wish_v1';

  /* =====================================================================
     CART
     ===================================================================== */
  const Cart = {
    items: [],
    load() {
      try { this.items = JSON.parse(localStorage.getItem(CART_KEY)) || []; }
      catch (e) { this.items = []; }
    },
    save() { localStorage.setItem(CART_KEY, JSON.stringify(this.items)); },
    add(item, qty = 1) {
      const found = this.items.find((i) => i.id === item.id);
      if (found) { found.qty += qty; }
      else { this.items.push({ id: item.id, name: item.name, price: item.price, img: item.img || '', qty }); }
      this.save(); this.render();
      Toast.show(`${item.name} added to your order`);
      pulseCart();
    },
    setQty(id, qty) {
      const it = this.items.find((i) => i.id === id);
      if (!it) return;
      it.qty = Math.max(0, qty);
      if (it.qty === 0) this.items = this.items.filter((i) => i.id !== id);
      this.save(); this.render();
    },
    remove(id) { this.items = this.items.filter((i) => i.id !== id); this.save(); this.render(); },
    count() { return this.items.reduce((s, i) => s + i.qty, 0); },
    subtotal() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
    render() {
      // badge
      const c = this.count();
      $$('.cart-count').forEach((b) => {
        b.textContent = c;
        b.classList.toggle('show', c > 0);
      });
      // let any page-level listeners (e.g. the order summary) react
      this.notify();
      // drawer body
      const body = $('#cartBody');
      if (!body) return;
      if (this.items.length === 0) {
        body.innerHTML = `
          <div class="cart-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p>Your cup is empty.<br>Add something warm to get started.</p>
          </div>`;
      } else {
        body.innerHTML = this.items.map((i) => `
          <div class="cart-line">
            ${i.img
              ? `<img class="cart-line-img" src="${i.img}" alt="${i.name}" data-fallback="${i.name}">`
              : `<div class="cart-line-img img-fallback"><span>${i.name}</span></div>`}
            <div class="cart-line-info">
              <h4>${i.name}</h4>
              <div class="price">${gbp(i.price)}</div>
              <div class="cart-line-controls">
                <div class="stepper" aria-label="Quantity for ${i.name}">
                  <button type="button" data-dec="${i.id}" aria-label="Decrease">−</button>
                  <span>${i.qty}</span>
                  <button type="button" data-inc="${i.id}" aria-label="Increase">+</button>
                </div>
                <button type="button" class="cart-remove" data-rm="${i.id}">Remove</button>
              </div>
            </div>
          </div>`).join('');
      }
      // totals
      const sub = this.subtotal();
      const delivery = sub > 0 && sub < 15 ? 2.49 : 0;
      const subEl = $('#cartSubtotal'), delEl = $('#cartDelivery'), totEl = $('#cartTotal'), freeEl = $('#cartFreeNote');
      if (subEl) subEl.textContent = gbp(sub);
      if (delEl) delEl.textContent = delivery === 0 ? 'Free' : gbp(delivery);
      if (totEl) totEl.textContent = gbp(sub + delivery);
      if (freeEl) freeEl.textContent = sub > 0 && sub < 15 ? `Add ${gbp(15 - sub)} more for free delivery` : '';
      const checkoutBtn = $('#checkoutBtn');
      if (checkoutBtn) checkoutBtn.disabled = this.items.length === 0;
      if (window.ChaiFallbacks) window.ChaiFallbacks(body);
    },
    notify() {
      document.dispatchEvent(new CustomEvent('cart:change', {
        detail: { items: this.items, subtotal: this.subtotal(), count: this.count() }
      }));
    }
  };
  window.ChaiCart = Cart; // expose for menu.js / page scripts

  /* =====================================================================
     WISHLIST (persisted, used by menu page)
     ===================================================================== */
  const Wish = {
    ids: [],
    load() { try { this.ids = JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch (e) { this.ids = []; } },
    has(id) { return this.ids.includes(id); },
    toggle(id, name) {
      if (this.has(id)) { this.ids = this.ids.filter((x) => x !== id); Toast.show(`Removed from wishlist`); }
      else { this.ids.push(id); Toast.show(`${name} saved to wishlist`); }
      localStorage.setItem(WISH_KEY, JSON.stringify(this.ids));
    }
  };
  window.ChaiWish = Wish;

  /* =====================================================================
     TOAST
     ===================================================================== */
  const Toast = {
    wrap: null,
    ensure() {
      if (!this.wrap) {
        this.wrap = document.createElement('div');
        this.wrap.className = 'toast-wrap';
        document.body.appendChild(this.wrap);
      }
    },
    show(msg) {
      this.ensure();
      const t = document.createElement('div');
      t.className = 'toast';
      t.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="m20 6-11 11-5-5"/></svg><span>${msg}</span>`;
      this.wrap.appendChild(t);
      requestAnimationFrame(() => t.classList.add('show'));
      setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 400);
      }, 2600);
    }
  };
  window.ChaiToast = Toast;

  function pulseCart() {
    $$('.cart-btn').forEach((b) => {
      b.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
        { duration: 400, easing: 'cubic-bezier(.22,.61,.36,1)' }
      );
    });
  }

  /* =====================================================================
     IMAGE FALLBACKS — graceful before real photos are added
     ===================================================================== */
  /* Pick the illustration that best fits an item, by explicit data-art or by keyword. */
  const ART_RULES = [
    [/falooda|lassi|chaas|jaljeera|panna/i, 'cold'],   // cold drinks that also name a flower/spice
    [/kahwa|tea|chai|kadak|tulsi|kesar|assam|darjeeling|nilgiri|lemongrass|rose|haldi/i, 'chai'],
    [/coffee|espresso|cappuccino|latte|mocha/i, 'coffee'],
    [/lassi|chaas|jaljeera|soda|falooda|cold|iced|panna|cooler|milk/i, 'cold'],
    [/samosa|puff|pakora|vada|bhaji|tikki|chaat|bhel|puri|fries|maggi|noodle/i, 'snack'],
    [/dosa|idli|poha|upma|paratha|bhature|breakfast/i, 'breakfast'],
    [/sandwich|toastie|wrap|roll|frankie|kathi|club/i, 'sandwich'],
    [/jamun|jalebi|rasmalai|kheer|kulfi|dessert|brownie|sweet/i, 'dessert'],
    [/caf[ée]|store|storefront|centre|end|southside|location/i, 'store'],
    [/ayaan|meera|rohan|grace|team|barista|founder/i, 'team']
  ];
  function pickArt(img, label) {
    if (img.dataset.art) return img.dataset.art;
    const hay = `${label} ${img.getAttribute('alt') || ''} ${img.dataset.cat || ''}`;
    for (const [re, name] of ART_RULES) if (re.test(hay)) return name;
    return 'chai';
  }

  function makeFallback(img) {
    // <img> is a void element and can't hold child content, so swap it for a div.
    const label = img.dataset.fallback || img.getAttribute('alt') || 'Chai Adda';
    const art = pickArt(img, label);
    const div = document.createElement('div');
    div.className = ('img-fallback ' + (img.className || '')).trim();
    div.style.width = '100%';
    div.style.height = '100%';
    div.setAttribute('role', 'img');
    div.setAttribute('aria-label', img.getAttribute('alt') || label);
    div.innerHTML =
      `<img class="art" src="assets/art/${art}.svg" alt="" aria-hidden="true"><span>${label}</span>`;
    img.replaceWith(div);
  }
  /* Swap a local placeholder path for a real verified photograph, when one
     exists in the photo map. Unmapped paths keep the SVG-illustration path. */
  function resolvePhoto(img) {
    const map = window.CHAI_PHOTOS;
    if (!map) return;
    const src = img.getAttribute('src');
    if (src && map[src]) img.setAttribute('src', map[src]);
  }

  function wireFallbacks(ctx = document) {
    $$('img[data-fallback]', ctx).forEach((img) => {
      if (img.dataset.wired) return;
      img.dataset.wired = '1';
      resolvePhoto(img);
      img.addEventListener('error', () => makeFallback(img), { once: true });
      // If the image already failed before JS ran
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) {
        makeFallback(img);
      }
    });
  }
  window.ChaiFallbacks = wireFallbacks;

  /* =====================================================================
     NAV — scroll state, mobile menu
     ===================================================================== */
  function initNav() {
    const nav = $('.nav');
    const toggle = $('.nav-toggle');
    const mobile = $('.mobile-menu');
    const onScroll = () => {
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      // floating order button
      const fo = $('.float-order');
      if (fo) fo.classList.toggle('show', window.scrollY > 620);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && mobile) {
      toggle.addEventListener('click', () => {
        const open = toggle.classList.toggle('open');
        mobile.classList.toggle('open', open);
        nav.classList.toggle('mobile-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      $$('.mobile-menu a').forEach((a) => a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobile.classList.remove('open');
        nav.classList.remove('mobile-open');
        document.body.style.overflow = '';
      }));
    }
  }

  /* =====================================================================
     CART DRAWER
     ===================================================================== */
  function initDrawer() {
    const overlay = $('#overlay');
    const drawer = $('#cartDrawer');
    if (!drawer) return;
    const open = () => { overlay.classList.add('open'); drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { overlay.classList.remove('open'); drawer.classList.remove('open'); document.body.style.overflow = ''; };

    $$('.cart-btn, [data-open-cart]').forEach((b) => b.addEventListener('click', open));
    $$('[data-close-cart]').forEach((b) => b.addEventListener('click', close));
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    // delegate stepper / remove inside drawer
    $('#cartBody').addEventListener('click', (e) => {
      const inc = e.target.closest('[data-inc]');
      const dec = e.target.closest('[data-dec]');
      const rm = e.target.closest('[data-rm]');
      if (inc) { const it = Cart.items.find((i) => i.id === inc.dataset.inc); Cart.setQty(inc.dataset.inc, it.qty + 1); }
      if (dec) { const it = Cart.items.find((i) => i.id === dec.dataset.dec); Cart.setQty(dec.dataset.dec, it.qty - 1); }
      if (rm) { Cart.remove(rm.dataset.rm); }
    });

    const checkout = $('#checkoutBtn');
    // On non-order pages the drawer's checkout sends you to the full order flow.
    if (checkout && checkout.tagName === 'BUTTON') checkout.addEventListener('click', () => {
      window.location.href = 'order.html';
    });
  }

  /* =====================================================================
     SCROLL REVEALS
     ===================================================================== */
  function initReveals() {
    const els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* =====================================================================
     NEWSLETTER (demo, client-side)
     ===================================================================== */
  function initNewsletter() {
    const form = $('#nlForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const note = $('#nlNote');
      const val = input.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) {
        note.textContent = 'Please enter a valid email address.';
        note.style.color = '#f0a58a';
        return;
      }
      note.textContent = 'Thank you — welcome to the Adda. Check your inbox for a warm hello.';
      note.style.color = '#8fd0a8';
      input.value = '';
    });
  }

  /* =====================================================================
     Add-to-cart delegation (works with static + generated cards)
     Card must carry: data-add, data-id, data-name, data-price, data-img
     ===================================================================== */
  function initAddButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-add]');
      if (!btn) return;
      const stepper = btn.closest('.card, .cart-item, .menu-card')?.querySelector('.stepper span');
      const qty = stepper ? parseInt(stepper.textContent, 10) || 1 : 1;
      Cart.add({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        img: btn.dataset.img || ''
      }, qty);
      if (stepper) stepper.textContent = '1';
    });

    // local stepper controls (on cards)
    document.addEventListener('click', (e) => {
      const up = e.target.closest('[data-step-up]');
      const down = e.target.closest('[data-step-down]');
      if (!up && !down) return;
      const span = (up || down).parentElement.querySelector('span');
      let v = parseInt(span.textContent, 10) || 1;
      v = up ? v + 1 : Math.max(1, v - 1);
      span.textContent = v;
    });
  }

  /* =====================================================================
     Year stamp
     ===================================================================== */
  function initYear() { $$('[data-year]').forEach((el) => el.textContent = new Date().getFullYear()); }

  /* ---------------------------- Boot ----------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    Cart.load(); Wish.load();
    wireFallbacks();
    initNav();
    initDrawer();
    initReveals();
    initNewsletter();
    initAddButtons();
    initYear();
    Cart.render();
  });
})();
