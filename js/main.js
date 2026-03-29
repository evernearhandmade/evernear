// Initialization and scroll animations

// Global intersection observer for fade-in animations
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

// Observe existing fade-in elements
document.querySelectorAll('.fade-in').forEach(function(el) { obs.observe(el); });

// Load products from Shopify API (with static fallback) and render
loadProducts();
