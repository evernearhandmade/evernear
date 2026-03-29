// Menu toggle and page navigation
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('menuBtn').classList.toggle('open', menuOpen);
  document.getElementById('dropdown').classList.toggle('open', menuOpen);
}

function closeMenu() {
  menuOpen = false;
  document.getElementById('menuBtn').classList.remove('open');
  document.getElementById('dropdown').classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (menuOpen && !e.target.closest('#menuBtn') && !e.target.closest('#dropdown')) closeMenu();
});

function navTo(sectionId) {
  showPage('main-page');
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}
