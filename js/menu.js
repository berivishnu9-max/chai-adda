/* =========================================================================
   CHAI ADDA — Menu catalogue, search, filters, cart wiring
   ~60 items across 12 categories. Prices in GBP.
   ========================================================================= */
(function () {
  'use strict';

  const ic = {
    kcal:'<svg viewBox="0 0 24 24"><path d="M12 2C8 6 6 9 6 13a6 6 0 0 0 12 0c0-4-2-7-6-11z"/></svg>',
    time:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chili:'<svg viewBox="0 0 24 24"><path d="M11 3c0 2 1 3 3 3 3 0 5 2 5 6 0 5-4 9-9 9-4 0-7-3-7-6 0-1 1-2 2-2 2 0 3 2 5 2 3 0 4-3 4-6"/></svg>',
    heart:'<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9.3-8.4C1.2 9.9 2.3 6.5 5.5 6c1.9-.3 3.6.8 4.5 2.2C10.9 6.8 12.6 5.7 14.5 6c3.2.5 4.3 3.9 2.8 6.6C19 16.4 12 21 12 21z"/></svg>'
  };

  /* categories in display order */
  const CATS = [
    ['signature-chai','Signature Chai','Stove-brewed the traditional way, poured piping hot.'],
    ['premium-tea','Premium Tea','Single-estate leaves and delicate botanical blends.'],
    ['coffee','Coffee','South Indian filter classics and modern café favourites.'],
    ['cold-drinks','Cold Drinks','Chilled lassis, coolers and iced brews.'],
    ['street-food','Street Food','The handmade snacks that chai was made for.'],
    ['breakfast','Breakfast','A proper South & North Indian start to the day.'],
    ['sandwiches','Sandwiches','Grilled, chutney-packed and toasted to order.'],
    ['wraps','Wraps','Warm rolls and kathi wraps, rolled fresh.'],
    ['desserts','Desserts','Sweet endings, the Indian way.'],
    ['kids','Kids Menu','Little portions, gentle spice, big smiles.'],
    ['combos','Combos','Chai-and-a-bite pairings that save you a little.'],
    ['seasonal','Seasonal Specials','Limited brews and plates we make while they last.']
  ];

  /* v = veg, vg = vegan, p = popular, spice 0–3 */
  const ITEMS = [
    // Signature Chai
    { id:'m-masala', c:'signature-chai', n:'Masala Chai', pr:2.80, k:120, t:4, v:1, p:1, s:1, d:'Assam leaves simmered with ginger, cardamom and our twelve-spice house masala.' },
    { id:'m-elaichi', c:'signature-chai', n:'Elaichi Chai', pr:2.90, k:125, t:4, v:1, s:0, d:'Fragrant green cardamom slow-steeped into full-cream milk.' },
    { id:'m-ginger', c:'signature-chai', n:'Ginger Chai', pr:2.80, k:118, t:4, v:1, s:1, d:'A bold, warming brew with a proper hit of fresh ginger.' },
    { id:'m-adrak-tulsi', c:'signature-chai', n:'Adrak Tulsi Chai', pr:3.00, k:110, t:5, v:1, s:1, d:'Ginger and holy basil — soothing, aromatic and grounding.' },
    { id:'m-kesar', c:'signature-chai', n:'Kesar Malai Chai', pr:3.50, k:180, t:5, v:1, p:1, s:0, d:'Saffron and reduced milk for a rich, festive cup.' },
    { id:'m-masala-vegan', c:'signature-chai', n:'Oat Masala Chai', pr:3.10, k:95, t:4, vg:1, s:1, d:'Our signature masala brewed with barista oat milk.' },
    // Premium Tea
    { id:'m-assam', c:'premium-tea', n:'Single-Estate Assam', pr:3.00, k:5, t:4, vg:1, s:0, d:'Malty, full-bodied black tea served with milk on the side.' },
    { id:'m-darjeeling', c:'premium-tea', n:'Darjeeling First Flush', pr:3.40, k:2, t:4, vg:1, p:1, s:0, d:'Delicate, muscatel “champagne of teas”, brewed light.' },
    { id:'m-kahwa', c:'premium-tea', n:'Kashmiri Kahwa', pr:3.40, k:60, t:5, vg:1, p:1, s:0, d:'Green tea with saffron, cinnamon and slivered almonds.' },
    { id:'m-nilgiri', c:'premium-tea', n:'Nilgiri Green', pr:3.10, k:2, t:4, vg:1, s:0, d:'Bright, floral high-grown green tea from the Blue Mountains.' },
    { id:'m-lemongrass', c:'premium-tea', n:'Lemongrass & Mint', pr:3.10, k:4, t:4, vg:1, s:0, d:'Caffeine-free herbal infusion, clean and refreshing.' },
    { id:'m-rose', c:'premium-tea', n:'Gulab Rose Chai', pr:3.30, k:90, t:5, v:1, s:0, d:'Black tea infused with rose petals and a touch of honey.' },
    // Coffee
    { id:'m-filter', c:'coffee', n:'Filter Coffee', pr:3.00, k:90, t:5, v:1, p:1, s:0, d:'South Indian drip coffee, frothy and strong, pulled by hand.' },
    { id:'m-cold-coffee', c:'coffee', n:'Cold Coffee', pr:3.60, k:210, t:3, v:1, p:1, s:0, d:'Thick, blended and iced with a whisper of vanilla.' },
    { id:'m-cappuccino', c:'coffee', n:'Cappuccino', pr:3.20, k:120, t:3, v:1, s:0, d:'Espresso, steamed milk and a velvet cap of foam.' },
    { id:'m-latte', c:'coffee', n:'Café Latte', pr:3.30, k:150, t:3, v:1, s:0, d:'Smooth double shot with silky steamed milk.' },
    { id:'m-mocha', c:'coffee', n:'Chocolate Mocha', pr:3.70, k:240, t:3, v:1, s:0, d:'Espresso and rich cocoa, topped with cream.' },
    { id:'m-espresso', c:'coffee', n:'Double Espresso', pr:2.60, k:10, t:2, vg:1, s:0, d:'Two bold shots, thick crema, no fuss.' },
    // Cold Drinks
    { id:'m-sweet-lassi', c:'cold-drinks', n:'Sweet Lassi', pr:3.20, k:200, t:3, v:1, p:1, s:0, d:'Creamy whipped yoghurt, cooling and lightly sweet.' },
    { id:'m-mango-lassi', c:'cold-drinks', n:'Mango Lassi', pr:3.60, k:230, t:3, v:1, p:1, s:0, d:'Alphonso mango blended with thick curd. A café classic.' },
    { id:'m-masala-chaas', c:'cold-drinks', n:'Masala Chaas', pr:2.80, k:70, t:3, v:1, s:1, d:'Spiced buttermilk with cumin, mint and curry leaf.' },
    { id:'m-jaljeera', c:'cold-drinks', n:'Jaljeera Cooler', pr:2.90, k:60, t:3, vg:1, s:2, d:'Tangy cumin-mint quencher with a kick of black salt.' },
    { id:'m-rose-milk', c:'cold-drinks', n:'Rose Falooda Milk', pr:4.20, k:320, t:5, v:1, s:0, d:'Rose syrup, vermicelli, basil seeds and ice cream.' },
    { id:'m-nimbu', c:'cold-drinks', n:'Nimbu Soda', pr:2.60, k:80, t:2, vg:1, s:1, d:'Fresh lime, soda and a choice of sweet or salted.' },
    // Street Food
    { id:'m-samosa', c:'street-food', n:'Samosa (2)', pr:1.80, k:260, t:6, v:1, p:1, s:1, d:'Crisp pastry parcels of spiced potato and pea.' },
    { id:'m-vada-pav', c:'street-food', n:'Vada Pav', pr:3.20, k:290, t:7, v:1, p:1, s:2, d:'Mumbai’s spiced potato slider with garlic chutney.' },
    { id:'m-pav-bhaji', c:'street-food', n:'Pav Bhaji', pr:5.50, k:520, t:9, v:1, p:1, s:2, d:'Buttery mashed vegetable curry with toasted pav rolls.' },
    { id:'m-pani-puri', c:'street-food', n:'Pani Puri (6)', pr:3.80, k:210, t:5, vg:1, s:2, d:'Crisp shells filled with spiced water, potato and chickpea.' },
    { id:'m-bhel', c:'street-food', n:'Bhel Puri', pr:3.90, k:240, t:5, vg:1, s:1, d:'Puffed rice tossed with chutneys, onion and sev.' },
    { id:'m-veg-puff', c:'street-food', n:'Veg Puff', pr:1.90, k:230, t:5, v:1, s:1, d:'Flaky puff pastry with masala vegetables.' },
    { id:'m-paneer-puff', c:'street-food', n:'Paneer Puff', pr:2.40, k:280, t:5, v:1, s:1, d:'Golden puff filled with spiced paneer.' },
    { id:'m-maggi', c:'street-food', n:'Masala Maggi', pr:3.50, k:350, t:8, v:1, s:1, d:'Comfort noodles tossed with vegetables and spice.' },
    { id:'m-fries', c:'street-food', n:'Masala Fries', pr:2.90, k:310, t:7, vg:1, s:1, d:'Crisp fries dusted with tangy chaat masala.' },
    { id:'m-aloo-tikki', c:'street-food', n:'Aloo Tikki Chaat', pr:4.20, k:330, t:8, v:1, s:2, d:'Crispy potato patties, yoghurt, chutneys and sev.' },
    // Breakfast
    { id:'m-masala-dosa', c:'breakfast', n:'Masala Dosa', pr:5.90, k:400, t:10, vg:1, p:1, s:1, d:'Crisp rice crêpe with spiced potato, sambar and chutney.' },
    { id:'m-idli', c:'breakfast', n:'Idli Sambar (3)', pr:4.60, k:250, t:8, vg:1, s:1, d:'Steamed rice cakes with lentil sambar and coconut chutney.' },
    { id:'m-poha', c:'breakfast', n:'Poha', pr:4.20, k:270, t:7, vg:1, s:1, d:'Flattened rice with onion, peanuts, curry leaf and lime.' },
    { id:'m-upma', c:'breakfast', n:'Rava Upma', pr:4.20, k:290, t:7, v:1, s:1, d:'Savoury semolina with vegetables and cashew.' },
    { id:'m-chole-bhature', c:'breakfast', n:'Chole Bhature', pr:6.40, k:620, t:11, v:1, p:1, s:2, d:'Spiced chickpea curry with fluffy fried bhature.' },
    { id:'m-paratha', c:'breakfast', n:'Aloo Paratha', pr:4.80, k:380, t:9, v:1, s:1, d:'Stuffed potato flatbread with butter and pickle.' },
    // Sandwiches
    { id:'m-bombay-sandwich', c:'sandwiches', n:'Bombay Grilled Sandwich', pr:3.80, k:340, t:7, v:1, p:1, s:1, d:'Layered potato, cucumber and mint chutney, grilled crisp.' },
    { id:'m-cheese-sandwich', c:'sandwiches', n:'Cheese Chilli Toastie', pr:3.90, k:420, t:7, v:1, s:2, d:'Molten cheese with green chilli and coriander.' },
    { id:'m-paneer-sandwich', c:'sandwiches', n:'Tandoori Paneer Sandwich', pr:4.60, k:450, t:8, v:1, s:1, d:'Smoky marinated paneer with mint mayo.' },
    { id:'m-veg-club', c:'sandwiches', n:'Masala Veg Club', pr:4.80, k:470, t:8, v:1, s:1, d:'Triple-decker with spiced veg, chutney and slaw.' },
    // Wraps
    { id:'m-paneer-kathi', c:'wraps', n:'Paneer Kathi Roll', pr:5.60, k:480, t:9, v:1, p:1, s:1, d:'Griddled paneer, peppers and onion in a flaky paratha.' },
    { id:'m-aloo-wrap', c:'wraps', n:'Aloo Masala Wrap', pr:4.90, k:440, t:8, vg:1, s:1, d:'Spiced potato, onion and mint chutney rolled warm.' },
    { id:'m-chana-wrap', c:'wraps', n:'Chana Chaat Wrap', pr:5.20, k:430, t:9, vg:1, s:2, d:'Tangy chickpea chaat with onion and coriander.' },
    { id:'m-veg-frankie', c:'wraps', n:'Veg Frankie', pr:5.00, k:460, t:9, v:1, s:1, d:'Mumbai-style roll with masala veg and pickled onion.' },
    // Desserts
    { id:'m-gulab-jamun', c:'desserts', n:'Gulab Jamun (2)', pr:3.20, k:300, t:3, v:1, p:1, s:0, d:'Warm milk dumplings in rose-cardamom syrup.' },
    { id:'m-jalebi', c:'desserts', n:'Jalebi', pr:3.00, k:280, t:4, v:1, s:0, d:'Crisp saffron spirals, sticky and sweet.' },
    { id:'m-rasmalai', c:'desserts', n:'Rasmalai (2)', pr:3.80, k:260, t:3, v:1, s:0, d:'Soft cheese discs in saffron-pistachio cream.' },
    { id:'m-kheer', c:'desserts', n:'Rice Kheer', pr:3.40, k:240, t:4, v:1, s:0, d:'Slow-cooked rice pudding with cardamom and nuts.' },
    { id:'m-kulfi', c:'desserts', n:'Malai Kulfi', pr:3.30, k:220, t:2, v:1, s:0, d:'Dense, slow-churned Indian ice cream on a stick.' },
    // Kids
    { id:'m-kids-cocoa', c:'kids', n:'Warm Cocoa', pr:2.40, k:180, t:3, v:1, s:0, d:'Gentle hot chocolate with a marshmallow.' },
    { id:'m-kids-milk', c:'kids', n:'Badam Milk', pr:2.60, k:190, t:4, v:1, s:0, d:'Sweet almond milk, lightly spiced and mild.' },
    { id:'m-kids-maggi', c:'kids', n:'Plain Maggi', pr:2.80, k:300, t:7, v:1, s:0, d:'Mild noodles, no chilli — a little-one favourite.' },
    { id:'m-kids-fries', c:'kids', n:'Little Fries', pr:2.20, k:230, t:6, vg:1, s:0, d:'A small portion of plain, crisp fries.' },
    // Combos
    { id:'m-combo-chai-samosa', c:'combos', n:'Chai + Samosa', pr:4.00, k:380, t:6, v:1, p:1, s:1, d:'A masala chai and two hot samosas. The classic pairing.' },
    { id:'m-combo-vadapav-chai', c:'combos', n:'Vada Pav + Chai', pr:5.20, k:410, t:8, v:1, s:2, d:'Mumbai slider with a cutting chai to wash it down.' },
    { id:'m-combo-breakfast', c:'combos', n:'Dosa + Filter Coffee', pr:8.20, k:490, t:11, vg:1, s:1, d:'Masala dosa with a frothy South Indian filter coffee.' },
    { id:'m-combo-sweet', c:'combos', n:'Kahwa + Gulab Jamun', pr:5.90, k:360, t:5, v:1, s:0, d:'Golden kahwa with warm gulab jamun for two to share.' },
    // Seasonal
    { id:'m-winter-haldi', c:'seasonal', n:'Winter Haldi Doodh', pr:3.40, k:170, t:5, v:1, s:0, d:'Golden turmeric milk with black pepper and jaggery.' },
    { id:'m-monsoon-pakora', c:'seasonal', n:'Monsoon Pakora Basket', pr:4.60, k:420, t:9, vg:1, p:1, s:2, d:'Mixed vegetable fritters — our rainy-day special.' },
    { id:'m-summer-aamras', c:'seasonal', n:'Summer Aam Panna', pr:3.30, k:120, t:4, vg:1, s:1, d:'Raw-mango cooler, sweet-sour and gently spiced.' }
  ];

  const gbp = (n) => '£' + n.toFixed(2);
  const chilis = (s) => s > 0 ? `<span title="Spice level ${s}">${ic.chili.repeat(s)}</span>` : '';

  function card(it) {
    const badges = [];
    if (it.p) badges.push('<span class="badge pop">Popular</span>');
    badges.push(it.vg ? '<span class="badge vegan">Vegan</span>' : '<span class="badge veg">Veg</span>');
    return `
    <article class="card menu-card" data-id="${it.id}" data-name="${it.n.toLowerCase()}" data-desc="${it.d.toLowerCase()}"
             data-cat="${it.c}" data-veg="${it.v?1:0}" data-vegan="${it.vg?1:0}" data-pop="${it.p?1:0}" data-spice="${it.s}">
      <div class="card-media">
        <span class="card-badges">${badges.join('')}</span>
        <button class="wish" data-wish="${it.id}" data-name="${it.n}" aria-label="Save ${it.n} to wishlist">${ic.heart}</button>
        <img src="images/menu/${it.id.replace('m-','')}.jpg" alt="${it.n}" data-fallback="${it.n}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-title-row"><h3 style="font-size:1.08rem">${it.n}</h3><span class="card-price">${gbp(it.pr)}</span></div>
        <p class="card-desc" style="font-size:.86rem">${it.d}</p>
        <div class="card-meta">
          <span>${ic.kcal}${it.k} kcal</span>
          <span>${ic.time}${it.t} min</span>
          ${it.s>0?`<span class="spice-meta" style="color:var(--orange-deep)"><svg viewBox="0 0 24 24" style="stroke:var(--orange-deep)">${ic.chili.replace(/<\/?svg[^>]*>/g,'')}</svg>${['Mild','Medium','Hot'][it.s-1]}</span>`:''}
        </div>
        <div class="card-foot">
          <div class="stepper"><button type="button" data-step-down aria-label="Decrease">−</button><span>1</span><button type="button" data-step-up aria-label="Increase">+</button></div>
          <button class="btn btn-primary btn-sm add-btn" data-add data-id="${it.id}" data-name="${it.n}" data-price="${it.pr}" data-img="images/menu/${it.id.replace('m-','')}.jpg">Add</button>
        </div>
      </div>
    </article>`;
  }

  /* ---------------------------- render ---------------------------------- */
  const root = document.getElementById('menuRoot');
  function render() {
    root.innerHTML = CATS.map(([slug, title, sub]) => `
      <section class="menu-cat" id="${slug}" data-cat-section="${slug}">
        <h2 class="menu-cat-title">${title}</h2>
        <p class="menu-cat-sub">${sub}</p>
        <div class="menu-grid" data-grid="${slug}">
          ${ITEMS.filter((i) => i.c === slug).map(card).join('')}
        </div>
      </section>`).join('') +
      `<div class="no-results" id="noResults" hidden>
         <svg viewBox="0 0 24 24" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
         <h3>Nothing matches that</h3>
         <p>Try a different search or filter.</p>
       </div>`;

    if (window.ChaiFallbacks) window.ChaiFallbacks();

    // wishlist
    document.querySelectorAll('[data-wish]').forEach((btn) => {
      if (window.ChaiWish && window.ChaiWish.has(btn.dataset.wish)) btn.classList.add('active');
      btn.addEventListener('click', () => { window.ChaiWish.toggle(btn.dataset.wish, btn.dataset.name); btn.classList.toggle('active'); });
    });
  }

  /* ---------------------------- filter/search --------------------------- */
  let activeCat = 'all';
  let activeDiet = 'all';
  let query = '';

  function apply() {
    const q = query.trim().toLowerCase();
    let anyVisible = false;
    ITEMS.forEach((it) => {
      const el = root.querySelector(`.menu-card[data-id="${it.id}"]`);
      if (!el) return;
      const matchCat = activeCat === 'all' || it.c === activeCat;
      const matchDiet = activeDiet === 'all'
        || (activeDiet === 'veg' && it.v)
        || (activeDiet === 'vegan' && it.vg)
        || (activeDiet === 'popular' && it.p);
      const matchQ = !q || it.n.toLowerCase().includes(q) || it.d.toLowerCase().includes(q);
      const show = matchCat && matchDiet && matchQ;
      el.style.display = show ? '' : 'none';
      if (show) anyVisible = true;
    });
    // hide empty category sections
    root.querySelectorAll('[data-cat-section]').forEach((sec) => {
      const visible = sec.querySelectorAll('.menu-card:not([style*="display: none"])').length
        - sec.querySelectorAll('.menu-card[style*="display: none"]').length;
      const hasVisible = Array.from(sec.querySelectorAll('.menu-card')).some((c) => c.style.display !== 'none');
      sec.hidden = !hasVisible;
    });
    document.getElementById('noResults').hidden = anyVisible;
  }

  function initControls() {
    const search = document.getElementById('menuSearch');
    if (search) search.addEventListener('input', (e) => { query = e.target.value; apply(); });

    document.querySelectorAll('[data-filter-cat]').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-cat]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        activeCat = chip.dataset.filterCat;
        apply();
        // scroll to first section when picking a specific category
        if (activeCat !== 'all') {
          const sec = document.getElementById(activeCat);
          if (sec) window.scrollTo({ top: sec.offsetTop - 150, behavior: 'smooth' });
        }
      });
    });
    document.querySelectorAll('[data-filter-diet]').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-diet]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        activeDiet = chip.dataset.filterDiet;
        apply();
      });
    });
  }

  /* build category chips from CATS */
  function buildChips() {
    const wrap = document.getElementById('catFilters');
    if (!wrap) return;
    wrap.innerHTML = `<button class="chip active" data-filter-cat="all">All</button>` +
      CATS.map(([slug, title]) => `<button class="chip" data-filter-cat="${slug}">${title}</button>`).join('');
  }

  function boot() {
    buildChips();
    render();
    initControls();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
