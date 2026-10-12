# Chai Adda ☕

> **Authentic. Every Time.** — a premium Indian tea-café brand website.

A modern, fully responsive marketing + online-ordering site for a fictional Indian chai café,
designed to Apple-grade polish: warm heritage colours, Playfair Display headlines, subtle motion,
and a working client-side cart.

**⚠️ This is a fictional brand built as a student case-study project.** It is not a real business,
nothing is for sale, and no orders are processed. A discreet note to this effect appears in the
footer of every page.

---

## What's built

Six complete, interlinked pages:

| Page | Highlights |
|------|-----------|
| **Home** (`index.html`) | Hero, trust bar, "why us" cards, popular drinks & snacks, Google-style reviews, Instagram gallery, newsletter |
| **Menu** (`menu.html`) | 64 items across 12 categories, live search, category + dietary filters, veg/vegan badges, spice level, calories, prep time, quantity steppers, wishlist |
| **About** (`about.html`) | Our story, mission/vision/tea-philosophy, meet-the-team, journey timeline |
| **Locations** (`locations.html`) | Interactive OpenStreetMap, three Glasgow café cards with hours, phone, parking & directions |
| **Order Online** (`order.html`) | Full ordering flow: delivery/pickup toggle, live order summary, quantity edits, promo codes, delivery-fee & ETA logic, payment methods, demo checkout with confirmation |
| **Contact** (`contact.html`) | Validated contact form, live map, table reservation form, FAQ accordion, contact details |

Every page shares a **working shopping cart** (slide-out drawer, quantity controls, subtotal +
delivery logic, saved to `localStorage`), a **wishlist**, scroll-reveal animations, a sticky
navigation bar, a floating order button, toast notifications, and a graceful image-placeholder
system. The cart persists as you move between pages and drives the Order page summary in real time.

### Promo codes (Order page)

| Code | Effect |
|------|--------|
| `CHAI10` | 10% off |
| `STUDENT` | 15% off |
| `WELCOME` | £2 off (min £10) |
| `FREEDEL` | Free delivery |

---

## Tech

Deliberately **dependency-free** so it runs anywhere and deploys to GitHub Pages with zero build:

- Hand-written HTML5 + modern CSS (custom properties, grid, `clamp()` fluid type)
- Vanilla JavaScript (ES6, no framework, no bundler)
- Google Fonts: Playfair Display + Inter
- Inline SVG icons and logo

No `npm install`, no compile step, no server code.

---

## Run it locally

Just open `index.html` in a browser — or, to make relative paths and `fetch` behave exactly like
production, serve the folder:

```bash
cd chai-adda
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Design system

The full rationale — 5-brand reference analysis, colour psychology with **measured** WCAG
contrast ratios, the typography system, and the Fibonacci spacing scale — is documented in
**[`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md)**.

Spacing uses a **Fibonacci scale** (8 · 13 · 21 · 34 · 55 · 89 · 144), whose consecutive
ratios converge on φ ≈ 1.618 — giving more usable steps than a doubling 8-point grid and
keeping nested padding proportional at every level. Default rhythm is **21px**.

All text meets **WCAG 2.2 AA** (verified by computation, not assertion).

## Photography

**The site ships with real photographs already wired in.** 92 free-to-use images are served from
the Unsplash CDN and mapped in [`js/photos.js`](js/photos.js) — hero, all 6 drink cards, all 8 snack
cards, the Instagram gallery, the 3 location storefronts and **all 64 menu items**.

Every URL was harvested from Unsplash search results, verified to return HTTP 200, and **visually
reviewed on a contact sheet** to confirm the photo actually depicts the item it's assigned to.

*Licence:* the [Unsplash License](https://unsplash.com/license) permits free commercial and
non-commercial use with no attribution required.

### Swapping in your own photos

Two options:

1. **Replace the map** — edit `js/photos.js` and point any key at your own URL.
2. **Use local files** — drop a real file at the path a key names (e.g. `images/menu/samosa.jpg`)
   and delete that key; the site prefers the map, then the local file, then the illustration.

[`IMAGE-PROMPTS.md`](IMAGE-PROMPTS.md) still lists all 96 slots with generation prompts if you'd
rather produce bespoke brand photography.

### Graceful degradation

Anything with no photo — currently the 4 team portraits, deliberately, since no verified portrait
photography was sourced — falls back to an original branded SVG illustration from `assets/art/`,
picked automatically by item type. Nothing ever renders as a broken image.

---

## Deploy to GitHub Pages

1. Create a new GitHub repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Chai Adda case-study site"
   git branch -M main
   git remote add origin https://github.com/<you>/chai-adda.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` / `root`, save.
3. Your site goes live at `https://<you>.github.io/chai-adda/` within a minute or two.

---

## Project structure

```
chai-adda/
├── index.html          # Home
├── menu.html           # Menu
├── about.html          # About
├── locations.html      # Locations
├── order.html          # Order Online
├── contact.html        # Contact
├── 404.html            # Not-found page (styled, noindex)
├── robots.txt          # Crawler directives
├── sitemap.xml         # All 6 pages
├── css/
│   └── styles.css      # Full design system + components
├── js/
│   ├── main.js         # Cart, nav, reveals, toasts, image fallbacks (shared)
│   ├── site.js         # Shared footer injection (About/Locations/Order/Contact)
│   ├── home.js         # Home content: drinks, snacks, reviews, gallery
│   ├── menu.js         # Menu catalogue (64 items), search + filters
│   ├── order.js        # Order flow: type toggle, coupons, summary, checkout
│   ├── contact.js      # Form validation, reservation, FAQ accordion
│   └── photos.js       # 92 verified photo URLs mapped to image slots
├── assets/
│   ├── logo.svg        # Wordmark + cup logo / favicon
│   └── art/            # 9 original SVG illustrations (image placeholders)
├── images/             # Optional: local photo overrides
├── DESIGN-SYSTEM.md    # 5-brand analysis, colour psychology, type, Fibonacci
├── IMAGE-PROMPTS.md    # All 96 slots + generation prompts (optional)
└── README.md
```

---

## Design system (quick reference)

| Token | Value |
|-------|-------|
| Primary green | `#2F5D4C` |
| Chai orange | `#C96A2E` |
| Cream background | `#F8F4EC` |
| Dark text | `#202020` |
| Headings | Playfair Display |
| Body | Inter |

Accessibility: semantic landmarks, ARIA on the cart dialog and controls, keyboard-navigable,
visible focus rings, `prefers-reduced-motion` respected, alt text on all imagery.

---

*Built as a portfolio / coursework case study. Brand, menu, prices, reviews and address are
fictional.*
