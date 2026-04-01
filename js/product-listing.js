// Product listing: fetches from Shopify API, falls back to static data
// Renders product cards into collection grid sections

// Global store of all product data (API + static merged)
// Keyed by handle for easy lookup from product detail page
var PRODUCT_DATA = {};

// Map collection handles to section element IDs and grid classes
var COLLECTION_MAP = {
  'the-classic-collection': { sectionId: 'classic', gridClass: 'product-grid' },
  'the-gingham-collection': { sectionId: 'gingham', gridClass: 'product-grid' },
  'the-garden-collection': { sectionId: 'garden', gridClass: 'product-grid' },
  'ever-essentials':        { sectionId: 'essentials', gridClass: 'product-grid-4' },
};

// Map static product slugs to their collection section IDs
var STATIC_COLLECTION_MAP = {
  'midnight-dot':       'classic',
  'ivory-dot':          'classic',
  'cherry-blossom':     'classic',
  'blueberry':          'gingham',
  'strawberry-shortcake': 'gingham',
  'vanilla-creme':      'gingham',
  'bluebell-garden':    'garden',
  'petal-garden':       'garden',
  'pink':               'essentials',
  'sorbet':             'essentials',
  'bluebell-essential': 'essentials',
  'petal-essential':    'essentials',
};

// Counter for unique carousel IDs
var carouselCounter = 0;

// Build a product card HTML element
function buildProductCard(product) {
  var card = document.createElement('div');
  card.className = 'product-card fade-in';
  card.onclick = function() { openProduct(product.handle); };

  var images = product.images || [];
  var cid = carouselCounter++;

  // Carousel — arrow buttons stop propagation, but image clicks go through to open product
  var carouselHtml = '<div class="product-carousel">';
  carouselHtml += '<div class="carousel-track" id="track-' + cid + '">';
  images.forEach(function(img) {
    var src = img.url || img;
    var alt = img.altText || product.title;
    carouselHtml += '<div class="carousel-slide"><img src="' + src + '" alt="' + alt + '" loading="lazy"/></div>';
  });
  carouselHtml += '</div>';

  if (images.length > 1) {
    carouselHtml += '<button class="carousel-btn prev" onclick="event.stopPropagation();slide(' + cid + ',-1)">&#8249;</button>';
    carouselHtml += '<button class="carousel-btn next" onclick="event.stopPropagation();slide(' + cid + ',1)">&#8250;</button>';
  }
  if (!product.availableForSale) {
    carouselHtml += '<span class="sold-out-badge">Sold out</span>';
  }
  carouselHtml += '</div>';

  // Dots
  var dotsHtml = '';
  if (images.length > 1) {
    dotsHtml = '<div class="carousel-dots" id="dots-' + cid + '">';
    images.forEach(function(_, i) {
      dotsHtml += '<span class="dot' + (i === 0 ? ' active' : '') + '" onclick="event.stopPropagation();goTo(' + cid + ',' + i + ')"></span>';
    });
    dotsHtml += '</div>';
  }

  // Product info
  var sizesText = product.sizesDisplay || '';
  var priceText = product.priceDisplay || '';
  var infoHtml = '<div class="product-info">';
  infoHtml += '<div class="product-meta-row">';
  infoHtml += '<span class="product-sizes">' + sizesText + '</span>';
  infoHtml += '<span class="product-price">' + priceText + '</span>';
  infoHtml += '</div>';
  infoHtml += '<p class="product-name">' + product.title + '</p>';
  infoHtml += '</div>';

  card.innerHTML = carouselHtml + dotsHtml + infoHtml;

  // Register carousel
  carouselState[cid] = 0;
  carouselCounts[cid] = images.length;

  return card;
}

// Convert a Shopify API product node into our normalized format
function normalizeApiProduct(node) {
  var images = node.images.edges.map(function(e) { return e.node; });
  var variants = node.variants.edges.map(function(e) { return e.node; });
  var collections = node.collections.edges.map(function(e) { return e.node; });

  // Check if Shopify has real size variants (not just "Default Title")
  var hasRealVariants = !(variants.length === 1 && variants[0].title === 'Default Title');

  // Build sizes display from variant options
  var sizeNames = [];
  if (hasRealVariants) {
    variants.forEach(function(v) {
      v.selectedOptions.forEach(function(opt) {
        if (opt.name === 'Size' && sizeNames.indexOf(opt.value) === -1) {
          sizeNames.push(opt.value);
        }
      });
    });
  }
  var sizesDisplay = sizeNames.join(' \u00a0\u00b7\u00a0 ');

  // Build price display
  var minPrice = parseFloat(node.priceRange.minVariantPrice.amount);
  var maxPrice = parseFloat(node.priceRange.maxVariantPrice.amount);
  var currency = node.priceRange.minVariantPrice.currencyCode;
  var priceDisplay;
  if (minPrice === maxPrice) {
    priceDisplay = formatMoney(minPrice, currency);
  } else {
    priceDisplay = 'From ' + formatMoney(minPrice, currency);
  }

  // Description
  var description = node.description || '';
  var descriptionHtml = node.descriptionHtml || '';

  // Try to inherit sizes, dimensions, and details from static data
  // when Shopify product doesn't have real variants set up yet
  var dimensions = '';
  var details = '';

  if (typeof PRODUCTS !== 'undefined') {
    // Try exact handle match first, then fuzzy match by title
    var staticMatch = findStaticMatch(node.handle, node.title);
    if (staticMatch) {
      if (!sizesDisplay) {
        sizesDisplay = staticMatch.sizes.replace(/·/g, ' \u00a0\u00b7\u00a0 ');
      }
      if (!description && staticMatch.description) {
        description = staticMatch.description;
      }
      dimensions = staticMatch.dimensions || '';
      details = staticMatch.details || '';
      // Use static price display if it has "From" and API shows flat price
      // (means Shopify doesn't have multiple price variants yet)
      if (!hasRealVariants && staticMatch.price && staticMatch.price.indexOf('From') === 0) {
        priceDisplay = staticMatch.price;
      }
    }
  }

  return {
    handle: node.handle,
    title: node.title,
    description: description,
    descriptionHtml: descriptionHtml,
    images: images,
    variants: variants,
    collections: collections,
    sizesDisplay: sizesDisplay,
    priceDisplay: priceDisplay,
    price: priceDisplay,
    dimensions: dimensions,
    details: details,
    availableForSale: node.availableForSale,
    hasRealVariants: hasRealVariants,
    fromApi: true,
  };
}

// Find a matching static product by handle or title
function findStaticMatch(handle, title) {
  if (typeof PRODUCTS === 'undefined') return null;

  // Direct handle match
  if (PRODUCTS[handle]) return PRODUCTS[handle];

  // Try common handle variations
  var titleLower = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (PRODUCTS[titleLower]) return PRODUCTS[titleLower];

  // Search by name match
  var keys = Object.keys(PRODUCTS);
  for (var i = 0; i < keys.length; i++) {
    var p = PRODUCTS[keys[i]];
    if (p.name.toLowerCase() === title.toLowerCase()) return p;
    // Also match partial (e.g., "Bluebell" matches "Bluebell" in garden collection)
    if (title.toLowerCase().indexOf(p.name.toLowerCase()) === 0 && p.name.length > 3) return p;
  }

  return null;
}

// Convert a static PRODUCTS entry into normalized format
function normalizeStaticProduct(slug, data) {
  var images = data.images.map(function(src) {
    return { url: src, altText: data.name };
  });

  return {
    handle: slug,
    title: data.name,
    description: data.description,
    descriptionHtml: '',
    images: images,
    variants: [],
    collections: [],
    sizesDisplay: data.sizes.replace(/·/g, '\u00a0\u00b7\u00a0'),
    priceDisplay: data.price,
    price: data.price,
    dimensions: data.dimensions,
    details: data.details,
    availableForSale: true,
    collection: data.collection,
    fromApi: false,
  };
}

// Render products into a collection section's grid
function renderCollectionGrid(sectionId, products, gridClass) {
  var section = document.getElementById(sectionId);
  if (!section) return;

  var grid = section.querySelector('.' + gridClass);
  if (!grid) return;

  // Clear existing static content
  grid.innerHTML = '';

  products.forEach(function(product) {
    var card = buildProductCard(product);
    grid.appendChild(card);
  });
}

// Main: load products from API, merge with static, render
async function loadProducts() {
  // First, normalize all static products as fallback
  var staticProducts = {};
  if (typeof PRODUCTS !== 'undefined') {
    Object.keys(PRODUCTS).forEach(function(slug) {
      staticProducts[slug] = normalizeStaticProduct(slug, PRODUCTS[slug]);
      PRODUCT_DATA[slug] = staticProducts[slug];
    });
  }

  // Group static products by section
  var sectionProducts = {
    'classic': [],
    'gingham': [],
    'garden': [],
    'essentials': [],
  };

  Object.keys(STATIC_COLLECTION_MAP).forEach(function(slug) {
    var sectionId = STATIC_COLLECTION_MAP[slug];
    if (staticProducts[slug]) {
      sectionProducts[sectionId].push(staticProducts[slug]);
    }
  });

  // Try to fetch from API
  var apiProducts = [];
  var apiCollections = [];
  try {
    if (SHOPIFY_CONFIG.storefrontAccessToken) {
      console.log('[Ever Near] Fetching products from Shopify...');
      apiProducts = await fetchAllProducts();
      apiCollections = await fetchCollections();
      console.log('[Ever Near] Loaded ' + apiProducts.length + ' products from Shopify API');
    }
  } catch (err) {
    console.warn('[Ever Near] Shopify API fetch failed, using static data:', err.message);
  }

  // If we got API data, replace section products where collections exist
  if (apiProducts.length > 0) {
    // Normalize API products
    var normalizedApi = {};
    apiProducts.forEach(function(node) {
      var product = normalizeApiProduct(node);
      normalizedApi[product.handle] = product;
      // API data overrides static in the global lookup
      PRODUCT_DATA[product.handle] = product;
    });

    // Build collection -> product mapping from API
    apiCollections.forEach(function(col) {
      var mapping = COLLECTION_MAP[col.handle];
      if (mapping) {
        var colProducts = col.products.edges.map(function(e) {
          return normalizedApi[e.node.handle];
        }).filter(Boolean);

        if (colProducts.length > 0) {
          // Replace static products for this section with API products
          sectionProducts[mapping.sectionId] = colProducts;
          console.log('[Ever Near] Collection "' + col.title + '" → ' + colProducts.length + ' products from API');
        }
      }
    });

    // Handle products not in any mapped collection (add to appropriate section if possible)
    apiProducts.forEach(function(node) {
      var product = normalizedApi[node.handle];
      if (!product) return;
      var inAnySection = false;
      Object.keys(sectionProducts).forEach(function(sid) {
        sectionProducts[sid].forEach(function(p) {
          if (p.handle === product.handle) inAnySection = true;
        });
      });
      // If not placed yet, skip — it'll still be in PRODUCT_DATA for direct access
    });
  }

  // Render all sections
  Object.keys(sectionProducts).forEach(function(sectionId) {
    var gridClass = (sectionId === 'essentials') ? 'product-grid-4' : 'product-grid';
    if (sectionProducts[sectionId].length > 0) {
      renderCollectionGrid(sectionId, sectionProducts[sectionId], gridClass);
    }
  });

  // Re-observe fade-in elements for scroll animation
  document.querySelectorAll('.fade-in:not(.visible)').forEach(function(el) {
    if (typeof obs !== 'undefined') obs.observe(el);
  });

  console.log('[Ever Near] Rendered ' + Object.keys(PRODUCT_DATA).length + ' total products');
}
