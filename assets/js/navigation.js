// Le lien actif suit la rubrique atteinte, même en défilant à la main.
const liens = [...document.querySelectorAll('nav a[href^="#"]')];
const rubriques = liens.map(lien => document.querySelector(lien.getAttribute('href')));

function actualiserNavigation() {
  const decalage = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
  let active = 0;

  rubriques.forEach((rubrique, index) => {
    if (rubrique.getBoundingClientRect().top <= decalage + 2) active = index;
  });

  // Une dernière rubrique courte peut être visible sans atteindre le haut.
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    active = liens.length - 1;
  }

  liens.forEach((lien, index) => {
    if (index === active) lien.setAttribute('aria-current', 'location');
    else lien.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', actualiserNavigation, { passive: true });
window.addEventListener('resize', actualiserNavigation);
window.addEventListener('load', actualiserNavigation);
actualiserNavigation();
