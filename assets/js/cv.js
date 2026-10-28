// Un bouton ouvre le lecteur sans changer l’adresse du portfolio.
const fenetreCV = document.getElementById('apercu-cv');
const boutonCV = document.getElementById('ouvrir-cv');
const imageCV = document.getElementById('image-cv');
const zoneCV = document.querySelector('.cv-preview');
let zoomCV = 1;

function afficherZoomCV() {
  const largeur = Math.min(zoneCV.clientWidth - 24, (zoneCV.clientHeight - 24) * 1697 / 2400);
  imageCV.style.width = `${Math.max(1, largeur) * zoomCV}px`;
}

function ajusterCV() {
  zoomCV = 1;
  afficherZoomCV();
  zoneCV.scrollTo(0, 0);
}

boutonCV.addEventListener('click', () => {
  if (!imageCV.hasAttribute('src')) imageCV.src = imageCV.dataset.src;
  fenetreCV.showModal();
  ajusterCV();
});

document.getElementById('agrandir-cv').addEventListener('click', () => {
  zoomCV = Math.min(4, zoomCV * 1.25);
  afficherZoomCV();
});
document.getElementById('reduire-cv').addEventListener('click', () => {
  zoomCV = Math.max(.5, zoomCV / 1.25);
  afficherZoomCV();
});
document.getElementById('ajuster-cv').addEventListener('click', ajusterCV);
new ResizeObserver(() => {
  if (fenetreCV.open) afficherZoomCV();
}).observe(zoneCV);

function fermerCV() {
  if (fenetreCV.classList.contains('closing')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    fenetreCV.close();
    return;
  }
  fenetreCV.classList.add('closing');
  function terminerFermeture(evenement) {
    if (evenement.animationName !== 'fermeture-cv') return;
    fenetreCV.removeEventListener('animationend', terminerFermeture);
    fenetreCV.close();
    fenetreCV.classList.remove('closing');
  }
  fenetreCV.addEventListener('animationend', terminerFermeture);
}

document.getElementById('fermer-cv').addEventListener('click', fermerCV);
fenetreCV.addEventListener('cancel', evenement => {
  evenement.preventDefault();
  fermerCV();
});
fenetreCV.addEventListener('close', () => boutonCV.focus());
