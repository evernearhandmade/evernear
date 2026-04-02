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
  { src: 'img/lifestyle-6.jpg', product: 'midnight-dot' },
  { src: 'img/lifestyle-7.jpg', product: 'petal-essential' },
  { src: 'img/lifestyle-8.jpeg', product: 'ivory-dot' },
  { src: 'img/lifestyle-9.jpg', product: 'petal-garden' },
];

// Pixels per second (higher = faster)
var HERO_SCROLL_SPEED = 80;

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

  // Build 3 copies for seamless infinite scroll
  for (var copy = 0; copy < 3; copy++) {
    HERO_SLIDES.forEach(function(s) { track.appendChild(buildSlide(s)); });
  }

  var offset = 0;
  var paused = false;
  var setWidth = 0;
  var gap = 16;

  function measureSet() {
    // Width of one full set of slides (including gaps)
    var slide = track.querySelector('.hero-carousel-slide');
    if (!slide) return 0;
    var slideWidth = slide.offsetWidth;
    return HERO_SLIDES.length * (slideWidth + gap);
  }

  // Pause on hover
  track.addEventListener('mouseenter', function() { paused = true; });
  track.addEventListener('mouseleave', function() { paused = false; });

  var lastTime = 0;

  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    var delta = timestamp - lastTime;
    lastTime = timestamp;

    if (!paused) {
      offset += (HERO_SCROLL_SPEED * delta) / 1000;

      // Recalculate set width in case of resize
      setWidth = measureSet();

      // When we've scrolled past one full set, reset back seamlessly
      if (setWidth > 0 && offset >= setWidth) {
        offset -= setWidth;
      }

      track.style.transform = 'translateX(-' + offset + 'px)';
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
