// Le lien actif suit la rubrique atteinte, même en défilant à la main.
const liens = [...document.querySelectorAll('header nav a[href^="#"]')];
const rubriques = liens.map(lien => document.querySelector(lien.getAttribute('href')));

// Replier les autres rubriques avant de calculer la destination du défilement.
document.querySelectorAll('header a[href^="#"]').forEach(lien => {
  lien.addEventListener('click', async evenement => {
    if (evenement.ctrlKey || evenement.metaKey || evenement.shiftKey || evenement.altKey) return;
    evenement.preventDefault();
    const cible = document.querySelector(lien.getAttribute('href'));
    const fermetures = [];
    document.querySelectorAll('details[open]').forEach(bloc => {
      if (!cible.contains(bloc) || cible.id === 'accueil') {
        bloc.dispatchEvent(new CustomEvent('fermer-rubrique', { detail: fermetures }));
      }
    });
    await Promise.all(fermetures);
    history.pushState(null, '', lien.getAttribute('href'));
    cible.scrollIntoView();
    actualiserNavigation();
  });
});

// L’en-tête peut occuper plusieurs lignes sur les petits écrans.
new ResizeObserver(([entree]) => {
  document.documentElement.style.scrollPaddingTop = `${entree.target.offsetHeight + 24}px`;
  actualiserNavigation();
}).observe(document.querySelector('header'));

function ouvrirRubriqueCiblee() {
  const cible = document.getElementById(location.hash.slice(1));
  if (!cible) return;
  for (let parent = cible.parentElement; parent; parent = parent.parentElement) {
    if (parent.tagName === 'DETAILS') parent.open = true;
  }
}

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
  // Garder le lien actif visible dans le menu horizontal des petits écrans.
  const menu = liens[active].parentElement;
  const lienActif = liens[active];
  if (menu.scrollWidth > menu.clientWidth) {
    const position = lienActif.getBoundingClientRect();
    const cadre = menu.getBoundingClientRect();
    if (position.left < cadre.left) menu.scrollLeft -= cadre.left - position.left;
    else if (position.right > cadre.right) menu.scrollLeft += position.right - cadre.right;
  }
}

window.addEventListener('scroll', actualiserNavigation, { passive: true });
window.addEventListener('resize', actualiserNavigation);
window.addEventListener('load', actualiserNavigation);
window.addEventListener('hashchange', ouvrirRubriqueCiblee);
ouvrirRubriqueCiblee();
actualiserNavigation();
