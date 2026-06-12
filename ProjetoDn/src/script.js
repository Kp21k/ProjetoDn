// ─── CONTADOR DE DIAS ───
(function () {
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

// ─── DADOS DOS POLAROIDS ───
// Edite os textos abaixo para personalizar cada foto
const POLAROID_DATA = [
  {
    img: '../img/img1.jpeg',
    caption: 'nós dois ✦',
    // ↓ Substitua pelo texto que quiser para a foto 1
    text: 'A  mo quando você deita em mim.'
  },
  {
    img: '../img/img2.jpeg',
    caption: 'memória eterna ✦',
    // ↓ Substitua pelo texto que quiser para a foto 2
    text: 'Amo tirar foto beijando você.'
  },
  {
    img: '../img/img3.jpeg',
    caption: 'sempre juntos ✦',
    // ↓ Substitua pelo texto que quiser para a foto 3
    text: 'Minha foto preferida com sua taylor.'
  },
  {
    img: '../img/img4.jpeg',
    caption: 'nosso mundo ✦',
    // ↓ Substitua pelo texto que quiser para a foto 4
    text: 'Você é a única que me faz se sentir em casa.'
  }
];

// ─── ESTADO ───
let currentAudio = null;

// ─── CLIQUE NOS POLAROIDS ───
document.querySelectorAll('.polaroid').forEach(polaroid => {
  polaroid.addEventListener('click', function () {
    openPhoto(parseInt(this.dataset.index));
  });
});

// ─── ABRIR MODAL ───
function openPhoto(index) {
  const data = POLAROID_DATA[index];
  if (!data) return;

  // Foto e texto
  document.getElementById('photoModalImg').src = data.img;
  document.getElementById('photoModalCaption').textContent = data.caption;
  document.getElementById('photoModalText').textContent = data.text;

  // Mostra overlay
  document.getElementById('photoOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Para qualquer música que esteja tocando
  stopAllAudio();

  // Toca a música do polaroid clicado
  const audio = document.getElementById('photoAudio' + index);
  if (audio) {
    currentAudio = audio;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Autoplay bloqueado pelo navegador — silencia sem erro
    });
  }
}

// ─── FECHAR MODAL ───
function closePhoto() {
  document.getElementById('photoOverlay').classList.remove('active');
  document.body.style.overflow = '';
  stopAllAudio();
}

// ─── PARA TODOS OS ÁUDIOS ───
function stopAllAudio() {
  for (let i = 0; i < POLAROID_DATA.length; i++) {
    const audio = document.getElementById('photoAudio' + i);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
  currentAudio = null;
}

// ─── TECLADO ───
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePhoto();
});
