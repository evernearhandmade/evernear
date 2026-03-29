// Cart: localStorage persistence, drawer UI, Shopify checkout
// Each item: { variantId, productHandle, title, variantTitle, price, currencyCode, quantity, image }

var CART_KEY = 'evernear_cart';

// ── State ──

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  renderCartDrawer();
  updateCartBadge();
}

function getCartTotal() {
  return getCart().reduce(function(sum, item) {
    return sum + (parseFloat(item.price) * item.quantity);
  }, 0);
}

function getCartCount() {
  return getCart().reduce(function(sum, item) {
    return sum + item.quantity;
  }, 0);
}

// ── Actions ──

function addToCart() {
  var handle = currentProduct;
  if (!handle) return;

  var p = PRODUCT_DATA[handle];
  if (!p) return;

  // Get selected variant info
  var selectedBtn = document.querySelector('#pp-sizes .size-btn.selected');
  var variantId = '';
  var variantTitle = '';
  var price = 0;
  var currencyCode = 'USD';

  if (p.fromApi && selectedBtn && selectedBtn.getAttribute('data-variant-id')) {
    variantId = selectedBtn.getAttribute('data-variant-id');
    variantTitle = selectedBtn.textContent;
    price = parseFloat(selectedBtn.getAttribute('data-price'));
    currencyCode = selectedBtn.getAttribute('data-currency') || 'USD';
  } else if (p.fromApi && p.variants && p.variants.length > 0) {
    // No size option, use first variant
    var v = p.variants[0];
    variantId = v.id;
    variantTitle = v.title === 'Default Title' ? '' : v.title;
    price = parseFloat(v.price.amount);
    currencyCode = v.price.currencyCode;
  } else {
    // Static product fallback
    variantTitle = selectedBtn ? selectedBtn.textContent : '';
    var priceStr = p.priceDisplay || p.price || '';
    price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  }

  // Get first image
  var image = '';
  if (p.images && p.images.length > 0) {
    image = p.images[0].url || p.images[0];
  }

  var cart = getCart();

  // Check if same variant already in cart
  var existingIdx = -1;
  cart.forEach(function(item, idx) {
    if (item.productHandle === handle && item.variantTitle === variantTitle) {
      existingIdx = idx;
    }
  });

  if (existingIdx >= 0) {
    cart[existingIdx].quantity += 1;
  } else {
    cart.push({
      variantId: variantId,
      productHandle: handle,
      title: p.title,
      variantTitle: variantTitle,
      price: price,
      currencyCode: currencyCode,
      quantity: 1,
      image: image,
    });
  }

  saveCart(cart);

  // Show confirmation on product page
  var confirmEl = document.getElementById('cart-confirm');
  if (confirmEl) {
    confirmEl.classList.add('show');
    setTimeout(function() { confirmEl.classList.remove('show'); }, 2500);
  }

  // Open cart drawer briefly
  openCart();
}

function updateCartItemQty(index, delta) {
  var cart = getCart();
  if (!cart[index]) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
}

function removeCartItem(index) {
  var cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

// ── Badge ──

function updateCartBadge() {
  var badge = document.getElementById('cart-badge');
  if (!badge) return;
  var count = getCartCount();
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}

// ── Drawer UI ──

function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleCart() {
  var drawer = document.getElementById('cart-drawer');
  if (drawer.classList.contains('open')) {
    closeCart();
  } else {
    openCart();
  }
}

function renderCartDrawer() {
  var cart = getCart();
  var itemsEl = document.getElementById('cart-drawer-items');
  var footerEl = document.getElementById('cart-drawer-footer');
  var countEl = document.getElementById('cart-drawer-count');
  var subtotalEl = document.getElementById('cart-subtotal');

  if (!itemsEl) return;

  var count = getCartCount();
  countEl.textContent = count > 0 ? ('(' + count + ')') : '';

  if (cart.length === 0) {
    itemsEl.innerHTML =
      '<div class="cart-drawer-empty">' +
        '<p>Your cart is empty</p>' +
        '<button onclick="closeCart()">Continue Shopping</button>' +
      '</div>';
    footerEl.style.display = 'none';
    return;
  }

  var html = '';
  cart.forEach(function(item, idx) {
    var itemTotal = (parseFloat(item.price) * item.quantity);
    var priceStr = formatMoney(itemTotal, item.currencyCode);
    var variantLabel = item.variantTitle && item.variantTitle !== 'Default Title' ? item.variantTitle : '';

    html += '<div class="cart-item">';

    // Image
    if (item.image) {
      html += '<img class="cart-item-img" src="' + item.image + '" alt="' + item.title + '"/>';
    }

    html += '<div class="cart-item-info">';
    html += '<p class="cart-item-name">' + item.title + '</p>';
    if (variantLabel) {
      html += '<p class="cart-item-variant">' + variantLabel + '</p>';
    }
    html += '<div class="cart-item-bottom">';

    // Quantity controls
    html += '<div class="cart-item-qty">';
    html += '<button onclick="updateCartItemQty(' + idx + ',-1)" aria-label="Decrease quantity">&minus;</button>';
    html += '<span>' + item.quantity + '</span>';
    html += '<button onclick="updateCartItemQty(' + idx + ',1)" aria-label="Increase quantity">&plus;</button>';
    html += '</div>';

    html += '<span class="cart-item-price">' + priceStr + '</span>';
    html += '</div>';

    html += '<button class="cart-item-remove" onclick="removeCartItem(' + idx + ')">Remove</button>';
    html += '</div>';
    html += '</div>';
  });

  itemsEl.innerHTML = html;
  footerEl.style.display = '';
  subtotalEl.textContent = formatMoney(getCartTotal(), 'USD');
}

// ── Checkout ──

async function initiateCheckout() {
  var cart = getCart();
  if (cart.length === 0) return;

  var checkoutBtn = document.getElementById('cart-checkout-btn');
  checkoutBtn.disabled = true;
  checkoutBtn.textContent = 'Redirecting\u2026';

  // Check if we have Shopify variant IDs for all items
  var hasAllVariantIds = cart.every(function(item) { return item.variantId; });

  if (hasAllVariantIds && SHOPIFY_CONFIG.storefrontAccessToken) {
    // Use Shopify Cart API
    try {
      var lines = cart.map(function(item) {
        return { merchandiseId: item.variantId, quantity: item.quantity };
      });

      var mutation = 'mutation CartCreate($input: CartInput!) { cartCreate(input: $input) { cart { id checkoutUrl } userErrors { field message } } }';

      var data = await shopifyFetch(mutation, { input: { lines: lines } });

      if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
        throw new Error(data.cartCreate.userErrors.map(function(e) { return e.message; }).join(', '));
      }

      var checkoutUrl = data.cartCreate.cart.checkoutUrl;

      // Clear cart and redirect
      localStorage.removeItem(CART_KEY);
      updateCartBadge();
      window.location.href = checkoutUrl;
      return;

    } catch (err) {
      console.error('[Ever Near] Shopify checkout error:', err);
      // Fall through to cart permalink
    }
  }

  // Fallback: cart permalink (for static products without variant IDs)
  // This won't work perfectly without numeric IDs, so show a message
  checkoutBtn.textContent = 'Checkout';
  checkoutBtn.disabled = false;
  alert('Some items need to be set up in Shopify before checkout can work. This will be fully functional once all products are added.');
}

// ── Initialize ──

updateCartBadge();
