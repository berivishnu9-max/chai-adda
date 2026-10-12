# Chai Adda — Image Generation Guide

Everything you need to generate the photography for the site. Each image below lists the
**exact file path** the code expects and a **ready-to-paste prompt** for GPT-4o / Gemini / Midjourney.

> The site works right now *without* any images — every slot shows a tidy branded placeholder
> (dark-green card with the item name). As you drop real photos into `images/…` with the
> filenames below, they replace the placeholders automatically. You can add them in any order.

---

## 1. How to use this

1. Generate each image using the prompt provided.
2. Save it as a `.jpg` at the **exact path** shown (create the sub-folders if needed).
3. Refresh the page — the photo appears in place of the placeholder.

**Recommended output sizes**
| Use | Aspect | Suggested px |
|-----|--------|--------------|
| Hero background | 16:9 (landscape) | 2400 × 1350 |
| About / story | 4:5 (portrait) | 1200 × 1500 |
| Product & menu cards | 4:3 (landscape) | 1000 × 750 |
| Gallery tiles | 1:1 (square) | 1000 × 1000 |

Keep files reasonably light (aim < 300 KB each) — export as JPG quality ~80. This protects the
Lighthouse performance score. Tools like [squoosh.app](https://squoosh.app) compress in-browser.

---

## 2. Master style suffix (append to EVERY prompt)

Paste this at the end of each subject prompt so the whole set feels shot by one photographer:

> *"Professional commercial food photography, natural soft window light, shallow depth of field,
> warm inviting Indian café atmosphere, authentic textures, gentle rising steam where hot,
> earthy props on rustic wood and stone, colour palette of deep forest green, warm terracotta
> orange and cream, photorealistic, ultra-detailed, no text, no watermark, no logos, no people's
> faces distorted, 8k."*

**Brand colours to echo in props/background:** forest green `#2F5D4C`, chai orange `#C96A2E`,
cream `#F8F4EC`.

---

## 3. Hero & brand images

| File path | Subject prompt |
|-----------|----------------|
| `images/hero.jpg` | Two steaming earthen clay cups (kulhads) of masala chai on a dark café counter, cinnamon sticks and green cardamom scattered, dramatic warm side-light, cosy blurred café interior behind. |
| `images/about-story.jpg` | A chai wallah pouring golden milky chai in a long stream between two steel tumblers, motion blur on the stream, close-up hands, steam rising, warm kitchen light. Portrait orientation. |

---

## 4. Home page — "Popular Drinks" cards

| File path | Subject prompt |
|-----------|----------------|
| `images/drinks/masala-chai.jpg` | A single clay kulhad of frothy masala chai, whole spices beside it, top-down-ish angle, steam. |
| `images/drinks/elaichi-chai.jpg` | Creamy cardamom chai in a glass tumbler, green cardamom pods scattered, soft light. |
| `images/drinks/ginger-chai.jpg` | Amber ginger chai in a steel cutting-chai glass, fresh ginger root beside it. |
| `images/drinks/kashmiri-kahwa.jpg` | Golden saffron kahwa in a clear glass cup, saffron threads and slivered almonds, delicate. |
| `images/drinks/filter-coffee.jpg` | South Indian filter coffee frothy in a steel tumbler and davara, poured from height. |
| `images/drinks/cold-coffee.jpg` | Thick blended iced cold coffee in a tall glass, cream on top, condensation, bright. |

> **Tip:** these six overlap with menu items. If you like, generate once and **copy** the file to
> the matching menu path (see §7) so you don't regenerate — e.g. `drinks/masala-chai.jpg` →
> `menu/masala.jpg`, `drinks/filter-coffee.jpg` → `menu/filter.jpg`, `drinks/cold-coffee.jpg` →
> `menu/cold-coffee.jpg`, `drinks/kashmiri-kahwa.jpg` → `menu/kahwa.jpg`.

---

## 5. Home page — "Popular Snacks" cards

| File path | Subject prompt |
|-----------|----------------|
| `images/snacks/samosa.jpg` | Two golden crisp samosas on a steel plate with green and tamarind chutney, flaky texture. |
| `images/snacks/veg-puff.jpg` | Flaky golden vegetable puff pastry, one bitten to show masala filling. |
| `images/snacks/paneer-puff.jpg` | Golden puff pastry with spiced paneer filling visible, glossy top. |
| `images/snacks/vada-pav.jpg` | Mumbai vada pav in a soft bun with green chutney and a fried chilli, rustic paper. |
| `images/snacks/pav-bhaji.jpg` | Buttery pav bhaji — red-orange mashed vegetable curry, butter cube, soft toasted pav, onion & lime. |
| `images/snacks/maggi.jpg` | Masala Maggi noodles in a steel bowl with vegetables, steam, cosy. |
| `images/snacks/cheese-sandwich.jpg` | Grilled Bombay cheese sandwich cut diagonally, melting cheese, chutney, grill marks. |
| `images/snacks/french-fries.jpg` | Crisp fries dusted with red chaat masala in a paper cone. |

---

## 6. Home page — Instagram gallery (square)

| File path | Subject prompt |
|-----------|----------------|
| `images/gallery/01.jpg` | Overhead tray of several clay kulhads of masala chai, spices around, flat-lay. |
| `images/gallery/02.jpg` | Samosas frying to golden in a kadai, oil bubbles, action shot. |
| `images/gallery/03.jpg` | Warm wooden café interior of an Indian tea house, hanging lights, plants, empty tables. |
| `images/gallery/04.jpg` | Chai poured in a long stream between two cups, steam and motion. |
| `images/gallery/05.jpg` | A diverse group of friends laughing over cups of chai at a café table, candid, warm. |
| `images/gallery/06.jpg` | Pav bhaji plated with buttered pav rolls, top-down, vibrant. |
| `images/gallery/07.jpg` | Flat-lay of whole Indian spices — cardamom, cinnamon, cloves, star anise, ginger. |
| `images/gallery/08.jpg` | A smiling barista behind a café counter handing over a clay cup, warm bokeh. |

---

## 7. Menu page — all 64 items

Path pattern: **`images/menu/<slug>.jpg`** (4:3 landscape). Prepend nothing else — just use the
subject text plus the master style suffix from §2.

### Signature Chai
| File | Subject |
|------|---------|
| `images/menu/masala.jpg` | Frothy masala chai in a clay kulhad, whole spices. |
| `images/menu/elaichi.jpg` | Cardamom chai in a glass tumbler, cardamom pods. |
| `images/menu/ginger.jpg` | Ginger chai in a cutting-chai glass, fresh ginger. |
| `images/menu/adrak-tulsi.jpg` | Ginger–tulsi chai with fresh holy basil leaves beside the glass. |
| `images/menu/kesar.jpg` | Rich saffron malai chai, thick and creamy, saffron on top. |
| `images/menu/masala-vegan.jpg` | Masala chai made with oat milk, carton hint, clay cup. |

### Premium Tea
| File | Subject |
|------|---------|
| `images/menu/assam.jpg` | Dark Assam black tea in a white cup, loose leaves beside. |
| `images/menu/darjeeling.jpg` | Light golden Darjeeling tea in a clear glass, delicate leaves. |
| `images/menu/kahwa.jpg` | Saffron Kashmiri kahwa in a glass cup with almonds. |
| `images/menu/nilgiri.jpg` | Bright green Nilgiri tea in a clear glass, fresh look. |
| `images/menu/lemongrass.jpg` | Herbal lemongrass & mint infusion, fresh stalks and mint. |
| `images/menu/rose.jpg` | Rose-infused black tea with dried rose petals, romantic light. |

### Coffee
| File | Subject |
|------|---------|
| `images/menu/filter.jpg` | South Indian filter coffee, frothy, steel tumbler & davara. |
| `images/menu/cold-coffee.jpg` | Tall glass of thick iced cold coffee with cream. |
| `images/menu/cappuccino.jpg` | Cappuccino with latte-art foam in a ceramic cup. |
| `images/menu/latte.jpg` | Café latte in a glass, silky microfoam, side light. |
| `images/menu/mocha.jpg` | Chocolate mocha topped with cream and cocoa dusting. |
| `images/menu/espresso.jpg` | Double espresso shot with rich crema in a small cup. |

### Cold Drinks
| File | Subject |
|------|---------|
| `images/menu/sweet-lassi.jpg` | Creamy sweet lassi in a tall steel glass, frothy top. |
| `images/menu/mango-lassi.jpg` | Bright orange mango lassi in a glass, mango slice garnish. |
| `images/menu/masala-chaas.jpg` | Spiced buttermilk (chaas) with mint and cumin, cool glass. |
| `images/menu/jaljeera.jpg` | Tangy green jaljeera cooler with mint, black-salt rim. |
| `images/menu/rose-milk.jpg` | Pink rose falooda milk with vermicelli and ice cream, tall glass. |
| `images/menu/nimbu.jpg` | Fresh lime soda with a lemon wheel and bubbles. |

### Street Food
| File | Subject |
|------|---------|
| `images/menu/samosa.jpg` | Two crisp golden samosas with chutneys. |
| `images/menu/vada-pav.jpg` | Vada pav in a bun with fried chilli and chutney. |
| `images/menu/pav-bhaji.jpg` | Buttery pav bhaji with pav, onion and lime. |
| `images/menu/pani-puri.jpg` | Plate of pani puri with spiced water in a jug, hand holding one. |
| `images/menu/bhel.jpg` | Bhel puri in a paper cone, colourful, sev and coriander. |
| `images/menu/veg-puff.jpg` | Golden veg puff pastry, flaky. |
| `images/menu/paneer-puff.jpg` | Paneer puff with spiced filling visible. |
| `images/menu/maggi.jpg` | Masala Maggi noodles in a steel bowl, steam. |
| `images/menu/fries.jpg` | Masala fries in a paper cone with chaat masala. |
| `images/menu/aloo-tikki.jpg` | Aloo tikki chaat with yoghurt, chutneys and sev. |

### Breakfast
| File | Subject |
|------|---------|
| `images/menu/masala-dosa.jpg` | Crisp golden masala dosa with sambar and coconut chutney. |
| `images/menu/idli.jpg` | Three soft white idlis with sambar and chutney. |
| `images/menu/poha.jpg` | Yellow poha with peanuts, curry leaf and lime, garnished. |
| `images/menu/upma.jpg` | Savoury rava upma with cashews and vegetables in a bowl. |
| `images/menu/chole-bhature.jpg` | Fluffy puffed bhature with spicy chole and onions. |
| `images/menu/paratha.jpg` | Aloo paratha with butter melting, pickle and yoghurt. |

### Sandwiches
| File | Subject |
|------|---------|
| `images/menu/bombay-sandwich.jpg` | Bombay grilled sandwich, layered, cut diagonally. |
| `images/menu/cheese-sandwich.jpg` | Cheese-chilli toastie with molten cheese pull. |
| `images/menu/paneer-sandwich.jpg` | Tandoori paneer sandwich, smoky, mint mayo. |
| `images/menu/veg-club.jpg` | Triple-decker masala veg club sandwich with toothpicks. |

### Wraps
| File | Subject |
|------|---------|
| `images/menu/paneer-kathi.jpg` | Paneer kathi roll wrapped in paper, filling visible. |
| `images/menu/aloo-wrap.jpg` | Aloo masala wrap, halved, spiced potato inside. |
| `images/menu/chana-wrap.jpg` | Chana chaat wrap with chickpeas and onion. |
| `images/menu/veg-frankie.jpg` | Mumbai veg frankie roll with pickled onion. |

### Desserts
| File | Subject |
|------|---------|
| `images/menu/gulab-jamun.jpg` | Two glossy gulab jamun in syrup, warm, garnished with pistachio. |
| `images/menu/jalebi.jpg` | Crisp orange jalebi spirals, sticky, on a plate. |
| `images/menu/rasmalai.jpg` | Two rasmalai discs in saffron cream with pistachio. |
| `images/menu/kheer.jpg` | Rice kheer in a bowl with cardamom and nuts. |
| `images/menu/kulfi.jpg` | Malai kulfi on a stick, pistachio flecks, dramatic light. |

### Kids Menu
| File | Subject |
|------|---------|
| `images/menu/kids-cocoa.jpg` | Warm cocoa in a mug with a marshmallow, cosy. |
| `images/menu/kids-milk.jpg` | Sweet almond badam milk in a small glass, gently spiced. |
| `images/menu/kids-maggi.jpg` | Plain Maggi noodles in a small bowl, mild, kid-friendly. |
| `images/menu/kids-fries.jpg` | Small portion of plain golden fries in a cup. |

### Combos
| File | Subject |
|------|---------|
| `images/menu/combo-chai-samosa.jpg` | A clay cup of chai next to two samosas on a tray — classic pairing. |
| `images/menu/combo-vadapav-chai.jpg` | Vada pav with a cutting-chai glass beside it. |
| `images/menu/combo-breakfast.jpg` | Masala dosa with a steel tumbler of filter coffee. |
| `images/menu/combo-sweet.jpg` | Glass of golden kahwa with gulab jamun for two. |

### Seasonal Specials
| File | Subject |
|------|---------|
| `images/menu/winter-haldi.jpg` | Golden turmeric haldi doodh in a mug with black pepper, cosy winter mood. |
| `images/menu/monsoon-pakora.jpg` | Basket of mixed vegetable pakoras with chutney, rainy-day mood. |
| `images/menu/summer-aamras.jpg` | Raw-mango aam panna cooler, bright green, mint, refreshing. |

---

## 8. About, Team & Locations pages

### About page
| File path | Subject prompt |
|-----------|----------------|
| `images/about/story.jpg` | A chai wallah pouring golden milky chai in a long stream between two steel tumblers, motion blur, steam, warm kitchen. Portrait 4:5. *(You can reuse `images/about-story.jpg` from §3 — just copy it to this path.)* |

### Team portraits (square, 1:1)
Warm, natural portraits — real, friendly, diverse people in a café setting, soft window light,
genuine smiles, no distortion. Append the master style suffix.

| File path | Subject prompt |
|-----------|----------------|
| `images/team/ayaan.jpg` | Friendly South Asian man in his 30s in an apron behind a café counter, holding a clay chai cup, warm smile. |
| `images/team/meera.jpg` | Warm South Asian woman chef in her 40s in the café kitchen, apron, confident friendly expression. |
| `images/team/rohan.jpg` | Approachable South Asian man in his late 20s, café manager, casual shirt, welcoming smile at the counter. |
| `images/team/grace.jpg` | Cheerful Scottish woman in her 30s hosting in the café, warm and welcoming, cosy interior behind. |

### Location storefronts (landscape, 16:10)
Attractive café exteriors with green-and-cream Chai Adda signage, Glasgow street setting, inviting.

| File path | Subject prompt |
|-----------|----------------|
| `images/locations/city-centre.jpg` | Charming café storefront on a busy Glasgow city-centre street, forest-green frontage, warm window glow, people passing. |
| `images/locations/west-end.jpg` | Cosy café exterior on a leafy West End street (Byres Road feel), plants outside, bikes, relaxed vibe. |
| `images/locations/southside.jpg` | Welcoming corner café exterior in a Glasgow southside neighbourhood, outdoor seating, morning light. |

---

## 9. Logo & favicon

A clean SVG wordmark + cup logo is already included at `assets/logo.svg` (used in the nav, footer
and as the browser favicon). If you have your own Chai Adda logo, replace that one file — keep the
name `logo.svg`, or if it's a PNG, save it as `assets/logo.png` and update the `<img src>` in
`index.html` and `menu.html`.

---

**Full set: 2 brand + 6 drinks + 8 snacks + 8 gallery + 64 menu + 1 about + 4 team + 3 locations = 96 images.**
Generate what you can; anything missing stays as a clean branded placeholder.
