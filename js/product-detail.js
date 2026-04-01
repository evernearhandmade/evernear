// Product detail page functionality
// Works with both API-fetched and static product data
let currentProduct = null;

function openProduct(handle) {
  // Look up from merged data (API + static)
  var p = PRODUCT_DATA[handle];

  // Fallback to old static PRODUCTS if not in merged data
  if (!p && typeof PRODUCTS !== 'undefined') {
    p = PRODUCTS[handle];
    if (p) {
      // Convert old format on the fly
      p = {
        handle: handle,
        title: p.name,
        description: p.description,
        images: p.images.map(function(src) { return { url: src, altText: p.name }; }),
        sizesDisplay: p.sizes,
        priceDisplay: p.price,
        price: p.price,
        dimensions: p.dimensions,
        details: p.details,
        collection: p.collection,
        variants: [],
        fromApi: false,
      };
    }
  }

  if (!p) return;
  currentProduct = handle;

  // Collection name
  var collectionName = '';
  if (p.collections && p.collections.length > 0) {
    // Use the first non-"Home page" collection
    p.collections.forEach(function(c) {
      if (c.title !== 'Home page' && !collectionName) {
        collectionName = c.title;
      }
    });
    if (!collectionName) collectionName = p.collections[0].title;
  } else if (p.collection) {
    collectionName = p.collection;
  }

  document.getElementById('pp-collection').textContent = collectionName;
  document.getElementById('pp-name').textContent = p.title;
  document.getElementById('pp-price').textContent = p.priceDisplay || p.price;
  document.getElementById('pp-description').innerHTML = p.descriptionHtml || p.description;

  // Dimensions and details (may be empty for API products until metafields are set up)
  var dimensionsEl = document.getElementById('pp-dimensions');
  var dimensionsLabelEl = document.querySelector('.pp-dimensions-label');
  var detailsEl = document.getElementById('pp-details');

  if (p.dimensions) {
    dimensionsEl.innerHTML = p.dimensions;
    dimensionsEl.style.display = '';
    dimensionsLabelEl.style.display = '';
  } else {
    dimensionsEl.style.display = 'none';
    dimensionsLabelEl.style.display = 'none';
  }

  if (p.details) {
    detailsEl.textContent = p.details;
    detailsEl.style.display = '';
  } else {
    detailsEl.style.display = 'none';
  }

  // Main image
  var images = p.images || [];
  var firstImageUrl = images.length > 0 ? (images[0].url || images[0]) : '';
  document.getElementById('pp-main-img').src = firstImageUrl;

  // Thumbnails
  var thumbsEl = document.getElementById('pp-thumbs');
  thumbsEl.innerHTML = '';
  images.forEach(function(img, i) {
    var src = img.url || img;
    var thumbImg = document.createElement('img');
    thumbImg.src = src;
    thumbImg.className = 'pp-thumb' + (i === 0 ? ' active' : '');
    thumbImg.onclick = function() {
      document.getElementById('pp-main-img').src = src;
      thumbsEl.querySelectorAll('.pp-thumb').forEach(function(t) {
        t.classList.remove('active');
      });
      thumbImg.classList.add('active');
    };
    thumbsEl.appendChild(thumbImg);
  });

  // Sizes — from API variants or static sizes string
  var sizesEl = document.getElementById('pp-sizes');
  sizesEl.innerHTML = '';

  if (p.fromApi && p.hasRealVariants && p.variants && p.variants.length > 0) {
    // API product with real size variants: build buttons from Shopify variant data
    var sizesSeen = [];
    p.variants.forEach(function(v) {
      v.selectedOptions.forEach(function(opt) {
        if (opt.name === 'Size' && sizesSeen.indexOf(opt.value) === -1) {
          sizesSeen.push(opt.value);
          var btn = document.createElement('button');
          btn.className = 'size-btn' + (sizesSeen.length === 1 ? ' selected' : '');
          btn.textContent = opt.value;
          btn.setAttribute('data-variant-id', v.id);
          btn.setAttribute('data-price', v.price.amount);
          btn.setAttribute('data-currency', v.price.currencyCode);
          btn.setAttribute('data-available', v.availableForSale);
          btn.onclick = function() {
            sizesEl.querySelectorAll('.size-btn').forEach(function(b) {
              b.classList.remove('selected');
            });
            btn.classList.add('selected');
            // Update displayed price when size changes
            document.getElementById('pp-price').textContent =
              formatMoney(btn.getAttribute('data-price'), btn.getAttribute('data-currency'));
          };
          sizesEl.appendChild(btn);
        }
      });
    });
  } else if (p.sizesDisplay) {
    // No real Shopify variants — use sizes from static data or inherited sizesDisplay
    var sizeParts = p.sizesDisplay.split('\u00b7').map(function(s) { return s.trim(); }).filter(Boolean);
    // Also try splitting by nbsp+dot+nbsp pattern
    if (sizeParts.length <= 1 && p.sizesDisplay.indexOf('\u00a0') >= 0) {
      sizeParts = p.sizesDisplay.split('\u00a0\u00b7\u00a0').map(function(s) { return s.trim(); }).filter(Boolean);
    }
    sizeParts.forEach(function(size, i) {
      var btn = document.createElement('button');
      btn.className = 'size-btn' + (i === 0 ? ' selected' : '');
      btn.textContent = size;
      // If API product, attach the single variant ID so checkout works
      if (p.fromApi && p.variants && p.variants.length > 0) {
        btn.setAttribute('data-variant-id', p.variants[0].id);
        btn.setAttribute('data-price', p.variants[0].price.amount);
        btn.setAttribute('data-currency', p.variants[0].price.currencyCode);
        btn.setAttribute('data-available', p.variants[0].availableForSale);
      }
      btn.onclick = function() {
        sizesEl.querySelectorAll('.size-btn').forEach(function(b) {
          b.classList.remove('selected');
        });
        btn.classList.add('selected');
      };
      sizesEl.appendChild(btn);
    });
  }

  document.getElementById('cart-confirm').classList.remove('show');
  showPage('product-page');
}

function closeProduct() {
  showPage('main-page');
}
