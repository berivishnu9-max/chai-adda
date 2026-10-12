# Chai Adda — Design System

**Research → reasoning → tokens → implementation.**
Every value below is justified, and every accessibility claim is *computed*, not asserted.

> **Method note.** This is a focused analysis of **5 reference brands**, not a survey of hundreds.
> The patterns cited are drawn from established design knowledge of these brands and from
> general UX/colour/typography research — not from a live audit performed today. Contrast
> ratios, by contrast, *are* measured: every number in §2 was computed with the WCAG 2.2
> relative-luminance formula against this project's actual token values.

---

## 1. Phase 1 — Five reference brands

Five were chosen to span the axes that matter for a premium chai café: **luxury heritage**,
**minimal specialty**, **ordering at scale**, **direct category competitor**, and **British
tea authority**.

| # | Brand | Category axis | The pattern worth taking | How Chai Adda applies it |
|---|-------|---------------|--------------------------|--------------------------|
| 1 | **Blue Bottle Coffee** | Minimal specialty | Extreme restraint. Enormous white space, one product per viewport, photography does all the talking. Product pages read like an editorial, not a catalogue. | Generous Fibonacci spacing (89–144px section padding), one idea per section, cards that let the image dominate (4:3 media, quiet chrome). |
| 2 | **TWG Tea** | Luxury heritage | Ceremony and provenance. Origin, estate and preparation are treated as *the* selling points; deep saturated colour + gold accents signal luxury. | "Single-estate Assam", "twelve-spice house masala", prep time on every card. Deep green + amber (`#EAB873`) on dark sections is the same gold-on-jewel-tone move. |
| 3 | **Starbucks** | Ordering at scale | Frictionless ordering. Persistent cart, sticky order CTA, delivery/pickup toggle, ETA shown *before* commitment, saved order state. | Cart persists across all 6 pages via `localStorage`; delivery/pickup segmented control; ETA in the order bar; floating order button after 620px scroll. |
| 4 | **Chaiiwala** | Direct competitor (UK chai) | Category legitimacy through breadth + locality. Big menu, clearly marked veg/vegan, branch finder, "street food" framing that is unapologetically Indian. | 64 items / 12 categories, veg + vegan badges, spice level, 3-branch locator with hours & parking. |
| 5 | **Fortnum & Mason** | British tea authority | Editorial storytelling and gifting. Heritage narrative, serif display type, tea education, occasion-led merchandising. | Playfair Display headlines, About page with origin story + timeline + tea philosophy, seasonal specials category. |

**Synthesis — the four recurring moves we adopted**

1. **Photography carries the emotion; type carries the credibility.** Never let copy compete with the image.
2. **Provenance beats adjectives.** "Single-estate Assam" outperforms "premium quality".
3. **Ordering friction is the whole conversion story.** Persist state, show ETA early, never make the user re-navigate.
4. **Restraint reads as expensive.** Fewer elements, more space, tighter palette.

---

## 2. Phase 2a — Colour psychology (with measured contrast)

### The palette and why each colour earns its place

| Token | Hex | Role | Psychological reasoning |
|-------|-----|------|------------------------|
| `--green` | `#2F5D4C` | Primary | Deep forest green reads **natural, herbal, trustworthy**. Green is the strongest signal for *plant-derived and fresh* in food contexts — critical for tea, which is a leaf. Desaturated + dark pushes it from "organic/cheap" toward **heritage and stability**. |
| `--green-deep` | `#21463A` | Immersive surfaces | Near-black green for hero, footer, dark sections. Dark surfaces create **focus and perceived premium** (the jewellery-box effect) and make warm accents glow. |
| `--orange` | `#C96A2E` | Brand accent | Warm terracotta is the colour of **brewed chai, clay kulhads and spice**. Warm hues are appetite-stimulating and increase urgency — the classic reason food brands live in the red-orange band. Also carries **Indian heritage** (terracotta, turmeric, brick). |
| `--cta` | `#B0561F` | Interactive | A darkened orange used *only* where white UI text sits on top. Preserves the warm-action psychology while clearing WCAG AA (see below). |
| `--cream` | `#F8F4EC` | Background | Warm off-white, not clinical white. Reads **comfort, milk, paper, hospitality**. Reduces glare and makes the page feel softer and more human than `#FFFFFF`. |
| `--ink` | `#202020` | Text | Soft black. Pure `#000` on cream is harsh and fatiguing; `#202020` keeps 14.85:1 while feeling warmer. |
| `--veg` / `--vegan` | `#3A8A3A` / `#2F7D5B` | Dietary | Green is the near-universal veg marker in Indian food labelling — using it here is **learned convention**, not decoration. |

**The tension we're managing:** green says *trust and freshness*, orange says *warmth and appetite*.
A tea café needs both. The resolution is proportional: green dominates surface area (calm,
premium), orange appears sparingly at decision points (appetite, action). Roughly **90/10**.

### Measured WCAG 2.2 contrast

Computed against actual token values:

| Pair | Ratio | Level | Use |
|------|------:|-------|-----|
| `--ink` on cream | **14.85** | AAA | Body text |
| `--green-deep` on cream | **9.56** | AAA | Headings |
| cream on `--green-deep` | **9.56** | AAA | Hero / footer text |
| white on `--green` | **7.52** | AAA | Dark buttons |
| `--muted` on cream | **6.13** | AA | Secondary text |
| `--gold #E7C98F` on green-deep | **6.57** | AA | Eyebrow on dark |
| white on `--cta-hover` | **6.41** | AA | Button hover |
| `--faint` on white | **5.14** | AA | Meta text on cards |
| **white on `--cta`** | **5.00** | AA | **Primary CTA label** |
| `--orange-deep` on white | **5.00** | AA | Prices |
| `--faint` on cream | **4.69** | AA | Meta text |
| `--cta` on cream | **4.56** | AA | Eyebrow labels |
| `--orange` on cream | 3.43 | AA **large only** | `.serif-accent` in headings, focus ring |

### Three real failures this audit caught and fixed

The brief's palette, applied naively, **failed WCAG AA in three places**:

| Issue | Before | After | Fix |
|-------|-------:|------:|-----|
| **Primary CTA** — white on `#C96A2E` | 3.76 ✗ | **5.00 ✓** | Button surfaces use `--cta #B0561F`; brand orange retained for display type |
| **Meta text** — `--faint #8A8A82` | 3.17 ✗ | **4.69 ✓** | Darkened to `#6E6E66` |
| **Eyebrow labels** — 0.72rem orange | 3.43 ✗ | **4.56 ✓** | Re-pointed to `--cta` |

> **The principle:** a *brand* colour and a *text* colour are different roles. `#C96A2E` is
> still the Chai Adda orange — it simply isn't allowed to carry small white text. Nothing in
> the brand identity was compromised to reach AA.

---

## 3. Phase 2b — Typography

### The pairing

| Role | Font | Reasoning |
|------|------|-----------|
| Display / headings | **Playfair Display** (600–800) | High-contrast transitional serif with Didone influence. Its thick/thin modulation signals **editorial luxury and heritage** — the same register as fashion and fine-food mastheads. Gives the brand gravitas that a sans alone cannot. |
| Body / UI | **Inter** (300–700) | Neutral humanist sans engineered for screens: tall x-height, open apertures, real UI weights. Carries **clarity and modernity**, balancing Playfair's formality so the brand reads *contemporary café*, not *museum*. |
| Prices | Inter 700 | Numerals must be instantly scannable; Playfair's thin strokes weaken small figures. |
| Buttons | Inter 600 | Semi-bold is the confidence sweet spot — 700 shouts, 500 hesitates. |
| Micro-labels | Inter 600, `.22em` tracking, uppercase | Wide tracking at small sizes reads as **considered and premium**; it's the classic luxury-retail label treatment. |

### The rule that matters most

> **Never set Playfair Display below ~18px.**

Its stroke contrast means hairlines thin out and disappear at small sizes, especially on
low-DPI screens — hurting both elegance and legibility. In this system Playfair is used only
for `h1`–`h4`, `.card-price` display figures, and the cart total. Everything ≤16px is Inter.

### Fluid scale

All sizes use `clamp()` — no typography breakpoints:

```css
Hero          clamp(2.6rem, 6.4vw, 5rem)      Playfair 700
Page title    clamp(2.4rem, 5.5vw, 4rem)      Playfair 700
Section head  clamp(2rem,   4.2vw, 3.1rem)    Playfair 700
Category      clamp(1.6rem, 3vw,   2.2rem)    Playfair 700
Card title    1.08–1.16rem                     Playfair 600
Body          1rem / 1.6                       Inter 400
Meta          0.78rem                          Inter 400
Eyebrow       0.72rem / .22em / uppercase      Inter 600
```

Body line-height is **1.6** and measure is capped near **62ch** — both sit in the
well-established comfortable-reading band.

---

## 4. Phase 3 — The Fibonacci design system

### Why Fibonacci rather than an 8-point grid

A standard 8-point scale doubles (8·16·32·64), which grows **too fast**: the jump from 32→64
forces designers to invent in-between values, and the scale loses authority.

Fibonacci (**8 · 13 · 21 · 34 · 55 · 89 · 144**) grows by a ratio converging on **φ ≈ 1.618**.
Consecutive steps are ~1.6× apart rather than 2×, which gives:

- **More usable steps** in the range where layout decisions actually happen (13–55px).
- **Self-similar nesting** — padding inside a card relates to the gap between cards by the same
  ratio as that gap relates to the section padding. Rhythm holds at every zoom level.
- A proportion the eye already accepts as harmonious from natural and classical composition.

Every step is still an even-ish integer that lands cleanly on device pixels.

### The scale

```css
--s-half:  5px   /* hairline gaps                    */
--s1:      8px   /* icon gaps, badge padding         */
--s2:     13px   /* tight stacks, chip padding       */
--s3:     21px   /* DEFAULT content rhythm, grid gap */
--s4:     34px   /* card padding, wrap gutter        */
--s5:     55px   /* section-head margin              */
--s6:     89px   /* tight section padding            */
--s7:    144px   /* full section padding             */
```

**21px is the default.** When unsure, use `--s3`.

Mobile compresses only the two largest steps (`--s7: 89px`, `--s6: 55px`) — i.e. it steps
*down the same sequence* rather than introducing foreign values. The scale is never broken.

### Applied

| Element | Token | Value |
|---------|-------|-------|
| Section padding | `--s7` | 144px (89 mobile) |
| Card grid gap | `--s3` | 21px |
| Card inner padding | `--s3` | 21px |
| Page gutter | `--s4` | 34px (21 mobile) |
| Section-head bottom | `--s5` | 55px |
| Meta row gap | `--s3` | 21px |
| Nav link gap | `--s4` | 34px |

Radii follow a parallel progression (10 · 16 · 24 · 34) with `--r-xl` landing exactly on the
Fibonacci 34.

---

## 5. Supporting systems (condensed)

**Emotional journey.** 0–3s: *warmth + legitimacy* (hero photo, "Every Cup Tells a Story",
4.9★ trust bar). 3–10s: *appetite* (popular drinks with price + prep time). 10–30s:
*credibility* (provenance copy, why-cards). 30–60s: *social proof* (Google-style reviews).
Decision: *low-risk action* (free delivery over £15, ETA shown, demo checkout).

**Information architecture.** Home · Menu · About · Locations · Order Online · Contact —
plus the cart drawer as a persistent cross-page layer. Deliberately **6 pages, not 30**: every
extra nav item dilutes the two actions that matter (order, visit).

**Motion.** One easing curve throughout — `cubic-bezier(.22,.61,.36,1)`. Reveals 0.8s with
80ms stagger; hovers 0.25–0.4s; lift is `translateY(-6px)` with a shadow step, never scale on
cards. All motion is suppressed under `prefers-reduced-motion`.

**Conversion.** Sticky nav with always-visible Order CTA · floating order button past 620px ·
persistent cart · free-delivery threshold nudge (`Add £3.90 more for free delivery`) · promo
codes · veg/vegan/spice reducing decision anxiety · prep time reducing wait anxiety.

**Accessibility.** All text ≥4.5:1 (verified, §2) · visible 2px focus ring at 3:1 · full
keyboard operation · `role="dialog"` + `aria-modal` on cart · `aria-live` on cart count and
form feedback · alt text on all imagery · `prefers-reduced-motion` honoured · semantic
landmarks · form errors announced and tied to fields.

**Performance.** Zero dependencies, zero build · two font families, subset by `display=swap` ·
`loading="lazy"` below the fold, `fetchpriority="high"` on hero · inline SVG icons (no icon
font) · CSS ~35KB, JS ~25KB uncompressed · no layout shift (fixed `aspect-ratio` on all media).

**SEO.** One `h1` per page · `CafeOrRestaurant` structured data with address, hours,
aggregateRating · unique title + description per page · Open Graph + Twitter cards ·
canonical URLs · semantic HTML5 · descriptive alt text · internal linking across all 6 pages.

---

## 6. Imagery

### What ships today

**Real photography, already wired in.** 92 free-to-use photographs (Unsplash License) are mapped in
`js/photos.js` and cover the hero, every drink and snack card, the gallery, the location
storefronts and all 64 menu items.

Sourcing was deliberately rigorous, because "it returned HTTP 200" is not evidence a photo shows
the right thing:

1. **Harvested** — URLs pulled from real Unsplash search results, never recalled from memory.
2. **Verified** — every URL curl-checked for HTTP 200.
3. **Reviewed by eye** — all candidates rendered onto a contact sheet and visually inspected, then
   assigned to the item they actually depict.

Step 3 is the one that matters. An unverified-but-valid photo ID returns 200 while showing a
mountain instead of a samosa.

### Fallback

Any slot without a mapped photo — currently the 4 team portraits — renders an original
hand-authored SVG illustration from `assets/art/`, selected by item type via `ART_RULES` in
`js/main.js`:

`chai` · `coffee` · `cold` · `snack` · `breakfast` · `sandwich` · `dessert` · `store` · `team`

Cream-and-amber artwork on the brand green gradient. Nothing ever renders as a broken image, and
the site never looks unfinished.

### Photography direction

Natural side-light, shallow depth of field, visible steam on hot drinks, clay/ceramic/copper/wood
props, warm cream-and-green environment, real hands and candid customers, no over-styling. The
look is *warm documentary*, not *studio catalogue* — which is exactly why the clay-kulhad and
street-food frames were chosen over polished studio shots.

---

*Chai Adda is a fictional brand created as a student case-study project.*
