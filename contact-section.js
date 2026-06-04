/* ============================================================
   contact-section.js  —  Contact Section Interactions
   Edward van Niekerk Portfolio · INL261 Group 15
   Content Lead — Bophelo Rantho
   ============================================================ */

/* ── SCROLL FADE IN ──
   BUG FIX: contactobserver was declared but then the generic 'observer'
   variable (from fun-facts-section.js loaded earlier) was used to both
   observe and unobserve elements — creating an unintentional cross-file
   dependency. Now using contactobserver consistently throughout. */
const contactobserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 150);
      contactobserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('#contact .fade-in').forEach(el => contactobserver.observe(el));
