// ── Preloader – load images then fade out ───────────────────
document.body.classList.add('preloading');

const preloaderEl = document.getElementById('preloader');
const preloaderBarFill = document.querySelector('.preloader-bar-fill');

function finishPreloader() {
  if (!preloaderEl) return;

  if (preloaderBarFill) {
    preloaderBarFill.style.transform = 'scaleX(1)';
  }

  setTimeout(() => {
    preloaderEl.classList.add('done');
    document.body.classList.remove('preloading');
  }, 400);
}

// Collect image URLs from <img> tags
const imgNodes = Array.from(document.images);
const imgUrls = imgNodes
  .map(img => img.currentSrc || img.src)
  .filter(Boolean);

// Include hero background image from CSS if present
try {
  const headerEl = document.querySelector('header');
  if (headerEl) {
    const bg = getComputedStyle(headerEl).backgroundImage;
    const match = bg && bg.match(/url\\(\"?(.*?)\"?\\)/);
    if (match && match[1]) {
      imgUrls.push(match[1]);
    }
  }
} catch (e) {
  console.warn('Hero bg lookup failed', e);
}

const uniqueUrls = Array.from(new Set(imgUrls));
let loadedCount = 0;

function preloadImage(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = url;
  });
}

function updatePreloaderBar() {
  if (!preloaderBarFill || !uniqueUrls.length) return;
  const progress = loadedCount / uniqueUrls.length;
  preloaderBarFill.style.transform = `scaleX(${progress})`;
}

let preloadPromise;
if (uniqueUrls.length) {
  preloadPromise = Promise.all(
    uniqueUrls.map(url =>
      preloadImage(url).then(() => {
        loadedCount += 1;
        updatePreloaderBar();
      })
    )
  );
} else {
  preloadPromise = Promise.resolve();
}

// Safety timeout so user never gets stuck
const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5000));

// Also listen for full window load as a backup
const loadPromise = new Promise(resolve => {
  window.addEventListener('load', resolve, { once: true });
});

Promise.race([preloadPromise, timeoutPromise, loadPromise])
  .then(finishPreloader)
  .catch(err => {
    console.error('Preloader error', err);
    finishPreloader();
  });


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

/* ── MARQUEE STRIP ───────────────────────────────────────── */
.marquee {
  position: relative;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: radial-gradient(circle at top, rgba(212, 168, 67, 0.04), transparent 55%);
  overflow: hidden;
  padding: 0.8em 0;
  margin-top: -1px;
  white-space: nowrap;
}

.marquee-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  gap: 3em;
  min-width: 100%;
  will-change: transform;
  animation: marqueeSlide 24s linear infinite;
}

.marquee-track:nth-child(2) {
  /* start the second track immediately after the first */
  transform: translate(100%, -50%);
}

.marquee span {
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(240, 236, 227, 0.6);
}

@keyframes marqueeSlide {
  from {
    transform: translateX(0) translateY(-50%);
  }
  to {
    transform: translateX(-100%) translateY(-50%);
  }
}
// ── Contact form submission ─────────────────────────────────
// Shows a toast notification instead of a jarring alert()
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

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

    // success toast
    toast.textContent = "✓ Message sent! I'll be in touch soon.";
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3800);

    contactForm.reset();
  } catch (err) {
    console.error(err);
    // error toast
    toast.textContent = '⚠️ Something went wrong. Please try again.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3800);
  }
});


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



// ── Custom gold cursor ─────────────────────────────────────
const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
document.body.appendChild(customCursor);

// tell CSS it's safe to hide the native cursor
document.body.classList.add('has-custom-cursor');

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let targetX = cursorX;
let targetY = cursorY;

// State helpers so classes don't stack weirdly
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

// Clickable things: links, buttons, portfolio cards
const clickableEls = document.querySelectorAll('a, button, .portfolio-item, .submit-btn');
clickableEls.forEach(el => {
  el.addEventListener('mouseenter', setCursorLink);
  el.addEventListener('mouseleave', setCursorDefault);
});

// Text inputs: input + textarea
const textEls = document.querySelectorAll('input, textarea');
textEls.forEach(el => {
  el.addEventListener('mouseenter', setCursorText);
  el.addEventListener('mouseleave', setCursorDefault);
});

// existing move / mousedown / mouseup / renderCursor stay the same
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
