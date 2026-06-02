/* ============================================================

   hero.js  —  Particle Canvas Animation

   Edward van Niekerk Portfolio · INL261 Group 15

   UI / Animation Lead responsibility

   ============================================================ */
 
/* ── CANVAS SETUP ── */

const canvas = document.getElementById('particleCanvas');

const ctx    = canvas.getContext('2d');
 
let W, H, stars = [];
 
/* Resize canvas to always fill the full viewport */

function resize() {

  W = canvas.width  = window.innerWidth;

  H = canvas.height = window.innerHeight;

}

resize();

window.addEventListener('resize', resize);
 
/* ── STAR FACTORY ── */

function mkStar() {

  return {

    x:       Math.random() * W,

    y:       -10,

    len:     10 + Math.random() * 28,

    speed:   1.4 + Math.random() * 3.2,

    size:    0.5 + Math.random() * 1.6,

    opacity: 0.28 + Math.random() * 0.72,

    glow:    Math.random() > 0.68

  };

}
 
/* Seed 60 stars spread across the full canvas on load */

for (let i = 0; i < 60; i++) {

  const s = mkStar();

  s.y = Math.random() * H;

  stars.push(s);

}
 
/* ── DRAW LOOP ── */

function drawStars() {

  ctx.clearRect(0, 0, W, H);
 
  /* Deep black-green background gradient */

  const bg = ctx.createLinearGradient(0, 0, 0, H);

  bg.addColorStop(0, '#060d07');

  bg.addColorStop(1, '#0a120a');

  ctx.fillStyle = bg;

  ctx.fillRect(0, 0, W, H);
 
  stars.forEach((s, i) => {

    s.y += s.speed;
 
    /* Trailing line */

    const trail = ctx.createLinearGradient(s.x, s.y - s.len, s.x, s.y);

    trail.addColorStop(0, 'transparent');

    trail.addColorStop(1, `rgba(61, 214, 140, ${s.opacity})`);

    ctx.beginPath();

    ctx.moveTo(s.x, s.y - s.len);

    ctx.lineTo(s.x, s.y);

    ctx.strokeStyle = trail;

    ctx.lineWidth   = s.size;

    ctx.stroke();
 
    /* Head dot */

    ctx.beginPath();

    ctx.arc(s.x, s.y, s.size + 0.5, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(61, 214, 140, ${s.opacity})`;

    ctx.fill();
 
    /* Radial glow for larger stars */

    if (s.glow) {

      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 9);

      glow.addColorStop(0, `rgba(61, 214, 140, ${s.opacity * 0.45})`);

      glow.addColorStop(1, 'transparent');

      ctx.beginPath();

      ctx.arc(s.x, s.y, 9, 0, Math.PI * 2);

      ctx.fillStyle = glow;

      ctx.fill();

    }
 
    /* Recycle star when it exits the bottom */

    if (s.y > H + 20) {

      stars[i] = mkStar();

    }

  });
 
  requestAnimationFrame(drawStars);

}
 
/* Kick off the animation loop */

drawStars();
 