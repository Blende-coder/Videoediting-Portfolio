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

  this.reset();
});
