// ─── CONTADOR DE DIAS ───
(function() {
  const start = new Date('2025-11-05T00:00:00');
  const today = new Date();
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const el = document.getElementById('dayCounter');
  if (el) el.textContent = diff >= 0 ? diff : 0;
})();

// ─── CARREGAR FOTO NO POLAROID E NA PÁGINA DE MEMÓRIA ───
function loadPhoto(input, imgId) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    // Atualiza a foto no polaroid
    const img = document.getElementById(imgId);
    img.src = e.target.result;
    img.style.display = 'block';

    const wrap = input.parentElement;
    wrap.querySelectorAll('.photo-icon, .photo-hint').forEach(el => el.style.display = 'none');

    // Atualiza a foto na página de memória correspondente
    const num = imgId.replace('img', '');
    const pageImg = document.getElementById('page' + num + '-img');
    const placeholder = document.getElementById('page' + num + '-placeholder');
    if (pageImg) {
      pageImg.src = e.target.result;
      pageImg.style.display = 'block';
    }
    if (placeholder) placeholder.style.display = 'none';
  };

  reader.readAsDataURL(file);
}

// ─── ABRIR / FECHAR PÁGINA DE MEMÓRIA ───
function openPage(pageId) {
  document.querySelectorAll('.memory-content').forEach(el => el.style.display = 'none');
  const target = document.getElementById(pageId);
  if (target) target.style.display = 'block';
  const overlay = document.getElementById('overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePage() {
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Fechar com ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closePage();
});
