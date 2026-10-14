# Portfolio BTS SIO — option SISR

Portfolio statique, responsive et bilingue (français/anglais), conçu pour être publié directement avec GitHub Pages.

## Personnalisation

Avant publication, remplacez dans `index.html` :

- le nom et les initiales « Lucas Martin / LM » ;
- l'adresse `lucas.martin@example.com` ;
- les textes de présentation, compétences et réalisations ;
- les dates et technologies selon votre parcours réel.

Les traductions anglaises sont centralisées dans `assets/js/app.js`. Les préférences de langue et de thème sont uniquement enregistrées dans le navigateur (`localStorage`) et ne sont transmises à aucun serveur.

## Voir l'interface

### Méthode la plus rapide

Le portfolio ne nécessite aucune installation ni compilation. Il est possible de
double-cliquer sur `index.html` pour l'ouvrir directement dans un navigateur.

Pour obtenir un aperçu identique à celui de GitHub Pages, utilisez plutôt un petit
serveur local depuis la racine du dépôt :

```bash
python3 -m http.server 8000
```

Puis ouvrez **<http://localhost:8000>** dans Chrome, Firefox, Edge ou Safari.
Arrêtez le serveur avec <kbd>Ctrl</kbd> + <kbd>C</kbd> lorsque vous avez terminé.

### Depuis VS Code

1. Ouvrez ce dossier dans VS Code.
2. Ouvrez un terminal intégré avec **Terminal → Nouveau terminal**.
3. Exécutez `python3 -m http.server 8000`.
4. Cliquez sur le lien `http://localhost:8000` affiché dans le terminal.

Si le dépôt est ouvert dans GitHub Codespaces, rendez le port `8000` public ou
ouvrez-le depuis l'onglet **Ports**.

### Vérifier les versions de l'interface

- le bouton **FR / EN** en haut à droite change la langue ;
- le bouton soleil/lune change le thème clair ou sombre ;
- réduisez la largeur de la fenêtre ou utilisez les outils de développement du
  navigateur pour tester l'affichage mobile.

## Publication GitHub Pages

Dans le dépôt GitHub, ouvrez **Settings → Pages**, choisissez **Deploy from a
branch**, puis la branche principale et le dossier `/ (root)`. Une fois le
déploiement terminé, GitHub affiche dans cette même page l'adresse publique du
portfolio, généralement sous la forme
`https://nom-utilisateur.github.io/nom-du-depot/`.

## Vie privée

Le site n'utilise ni formulaire, ni outil d'analyse, ni cookie, ni ressource tierce, et n'effectue aucune collecte de données personnelles. Le contact passe par un lien `mailto:` et les polices utilisées sont celles déjà installées sur l'appareil du visiteur.
