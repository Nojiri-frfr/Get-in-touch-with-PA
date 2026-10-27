# Primary Asset — portfolio Discord

Page statique (HTML/CSS/JS, sans build ni dépendance) : accueil, projets, bots & communautés,
résultats web et contact.

Identité affichée : **Primary Asset** · Discord `1156589290252419212`
→ https://discord.com/users/1156589290252419212

## Fichiers

| Fichier | Rôle |
|---|---|
| `content.js` | **Tout le contenu à modifier** : profil, carte Discord, projets, bios, bots, résultats |
| `index.html` | Structure de la page |
| `app.js` | Affichage et interactions (à ne pas toucher pour changer les textes) |
| `styles.css` | Thème, mise en page, animations |
| `icon.svg` | Favicon |

## En ligne

Site publié via GitHub Pages : **https://nojiri-frfr.github.io/Get-in-touch-with-PA/**

Chaque `git push` sur `main` redéploie le site en une trentaine de secondes (source : branche
`main`, racine du dépôt). Le fichier `.nojekyll` évite tout traitement Jekyll.

Le mode `#edition` fonctionne aussi en ligne, mais il ne modifie que le navigateur : il faut
télécharger le `content.js` généré, le déposer dans le dossier local, puis commit + push pour que
la version publique change.

## Lancer en local

Double-clique sur `index.html` : tout fonctionne en local, sans serveur.

## Modifier une bio ou un projet

Tout est dans `content.js`. Une fiche projet = un bloc :

```js
{
  nom: "Eminium",
  bio: "Une phrase ou deux pour présenter le projet.",
  tags: ["Web", "Bot"],
  lien: "",            // vide = le bouton pointe vers ton profil Discord
},
```

Règles simples :

- `bio: ""` → la carte affiche **Bio à venir.** (tu peux donc ajouter un projet sans bio)
- `tags: []` → aucune étiquette affichée
- `lien: ""` → profil Discord ; sinon mets l'URL complète avec `https://`
- une virgule entre chaque bloc `{ ... },` et pas de virgule après le dernier ; en cas d'erreur
  de syntaxe, la page reste blanche (regarde la console du navigateur, F12)
- les compteurs (« Projets », « Bots & communautés »…) se recalculent tout seuls

Le bloc `profil` en haut contrôle le nom affiché, le pseudo, l'ID Discord, la phrase d'accueil et
la langue : tout le reste de la page (liens, badges, pied de page) suit cet ID.

Le bloc `carte` contrôle la carte « Profil Discord » : libellé, tag, rôle, serveur, membres,
statut, dernière connexion, et les chemins d'avatar / bannière. Les images sont stockées dans
`assets/discord/` (`avatar.gif`, `banner.gif`) : ton avatar et ta bannière Discord étant animés,
ce sont les GIF qui sont utilisés, sinon l'animation est perdue. La bannière pèse ~1,5 Mo et
n'est chargée qu'à l'approche de la carte. Pour les rafraîchir, récupère les fichiers sur le CDN
Discord (`.../avatars/<id>/<hash>.gif?size=256` et `.../banners/<id>/<hash>.gif?size=480`) et
écrase-les. Laisse le champ vide pour garder le dégradé par défaut.

## Mode édition dans le navigateur

Ouvre `index.html#edition` (ou ajoute `#edition` à l'URL) : un panneau permet de

- modifier le nom, le pseudo, l'ID Discord et la phrase d'accueil ;
- modifier / ajouter / retirer des projets, avec un champ bio par projet ;
- **Télécharger content.js** (ou copier le code), puis remplacer le `content.js` du dossier.

C'est le moyen le plus simple de remplir les bios sans écrire de code. Les listes « Bots » et
« Résultats » sont conservées telles quelles, elles se modifient directement dans `content.js`.
Le fichier généré est du code brut, sans commentaire : la documentation reste dans ce README.

## Thème

Clair/sombre via le bouton ◐ de l'en-tête, mémorisé dans `localStorage`, avec détection de
`prefers-color-scheme`. L'écran de chargement est ignoré si `prefers-reduced-motion` est actif.

## Détails

- Aucun tracker, aucun cookie, **aucune requête vers un tiers** : polices (`assets/fonts/`),
  avatar et bannière (`assets/discord/`) sont servis par le site lui-même. Les polices Space
  Grotesk et JetBrains Mono sont distribuées sous licence SIL Open Font License.
- Responsive jusqu'à 360 px, navigation par ancres, lien d'évitement clavier.
- `prefers-reduced-motion` respecté partout.

## RGPD

Le site a été rendu conforme au RGPD / ePrivacy sans bandeau de consentement, parce qu'il ne pose
aucun cookie et n'appelle aucun service tiers :

| Point | Mise en œuvre |
|---|---|
| Polices | Space Grotesk et JetBrains Mono téléchargées et servies en local (`assets/fonts/fonts.css`) |
| Images de profil | Avatar et bannière hébergés dans `assets/discord/` |
| Cookies | Aucun. Pas de mesure d'audience, pas de pixel, pas de CDN externe |
| Stockage local | Uniquement le thème choisi, et seulement après un clic sur ◐ (aucune donnée personnelle) |
| Hébergeur | GitHub Pages (GitHub, Inc., États-Unis) : journaux techniques avec IP, décrits dans la politique |
| Information | Page `confidentialite.html` : responsable, finalités, base légale, transferts, durées, droits, CNIL, mentions légales |

Si tu ajoutes plus tard un service externe (police distante, carte, vidéo YouTube, statistiques,
formulaire), la conformité tombe : il faudra soit l'héberger en local, soit demander le
consentement avant chargement. `confidentialite.html` doit alors être mis à jour.

## Origine

Mise en page inspirée de [joynix28.me](https://joynix28.me/), refaite en HTML/CSS/JS simple et
adaptée à l'identité « Primary Asset ». Code, textes et assets propres à ce dépôt : aucun fichier
du site d'origine n'est copié.
