// Product card carousel functionality
const carouselState = {};
const carouselCounts = {0:2,1:2,2:2,3:1,4:1,5:1,6:2,7:2,8:1,9:1,10:1,11:1};
for (let i = 0; i < 12; i++) carouselState[i] = 0;

function updateCarousel(id) {
  const track = document.getElementById('track-' + id);
  if (track) track.style.transform = 'translateX(-' + (carouselState[id] * 100) + '%)';
  document.querySelectorAll('#dots-' + id + ' .dot').forEach((d, i) =>
    d.classList.toggle('active', i === carouselState[id])
  );
}

function slide(id, dir) {
  carouselState[id] = (carouselState[id] + dir + carouselCounts[id]) % carouselCounts[id];
  updateCarousel(id);
}

function goTo(id, idx) {
  carouselState[id] = idx;
  updateCarousel(id);
}
