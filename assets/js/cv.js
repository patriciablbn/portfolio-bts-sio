// Un bouton ouvre le lecteur sans changer l’adresse du portfolio.
const fenetreCV = document.getElementById('apercu-cv');
const boutonCV = document.getElementById('ouvrir-cv');

boutonCV.addEventListener('click', () => {
  const lecteur = fenetreCV.querySelector('iframe');
  if (!lecteur.hasAttribute('src')) lecteur.src = lecteur.dataset.src;
  fenetreCV.showModal();
});

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
