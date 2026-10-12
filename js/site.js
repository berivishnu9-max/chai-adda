/* =========================================================================
   CHAI ADDA — Shared footer injection (used on About/Locations/Order/Contact)
   Keeps the footer identical everywhere without duplicating markup.
   ========================================================================= */
(function () {
  'use strict';
  const slot = document.getElementById('footer-slot');
  if (!slot) return;

  const year = new Date().getFullYear();
  slot.outerHTML = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-about">
          <a class="brand" href="index.html">
            <img src="assets/logo.svg" alt="" width="38" height="38">
            <span class="brand-name">Chai Adda</span>
          </a>
          <p>Authentic Indian chai, handcrafted snacks and a warm corner to gather. Brewed fresh in Glasgow, every single day.</p>
          <div class="footer-social">
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="#" aria-label="WhatsApp"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5z"/><path d="M8.5 9.5c0 4 3 6.5 6 6.5.7 0 1.3-.6 1.3-1.1 0-.3-1.6-1.3-1.9-1.1-.5.4-.8.9-1.3.6-1-.5-2-1.5-2.4-2.5-.2-.5.2-.8.6-1.3.2-.3-.8-1.9-1.1-1.9-.5 0-1.1.6-1.1 1.3z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="menu.html">Menu</a></li>
            <li><a href="order.html">Order Online</a></li>
            <li><a href="about.html">Our Story</a></li>
            <li><a href="locations.html">Locations</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Visit</h4>
          <ul>
            <li>48 Sauchiehall Street</li>
            <li>Glasgow, G2 3AB</li>
            <li><a href="tel:+441415550192">+44 141 555 0192</a></li>
            <li><a href="mailto:hello@chai-adda.example">hello@chai-adda.example</a></li>
          </ul>
        </div>
        <div class="footer-col footer-hours">
          <h4>Opening Hours</h4>
          <div><span>Mon – Fri</span><span>8:00 – 22:00</span></div>
          <div><span>Saturday</span><span>9:00 – 23:00</span></div>
          <div><span>Sunday</span><span>9:00 – 21:00</span></div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${year} Chai Adda. All rights reserved.</span>
        <div class="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
    <p class="disclaimer">Chai Adda is a fictional brand created as a student case-study project. It is not a real business, and no products are for sale.</p>
  </footer>`;
})();
