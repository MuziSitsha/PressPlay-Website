# Press Play Website

**Branding That Packs A Impression.**

Custom branded cups and food packaging — Pretoria, South Africa.

---

## Project Structure

```
PressPlay-Website/
├── index.html          # Full single-page site
├── css/
│   └── style.css       # All styles — brand tokens, layout, responsive
├── js/
│   └── main.js         # Nav, scroll reveal, form handling
├── assets/             # Drop logo, product images, favicons here
└── README.md
```

---

## Getting Started

No build tools required. Open `index.html` directly in a browser, or serve with any static host.

```bash
# Quick local preview (Python)
python3 -m http.server 3000

# Or with Node
npx serve .
```

---

## Customisation Checklist

### 1. Replace placeholder content
- [ ] Phone number: search `+27 XX XXX XXXX` → replace with real number
- [ ] WhatsApp link: update `href` in the WhatsApp social button (`wa.me/27XXXXXXXXX`)
- [ ] Social handles: update Instagram, TikTok, Facebook hrefs
- [ ] Email: `info@pressplaybrand.co.za` (confirm with client)

### 2. Add real logo
Drop the Press Play logo into `assets/` and add to nav + footer:
```html
<img src="assets/logo.png" alt="Press Play" height="32" />
```

### 3. Add product photography
Replace the emoji placeholders in `.prod-card` with real `<img>` tags:
```html
<img src="assets/cups-hero.jpg" alt="Branded slushy cups" class="prod-card__photo" />
```
Add to `style.css`:
```css
.prod-card__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
}
```

### 4. Hook up the quote form
In `js/main.js`, find the `── REPLACE THIS WITH YOUR ACTUAL FORM ENDPOINT ──` comment.

**Formspree (recommended — free tier):**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form → copy your form ID
3. Replace the fetch URL:
```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new FormData(quoteForm),
});
const success = res.ok;
```

**Netlify Forms (if hosting on Netlify):**
Add `data-netlify="true"` to the `<form>` tag — Netlify handles the rest.

### 5. Add favicon
```html
<!-- In <head> of index.html -->
<link rel="icon" type="image/png" href="assets/favicon.png" />
```

---

## Brand Tokens

| Token       | Value     | Usage                        |
|-------------|-----------|------------------------------|
| `--pink`    | `#E8187A` | Primary accent, CTAs, icons  |
| `--ink`     | `#0a0a0a` | Main background              |
| `--ink2`    | `#111111` | Section alternates           |
| `--paper`   | `#f7f4f0` | Process section (light)      |
| `--white`   | `#ffffff`  | Text, splash section         |

Font: **Barlow** (loaded from Google Fonts) — weights 400, 500, 600, 700, 900

---

## Deployment

Works on any static host:

- **Netlify**: Drag-and-drop the folder at netlify.com/drop
- **Vercel**: `vercel deploy` from the project root
- **GitHub Pages**: Push to `main`, enable Pages in repo Settings → Pages → Source: `main / root`

---

## Contact

Press Play · Pretoria, South Africa · pressplaybrand.com
