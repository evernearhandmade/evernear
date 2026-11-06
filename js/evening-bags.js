// Evening Bags page: load collection, group by silhouette tag, render

var eveningObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

function slugToTitle(slug) {
  return slug.split('-').map(function(w) {
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

function normalizeEveningProduct(p) {
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

function getVariantLabel(p) {
  var variants = p.variants.edges.map(function(e) { return e.node; });
  if (variants.length === 1 && variants[0].title !== 'Default Title') {
    return variants[0].title;
  }
  // If only Color option, show color values
  if (variants.length > 0) {
    var opts = variants[0].selectedOptions;
    var colorOpt = opts.find(function(o) { return o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'fabric'; });
    if (colorOpt) return colorOpt.value;
  }
  return '';
}

async function loadEveningBags() {
  var container = document.getElementById('evening-products-container');
  if (!container) return;

  try {
    var products = await fetchCollectionProducts('evening-bags');

    if (products.length === 0) {
      container.innerHTML = '';
      return;
    }

    // Group by silhouette: tag, preserving order
    var groups = {};
    var groupOrder = [];

    products.forEach(function(p) {
      var tags = p.tags || [];
      var silTag = tags.find(function(t) { return t.startsWith('silhouette:'); });
      if (!silTag) {
        var silCol = p.collections.edges.find(function(e) { return e.node.title.startsWith('silhouette:'); });
        if (silCol) silTag = silCol.node.title;
      }
      var sil = silTag ? silTag.replace('silhouette:', '').trim() : 'other';
      if (!groups[sil]) {
        groups[sil] = [];
        groupOrder.push(sil);
      }
      groups[sil].push(p);
    });

    container.innerHTML = '';

    groupOrder.forEach(function(sil, idx) {
      var groupProducts = groups[sil];
      var title = sil === 'other' ? 'Evening Bags' : 'The ' + slugToTitle(sil);
      var isNewest = idx === 0;

      var section = document.createElement('section');
      section.className = 'evening-silhouette-section';
      section.id = 'silhouette-' + sil;

      var headerHtml =
        '<div class="evening-section-header">' +
        (isNewest ? '<span class="evening-new-badge">*New</span>' : '') +
        '<h2 class="evening-section-title">' + title + '</h2>' +
        '<span class="evening-section-desc">Ring handles and beaded fringe. Just enough for lipstick, keys and a card.</span>' +
        '</div>';

      var gridHtml = '<div class="evening-product-grid">';

      groupProducts.forEach(function(p) {
        var normalized = normalizeEveningProduct(p);
        PRODUCT_DATA[p.handle] = normalized;

        var imgUrl = p.images.edges.length > 0 ? p.images.edges[0].node.url : '';
        var imgAlt = p.images.edges.length > 0 ? (p.images.edges[0].node.altText || p.title) : p.title;
        var isOneOfOne = (p.tags || []).indexOf('one-of-one') >= 0;
        var variantLabel = getVariantLabel(p);

        var imgInner = imgUrl
          ? '<img src="' + imgUrl + '" alt="' + imgAlt.replace(/"/g, '&quot;') + '" loading="lazy">'
          : '';
        var badgeHtml = isOneOfOne
          ? '<span class="one-of-one-badge">One of One</span>'
          : '';

        gridHtml +=
          '<a href="#" class="evening-product-card fade-in" data-handle="' + p.handle + '">' +
          '<div class="evening-product-img">' + imgInner + badgeHtml + '</div>' +
          '<div class="evening-product-info">' +
          '<span class="evening-product-name">' + p.title + '</span>' +
          (variantLabel ? '<span class="evening-product-variant">' + variantLabel + '</span>' : '') +
          '<span class="evening-product-price">' + normalized.priceDisplay + '</span>' +
          '</div>' +
          '</a>';
      });

      gridHtml += '</div>';
      section.innerHTML = headerHtml + gridHtml;
      container.appendChild(section);

      // Wire up click handlers and observer
      section.querySelectorAll('.evening-product-card').forEach(function(card) {
        var handle = card.getAttribute('data-handle');
        card.addEventListener('click', function(e) {
          e.preventDefault();
          openProduct(handle);
        });
        eveningObserver.observe(card);
      });
    });

  } catch (err) {
    console.error('[Ever Near] Evening bags error:', err);
  }

  // Observe other fade-in elements
  document.querySelectorAll('.fade-in').forEach(function(el) {
    eveningObserver.observe(el);
  });
}

loadEveningBags();
