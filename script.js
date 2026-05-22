// Add this modification inside your existing JS file where the Hero Canvas logic lives:

function createParticles() {
  particles.length = 0;
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2,
      alpha: 0.1 + Math.random() * 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      // Randomly assign teal or orange to the particles
      color: Math.random() > 0.5 ? '#0ea5e9' : '#ff7e40' 
    });
  }
}

function tick() {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -10) p.x = width + 10;
    if (p.x > width + 10) p.x = -10;
    if (p.y < -10) p.y = height + 10;
    if (p.y > height + 10) p.y = -10;

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color; // Call the dynamic color here
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
  requestAnimationFrame(tick);
}

// Keep the rest of your original script.js exactly the same (Scroll reveal, Preloader logic, Formspree logic, Custom Cursor logic).

// ── Simple preloader – fade out on load / timeout ───────────
document.body.classList.add('preloading');

const preloaderEl = document.getElementById('preloader');
const preloaderBarFill = document.querySelector('.preloader-bar-fill');

let preloaderDone = false;

function finishPreloader() {
  if (preloaderDone) return;
  preloaderDone = true;

  if (preloaderBarFill) {
    preloaderBarFill.style.transform = 'scaleX(1)';
  }

  setTimeout(() => {
    if (preloaderEl) {
      preloaderEl.classList.add('done');
    }
    document.body.classList.remove('preloading');
  }, 400);
}

// When everything is loaded (images, etc.)
window.addEventListener('load', () => {
  finishPreloader();
});

// Safety timeout so you never get stuck
setTimeout(finishPreloader, 4000);


// ── Scroll Reveal ──────────────────────────────────────────
// Watches every .reveal element and adds .visible when it enters the viewport
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target); // stop watching once revealed
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => observer.observe(el));


// ── Nav background on scroll ────────────────────────────────
// Darkens the nav bar once the user scrolls past the hero
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(13,14,16,0.95)'
    : 'rgba(13,14,16,0.75)';
});


// ── Contact form submission (Formspree) ─────────────────────
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

if (contactForm && toast) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Formspree request failed');
      }

      toast.textContent = "✓ Message sent! I'll be in touch soon.";
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3800);

      contactForm.reset();
    } catch (err) {
      console.error(err);
      toast.textContent = '⚠️ Something went wrong. Please try again.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3800);
    }
  });
}


// ── Hero floating particles ────────────────────────────────
const heroCanvas = document.getElementById('hero-canvas');

if (heroCanvas) {
  const ctx = heroCanvas.getContext('2d');
  const particles = [];
  const PARTICLE_COUNT = 60;
  let width;
  let height;
  let dpr;

  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;
    width = heroCanvas.clientWidth * dpr;
    height = heroCanvas.clientHeight * dpr;
    heroCanvas.width = width;
    heroCanvas.height = height;
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * 1.4,
        alpha: 0.25 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = '#d4a843';

    particles.forEach((p) => {
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
    entries.forEach((entry) => {
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

  statNumbers.forEach((num) => statsObserver.observe(num));
}


// ── Custom gold cursor ─────────────────────────────────────
const finePointerQuery = window.matchMedia
  ? window.matchMedia('(pointer: fine)')
  : null;

function initCustomCursor() {
  const customCursor = document.createElement('div');
  customCursor.className = 'custom-cursor';
  document.body.appendChild(customCursor);

  document.body.classList.add('has-custom-cursor');

  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let targetX = cursorX;
  let targetY = cursorY;

  function setCursorDefault() {
    customCursor.classList.remove('cursor-link', 'cursor-text');
  }

  function setCursorLink() {
    customCursor.classList.add('cursor-link');
    customCursor.classList.remove('cursor-text');
  }

  function setCursorText() {
    customCursor.classList.add('cursor-text');
    customCursor.classList.remove('cursor-link');
  }

  const clickableEls = document.querySelectorAll('a, button, .portfolio-item, .submit-btn');
  clickableEls.forEach((el) => {
    el.addEventListener('mouseenter', setCursorLink);
    el.addEventListener('mouseleave', setCursorDefault);
  });

  const textEls = document.querySelectorAll('input, textarea');
  textEls.forEach((el) => {
    el.addEventListener('mouseenter', setCursorText);
    el.addEventListener('mouseleave', setCursorDefault);
  });

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
}

// Only enable custom cursor if device has a fine pointer (mouse/trackpad)
if (finePointerQuery ? finePointerQuery.matches : true) {
  initCustomCursor();
}

if (finePointerQuery && finePointerQuery.addEventListener) {
  finePointerQuery.addEventListener('change', (e) => {
    if (e.matches) {
      // pointer became fine (e.g. mouse plugged in) – init once
      if (!document.body.classList.contains('has-custom-cursor')) {
        initCustomCursor();
      }
    }
  });
}

// ── Scroll film strip progress ─────────────────────────────
const scrollStrip = document.createElement('div');
scrollStrip.className = 'scroll-strip';

const scrollStripFill = document.createElement('div');
scrollStripFill.className = 'scroll-strip-fill';

scrollStrip.appendChild(scrollStripFill);
document.body.appendChild(scrollStrip);

function updateScrollStrip() {
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const maxScroll = docHeight - winHeight;

  const scrollY = window.scrollY || window.pageYOffset;
  const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

  scrollStripFill.style.transform = `scaleY(${progress})`;
}

window.addEventListener('scroll', updateScrollStrip);
window.addEventListener('resize', updateScrollStrip);
updateScrollStrip();
