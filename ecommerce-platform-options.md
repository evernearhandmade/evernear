# Ecommerce Platform Options: Shopify vs Big Cartel

A breakdown of the different ways to sell products online using Shopify or Big Cartel, what each option actually gives you, and how a custom headless build compares to the out-of-the-box experience.

---

## Part 1: The Three Ways to Use Shopify

Shopify isn't one product — it's a spectrum. You can go from "paste a button on your blog" all the way to "build an entirely custom website that just uses Shopify as a backend." Here's what each option looks like.

### Option A: Shopify Online Store (the standard website)

**What it is:** Shopify hosts your entire website. You pick a theme, customize it with their drag-and-drop editor, and your store lives at your domain. This is what most people think of when they hear "Shopify."

**What you get:**
- A full website with product pages, collections, a cart, and checkout
- A theme editor (drag-and-drop, no code required) with access to the underlying Liquid/HTML/CSS if you want to customize deeper
- Built-in blog, contact pages, navigation menus
- Mobile-responsive out of the box
- SEO handled by the platform (meta tags, sitemaps, etc.)
- App store with 8,000+ plugins for reviews, email marketing, upsells, etc.

**What you give up:**
- Your design is constrained by the theme system. You can customize heavily, but you're always working within Shopify's Liquid templating language and their layout rules.
- The site lives on Shopify's infrastructure. You don't control hosting, page speed optimizations, or deployment.
- If you want a design that doesn't fit a Shopify theme, you're fighting the platform.

**Cost:** Basic plan at $39/month (or $29/month billed annually). Credit card processing at 2.9% + 30 cents per online transaction with Shopify Payments. If you use a third-party payment provider instead, Shopify adds a 2% surcharge on top of whatever that provider charges.

**Best for:** Businesses that want a conventional online store up and running quickly, don't have a developer building a custom site, and are fine with a theme-based design.

---

### Option B: Shopify Buy Button (embed on an existing site)

**What it is:** Shopify gives you a small embeddable widget — a product card with an "Add to Cart" button — that you paste into any existing website or blog. Clicking the button opens a Shopify-powered cart overlay, then redirects to Shopify checkout.

**What you get:**
- A JavaScript embed code you paste into any HTML page
- A product card (or just a button) that shows the product image, title, price, and variant selector
- A sliding cart drawer that appears on your site
- Redirect to Shopify's hosted checkout when the customer is ready to pay
- Customizable colors and layout through Shopify's Buy Button configurator

**What you give up:**
- You have very limited control over the look and feel. The Buy Button widget has its own styles that may clash with your site's design system.
- No product listing pages, collection pages, or search — you manually place each Buy Button where you want it.
- No way to build a real browsing experience. It's a checkout tool, not a storefront.
- The cart overlay is Shopify's UI, not yours.

**Cost:** Available on the Starter plan at $5/month. However, the transaction fee is significantly higher: 5% per transaction when using Shopify Payments. On Basic ($39/month) the Buy Button is also available with the lower 2.9% + 30 cent rate.

**Best for:** Blogs, portfolio sites, or landing pages that want to sell a handful of products without building a store. Not suitable for a full product catalog or custom shopping experience.

---

### Option C: Shopify Storefront API (headless / custom site)

**What it is:** You build your own website from scratch — any technology, any design, any hosting — and use Shopify purely as a backend. Your site talks to Shopify's GraphQL Storefront API to fetch product data, and sends customers to Shopify's hosted checkout when they're ready to pay.

**What you get:**
- Complete control over every pixel. Your HTML, your CSS, your JavaScript, your design system.
- A GraphQL API that returns product titles, descriptions, images, prices, variants, collections, inventory status, and metafields.
- A Cart API to create server-side carts and get a checkout URL that redirects to Shopify's secure checkout.
- Host anywhere (Vercel, Netlify, your own server, etc.).
- Shopify still handles payment processing, order management, shipping, taxes, and confirmation emails.
- Products and inventory managed through Shopify Admin — no need to build a CMS.

**What you give up:**
- You have to build everything yourself: product listing pages, product detail pages, cart UI, variant selection, loading states, error handling, responsive design, image optimization.
- No Shopify theme editor. No drag-and-drop. No app store plugins (most Shopify apps are built for the Online Store channel, not headless).
- SEO requires more work — since you're rendering product pages client-side with JavaScript, you need to think about how search engines and social media previews see your pages.
- Checkout is still Shopify's hosted page. You can't customize the checkout UI on the Basic plan (checkout customization requires Shopify Plus at $2,300/month).

**Cost:** Same $39/month Basic plan. Same 2.9% + 30 cent transaction fees. The Storefront API is included on all plans — there's no extra charge for API access. Your only additional cost is hosting (Vercel's free tier covers most small-to-medium stores).

**Best for:** Businesses with a developer who wants full design control, a custom site that doesn't look like "a Shopify store," or a site that already exists and needs commerce added deeply rather than bolted on with a widget.

---

### Side-by-Side: Shopify Options

| | Online Store | Buy Button | Storefront API (Headless) |
|---|---|---|---|
| **Monthly cost** | $39 (Basic) | $5 (Starter) or included with Basic | $39 (Basic) |
| **Transaction fee** | 2.9% + 30c | 5% (Starter) or 2.9% + 30c (Basic) | 2.9% + 30c |
| **Design control** | Theme-based, customizable | Minimal (widget styles only) | Total (you build everything) |
| **Product limit** | Unlimited | Unlimited | Unlimited |
| **Hosting** | Shopify | Your existing site | You choose (Vercel, etc.) |
| **Cart experience** | Built-in | Shopify overlay | You build it |
| **Checkout** | Shopify hosted | Shopify hosted | Shopify hosted |
| **SEO** | Handled by platform | N/A (your host site's SEO) | You handle it |
| **Developer required** | No | No (paste embed code) | Yes |
| **Build time** | Hours to days | Minutes | Weeks |
| **App store access** | Yes (8,000+ apps) | Very limited | No (most apps don't work headless) |

---

## Part 2: Where Big Cartel Fits In

### What Big Cartel Is

Big Cartel is a simpler, smaller-scale ecommerce platform built for independent artists, makers, and small shops. It's the "just let me sell my stuff" option. You get a hosted website with a handful of themes, basic customization, and a checkout. That's it.

### Big Cartel Plans and Pricing

| Plan | Monthly Cost | Product Limit | Images per Product | Custom Domain | Code Editing |
|---|---|---|---|---|---|
| **Gold (Free)** | $0 | 5 products | 1 | No (bigcartel.com subdomain) | No |
| **Platinum** | $9.99 | 50 products | 5 | Yes | Yes |
| **Diamond** | $19.99 | 500 products | 25 | Yes | Yes |

**Transaction fees:** Big Cartel itself charges zero transaction fees and takes no percentage of sales. However, you still pay your payment processor's fees — Stripe (2.9% + 30 cents) or PayPal. Those are your only two payment options.

### What Big Cartel Does Well

- **Dead simple.** If you want to sell 10 handmade items and don't want to think about ecommerce software, Big Cartel gets you there in an afternoon.
- **Free plan exists.** 5 products, no cost. Good for testing the waters.
- **No platform transaction fees.** You only pay Stripe/PayPal processing fees, not a Shopify-style surcharge on top.
- **Artist-friendly.** The whole experience is designed for people who make things, not enterprise commerce teams.

### What Big Cartel Doesn't Do

This is the important part for your decision:

- **No headless / API storefront option.** Big Cartel has a REST API, but it's a store management API (read orders, sync inventory), not a storefront API. You cannot use it to build a custom website that pulls product data and creates checkouts. There is no equivalent to Shopify's Storefront API. The checkout is a protected area that third-party apps and custom code cannot access or replace.
- **No Buy Button equivalent.** There's no embeddable widget to drop into an external site.
- **500-product cap.** Even on the most expensive plan, you're limited to 500 products. Shopify has no product limit on any plan.
- **Only Stripe and PayPal for payments.** No Apple Pay, Google Pay, Klarna, Shop Pay, or other payment methods unless they're offered through Stripe.
- **No abandoned cart recovery.** If someone adds items and leaves, there's no automated email to bring them back. Shopify includes this on Basic and above.
- **No multi-channel selling.** No native Amazon, Instagram Shopping, or TikTok Shop integration. Shopify supports all of these.
- **Very limited app ecosystem.** Big Cartel has a handful of integrations. Shopify has thousands.
- **Theme customization is basic.** On paid plans, you can edit HTML/CSS/Liquid code, but the theme system is much simpler and more constrained than Shopify's. On the free plan, you can only swap images in pre-defined slots — no color, layout, or code changes.
- **No digital product support natively.** Requires a third-party app (Pulley, $6-$299/month).

### Big Cartel's API: What It Actually Does

To be specific about the API since this came up: Big Cartel's API (v1, REST, OAuth 2.0) lets external applications read and write store data — products, orders, categories, inventory. This is useful for building inventory sync tools, order management dashboards, or reporting integrations. It is not designed for building a customer-facing storefront. There is no cart creation endpoint accessible for headless checkout, and the checkout pages are explicitly locked down from third-party code.

---

## Part 3: Big Cartel vs Shopify — Which One When

| | Big Cartel | Shopify |
|---|---|---|
| **Best for** | Small makers selling <50 items who want simplicity | Anyone who needs scale, customization, or integrations |
| **Cheapest option** | Free (5 products) | $5/month (Starter, Buy Button only) |
| **Full store cheapest** | $9.99/month (50 products) | $39/month (unlimited products) |
| **Custom website (headless)** | Not possible | Yes, via Storefront API |
| **Embed on existing site** | Not possible | Yes, via Buy Button |
| **Product limit** | 500 max | Unlimited |
| **Payment options** | Stripe, PayPal only | 100+ providers, Shop Pay, Apple Pay, etc. |
| **Transaction fees (platform)** | None | 0% with Shopify Payments, 2% without |
| **Abandoned cart emails** | No | Yes (Basic and up) |
| **App ecosystem** | Minimal | 8,000+ apps |
| **Multi-channel (Amazon, Instagram, etc.)** | No | Yes |
| **Digital products** | Via paid third-party app | Free built-in app |
| **Discount codes** | Paid plans only | All plans |
| **API for custom builds** | Management only (not storefront) | Full Storefront API (GraphQL) |

### The Bottom Line

If you want to build a custom website with your own design and just use the ecommerce platform as a backend for products, checkout, and order management — **Big Cartel cannot do this.** It's a hosted website platform with limited customization. Your only option with Big Cartel is to use their website.

Shopify gives you three tiers of control: use their website (Online Store), embed on your website (Buy Button), or build your own website entirely (Storefront API). For a custom static site hosted on Vercel with full design control, the Storefront API on the Basic plan is the right fit.

---

## Part 4: Implementation Plan — Headless Shopify with a Custom Static Site

This section covers the technical implementation for the approach we're going with: a vanilla HTML/CSS/JS site hosted on Vercel, using Shopify's Storefront API for product data and checkout.

### Architecture Overview

```
Your Custom Site (Vercel)          Shopify
========================          =======

HTML/CSS/JS  ──── fetch ────►  Storefront API (GraphQL)
(product pages,                   - Product data
 cart UI,                         - Collection data
 variant selection)               - Cart creation
                                  - Checkout URL
         │                            │
         │                            ▼
         └──── redirect ────►  Shopify Checkout
                                  - Payment processing
                                  - Order confirmation
                                  - Shipping / taxes
                                  - Confirmation email
```

Your site handles the browsing experience. Shopify handles the money.

### Step 1: Shopify Setup

**Create a Shopify store** on the Basic plan ($39/month).

**Create a custom app** for API access:
1. Shopify Admin > Settings > Apps and sales channels > Develop apps
2. Enable custom app development if prompted
3. Create a new app (name it something like "Headless Storefront")
4. Under Configuration, select Storefront API access scopes:
   - `unauthenticated_read_product_listings` — fetch products
   - `unauthenticated_read_collection_listings` — fetch collections
   - `unauthenticated_read_product_inventory` — show stock levels (optional)
   - `unauthenticated_write_checkouts` — create carts/checkouts
   - `unauthenticated_read_checkouts` — read cart state
5. Install the app and copy the **Storefront access token**

**Important:** This token is public by design. It's meant to be used in client-side JavaScript. It can only read published product data and create checkouts — it cannot access orders, customer data, or admin functions. It's safe to include in your front-end code.

**Publish products to the headless channel:** Products must be explicitly published to your custom app's sales channel in Shopify Admin. If products don't appear in API responses, this is almost always why.

### Step 2: Project Structure

```
your-site/
├── index.html              Product listing (homepage)
├── product.html            Product detail page (single shell for all products)
├── collection.html         Collection page (single shell for all collections)
├── cart.html               Cart page
├── thank-you.html          Post-checkout landing page
├── 404.html
├── css/
│   ├── base.css            Reset, variables, typography
│   ├── components.css      Product cards, buttons, form elements
│   ├── layout.css          Grid, header, footer
│   └── pages.css           Page-specific styles
├── js/
│   ├── config.js           Shopify store domain + access token
│   ├── shopify-api.js      GraphQL fetch wrapper
│   ├── queries.js          All GraphQL query strings
│   ├── product-listing.js  Fetches + renders product grid
│   ├── product-detail.js   Fetches + renders single product page
│   ├── variant-selector.js Option selection + variant matching logic
│   ├── cart.js             Cart state management (localStorage)
│   ├── checkout.js         Creates Shopify cart + redirects to checkout
│   ├── price-formatter.js  Currency formatting with Intl.NumberFormat
│   ├── image-utils.js      Shopify CDN image URL transforms
│   └── router.js           Reads product/collection handle from URL path
├── img/                    Static assets (logo, icons)
└── vercel.json             Rewrites + caching headers
```

### Step 3: Storefront API — Fetching Data

**API endpoint:**
```
POST https://{your-store}.myshopify.com/api/2025-01/graphql.json
```

**Required headers:**
```
Content-Type: application/json
X-Shopify-Storefront-Access-Token: {your-token}
```

**Fetch wrapper** (the single function all API calls go through):

```js
// js/shopify-api.js

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(
    `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map(e => e.message).join(', '));
  }
  return json.data;
}
```

**Product listing query** (with pagination):

```graphql
query ProductListing($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        handle
        description
        availableForSale
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
}
```

Call with `{ first: 24, after: null }` for the first page. Use `endCursor` for subsequent pages. Maximum `first` is 250 per request.

**Single product query** (for product detail pages):

```graphql
query ProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    descriptionHtml
    availableForSale
    options {
      id
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
        }
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
  }
}
```

**Collection products query:**

```graphql
query CollectionProducts($handle: String!, $first: Int!, $after: String) {
  collection(handle: $handle) {
    id
    title
    description
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
```

### Step 4: Rendering Product Pages

Since this is a vanilla JS site with no framework, the approach is client-side rendering with HTML `<template>` elements.

**How routing works:** `product.html` is a single file that serves every product page. Vercel rewrites map `/product/classic-t-shirt` to `product.html`, and JavaScript reads the URL to determine which product to fetch.

**Product card template** (in `index.html`):

```html
<template id="product-card-template">
  <article class="product-card">
    <a class="product-card__link" href="">
      <div class="product-card__image-wrapper">
        <img class="product-card__image" src="" alt="" loading="lazy">
      </div>
      <h3 class="product-card__title"></h3>
      <p class="product-card__price"></p>
    </a>
  </article>
</template>

<section id="product-grid" class="product-grid"></section>
```

JavaScript clones the template, fills in the data, and appends it to the grid. This keeps HTML in HTML files rather than buried in JS string concatenation.

**URL routing** (extracting the product handle from the path):

```js
// js/router.js
function getProductHandle() {
  // URL: /product/classic-t-shirt -> returns "classic-t-shirt"
  const segments = window.location.pathname.split('/').filter(Boolean);
  return segments[1] || null;
}
```

### Step 5: Cart Management

**Approach: Custom cart with localStorage** (not the Shopify JS Buy SDK).

The JS Buy SDK is a ~100KB library that would require either a `<script>` tag for the UMD build or introducing a bundler. Since the Shopify Cart API is straightforward, a lightweight custom cart (~3KB) is a better fit for a vanilla JS site.

**How it works:**
- A `Cart` class stores items in `localStorage` as an array of `{ variantId, quantity, title, price, currencyCode, image }`
- Methods: `addItem()`, `updateQuantity()`, `removeItem()`, `clear()`
- An observer pattern (`onChange` callbacks) lets any page subscribe to cart changes — the header cart count badge updates automatically
- Cart state survives page reloads and browser closes

**At checkout time**, the cart data is sent to Shopify's Cart API to create a real server-side cart, which returns a checkout URL.

### Step 6: Checkout Flow

When the customer clicks "Checkout," your code:

1. Takes the items from localStorage
2. Sends a `cartCreate` mutation to the Storefront API
3. Receives a `checkoutUrl` back
4. Clears the local cart
5. Redirects the browser to the checkout URL

```graphql
mutation CartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}
```

The customer completes payment on Shopify's hosted checkout page. Shopify handles payment processing, tax calculation, shipping rates, and sends the order confirmation email.

**Simpler alternative — cart permalink:** You can also skip the Cart API and build a URL in this format:
```
https://{store}.myshopify.com/cart/{variant_id}:{quantity},{variant_id}:{quantity}
```
This redirects straight to checkout with no API call. The trade-off is you can't attach discount codes, order notes, or custom attributes.

**After purchase:** Shopify shows its own order confirmation page. To redirect customers back to your site, add a script in Shopify Admin > Settings > Checkout > Additional Scripts that redirects to your `/thank-you` page.

### Step 7: Vercel Deployment

**vercel.json:**

```json
{
  "rewrites": [
    { "source": "/product/:handle", "destination": "/product.html" },
    { "source": "/collection/:handle", "destination": "/collection.html" }
  ],
  "headers": [
    {
      "source": "/js/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/css/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    }
  ],
  "cleanUrls": true,
  "trailingSlash": false
}
```

`cleanUrls: true` strips `.html` extensions. So `about.html` is served at `/about`, `cart.html` at `/cart`. Combined with the rewrites, the URL structure is:

- `/` — homepage / product listing
- `/product/classic-t-shirt` — product detail (served by product.html)
- `/collection/summer` — collection page (served by collection.html)
- `/cart` — cart page
- `/about` — static page

**No build step required.** Vercel deploys static files as-is. Connect your Git repo in the Vercel dashboard for automatic deploys on push, or use the CLI (`vercel --prod`).

### Step 8: Gotchas and Things to Watch

**CORS:** Not an issue. The Storefront API returns `Access-Control-Allow-Origin: *`. Client-side fetch works from any origin with no proxy needed.

**API rate limits:** The Storefront API uses a cost-based bucket system — 1,000 points max, refilling at 50 points per second. A typical product listing query costs 10-30 points. Normal traffic will never hit this. For a flash sale or high-traffic event, cache product data in `sessionStorage` to avoid redundant requests.

**Token security:** The storefront access token is visible in network requests and your JavaScript source. This is fine — Shopify designed it this way. It can only perform `unauthenticated_*` operations: reading published products and creating carts. It cannot access orders, customer data, or admin functions.

**API version pinning:** Always pin to a specific version (e.g., `2025-01`). Shopify deprecates API versions on a ~12-month rolling cycle. Plan to update the version annually.

**Variant selection complexity:** Products can have up to 3 options (e.g., Size, Color, Material) and 100 variants. Not all option combinations may exist as actual variants. When a customer selects "Red" and "XL," you need to check whether that combination exists and is in stock. This is the single most complex piece of UI logic in a headless Shopify build.

**Cart vs. inventory mismatch:** Your localStorage cart doesn't validate against live inventory. A customer could add 5 items, come back a day later when only 2 are in stock. Shopify checkout will block the order, but it's a bad experience. Re-fetch variant data when the cart page loads to catch this early.

**Price formatting:** Shopify returns prices as strings (e.g., `"29.00"`) with a `currencyCode`. Always use `parseFloat()` before doing math. Use `Intl.NumberFormat` for display:
```js
new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: currencyCode,
}).format(parseFloat(amount));
```

**Image optimization:** Shopify's CDN supports URL-based transforms. In your GraphQL query, use the `transform` argument on image URLs:
```graphql
url(transform: { maxWidth: 400, preferredContentType: WEBP })
```
This returns a resized WebP image — much better for page load performance than serving the full original.

**Sales channel visibility:** Products must be published to the custom app's sales channel in Shopify Admin. If a product exists in Shopify but doesn't appear in API responses, check this setting first. It's the most common "why aren't my products showing up" issue.

**Metafields for custom data:** If products need extra structured data beyond what Shopify provides by default (sizing charts, care instructions, material details), use Shopify metafields. They're queryable through the Storefront API but must be explicitly enabled for storefront access under Settings > Custom data.

**SEO considerations:** Since product pages are rendered client-side with JavaScript, search engine crawling needs attention. Googlebot executes JavaScript and will index CSR pages, so Google search works. However, social media previews (Open Graph tags) won't work without server-side rendering — Facebook, Twitter, and iMessage crawlers don't execute JS. For a small store this is often acceptable. If social sharing previews matter, Vercel Edge Middleware can inject `og:` meta tags server-side without a full SSR setup.

### Implementation Order

1. **Shopify setup** — create store, create app, configure API scopes, publish products to headless channel
2. **API connection** — get `shopify-api.js` working, test a product query in the browser console
3. **Product listing page** — `index.html` + `product-listing.js`, render product cards from live data
4. **Product detail page** — `product.html` + `product-detail.js` + `variant-selector.js` (the most complex page)
5. **Cart** — `cart.js` + cart UI on `cart.html` + header cart count badge on all pages
6. **Checkout** — `checkout.js` with `cartCreate` mutation + redirect to Shopify checkout
7. **Vercel deploy** — configure `vercel.json`, test clean URLs and rewrites in production
8. **Polish** — loading states, error handling, image optimization, pagination, mobile testing

---

## Sources

- [Shopify Pricing Plans](https://www.shopify.com/pricing)
- [Shopify Starter Plan Details](https://www.shopify.com/starter)
- [Shopify Buy Button](https://shopify.dev/docs/storefronts/headless/additional-sdks/buy-button)
- [Shopify Buy Button Blog Post](https://www.shopify.com/blog/60670213-5-ways-you-can-use-shopify-buy-buttons-to-sell-on-your-website-or-blog)
- [Shopify Storefront API vs JS Buy SDK Discussion](https://community.shopify.com/t/help-trying-to-understand-the-difference-between-shopify-buy-sdk-and-storefront-api/331764)
- [Shopify Online Store vs Buy Button Channel](https://community.shopify.com/t/what-is-the-difference-in-channel-online-store-vs-buy-button/108708)
- [Shopify Starter vs Basic Comparison](https://www.stylefactoryproductions.com/blog/shopify-starter-vs-basic)
- [Shopify Pricing Breakdown (2026)](https://bootstrappingecommerce.com/shopify-pricing/)
- [Big Cartel Pricing](https://www.bigcartel.com/product/pricing)
- [Big Cartel API Documentation](https://developers.bigcartel.com/api/v1)
- [Big Cartel Theme API](https://developers.bigcartel.com/api/themes)
- [Big Cartel Theme Customization Guide](https://www.bigcartel.com/resources/help/article/how-to-customize-your-theme)
- [Big Cartel vs Shopify (2026)](https://www.stylefactoryproductions.com/big-cartel-vs-shopify)
- [Big Cartel vs Shopify — Printify](https://printify.com/blog/big-cartel-vs-shopify/)
- [BigCartel Review (2026)](https://wiserreview.com/blog/bigcartel-review/)
- [Big Cartel API Integration Overview](https://api2cart.com/api-technology/big-cartel-api/)
