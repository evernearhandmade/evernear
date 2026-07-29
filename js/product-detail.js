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
        requiresCustomText: p.requiresCustomText,
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

  // Dimensions and details
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

  // Variants / Options
  var sizesEl = document.getElementById('pp-sizes');
  var sizeLabelEl = document.querySelector('.pp-size-label');
  sizesEl.innerHTML = '';
  window.currentSelectedVariant = null;

  if (p.fromApi && p.hasRealVariants && p.variants && p.variants.length > 0) {
    // Build map of option name → unique values in order
    var optionMap = {};
    var optionOrder = [];
    p.variants.forEach(function(v) {
      v.selectedOptions.forEach(function(opt) {
        if (!optionMap[opt.name]) { optionMap[opt.name] = []; optionOrder.push(opt.name); }
        if (optionMap[opt.name].indexOf(opt.value) === -1) optionMap[opt.name].push(opt.value);
      });
    });

    var isOnlySize = optionOrder.length === 1 && optionOrder[0] === 'Size';

    // Find variant matching all currently selected option buttons
    function resolveVariant() {
      var selections = {};
      sizesEl.querySelectorAll('.option-group').forEach(function(g) {
        var sel = g.querySelector('.size-btn.selected');
        if (sel) selections[g.getAttribute('data-option')] = sel.textContent;
      });
      var match = null;
      p.variants.forEach(function(v) {
        if (v.selectedOptions.every(function(o) { return selections[o.name] === o.value; })) match = v;
      });
      window.currentSelectedVariant = match;
      if (match) document.getElementById('pp-price').textContent = formatMoney(match.price.amount, match.price.currencyCode);
    }

    if (isOnlySize) {
      // Single-option (Size) — existing simple layout
      if (sizeLabelEl) sizeLabelEl.style.display = '';
      optionMap['Size'].forEach(function(val, i) {
        var v = null;
        p.variants.forEach(function(variant) {
          variant.selectedOptions.forEach(function(o) { if (o.name === 'Size' && o.value === val) v = variant; });
        });
        var btn = document.createElement('button');
        btn.className = 'size-btn' + (i === 0 ? ' selected' : '');
        btn.textContent = val;
        if (v) {
          btn.setAttribute('data-variant-id', v.id);
          btn.setAttribute('data-price', v.price.amount);
          btn.setAttribute('data-currency', v.price.currencyCode);
        }
        btn.onclick = function() {
          sizesEl.querySelectorAll('.size-btn').forEach(function(b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          if (v) document.getElementById('pp-price').textContent = formatMoney(v.price.amount, v.price.currencyCode);
          window.currentSelectedVariant = v;
        };
        sizesEl.appendChild(btn);
        if (i === 0) window.currentSelectedVariant = v;
      });
    } else {
      // Multi-option — one labelled group per option name
      if (sizeLabelEl) sizeLabelEl.style.display = 'none';
      optionOrder.forEach(function(optName) {
        var group = document.createElement('div');
        group.className = 'option-group';
        group.setAttribute('data-option', optName);
        var lbl = document.createElement('p');
        lbl.className = 'pp-option-label';
        lbl.textContent = optName;
        group.appendChild(lbl);
        optionMap[optName].forEach(function(val, i) {
          var btn = document.createElement('button');
          btn.className = 'size-btn' + (i === 0 ? ' selected' : '');
          btn.textContent = val;
          btn.onclick = function() {
            group.querySelectorAll('.size-btn').forEach(function(b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
            resolveVariant();
          };
          group.appendChild(btn);
        });
        sizesEl.appendChild(group);
      });
      resolveVariant();
    }
  } else if (p.sizesDisplay) {
    // Static sizes string fallback
    if (sizeLabelEl) sizeLabelEl.style.display = '';
    var sizeParts = p.sizesDisplay.split('·').map(function(s) { return s.trim(); }).filter(Boolean);
    if (sizeParts.length <= 1 && p.sizesDisplay.indexOf(' ') >= 0) {
      sizeParts = p.sizesDisplay.split(' · ').map(function(s) { return s.trim(); }).filter(Boolean);
    }
    sizeParts.forEach(function(size, i) {
      var btn = document.createElement('button');
      btn.className = 'size-btn' + (i === 0 ? ' selected' : '');
      btn.textContent = size;
      if (p.fromApi && p.variants && p.variants.length > 0) {
        btn.setAttribute('data-variant-id', p.variants[0].id);
        btn.setAttribute('data-price', p.variants[0].price.amount);
        btn.setAttribute('data-currency', p.variants[0].price.currencyCode);
        btn.setAttribute('data-available', p.variants[0].availableForSale);
      }
      btn.onclick = function() {
        sizesEl.querySelectorAll('.size-btn').forEach(function(b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
      };
      sizesEl.appendChild(btn);
    });
  }

  // Show/hide custom text input
  var customWrap = document.getElementById('pp-custom-text-wrap');
  var customInput = document.getElementById('pp-custom-text');
  var needsCustomText = !!(p.requiresCustomText || (typeof PRODUCTS !== 'undefined' && PRODUCTS[handle] && PRODUCTS[handle].requiresCustomText));
  if (customWrap) {
    customWrap.style.display = needsCustomText ? '' : 'none';
    if (customInput) customInput.value = '';
  }

  // Handle sold out state
  var cartBtn = document.querySelector('.add-to-cart-btn');
  if (!p.availableForSale) {
    cartBtn.textContent = 'Out of Stock';
    cartBtn.classList.add('out-of-stock');
    cartBtn.disabled = true;
  } else {
    cartBtn.textContent = 'Add to Cart';
    cartBtn.classList.remove('out-of-stock');
    cartBtn.disabled = false;
  }

  document.getElementById('cart-confirm').classList.remove('show');
  showPage('product-page');
}

function closeProduct() {
  showPage('main-page');
}
