// ─── CONTADOR DE DIAS ───
(function() {
  const start = new Date('2025-11-05T00:00:00');
  const today = new Date();
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const el = document.getElementById('dayCounter');
  if (el) el.textContent = diff >= 0 ? diff : 0;
})();

// ─── ALTURA DAS COLUNAS FLUTUANTES NO MOBILE ───
function syncFloatHeight() {
  if (window.innerWidth > 600) return;
  const letter = document.querySelector('.letter-col');
  const layout = document.getElementById('mainLayout');
  if (!letter || !layout) return;
  layout.style.minHeight = (letter.offsetHeight + 80) + 'px';
}
window.addEventListener('load', syncFloatHeight);
window.addEventListener('resize', syncFloatHeight);

// ─── GALERIA ───
const TOTAL = 16;
let currentSlide = 0;

// Gera os dots automaticamente
(function buildDots() {
  const container = document.getElementById('galleryDots');
  if (!container) return;
  for (let i = 0; i < TOTAL; i++) {
    const dot = document.createElement('span');
    dot.className = 'gdot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    container.appendChild(dot);
  }
})();

// Cada polaroid abre a galeria no slide correspondente ao seu data-index
// polaroid 0 → img1 (slide 0)
// polaroid 1 → img2 (slide 1) ... etc
document.querySelectorAll('.polaroid').forEach(polaroid => {
  polaroid.addEventListener('click', function() {
    openGallery(parseInt(this.dataset.index));
  });
});

function openGallery(index) {
  currentSlide = index;
  renderSlide();
  document.getElementById('galleryOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  const music = document.getElementById('galleryMusic');
  if (music) music.play().catch(() => {});
}

function closeGallery() {
  document.getElementById('galleryOverlay').classList.remove('active');
  document.body.style.overflow = '';
  const music = document.getElementById('galleryMusic');
  if (music) { music.pause(); music.currentTime = 0; }
}

function renderSlide() {
  document.getElementById('gallerySlides').style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.gdot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function changeSlide(dir) {
  currentSlide = (currentSlide + dir + TOTAL) % TOTAL;
  renderSlide();
}

function goToSlide(index) {
  currentSlide = index;
  renderSlide();
}

// Swipe touch
let touchStartX = 0;
const slidesEl = document.getElementById('gallerySlides');
if (slidesEl) {
  slidesEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slidesEl.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) changeSlide(dx < 0 ? 1 : -1);
  });
}

// Teclado
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')     closeGallery();
  if (e.key === 'ArrowRight') changeSlide(1);
  if (e.key === 'ArrowLeft')  changeSlide(-1);
});
