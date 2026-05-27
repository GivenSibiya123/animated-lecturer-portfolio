/* ============================================================
   fun-facts-section.js  —  Fun Facts & Superpowers Interactions
   Edward van Niekerk Portfolio · INL261 Group 15
   Ethics & Content Lead — Othniel Kasper
   ============================================================ */

/* ── SCROLL FADE-IN ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── CARD CLICK / TAP TO REVEAL (mobile friendly) ── */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('revealed');
  });

  /* Keyboard accessibility */
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('revealed');
    }
  });
});
