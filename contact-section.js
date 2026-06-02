/* ============================================================
   contact-section.js  —  Contact Section Interactions
   Edward van Niekerk Portfolio · INL261 Group 15
   Content Lead — Bophelo Rantho
   ============================================================ */

/* ── SCROLL FADE IN ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 150);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
