/* ====== ABOUT SECTION INTERACTIONS ====== */

const aboutCards = document.querySelectorAll('.about-card');

aboutCards.forEach((card, index) => {

  /* Scroll reveal delay */
  card.style.transition = 'all 0.35s ease';
  card.style.transitionDelay = `${index * 80}ms`;

  /* Hover Effects */
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.03)';
    card.style.background = 'rgba(15, 25, 18, 0.92)';
    card.style.borderColor = '#3dd68c';
    card.style.boxShadow = '0 0 20px rgba(61,214,140,0.35)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.background = 'rgba(10, 18, 10, 0.78)';
    card.style.borderColor = 'rgba(61,214,140,0.15)';
    card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.25)';
  });

});


/* ====== ABOUT SECTION TYPING EFFECT ====== */

const aboutText = document.querySelector('.about-intro');

if (aboutText) {

  const fullText = aboutText.textContent;
  aboutText.textContent = '';

  let i = 0;

  function typeEffect() {

    if (i < fullText.length) {
      aboutText.textContent += fullText.charAt(i);
      i++;
      setTimeout(typeEffect, 22);
    }

  }

  typeEffect();
}


/* ====== ABOUT STATS COUNTER ====== */

const counters = document.querySelectorAll('.about-counter');

counters.forEach(counter => {

  const updateCounter = () => {

    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;

    const increment = target / 80;

    if (current < target) {

      counter.innerText = `${Math.ceil(current + increment)}`;

      setTimeout(updateCounter, 30);

    } else {

      counter.innerText = target;

    }

  };

  updateCounter();

});


/* ====== ABOUT SECTION GLOW EFFECT ====== */

const aboutSection = document.getElementById('about');

window.addEventListener('mousemove', (e) => {

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  aboutSection.style.background = `
    radial-gradient(
      circle at ${x * 100}% ${y * 100}%,
      rgba(61,214,140,0.08),
      rgba(6,13,7,0.96) 45%
    )
  `;

});
