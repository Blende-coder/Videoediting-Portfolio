// ── Scroll Reveal ──────────────────────────────────────────
// Watches every .reveal element and adds .visible when it enters the viewport
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target); // stop watching once revealed
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));


// ── Nav background on scroll ────────────────────────────────
// Darkens the nav bar once the user scrolls past the hero
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(13,14,16,0.95)'
    : 'rgba(13,14,16,0.75)';
});


// ── Contact form submission ─────────────────────────────────
// Shows a toast notification instead of a jarring alert()
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const toast = document.getElementById('toast');
  toast.classList.add('show');

  // Auto-hide after 3.8 seconds
  setTimeout(() => toast.classList.remove('show'), 3800);

// ── Hero floating particles ────────────────────────────────
const heroCanvas = document.getElementById('hero-canvas');

if (heroCanvas) {
  const ctx = heroCanvas.getContext('2d');
  const particles = [];
  const PARTICLE_COUNT = 60;
  let width, height, dpr;

  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;
    width = heroCanvas.clientWidth * dpr;
    height = heroCanvas.clientHeight * dpr;
    heroCanvas.width = width;
    heroCanvas.height = height;
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * 1.4,
        alpha: 0.25 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#d4a843';

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  resizeCanvas();
  createParticles();
  tick();
}

// ── Stat counters ──────────────────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length) {
  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const parent = el.closest('.stat');
      const target = parseFloat(parent.dataset.target);
      const isFloat = !Number.isInteger(target);
      const duration = 1600;
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = target * progress;
        el.textContent = isFloat ? current.toFixed(1) : Math.round(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = isFloat ? target.toFixed(1) : target;
        }
      }

      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(num => statsObserver.observe(num));
}
  
  this.reset();
});

// ── Custom gold cursor ─────────────────────────────────────
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
document.body.appendChild(customCursor);

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let targetX = cursorX;
let targetY = cursorY;

window.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

window.addEventListener('mousedown', () => {
  customCursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
  customCursor.classList.remove('active');
});

function renderCursor() {
  const lerpFactor = 0.22;
  cursorX += (targetX - cursorX) * lerpFactor;
  cursorY += (targetY - cursorY) * lerpFactor;
  customCursor.style.transform =
    `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  requestAnimationFrame(renderCursor);
}

renderCursor();
