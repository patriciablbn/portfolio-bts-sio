const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)');

// Garder le comportement clavier de summary, avec une ouverture et fermeture douces.
document.querySelectorAll('details').forEach(bloc => {
  const titre = bloc.querySelector('summary');
  let ouvert = bloc.open;
  let animation;

  titre.addEventListener('click', evenement => {
    evenement.preventDefault();
    const hauteurDepart = bloc.getBoundingClientRect().height;
    if (animation) animation.cancel();
    ouvert = !ouvert;
    bloc.open = ouvert;
    bloc.classList.toggle('closing', !ouvert);

    if (mouvementReduit.matches) {
      bloc.style.overflow = '';
      bloc.classList.remove('closing');
      return;
    }

    const hauteurFin = bloc.getBoundingClientRect().height;
    bloc.open = true;
    bloc.style.overflow = 'hidden';
    animation = bloc.animate(
      [{ height: `${hauteurDepart}px` }, { height: `${hauteurFin}px` }],
      { duration: 220, easing: 'ease-out' }
    );
    animation.onfinish = () => {
      bloc.open = ouvert;
      bloc.style.overflow = '';
      bloc.classList.remove('closing');
      animation = null;
    };
  });
});

// Le trait suit aussi les cartes déplacées au doigt, au clavier ou au pavé tactile.
const piste = document.querySelector('.project-track');
const liensProjets = [...document.querySelectorAll('.project-nav a')];
const cartes = [...piste.querySelectorAll('.project-card')];

function actualiserProjet() {
  const gauche = piste.getBoundingClientRect().left;
  let active = 0;
  cartes.forEach((carte, index) => {
    if (Math.abs(carte.getBoundingClientRect().left - gauche) <
        Math.abs(cartes[active].getBoundingClientRect().left - gauche)) active = index;
  });
  if (piste.scrollLeft + piste.clientWidth >= piste.scrollWidth - 2) active = cartes.length - 1;
  liensProjets.forEach((lien, index) => {
    if (index === active) lien.setAttribute('aria-current', 'true');
    else lien.removeAttribute('aria-current');
  });
}

liensProjets.forEach((lien, index) => {
  lien.addEventListener('click', evenement => {
    evenement.preventDefault();
    piste.scrollTo({
      left: piste.scrollLeft + cartes[index].getBoundingClientRect().left - piste.getBoundingClientRect().left,
      behavior: mouvementReduit.matches ? 'instant' : 'smooth'
    });
  });
});
piste.addEventListener('scroll', actualiserProjet, { passive: true });
window.addEventListener('resize', actualiserProjet);
actualiserProjet();
