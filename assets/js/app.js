const translations = {
  en: {
    skip: "Skip to content", nav_about: "About", nav_skills: "Skills", nav_work: "Projects", nav_watch: "Tech watch", nav_contact: "Contact",
    available: "Available for a work-study position", hero_1: "Administer.", hero_2: "Secure.", hero_3: "Connect.", hero_intro: "BTS SIO student specialising in infrastructure, systems and networks, I turn technical challenges into reliable, documented and secure solutions.", discover: "Explore my projects", contact_me: "Contact me", scroll: "Scroll down",
    about_title: "A technical profile,\na practical vision.", about_lead: "I'm Lucas, a student passionate about systems and network administration.", about_body: "My IT Services studies teach me to design, deploy and maintain secure, available infrastructure. I enjoy understanding what happens behind the screen, automating repetitive tasks and sharing clear documentation.", education: "Education", location: "Location", goal: "Goal", goal_value: "Systems & network administrator",
    skills_title: "Strong foundations\nfor reliable systems.", systems: "Systems", systems_text: "Administration, virtualisation and service deployment.", networks: "Networks", networks_text: "Design and maintenance of network architectures.", security: "Cybersecurity", security_text: "Risk reduction and operational best practices.", automation: "Automation", automation_text: "Reproducible scripts and maintainable documentation.",
    projects_title: "Learning by doing.", school_project: "Workshop project", internship: "Internship", project1_title: "High-availability infrastructure", project1_text: "Design of a virtualised infrastructure with network segmentation, centralised directory and backup strategy.", project2_title: "IT infrastructure monitoring", project2_text: "Proactive monitoring deployment and dashboard creation to anticipate incidents.", project3_title: "Secure network laboratory", project3_text: "An isolated environment for experimenting with routing, filtering rules and remote access.",
    watch_title: "Understand today\nto secure tomorrow.", watch_topic: "2025–2026 watch topic", watch_subject: "Zero Trust: rethinking trust within the network", watch_text: "I study the evolution of the “never trust, always verify” model: identity, micro-segmentation and continuous access control.", method: "My method", method_value: "Collect → Verify → Summarise → Share", sources: "Sources I follow", recommendations: "Guides & alerts", vulnerabilities: "Vulnerabilities", privacy: "Data & privacy",
    contact_title: "Let's build something", contact_title_2: "useful.", contact_text: "An opportunity, a project, or simply want to chat about infrastructure? Email me directly.", privacy_note: "No form, analytics cookie or tracker: this website collects no personal data.", footer: "Designed with care and curiosity.", back_top: "Back to top"
  }
};

const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const languageButton = document.querySelector('.language-toggle');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');
const metaTheme = document.querySelector('meta[name="theme-color"]');
const french = {};

document.querySelectorAll('[data-i18n]').forEach((element) => { french[element.dataset.i18n] ??= element.innerHTML; });

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre');
  metaTheme.content = theme === 'dark' ? '#10110f' : '#f2f2ed';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme');
setTheme(savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

function setLanguage(language) {
  const dictionary = language === 'en' ? translations.en : french;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value) element.innerHTML = value.replace(/\n/g, '<br>');
  });
  root.lang = language;
  languageButton.innerHTML = language === 'fr' ? 'FR <span>/</span> EN' : 'EN <span>/</span> FR';
  languageButton.setAttribute('aria-label', language === 'fr' ? 'Display the site in English' : 'Afficher le site en français');
  document.title = language === 'fr' ? 'Lucas Martin — Portfolio SISR' : 'Lucas Martin — Systems & Network Portfolio';
  localStorage.setItem('portfolio-language', language);
}

setLanguage(localStorage.getItem('portfolio-language') || 'fr');
languageButton.addEventListener('click', () => setLanguage(root.lang === 'fr' ? 'en' : 'fr'));

function closeMenu() {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  mobileMenu.hidden = open;
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu');
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
window.addEventListener('scroll', () => document.querySelector('.site-header').classList.toggle('scrolled', scrollY > 20), { passive: true });
document.querySelector('#year').textContent = new Date().getFullYear();
