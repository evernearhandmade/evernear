# Ever Near — Project Documentation

## Overview

Ever Near is a handcrafted cosmetic bag brand. The website is a vanilla HTML/CSS/JavaScript single-page application that pulls product data from Shopify via the Storefront API and is hosted on Vercel.

---

## Deployment & Hosting Workflow

### End-to-End Flow

```
Local code → git push → GitHub (main branch) → Vercel auto-deploys → evernearhandmade.com
```

1. **Code lives on GitHub:** `github.com/evernearhandmade/evernear`
2. **Vercel is connected to the GitHub repo.** Every push to `main` triggers an automatic deployment — no build step needed since this is a static site.
3. **Domain:** `evernearhandmade.com` was purchased from **Porkbun** and pointed to Vercel via DNS settings.
4. **No build process** — Vercel serves the HTML/CSS/JS files directly as static assets.

### Vercel Configuration (`vercel.json`)

- **Clean URLs:** `.html` extensions are stripped (e.g., `/index` instead of `/index.html`)
- **URL Rewrites:** `/product/:handle` → `product.html`, `/collection/:handle` → `collection.html`
- **Caching:**
  - JS/CSS: 1 year (`immutable`) — bump the `?v=` query param in `index.html` when updating CSS/JS to bust cache
  - Images: 1 day
  - HTML: no cache, always revalidated

### Cache Busting

Because CSS/JS are cached for 1 year on Vercel's CDN, you must update the version query parameter when changing styles or scripts:

```html
<link rel="stylesheet" href="css/styles.css?v=3">
<script src="js/products.js?v=3"></script>
```

Increment `?v=3` → `?v=4` etc. each time you modify CSS or JS files, otherwise the live site will serve stale cached versions. **All JS and CSS files currently use `?v=3`.**

---

## Product Management

### Where Products Live

**Products, images, prices, and variants are managed in Shopify Admin** at `ever-near.myshopify.com`. The website pulls this data in via the Shopify Storefront API (GraphQL).

### How It Works

1. **You add/edit products in Shopify** — upload images, set prices, create size variants (Le Classique, Le Voyage, Le Essentials), write descriptions.
2. **The website fetches products on page load** via `js/shopify-api.js` using the Storefront API.
3. **Products render into their collection grids** on the homepage — Classic, Gingham, Garden, Essentials.
4. **Checkout redirects to Shopify** — Shopify handles payment, shipping, taxes, and order confirmation emails.

### Product Descriptions

- **Shopify is the single source of truth for descriptions.** Static descriptions in `products.js` have been cleared so Shopify descriptions always show.
- **Ever Essentials products** use formatted HTML descriptions with bold headers, dashed detail lists, and flower icons (✿). These are set in Shopify's description editor.
- **Dimensions and details** are stored in `products.js` as static data (not in Shopify). These render below the description on the product detail page.
- The product detail page renders descriptions with `innerHTML` (not `textContent`) to support HTML formatting from Shopify's `descriptionHtml` field.

### Product Dimensions (Standard Sizes)

| Size | Dimensions |
|---|---|
| Le Classique (Medium) | 8"W × 5"H × 5"D |
| Le Voyage (Large) | 9"W × 6"H × 7"D |
| Le Essentials (Small) | 7"W × 5"H × 2"D |

### Sold Out / Inventory

- Products with `availableForSale: false` from Shopify automatically show:
  - **"Sold out" badge** on the product card (bottom-left corner, dark charcoal background, Cormorant Upright italic font)
  - **"Out of Stock" button** on the product detail page (grayed out, disabled)
- The `availableForSale` flag is fetched from the Shopify API at the product and variant level.
- Static fallback products default to `availableForSale: true`.

### Shopify API Details

- **Store:** `ever-near.myshopify.com`
- **API:** Storefront API (GraphQL), version `2025-01`
- **Access token:** Public storefront token in `js/config.js` (safe for client-side use — can only read published products and create carts)
- **Data fetched:** Product titles, handles, descriptions, descriptionHtml, images, variants (sizes + prices), collections, availability

### Static Fallback Data

`js/products.js` contains hardcoded data for all products. This serves as a fallback if the Shopify API is unreachable. It provides **dimensions** and **details** text that isn't stored in Shopify. **Descriptions are intentionally left empty** in static data so Shopify descriptions always take priority.

**Current products:**

| Collection | Products | Prices |
|---|---|---|
| The Classic Collection | Midnight Dot, Ivory Dot, Cherry Blossom | $45–48 |
| The Gingham Collection | Blueberry, Strawberry Shortcake, Vanilla Creme | $46 |
| The Garden Collection | Bluebell, Petal (Le Classique only) | From $32 |
| Ever Essentials | Pink, Sorbet, Bluebell, Petal, Cherry Blossom | $32 |

### Adding a New Product

1. Add the product in **Shopify Admin** (title, description, images, variants, prices)
2. Assign it to the correct **collection** in Shopify
3. Add a static fallback entry in `js/products.js` with dimensions/details (leave description empty)
4. Add a product card in `index.html` within the appropriate collection section
5. See `shopify-product-entry-guide.md` for detailed instructions

---

## Site Architecture

### SPA Pattern (No Framework)

The site uses a manual single-page app pattern — no React, no Next.js, just vanilla JS. Pages are `<div class="page">` elements toggled with CSS `display: none/block`:

- `#main-page` — Homepage with hero, all collections, footer
- `#product-page` — Product detail view (single shell, dynamically populated)
- `#about-page` — About / Our Story page
- `#contact-page` — Contact page (evernear.co@gmail.com)

Page switching is handled by `showPage(id)` in `js/navigation.js`. Section scrolling uses `navTo(sectionId)`.

### File Structure

```
ever-near-main/
├── index.html              # Main HTML (all pages)
├── css/styles.css          # All styles
├── js/
│   ├── config.js           # Shopify API credentials
│   ├── products.js         # Static product fallback data (dimensions, details)
│   ├── shopify-api.js      # Shopify Storefront API wrapper
│   ├── carousel.js         # Product image carousels
│   ├── hero-carousel.js    # Hero lifestyle image carousel (easy to update)
│   ├── navigation.js       # Menu toggle, page switching
│   ├── product-detail.js   # Product detail page logic
│   ├── product-listing.js  # Product grid rendering + normalization
│   ├── cart.js             # Cart management + Shopify checkout
│   └── main.js             # Initialization, scroll animations
├── img/
│   ├── logo.png            # Original Ever Near logo (script only)
│   ├── logo-new.png        # Current logo with "Handmade in Southern California"
│   ├── lifestyle-*.jpg     # Hero carousel lifestyle photos (1-9)
│   └── [product images]    # Product photos
├── vercel.json             # Vercel deployment config
└── documentation.md        # This file
```

### Script Load Order

Scripts load at the bottom of `<body>` in this order (dependencies flow top to bottom):

1. `config.js` → Shopify credentials
2. `products.js` → Static data
3. `shopify-api.js` → API functions
4. `carousel.js` → Carousel state
5. `navigation.js` → Menu + page switching
6. `product-detail.js` → Product page logic
7. `product-listing.js` → Grid rendering (uses all above)
8. `cart.js` → Cart + checkout (uses shopify-api)
9. `hero-carousel.js` → Hero lifestyle carousel
10. `main.js` → Init (calls `loadProducts()`, sets up scroll animations)

---

## Hero Carousel

The hero section features an endless scrolling carousel of lifestyle photos between the logo and the collection sections.

### How It Works

- **Continuous infinite scroll** using `requestAnimationFrame` — no visible reset or jump
- Shows ~3-4 images at once, scrolling left continuously
- **Pauses on hover**
- Each image is **clickable** and links to its corresponding product page
- 3 copies of the image set are rendered for seamless looping

### Updating the Carousel

Edit `js/hero-carousel.js` — just update the `HERO_SLIDES` array at the top:

```js
var HERO_SLIDES = [
  { src: 'img/lifestyle-1.jpg', product: 'ivory-dot' },
  { src: 'img/lifestyle-2.jpg', product: 'petal-garden' },
  // ... add or remove entries as needed
];
```

- **`src`** — path to the image file
- **`product`** — product handle to open when clicked (use `''` for no link)
- **`HERO_SCROLL_SPEED`** — pixels per second (currently `80`, higher = faster)

### Current Image Mapping

| File | Product |
|---|---|
| lifestyle-1.jpg | Ivory Dot |
| lifestyle-2.jpg | Petal Garden |
| lifestyle-3.jpg | Bluebell Garden |
| lifestyle-4.jpg | Sorbet |
| lifestyle-5.jpg | Strawberry Shortcake |
| lifestyle-6.jpg | Midnight Dot |
| lifestyle-7.jpg | Petal Essential |
| lifestyle-8.jpeg | Ivory Dot |
| lifestyle-9.jpg | Petal Garden |

---

## Design System

### Colors (CSS Variables in `:root`)

| Variable | Hex | Usage |
|---|---|---|
| `--bg` | `#f4f6fc` | Page background (light blue-white) |
| `--parchment` | `#e8ecf5` | Alternating section background |
| `--taupe` | `#9aa0b8` | Secondary text, labels, dividers |
| `--charcoal` | `#2c2824` | Primary text, buttons, headings |
| `--muted` | `#6b7080` | Body text, descriptions |

### Fonts (Google Fonts)

- **EB Garamond** (serif) — Body text, labels, buttons, navigation
- **Cormorant Upright** (serif, italic) — Product names, section titles, decorative headings, sold out badge

### Key Patterns

- **Eyebrow text:** Small uppercase, letter-spaced, taupe color (e.g., "Collection No. 1", "Our Story")
- **Section titles:** Large Cormorant Upright italic
- **Dividers:** 40px wide, 1px, taupe color
- **Buttons:** Uppercase, letter-spaced, outlined with fill-on-hover
- **Sold out badge:** Charcoal background, Cormorant Upright italic, positioned bottom-left on product card
- **Animations:** Fade-in on scroll (IntersectionObserver), smooth carousel transitions

### Responsive

- Single breakpoint at **640px**
- Mobile: single-column grids, smaller search input, full-width cart drawer, smaller carousel images
- Product detail page stacks at **760px**

---

## Pages

### Homepage (`#main-page`)

- **Hero:** Logo (with subtitle baked in), lifestyle carousel, tagline, Shop the Collection button
- **Classic Collection:** 3 products (Le Classique + Le Voyage sizes)
- **Gingham Collection:** 3 products (Le Classique only)
- **Garden Collection:** 2 products (Le Classique only)
- **Ever Essentials:** 4-5 products (Le Essentials size)
- **Footer:** Logo, navigation links, copyright

### About Page (`#about-page`)

- Standalone page (removed from homepage)
- Accessible from hamburger menu and footer
- "Our Story" — brand story about faith, femininity, and handmade craft
- Uses same layout as Contact page (centered, max-width 680px)

### Contact Page (`#contact-page`)

- Email: evernear.co@gmail.com
- Mailto link opens user's email client

### Product Detail Page (`#product-page`)

- Dynamic — populated by `openProduct(handle)` in `product-detail.js`
- Shows: image gallery, collection name, product name, price, size selector, description (from Shopify), dimensions, details, Add to Cart / Out of Stock button

---

## Cart & Checkout

### How the Cart Works

- Cart state is stored in **browser localStorage** (key: `evernear_cart`)
- Cart drawer slides in from the right side
- Users can adjust quantities or remove items
- Cart badge on the nav bar shows item count

### Checkout Flow

1. User clicks **Checkout** in cart drawer
2. `initiateCheckout()` sends a `cartCreate` GraphQL mutation to Shopify
3. Shopify returns a `checkoutUrl`
4. Browser redirects to **Shopify's hosted checkout**
5. Shopify handles payment (Stripe, Apple Pay, etc.), shipping, taxes, order confirmation

---

## Local Development

```bash
python3 -m http.server 3000
# Open http://localhost:3000
```

No dependencies to install — pure static site.

---

## Key Files to Know

| When you want to... | Edit this file |
|---|---|
| Update hero carousel images | `js/hero-carousel.js` (edit `HERO_SLIDES` array) |
| Add/edit a product card on the homepage | `index.html` (find the collection section) |
| Change product dimensions/details | `js/products.js` |
| Update product descriptions | **Shopify Admin** (not in code) |
| Update styles | `css/styles.css` (then bump `?v=` in index.html) |
| Change Shopify API config | `js/config.js` |
| Modify cart/checkout behavior | `js/cart.js` |
| Add a new page | `index.html` (add `<div class="page">`), `css/styles.css`, update nav links |
| Change deployment settings | `vercel.json` |
| Update the logo | Replace `img/logo-new.png` |
