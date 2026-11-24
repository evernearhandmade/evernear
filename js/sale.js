// Sitewide sale: dates, banner switch, and strikethrough price display.
// Prices are only displayed lower here; Shopify applies the real discount at checkout.
var SALE = {
  percentOff: 30,
  start: new Date('2026-11-23T22:00:00-08:00'),
  end: new Date('2026-12-01T00:00:00-08:00'),
  excludedCollections: ['custom'],
  excludedHandles: ['le-voyage-custom-embroidered-quilted-cosmetic-bag'],
};

function isSaleExcluded(product) {
  if (!product) return false;
  if (SALE.excludedHandles.indexOf(product.handle) >= 0) return true;
  return (product.collections || []).some(function(c) {
    return SALE.excludedCollections.indexOf(c.handle) >= 0;
  });
}

// ?sale=preview turns the sale on for this browser tab before it starts; ?sale=off turns the preview off.
var saleActive = (function() {
  var preview = false;
  try {
    if (/[?&]sale=preview\b/.test(location.search)) sessionStorage.setItem('en_sale_preview', '1');
    if (/[?&]sale=off\b/.test(location.search)) sessionStorage.removeItem('en_sale_preview');
    preview = sessionStorage.getItem('en_sale_preview') === '1';
  } catch (e) {}
  var now = new Date();
  return preview || (now >= SALE.start && now < SALE.end);
})();

if (saleActive) document.documentElement.classList.add('sale-active');

function saleMoney(amount, currencyCode) {
  var n = parseFloat(amount);
  var whole = Math.round(n * 100) % 100 === 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode || 'USD',
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(n);
}

function salePrice(amount) {
  return Math.round(parseFloat(amount) * (100 - SALE.percentOff)) / 100;
}

function wasNowHtml(was, now, currencyCode, prefix) {
  prefix = prefix || '';
  if (!(now < was)) return prefix + saleMoney(was, currencyCode);
  return prefix + '<s class="price-was">' + saleMoney(was, currencyCode) + '</s> ' +
    '<span class="price-now">' + saleMoney(now, currencyCode) + '</span>';
}

// Pass the product so excluded items keep their regular price.
function priceHtml(amount, currencyCode, prefix, product) {
  var now = saleActive && !isSaleExcluded(product) ? salePrice(amount) : parseFloat(amount);
  return wasNowHtml(parseFloat(amount), now, currencyCode, prefix);
}

// For prices already formatted as text, like "$46" or "From $45".
function priceTextHtml(text, product) {
  text = text || '';
  if (!saleActive || isSaleExcluded(product)) return text;
  var m = String(text).match(/^(.*?)\$([\d,]+(?:\.\d+)?)\s*$/);
  if (!m) return text;
  return priceHtml(m[2].replace(/,/g, ''), 'USD', m[1], product);
}

if (saleActive) {
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-card-price').forEach(function(el) {
      el.innerHTML = priceTextHtml(el.textContent.trim());
    });
  });
}
