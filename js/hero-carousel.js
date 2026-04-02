// ═══════════════════════════════════════════════════
// HERO LIFESTYLE CAROUSEL
// To update images: just edit the array below.
// Add or remove entries as needed — the carousel
// handles any number of images automatically.
//
// Each entry has:
//   src     — path to the image
//   product — product handle to link to (or '' for no link)
// ═══════════════════════════════════════════════════

var HERO_SLIDES = [
  { src: 'img/lifestyle-1.jpg', product: 'ivory-dot' },
  { src: 'img/lifestyle-2.jpg', product: 'petal-garden' },
  { src: 'img/lifestyle-3.jpg', product: 'bluebell-garden' },
  { src: 'img/lifestyle-4.jpg', product: 'sorbet' },
  { src: 'img/lifestyle-5.jpg', product: 'strawberry-shortcake' },
  { src: 'img/lifestyle-6.jpg', product: 'petal-garden' },
  { src: 'img/lifestyle-7.jpg', product: 'petal-essential' },
  { src: 'img/lifestyle-8.jpeg', product: 'ivory-dot' },
  { src: 'img/lifestyle-9.jpg', product: 'midnight-dot' },
];

// Speed: seconds per full cycle (lower = faster)
var HERO_SCROLL_SPEED = 8;

// ═══════════════════════════════════════════════════
// Nothing below needs to be changed
// ═══════════════════════════════════════════════════

(function() {
  var track = document.getElementById('hero-carousel-track');
  if (!track || HERO_SLIDES.length === 0) return;

  function buildSlide(slideData) {
    var slide = document.createElement('div');
    slide.className = 'hero-carousel-slide';
    if (slideData.product) {
      slide.onclick = function() { openProduct(slideData.product); };
    }
    var img = document.createElement('img');
    img.src = slideData.src;
    img.alt = 'Ever Near lifestyle';
    img.loading = 'lazy';
    slide.appendChild(img);
    return slide;
  }

  // Build original set + duplicate for seamless loop
  HERO_SLIDES.forEach(function(s) { track.appendChild(buildSlide(s)); });
  HERO_SLIDES.forEach(function(s) { track.appendChild(buildSlide(s)); });

  // Set scroll speed via CSS custom property
  track.style.setProperty('--scroll-duration', HERO_SCROLL_SPEED + 's');
})();
