# Video Editing Portfolio – Ankush Mallick

A cinematic, single-page portfolio site for **Ankush Mallick**, a video editor based in India, showcasing commercial work, social content, and testimonials in a high-contrast, gold-on-black aesthetic.[file:1][file:3]

---

## Features

- **Hero section with cinematic feel**  
  Full-screen hero with background image, diagonal gold accent line, and subtle entrance animations for the title, subtitle, and call-to-action.[file:1][file:3]

- **Custom gold cursor**  
  Smooth, lagged custom cursor with different states for normal, clickable, and text input areas, matching the brand colours.[file:3]

- **Hero particle canvas**  
  Lightweight canvas overlay that renders floating gold particles on top of the hero image for extra depth.[file:3]

- **Scroll reveal animations**  
  Sections (About, Selected Work, Kind Words, Contact) fade and slide up into view using `IntersectionObserver` and a reusable `.reveal` utility.[file:2][file:3]

- **Seamless marquee strip**  
  A horizontally scrolling marquee describing editing specialties (commercials, YouTube series, reels, motion graphics, colour grading).[file:1][file:3]

- **Stats section**  
  Animated counters for projects, clients, videos delivered, and rating, which count up when scrolled into view.[file:1][file:2]

- **Testimonials (Kind Words)**  
  Stylized quote cards using serif type, gold accents, and a large decorative quote mark.[file:1][file:3]

- **Responsive layout**  
  Custom CSS (no frameworks) with breakpoints for tablets and mobile, adjusting grids, spacing, and hero typography for smaller screens.[file:3]

- **Contact form with toast feedback**  
  Contact form with name, email, and project details that shows a subtle toast notification on submit.[file:1][file:2]  
  (Can be wired to Formspree or a custom backend for real email delivery.)

---

## Tech Stack

- **HTML5** – Semantic single-page structure (hero, about, portfolio, testimonials, contact, footer).[file:1]
- **CSS3** – Custom design system (colour variables, typography, animations, scrollbars, noise overlay).[file:3]
- **Vanilla JavaScript** – Scroll reveal, nav background on scroll, stats counters, canvas particles, custom cursor, and contact form logic.[file:2]

No bundlers or frameworks are required – just open the HTML file in a browser.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/Videoediting-Portfolio.git
cd Videoediting-Portfolio
```

### 2. Open locally

Simply open `index.html` in your browser:

- Double-click `index.html`, or
- Use a simple dev server (recommended for live reload):

```bash
# Python 3
python -m http.server 5500

# or with Node
npx serve .
```

Then visit `http://localhost:5500` (or the URL your dev server prints).

---

## Contact Form (Formspree)

The contact form is designed to work with an email service like **Formspree**:

1. Create a form in Formspree to get an endpoint like:
   `https://formspree.io/f/YOUR_FORM_ID`.
2. Set the `action` on the form in `index.html`:
   ```html
   <form
     id="contact-form"
     action="https://formspree.io/f/YOUR_FORM_ID"
     method="POST"
     ...
   >
   ```
3. The submit handler in `script.js` sends the form data via `fetch` and shows a toast for success/error, then resets the form.[file:2]

If you prefer, you can replace Formspree with your own backend (Node/Express + Nodemailer, etc.).

---

## Customization

- **Text & links**  
  Update biography, project links, testimonials, and social profiles directly in `index.html`.[file:1]

- **Visuals**  
  Replace images in the `assets/` folder (`hero-bg.jpg`, `profile.jpg`, project thumbnails) with your own artwork, keeping the same filenames or updating the paths in HTML/CSS.[file:1][file:3]

- **Branding**  
  Tweak colours and fonts in `style.css` under the `:root` section:
  ```css
  :root {
    --bg:        #0d0e10;
    --gold:      #d4a843;
    --white:     #f0ece3;
    --muted:     #7a7870;
    --accent:    #e8c96a;
    --serif:     'Playfair Display', Georgia, serif;
    --display:   'Bebas Neue', sans-serif;
    --body:      'DM Sans', sans-serif;
  }
  ```

- **Animations**  
  - Scroll reveal timing: adjust delays on `.reveal` classes in CSS and the `IntersectionObserver` threshold in `script.js`.[file:2][file:3]  
  - Hero particles: change `PARTICLE_COUNT`, velocities, or colours in the hero canvas section of `script.js`.[file:2]

---

## Credits

Designed and developed by **Ankush Mallick** as a personal video editing portfolio, showcasing commercial and social media work, motion graphics, and colour grading.[file:1]

Feel free to fork and adapt this layout for your own creative portfolio, but please provide attribution if you use it as a base.
