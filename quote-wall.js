/* ============================================================
   quote-wall.js  —  Quote Carousel Logic
   Edward van Niekerk Portfolio · INL261 Group 15
   UI / Animation Lead — Iola Lesolang
   ============================================================ */

const INTERVAL = 5000; // Auto-rotate every 5 seconds

const slides    = document.querySelectorAll('.quote-slide');
const dots      = document.querySelectorAll('.dot');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const fill      = document.getElementById('progressFill');

let current  = 0;
let timer    = null;
let progress = 0;
let progTimer = null;

/* ── SHOW SLIDE ── */
function showSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');

  current = (index + slides.length) % slides.length;

  slides[current].classList.add('active');
  dots[current].classList.add('active');

  resetProgress();
}

/* ── AUTO ROTATE ── */
function startAuto() {
  timer = setInterval(() => showSlide(current + 1), INTERVAL);
}

function stopAuto() {
  clearInterval(timer);
  clearInterval(progTimer);
}

/* ── PROGRESS BAR ── */
function resetProgress() {
  clearInterval(progTimer);
  progress = 0;
  fill.style.width = '0%';

  progTimer = setInterval(() => {
    progress += 100 / (INTERVAL / 100);
    fill.style.width = Math.min(progress, 100) + '%';
    if (progress >= 100) clearInterval(progTimer);
  }, 100);
}

/* ── CONTROLS ── */
prevBtn.addEventListener('click', () => {
  stopAuto();
  showSlide(current - 1);
  startAuto();
});

nextBtn.addEventListener('click', () => {
  stopAuto();
  showSlide(current + 1);
  startAuto();
});

/* ── ACCESSIBILITY: keyboard support for prev/next buttons ──
   BUG FIX (Accessibility): Arrow buttons were mouse-only. Added keyboard
   listeners so Enter/Space trigger them, making the carousel fully
   operable by keyboard users per WCAG 2.1 Level AA. */
prevBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    stopAuto();
    showSlide(current - 1);
    startAuto();
  }
});

nextBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    stopAuto();
    showSlide(current + 1);
    startAuto();
  }
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    stopAuto();
    showSlide(i);
    startAuto();
  });
});

/* ── SCROLL FADE IN ──
   BUG FIX: quoteobserver was declared but then observer (the Fun Facts
   variable from a previously-loaded script) was used instead. Now using
   quoteobserver consistently so this file has no dependency on fun-facts-section.js. */
const quoteobserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
      quoteobserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('#quotes .fade-in').forEach(el => quoteobserver.observe(el));

/* ── INIT ── */
showSlide(0);
startAuto();
