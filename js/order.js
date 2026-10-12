/* =========================================================================
   CHAI ADDA — Order page: type toggle, coupons, live summary, checkout
   Reads the shared cart (window.ChaiCart) and reacts to 'cart:change'.
   ========================================================================= */
(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const gbp = (n) => '£' + n.toFixed(2);
  const FREE_DELIVERY_MIN = 15;
  const DELIVERY_FEE = 2.49;

  let orderType = 'delivery';
  let placed = false;

  // Promo codes (demo)
  const COUPONS = {
    CHAI10:   { type: 'pct',  value: 0.10, label: '10% off (CHAI10)' },
    STUDENT:  { type: 'pct',  value: 0.15, label: '15% student discount' },
    WELCOME:  { type: 'flat', value: 2.00, min: 10, label: '£2 off (WELCOME)' },
    FREEDEL:  { type: 'freedel', value: 0, label: 'Free delivery (FREEDEL)' }
  };
  let coupon = localStorage.getItem('chaiadda_coupon') || '';

  /* --------------------------- compute --------------------------------- */
  function compute() {
    const items = (window.ChaiCart && window.ChaiCart.items) || [];
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const c = COUPONS[coupon];
    let discount = 0, freeDel = false;
    if (c && subtotal > 0 && !(c.min && subtotal < c.min)) {
      if (c.type === 'pct') discount = subtotal * c.value;
      else if (c.type === 'flat') discount = Math.min(c.value, subtotal);
      else if (c.type === 'freedel') freeDel = true;
    }
    let fee = 0;
    if (orderType === 'delivery' && subtotal > 0) {
      fee = (freeDel || subtotal >= FREE_DELIVERY_MIN) ? 0 : DELIVERY_FEE;
    }
    const total = Math.max(0, subtotal - discount) + fee;
    return { items, subtotal, discount, fee, total, count: items.reduce((s, i) => s + i.qty, 0), c };
  }

  /* --------------------------- render ---------------------------------- */
  function render() {
    if (placed) return;
    const { items, subtotal, discount, fee, total, count, c } = compute();

    $('#summaryCount').textContent = count + (count === 1 ? ' item' : ' items');

    const body = $('#summaryBody');
    if (items.length === 0) {
      body.innerHTML = '<div class="mini-empty">Your order is empty.<br>Add something from the menu.</div>';
    } else {
      body.innerHTML = items.map((i) => `
        <div class="mini-line">
          <div style="flex:1;min-width:0">
            <div class="mini-name">${i.name}</div>
            <div class="stepper" style="margin-top:6px">
              <button type="button" data-odec="${i.id}" aria-label="Decrease ${i.name}">−</button>
              <span>${i.qty}</span>
              <button type="button" data-oinc="${i.id}" aria-label="Increase ${i.name}">+</button>
            </div>
          </div>
          <div style="text-align:right;white-space:nowrap">
            <div class="mini-price">${gbp(i.price * i.qty)}</div>
            <button type="button" class="cart-remove" data-orm="${i.id}">Remove</button>
          </div>
        </div>`).join('');
    }

    $('#sumSubtotal').textContent = gbp(subtotal);
    const discRow = $('#discountRow');
    if (discount > 0) {
      discRow.hidden = false;
      $('#discountLabel').textContent = 'Discount' + (c ? ` · ${coupon}` : '');
      $('#sumDiscount').textContent = '-' + gbp(discount);
    } else {
      discRow.hidden = true;
    }
    $('#feeLabel').textContent = orderType === 'pickup' ? 'Collection' : 'Delivery';
    $('#sumFee').textContent = orderType === 'pickup' ? 'Free' : (fee === 0 && subtotal > 0 ? 'Free' : gbp(fee));
    $('#sumTotal').textContent = gbp(total);
    $('#placeOrder').disabled = items.length === 0;
  }

  /* --------------------------- order type ------------------------------ */
  function setType(type) {
    orderType = type;
    document.querySelectorAll('[data-ordertype]').forEach((b) => {
      const on = b.dataset.ordertype === type;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    $('#deliveryField').hidden = type !== 'delivery';
    $('#pickupField').hidden = type !== 'pickup';
    $('#etaText').textContent = type === 'delivery' ? 'Est. 30–40 min' : 'Ready in 10–15 min';
    render();
  }

  /* --------------------------- coupon ---------------------------------- */
  function applyCoupon() {
    const input = $('#couponInput');
    const msg = $('#couponMsg');
    const code = input.value.trim().toUpperCase();
    if (!code) { msg.textContent = ''; return; }
    const c = COUPONS[code];
    if (!c) {
      coupon = ''; localStorage.removeItem('chaiadda_coupon');
      msg.className = 'coupon-msg err'; msg.textContent = 'That code isn’t valid.';
    } else {
      const { subtotal } = compute();
      if (c.min && subtotal < c.min) {
        msg.className = 'coupon-msg err';
        msg.textContent = `Spend ${gbp(c.min)} to use ${code}.`;
      } else {
        coupon = code; localStorage.setItem('chaiadda_coupon', code);
        msg.className = 'coupon-msg ok'; msg.textContent = `Applied: ${c.label}`;
      }
    }
    render();
  }

  /* --------------------------- place order ----------------------------- */
  function placeOrder() {
    const { items, total } = compute();
    if (items.length === 0) return;
    const num = 'CA-' + Math.floor(1000 + Math.random() * 9000);
    const eta = orderType === 'delivery' ? '30–40 minutes' : '10–15 minutes';
    const where = orderType === 'delivery' ? 'on its way to you' : 'being prepared for collection';
    placed = true;
    $('#orderSummary').innerHTML = `
      <div style="padding:var(--s5) var(--s4);text-align:center">
        <div style="width:64px;height:64px;border-radius:50%;background:rgba(58,138,58,.12);display:flex;align-items:center;justify-content:center;margin:0 auto var(--s3)">
          <svg viewBox="0 0 24 24" fill="none" stroke="#3a8a3a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="30" height="30"><path d="m20 6-11 11-5-5"/></svg>
        </div>
        <h3 style="font-size:1.5rem;margin-bottom:8px">Order confirmed</h3>
        <p style="color:var(--muted);font-size:.95rem;margin-bottom:var(--s3)">Order <strong>${num}</strong> is ${where}.</p>
        <div class="cart-row total" style="justify-content:center;gap:8px;border:0"><span>Paid ${gbp(total)}</span></div>
        <p style="color:var(--green-deep);font-weight:600;margin:var(--s2) 0 var(--s3)">Estimated ${eta}</p>
        <p class="cart-note" style="margin-bottom:var(--s3)">This is a demo — no order was really placed and no payment was taken.</p>
        <a href="menu.html" class="btn btn-ghost btn-sm">Back to menu</a>
      </div>`;
    // clear cart + coupon
    window.ChaiCart.items = [];
    window.ChaiCart.save();
    window.ChaiCart.render();
    coupon = ''; localStorage.removeItem('chaiadda_coupon');
    if (window.ChaiToast) window.ChaiToast.show(`Order ${num} confirmed`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* --------------------------- wire ------------------------------------ */
  function boot() {
    // preload coupon into input
    if (coupon) { $('#couponInput').value = coupon; }

    document.querySelectorAll('[data-ordertype]').forEach((b) =>
      b.addEventListener('click', () => setType(b.dataset.ordertype)));

    $('#couponApply').addEventListener('click', applyCoupon);
    $('#couponInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); applyCoupon(); } });
    $('#placeOrder').addEventListener('click', placeOrder);

    // summary stepper / remove (delegated)
    $('#summaryBody').addEventListener('click', (e) => {
      const inc = e.target.closest('[data-oinc]');
      const dec = e.target.closest('[data-odec]');
      const rm = e.target.closest('[data-orm]');
      if (inc) { const it = window.ChaiCart.items.find((i) => i.id === inc.dataset.oinc); window.ChaiCart.setQty(inc.dataset.oinc, it.qty + 1); }
      if (dec) { const it = window.ChaiCart.items.find((i) => i.id === dec.dataset.odec); window.ChaiCart.setQty(dec.dataset.odec, it.qty - 1); }
      if (rm) { window.ChaiCart.remove(rm.dataset.orm); }
    });

    // nav cart icon scrolls to the summary here (no drawer on this page)
    document.querySelectorAll('.cart-btn').forEach((b) => b.addEventListener('click', () => {
      document.getElementById('orderSummary').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));

    document.addEventListener('cart:change', render);
    if (coupon && $('#couponMsg')) { const c = COUPONS[coupon]; if (c) { $('#couponMsg').className = 'coupon-msg ok'; $('#couponMsg').textContent = `Applied: ${c.label}`; } }
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
