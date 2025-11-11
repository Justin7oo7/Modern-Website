# Green Felt Billiards — One‑Page Website

Modern, responsive single-page site for a billiards club (pool, snooker, carom) using plain HTML, CSS, and JavaScript. No frameworks required.

## Features
- Fixed header with smooth scroll and mobile hamburger menu
- Hero with CTA, About with offerings cards
- Rules & Tips tabs + accordion for quick learning
- Live Score widget (increment/decrement, reset, swap players)
- Events listing and table booking form with validation
- Responsive Gallery with lightbox modal
- Testimonials carousel with controls and auto-rotate
- Accessible: semantic HTML, ARIA roles/labels, keyboard navigable
- SEO meta and Open Graph tags, lazy-loaded images

## Files
```
.
├── index.html       # Main one-page site
├── styles.css       # All styles (Google Fonts: Poppins, Inter)
├── script.js        # Interactions (nav, tabs, accordion, widget, lightbox, carousel, validation)
└── images/          # Put your real images here (see placeholders below)
```

## Quick start
1. Open `index.html` in a browser. That’s it—no build needed.
2. Replace placeholder images with your own assets in `images/`.

## Replace placeholder assets
In `index.html` and `styles.css`, search for `images/`. Replace the following with real images:
- `images/pool.jpg`, `images/snooker.jpg`, `images/carom.jpg`
- `images/gallery1.jpg` … `images/gallery6.jpg`
- `images/og-cover.jpg` (for social sharing)

Tip: Use optimized JPEGs/WebPs around 1200px width for hero/OG and 800–1000px for gallery. Add `width`/`height` attributes if possible for better CLS.

## Customization
- Colors: update CSS custom properties at the top of `styles.css` (`--green`, `--wood`, `--gold`, etc.).
- Typography: change Google Fonts link in `index.html` and font-family in `styles.css`.
- Sections: edit markup in `index.html`. Each section is wrapped in `.section` for consistent spacing.
- Validation: tweak rules/messages in `script.js` (booking and newsletter handlers).

## Accessibility
- Keyboard-friendly: focus states, semantic roles, ARIA for tabs, accordion, dialog, carousel.
- Lightbox closes with Esc, clicking backdrop, or the close button.
- Tabs support ArrowLeft/ArrowRight navigation.

## Performance
- Minimal CSS/JS, lazy-loaded images, efficient IntersectionObserver for reveals.
- No third-party scripts or frameworks.

## Deployment
Upload the folder to any static host (GitHub Pages, Netlify, Vercel, shared hosting). Ensure the `images/` directory is present with your assets.

## License
MIT
