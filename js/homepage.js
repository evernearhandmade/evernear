// Homepage: load 6 newest products into the Newest Pieces grid

var homepageObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

function normalizeProductForDetail(p) {
  var collections = p.collections.edges.map(function(e) { return e.node; });
  var variants = p.variants.edges.map(function(e) { return e.node; });
  var images = p.images.edges.map(function(e) { return { url: e.node.url, altText: e.node.altText }; });
  var hasRealVariants = variants.length > 1 || (variants.length === 1 && variants[0].title !== 'Default Title');
  var minPrice = p.priceRange.minVariantPrice;
  var maxPrice = p.priceRange.maxVariantPrice;
  var priceDisplay = parseFloat(minPrice.amount) !== parseFloat(maxPrice.amount)
    ? 'From ' + formatMoney(minPrice.amount, minPrice.currencyCode)
    : formatMoney(minPrice.amount, minPrice.currencyCode);

  return {
    handle: p.handle,
    title: p.title,
    description: p.descriptionHtml || '',
    descriptionHtml: p.descriptionHtml || '',
    images: images,
    variants: variants,
    hasRealVariants: hasRealVariants,
    priceDisplay: priceDisplay,
    availableForSale: p.availableForSale,
    collections: collections,
    tags: p.tags || [],
    fromApi: true,
  };
}

async function loadHomepageProducts() {
  var grid = document.getElementById('newest-products-grid');
  if (!grid) return;

  try {
    var products = await fetchNewestProducts(6);
    if (products.length === 0) {
      grid.closest('.newest-section').style.display = 'none';
      return;
    }

    grid.innerHTML = '';

    products.forEach(function(p) {
      var normalized = normalizeProductForDetail(p);
      PRODUCT_DATA[p.handle] = normalized;

      var isEvening = normalized.collections.some(function(c) {
        return c.handle === 'evening-bags';
      });
      var lineLabel = isEvening ? 'Evening Bags' : 'Cosmetic Bags';
      var lineColor = isEvening ? '#5A2A4A' : '#4B4B4B';
      var linkTarget = isEvening ? 'evening-bags.html' : 'cosmetic-bags.html';

      var imageUrl = p.images.edges.length > 0 ? p.images.edges[0].node.url : '';
      var imageAlt = p.images.edges.length > 0 ? (p.images.edges[0].node.altText || p.title) : p.title;

      var card = document.createElement('a');
      card.className = 'newest-card fade-in';
      card.href = '#';
      card.setAttribute('data-handle', p.handle);
      card.setAttribute('data-link', linkTarget);

      var imgHtml = imageUrl
        ? '<img src="' + imageUrl + '" alt="' + imageAlt.replace(/"/g, '&quot;') + '" loading="lazy">'
        : '';

      card.innerHTML =
        '<div class="newest-card-img">' + imgHtml + '</div>' +
        '<span class="newest-card-line" style="color:' + lineColor + '">' + lineLabel + '</span>' +
        '<span class="newest-card-name">' + p.title + '</span>' +
        '<span class="newest-card-price">' + normalized.priceDisplay + '</span>';

      card.addEventListener('click', function(e) {
        e.preventDefault();
        openProduct(p.handle);
      });

      grid.appendChild(card);
      homepageObserver.observe(card);
    });

  } catch (err) {
    console.error('[Ever Near] Homepage products error:', err);
    var section = grid.closest('.newest-section');
    if (section) section.style.display = 'none';
  }

  // Observe any other fade-in elements on the page
  document.querySelectorAll('.fade-in:not(.observed)').forEach(function(el) {
    el.classList.add('observed');
    homepageObserver.observe(el);
  });
}

loadHomepageProducts();
