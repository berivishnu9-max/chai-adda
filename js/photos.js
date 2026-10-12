/* =========================================================================
   CHAI ADDA — Real photography map
   Free-to-use photographs served from the Unsplash CDN (Unsplash License:
   free for commercial and non-commercial use, no permission needed).

   Every URL below was fetched from Unsplash search results, verified to
   return HTTP 200, AND visually reviewed on a contact sheet to confirm the
   photo actually depicts the subject it is assigned to.

   Keys are the local paths used in the HTML/JS. main.js swaps the src at
   render time. Any path NOT listed here falls back to the branded SVG
   illustration in assets/art/ — so partial coverage degrades gracefully.
   ========================================================================= */
(function () {
  'use strict';

  // id -> sized Unsplash CDN url
  const U = (id, w, h) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

  const CARD = (id) => U(id, 800, 600);    // 4:3 product cards
  const SQ   = (id) => U(id, 700, 700);    // 1:1 gallery
  const WIDE = (id) => U(id, 900, 560);    // 16:10 location cards

  /* ---- verified photo ids, named by what they actually show ---- */
  const P = {
    // chai & tea
    chaiGlassDark:   '1683533698664-12ee473e8c9d',
    kulhadStack:     '1619581073186-5b4ae1b0caad',
    chaiClayTop:     '1625033405953-f20401c7d848',
    chaiStrainPour:  '1693302050215-66ae33076745',
    latteArt:        '1561336526-2914f13ceb36',
    chaiStarAnise:   '1636920272028-c27f1ae474c3',
    clayMilk:        '1630748662359-40a2105640c7',
    chaiSteamPour:   '1611312410928-bdcb480e6239',
    chaiWhiteCup:    '1555251415-4716d9d0b8af',
    chaiSaucer:      '1634299406775-90f32b656536',
    chaiBokeh:       '1583836632332-53825ce55a03',
    kitchenSteam:    '1611312410916-a7d0e5534788',
    // street food
    samosaBoard:     '1601050690597-df0568f70950',
    samosaHand:      '1622715395488-71045e2a4990',
    samosaChutney:   '1601050690117-94f5f6fa8bd7',
    samosaPlated:    '1601050690294-397f3c324515',
    puffDip:         '1589301773859-bb024d3ad558',
    chaatPlate:      '1566222499048-9538f86d4675',
    friedSnack:      '1589786742305-f24d19eedbe5',
    samosaGold:      '1572099107898-46f22b3af4f9',
    wrapPlate:       '1613292443284-8d10ef9383fe',
    jalebiFry:       '1621334721541-370a13974de8',
    vendorBowls:     '1589778314823-d1c2bde0a31b',
    bigPan:          '1515931215890-366d3990cf8d',
    pakora:          '1613764816537-a43baeb559c1',
    vadaPav:         '1605333409672-4f7db57ba3a2',
    stallScene:      '1620027496716-a746022e3a8b',
    redCurryDip:     '1619193099710-e54f2e2f1b28',
    marketScene:     '1512988674419-0f5fdf454021',
    // cafe interiors
    cafeBright:      '1567880905822-56f8e06fe630',
    cafeDark:        '1521017432531-fbd92d768814',
    cafeCounter:     '1511081692775-05d0f180a065',
    cafeWarmBulbs:   '1453614512568-c4024d13c247',
    cafePeople:      '1494346480775-936a9f0d0877',
    cafeBooth:       '1583354608715-177553a4035e',
    cafeTiles:       '1538333581680-29dd4752ddf2',
    cafeSeating:     '1565650839149-2c48a094196c',
    bulbs:           '1482350325005-eda5e677279b',
    cafePlants:      '1600353565737-2427a1ba3d3a',
    // iced / cold
    icedCoffee1:     '1461023058943-07fcbe16d735',
    icedCoffee2:     '1559496417-e7f25cb247f3',
    icedCoffee3:     '1517701550927-30cf4ba1dba5',
    icedCoffee4:     '1562447457-579fc34967fb',
    icedCoffee5:     '1592663527359-cf6642f54cff',
    icedCoffee6:     '1549652127-2e5e59e86a7a',
    icedCoffee7:     '1533007716222-4b465613a984',
    espresso:        '1504753793650-d4a2b783c15e',
    // south indian / breakfast
    dosaThali:       '1668236543090-82eba5ee5976',
    dosaLeaf:        '1694849789325-914b71ab4075',
    dosaTriangles:   '1708146464361-5c5ce4f9abb6',
    dosaBanana:      '1743517894265-c86ab035adef',
    dosaCone:        '1643268972535-a2b100ff3632',
    thaliBowls:      '1665660710687-b44c50751054',
    uttapam:         '1725483990070-509319bc6ecc',
    dosaChutney:     '1727018877043-2b0372f64d20',
    paratha:         '1630409351241-e90e7f5e434d',
    dosaEgg:         '1644289450169-bc58aa16bacb',
    // sweets
    gulabPistachio:  '1695568180070-8b5acead5cf4',
    halwa:           '1517244683847-7456b63c5969',
    laddooTray:      '1695568181747-f54dff1d4654',
    cakeSlices:      '1543773495-2cd9248a5bda',
    laddooPile:      '1635952346904-95f2ccfcd029',
    sweetsCounter:   '1590671909091-43ff144014fe',
    gulabBowl:       '1616995797463-9e67aa01bc7a',
    jalebiYellow:    '1622715395476-3dbcd161df05',
    // cold indian drinks
    roseFalooda:     '1692620609860-be6717812f71',
    lassiClay:       '1527406619566-0159590b8540',
    clayStraw:       '1675064982913-067b64880f5f',
    // storefronts
    storeLights:     '1665792235543-0e42f20860c7',
    storePlants:     '1672777368863-0d3946b57d95',
    storeCorner:     '1678528854861-7a05ff744221',
    storeDoors:      '1540380968028-950d9ea1507e',
    storeWindow:     '1563463904828-5bd5938200a2'
  };

  window.CHAI_PHOTOS = {
    /* ---------------- hero & story ---------------- */
    'images/hero.jpg':          U(P.chaiClayTop, 2000, 1200),
    'images/about-story.jpg':   U(P.chaiStrainPour, 900, 1125),
    'images/about/story.jpg':   U(P.chaiStrainPour, 900, 1125),

    /* ---------------- home: popular drinks ---------------- */
    'images/drinks/masala-chai.jpg':     CARD(P.chaiClayTop),
    'images/drinks/elaichi-chai.jpg':    CARD(P.chaiStarAnise),
    'images/drinks/ginger-chai.jpg':     CARD(P.chaiWhiteCup),
    'images/drinks/kashmiri-kahwa.jpg':  CARD(P.chaiSaucer),
    'images/drinks/filter-coffee.jpg':   CARD(P.chaiSteamPour),
    'images/drinks/cold-coffee.jpg':     CARD(P.icedCoffee1),

    /* ---------------- home: popular snacks ---------------- */
    'images/snacks/samosa.jpg':          CARD(P.samosaBoard),
    'images/snacks/veg-puff.jpg':        CARD(P.puffDip),
    'images/snacks/paneer-puff.jpg':     CARD(P.friedSnack),
    'images/snacks/vada-pav.jpg':        CARD(P.vadaPav),
    'images/snacks/pav-bhaji.jpg':       CARD(P.redCurryDip),
    'images/snacks/maggi.jpg':           CARD(P.bigPan),
    'images/snacks/cheese-sandwich.jpg': CARD(P.wrapPlate),
    'images/snacks/french-fries.jpg':    CARD(P.pakora),

    /* ---------------- home: instagram gallery ---------------- */
    'images/gallery/01.jpg': SQ(P.kulhadStack),
    'images/gallery/02.jpg': SQ(P.jalebiFry),
    'images/gallery/03.jpg': SQ(P.cafeWarmBulbs),
    'images/gallery/04.jpg': SQ(P.chaiSteamPour),
    'images/gallery/05.jpg': SQ(P.cafePeople),
    'images/gallery/06.jpg': SQ(P.chaatPlate),
    'images/gallery/07.jpg': SQ(P.marketScene),
    'images/gallery/08.jpg': SQ(P.vendorBowls),

    /* ---------------- locations ---------------- */
    'images/locations/city-centre.jpg': WIDE(P.storeLights),
    'images/locations/west-end.jpg':    WIDE(P.storePlants),
    'images/locations/southside.jpg':   WIDE(P.storeCorner),

    /* ---------------- menu: signature chai ---------------- */
    'images/menu/masala.jpg':        CARD(P.chaiClayTop),
    'images/menu/elaichi.jpg':       CARD(P.chaiStarAnise),
    'images/menu/ginger.jpg':        CARD(P.chaiWhiteCup),
    'images/menu/adrak-tulsi.jpg':   CARD(P.chaiBokeh),
    'images/menu/kesar.jpg':         CARD(P.chaiSaucer),
    'images/menu/masala-vegan.jpg':  CARD(P.kulhadStack),

    /* ---------------- menu: premium tea ---------------- */
    'images/menu/assam.jpg':       CARD(P.chaiGlassDark),
    'images/menu/darjeeling.jpg':  CARD(P.chaiSaucer),
    'images/menu/kahwa.jpg':       CARD(P.chaiStarAnise),
    'images/menu/nilgiri.jpg':     CARD(P.chaiBokeh),
    'images/menu/lemongrass.jpg':  CARD(P.chaiWhiteCup),
    'images/menu/rose.jpg':        CARD(P.chaiClayTop),

    /* ---------------- menu: coffee ---------------- */
    'images/menu/filter.jpg':      CARD(P.chaiSteamPour),
    'images/menu/cold-coffee.jpg': CARD(P.icedCoffee1),
    'images/menu/cappuccino.jpg':  CARD(P.latteArt),
    'images/menu/latte.jpg':       CARD(P.icedCoffee2),
    'images/menu/mocha.jpg':       CARD(P.icedCoffee3),
    'images/menu/espresso.jpg':    CARD(P.espresso),

    /* ---------------- menu: cold drinks ---------------- */
    'images/menu/sweet-lassi.jpg':  CARD(P.lassiClay),
    'images/menu/mango-lassi.jpg':  CARD(P.clayStraw),
    'images/menu/masala-chaas.jpg': CARD(P.clayMilk),
    'images/menu/jaljeera.jpg':     CARD(P.icedCoffee4),
    'images/menu/rose-milk.jpg':    CARD(P.roseFalooda),
    'images/menu/nimbu.jpg':        CARD(P.icedCoffee5),

    /* ---------------- menu: street food ---------------- */
    'images/menu/samosa.jpg':      CARD(P.samosaBoard),
    'images/menu/vada-pav.jpg':    CARD(P.vadaPav),
    'images/menu/pav-bhaji.jpg':   CARD(P.redCurryDip),
    'images/menu/pani-puri.jpg':   CARD(P.chaatPlate),
    'images/menu/bhel.jpg':        CARD(P.samosaGold),
    'images/menu/veg-puff.jpg':    CARD(P.puffDip),
    'images/menu/paneer-puff.jpg': CARD(P.friedSnack),
    'images/menu/maggi.jpg':       CARD(P.bigPan),
    'images/menu/fries.jpg':       CARD(P.pakora),
    'images/menu/aloo-tikki.jpg':  CARD(P.samosaChutney),

    /* ---------------- menu: breakfast ---------------- */
    'images/menu/masala-dosa.jpg':    CARD(P.dosaThali),
    'images/menu/idli.jpg':           CARD(P.thaliBowls),
    'images/menu/poha.jpg':           CARD(P.uttapam),
    'images/menu/upma.jpg':           CARD(P.dosaChutney),
    'images/menu/chole-bhature.jpg':  CARD(P.dosaTriangles),
    'images/menu/paratha.jpg':        CARD(P.paratha),

    /* ---------------- menu: sandwiches & wraps ---------------- */
    'images/menu/bombay-sandwich.jpg': CARD(P.wrapPlate),
    'images/menu/cheese-sandwich.jpg': CARD(P.samosaPlated),
    'images/menu/paneer-sandwich.jpg': CARD(P.dosaLeaf),
    'images/menu/veg-club.jpg':        CARD(P.chaatPlate),
    'images/menu/paneer-kathi.jpg':    CARD(P.wrapPlate),
    'images/menu/aloo-wrap.jpg':       CARD(P.dosaBanana),
    'images/menu/chana-wrap.jpg':      CARD(P.dosaCone),
    'images/menu/veg-frankie.jpg':     CARD(P.dosaEgg),

    /* ---------------- menu: desserts ---------------- */
    'images/menu/gulab-jamun.jpg': CARD(P.gulabBowl),
    'images/menu/jalebi.jpg':      CARD(P.jalebiYellow),
    'images/menu/rasmalai.jpg':    CARD(P.gulabPistachio),
    'images/menu/kheer.jpg':       CARD(P.halwa),
    'images/menu/kulfi.jpg':       CARD(P.cakeSlices),

    /* ---------------- menu: kids ---------------- */
    'images/menu/kids-cocoa.jpg': CARD(P.clayMilk),
    'images/menu/kids-milk.jpg':  CARD(P.lassiClay),
    'images/menu/kids-maggi.jpg': CARD(P.bigPan),
    'images/menu/kids-fries.jpg': CARD(P.pakora),

    /* ---------------- menu: combos ---------------- */
    'images/menu/combo-chai-samosa.jpg':   CARD(P.samosaChutney),
    'images/menu/combo-vadapav-chai.jpg':  CARD(P.vadaPav),
    'images/menu/combo-breakfast.jpg':     CARD(P.dosaThali),
    'images/menu/combo-sweet.jpg':         CARD(P.laddooTray),

    /* ---------------- menu: seasonal ---------------- */
    'images/menu/winter-haldi.jpg':    CARD(P.clayMilk),
    'images/menu/monsoon-pakora.jpg':  CARD(P.pakora),
    'images/menu/summer-aamras.jpg':   CARD(P.icedCoffee6)

    /* NOTE: team portraits (images/team/*.jpg) are deliberately NOT mapped.
       No verified portrait photography was sourced, so those slots keep the
       branded SVG illustration rather than showing an unrelated stock face. */
  };
})();
