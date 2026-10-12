/* =========================================================================
   CHAI ADDA — Home page content (drinks, snacks, reviews, gallery)
   ========================================================================= */
(function () {
  'use strict';

  /* icons */
  const ic = {
    kcal: '<svg viewBox="0 0 24 24"><path d="M12 2C8 6 6 9 6 13a6 6 0 0 0 12 0c0-4-2-7-6-11z"/></svg>',
    time: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9.3-8.4C1.2 9.9 2.3 6.5 5.5 6c1.9-.3 3.6.8 4.5 2.2C10.9 6.8 12.6 5.7 14.5 6c3.2.5 4.3 3.9 2.8 6.6C19 16.4 12 21 12 21z"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="m12 2 2.9 6.3L22 9.3l-5 4.6 1.3 7L12 17.6 5.7 20.9 7 13.9l-5-4.6 7.1-1z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/></svg>'
  };

  const stars = (n) => `<div class="stars" aria-label="${n} out of 5 stars">${Array.from({length:5},(_,i)=>`<svg viewBox="0 0 24 24" style="${i<n?'':'opacity:.25'}"><path d="m12 2 2.9 6.3L22 9.3l-5 4.6 1.3 7L12 17.6 5.7 20.9 7 13.9l-5-4.6 7.1-1z"/></svg>`).join('')}</div>`;

  /* ------------------------------- DRINKS ------------------------------ */
  const drinks = [
    { id:'d-masala', name:'Masala Chai', img:'images/drinks/masala-chai.jpg', price:2.80, kcal:120, time:'4 min', badge:'Bestseller', desc:'Our signature — Assam leaves simmered with fresh ginger, cardamom and twelve hand-ground spices.' },
    { id:'d-elaichi', name:'Elaichi Chai', img:'images/drinks/elaichi-chai.jpg', price:2.90, kcal:125, time:'4 min', desc:'Fragrant green cardamom steeped slowly into full-cream milk. Gentle, floral and comforting.' },
    { id:'d-ginger', name:'Ginger Chai', img:'images/drinks/ginger-chai.jpg', price:2.80, kcal:118, time:'4 min', desc:'A bold, warming brew with a proper hit of fresh ginger. The one for grey Glasgow mornings.' },
    { id:'d-kahwa', name:'Kashmiri Kahwa', img:'images/drinks/kashmiri-kahwa.jpg', price:3.40, kcal:60, time:'5 min', badge:'New', desc:'Green tea with saffron, cinnamon and slivered almonds. Light, golden and quietly luxurious.' },
    { id:'d-filter', name:'Filter Coffee', img:'images/drinks/filter-coffee.jpg', price:3.00, kcal:90, time:'5 min', desc:'South Indian drip coffee, frothy and strong, pulled the traditional way between two tumblers.' },
    { id:'d-cold', name:'Cold Coffee', img:'images/drinks/cold-coffee.jpg', price:3.60, kcal:210, time:'3 min', desc:'Thick, blended and iced — coffee, milk and a whisper of vanilla. A café-day classic.' }
  ];

  /* ------------------------------- SNACKS ------------------------------ */
  const snacks = [
    { id:'s-samosa', name:'Samosa', img:'images/snacks/samosa.jpg', price:1.80, desc:'Two crisp pastries, spiced potato & pea.' },
    { id:'s-vegpuff', name:'Veg Puff', img:'images/snacks/veg-puff.jpg', price:1.90, desc:'Flaky puff pastry, masala vegetables.' },
    { id:'s-paneerpuff', name:'Paneer Puff', img:'images/snacks/paneer-puff.jpg', price:2.40, desc:'Golden puff filled with spiced paneer.' },
    { id:'s-vadapav', name:'Vada Pav', img:'images/snacks/vada-pav.jpg', price:3.20, desc:'Mumbai’s classic potato slider in a bun.' },
    { id:'s-pavbhaji', name:'Pav Bhaji', img:'images/snacks/pav-bhaji.jpg', price:5.50, desc:'Buttery mashed veg curry, toasted pav.' },
    { id:'s-maggi', name:'Masala Maggi', img:'images/snacks/maggi.jpg', price:3.50, desc:'Comfort noodles, tossed with veg & spice.' },
    { id:'s-sandwich', name:'Cheese Sandwich', img:'images/snacks/cheese-sandwich.jpg', price:3.80, desc:'Grilled Bombay sandwich, chutney & cheese.' },
    { id:'s-fries', name:'Masala Fries', img:'images/snacks/french-fries.jpg', price:2.90, desc:'Crisp fries dusted with chaat masala.' }
  ];

  /* ------------------------------- REVIEWS ----------------------------- */
  const reviews = [
    { name:'Aisha Rahman', when:'2 weeks ago', color:'#C96A2E', n:5, text:'Tastes exactly like the chai my nani made. The masala is the real thing and the samosas are unreal. My new Saturday ritual.' },
    { name:'Callum Fraser', when:'1 month ago', color:'#2F5D4C', n:5, text:'Wandered in for a coffee and stayed two hours. Lovely warm room, proper filter coffee, staff who actually chat. Rare find in the city centre.' },
    { name:'Priya Menon', when:'3 weeks ago', color:'#3d7160', n:5, text:'The Kashmiri kahwa is gorgeous — saffron and almond, not too sweet. Finally an Indian café in Glasgow that gets tea right.' },
    { name:'Daniel O’Neill', when:'1 week ago', color:'#b0561f', n:5, text:'Vada pav and a masala chai for under a fiver and it beats any lunch deal nearby. Fast, friendly, and the pastry is spot on.' },
    { name:'Sana Iqbal', when:'2 months ago', color:'#21463a', n:4, text:'Cosy spot with a real sense of community. Gets busy at weekends so worth ordering ahead, but honestly the chai is worth the wait.' },
    { name:'Rebecca Stewart', when:'5 days ago', color:'#8a5a2b', n:5, text:'Brought my mum for her birthday and they made such a fuss of her. The elaichi chai is like a hug in a cup. We’ll be back weekly.' }
  ];

  /* ------------------------------- GALLERY ----------------------------- */
  const gallery = [
    { img:'images/gallery/01.jpg', alt:'A tray of masala chai in clay kulhads' },
    { img:'images/gallery/02.jpg', alt:'Samosas frying to golden in the kitchen' },
    { img:'images/gallery/03.jpg', alt:'The warm wooden interior of Chai Adda' },
    { img:'images/gallery/04.jpg', alt:'Chai poured from height between two cups' },
    { img:'images/gallery/05.jpg', alt:'Friends laughing over cups of tea' },
    { img:'images/gallery/06.jpg', alt:'Pav bhaji served with buttered rolls' },
    { img:'images/gallery/07.jpg', alt:'Whole spices for the house masala blend' },
    { img:'images/gallery/08.jpg', alt:'A barista smiling at the Chai Adda counter' }
  ];

  /* -------------------------- render helpers --------------------------- */
  function drinkCard(d, i) {
    return `
    <article class="card" data-reveal data-reveal-delay="${(i%3)+1}">
      <div class="card-media">
        ${d.badge ? `<div class="card-badges"><span class="badge pop">${d.badge}</span></div>` : ''}
        <button class="wish" data-wish="${d.id}" data-name="${d.name}" aria-label="Save ${d.name} to wishlist">${ic.heart}</button>
        <img src="${d.img}" alt="${d.name} served fresh" data-fallback="${d.name}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-title-row"><h3>${d.name}</h3><span class="card-price">£${d.price.toFixed(2)}</span></div>
        <p class="card-desc">${d.desc}</p>
        <div class="card-meta">
          <span>${ic.kcal}${d.kcal} kcal</span>
          <span>${ic.time}${d.time}</span>
        </div>
        <div class="card-foot">
          <div class="stepper"><button type="button" data-step-down aria-label="Decrease">−</button><span>1</span><button type="button" data-step-up aria-label="Increase">+</button></div>
          <button class="btn btn-primary btn-sm add-btn" data-add data-id="${d.id}" data-name="${d.name}" data-price="${d.price}" data-img="${d.img}">Add to Cart</button>
        </div>
      </div>
    </article>`;
  }

  function snackCard(s, i) {
    return `
    <article class="card" data-reveal data-reveal-delay="${(i%4)+1}">
      <div class="card-media">
        <span class="card-badges"><span class="badge veg">Veg</span></span>
        <img src="${s.img}" alt="${s.name}" data-fallback="${s.name}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-title-row"><h3 style="font-size:1.05rem">${s.name}</h3><span class="card-price">£${s.price.toFixed(2)}</span></div>
        <p class="card-desc" style="font-size:.84rem">${s.desc}</p>
        <div class="card-foot" style="margin-top:auto;padding-top:var(--s3)">
          <button class="btn btn-dark btn-sm btn-block" data-add data-id="${s.id}" data-name="${s.name}" data-price="${s.price}" data-img="${s.img}">Add to Cart</button>
        </div>
      </div>
    </article>`;
  }

  function reviewCard(r, i) {
    const initials = r.name.split(' ').map((w) => w[0]).slice(0,2).join('');
    return `
    <article class="review-card" data-reveal data-reveal-delay="${(i%3)+1}">
      <div class="review-top">
        <div class="avatar" style="background:${r.color}">${initials}</div>
        <div class="review-who">
          <strong>${r.name}</strong>
          <span><svg class="gmark" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-2 3.2-4.9 3.2-7.9z"/><path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.6 1.1-2.8 0-5.1-1.9-6-4.4H2.3v2.9A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M6 14.2a6.6 6.6 0 0 1 0-4.2V7.1H2.3a11 11 0 0 0 0 9.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.1 1.6l3.1-3.1A11 11 0 0 0 2.3 7.1L6 10c.9-2.6 3.2-4.5 6-4.5z"/></svg>Google review · ${r.when}</span>
        </div>
      </div>
      ${stars(r.n)}
      <p class="review-text">“${r.text}”</p>
    </article>`;
  }

  function galleryItem(g) {
    return `
    <a class="gallery-item" href="#gallery" aria-label="View on Instagram">
      <img src="${g.img}" alt="${g.alt}" data-fallback="@chaiadda" loading="lazy">
      <span class="ig">${ic.ig} @chaiadda</span>
    </a>`;
  }

  /* ------------------------------- mount ------------------------------- */
  function mount() {
    const dg = document.getElementById('drinksGrid');
    const sg = document.getElementById('snacksGrid');
    const rg = document.getElementById('reviewGrid');
    const gg = document.getElementById('galleryGrid');
    if (dg) dg.innerHTML = drinks.map(drinkCard).join('');
    if (sg) sg.innerHTML = snacks.map(snackCard).join('');
    if (rg) rg.innerHTML = reviews.map(reviewCard).join('');
    if (gg) gg.innerHTML = gallery.map(galleryItem).join('');

    // re-wire dynamic bits
    if (window.ChaiFallbacks) window.ChaiFallbacks();
    // reveal observer for injected nodes
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
      document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
    } else {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in'));
    }

    // wishlist toggles
    document.querySelectorAll('[data-wish]').forEach((btn) => {
      if (window.ChaiWish && window.ChaiWish.has(btn.dataset.wish)) btn.classList.add('active');
      btn.addEventListener('click', () => {
        window.ChaiWish.toggle(btn.dataset.wish, btn.dataset.name);
        btn.classList.toggle('active');
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
