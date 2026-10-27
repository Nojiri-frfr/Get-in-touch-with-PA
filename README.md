# Primary Asset — portfolio Discord

Page statique (HTML/CSS/JS, sans build ni dépendance) : accueil, projets, bots & communautés,
résultats web et contact.

Identité affichée : **Primary Asset** · Discord `1156589290252419212`
→ https://discord.com/users/1156589290252419212

## Fichiers

| Fichier | Rôle |
|---|---|
| `content.js` | **Tout le contenu à modifier** : profil, projets, bios, bots, résultats |
| `index.html` | Structure de la page |
| `app.js` | Affichage et interactions (à ne pas toucher pour changer les textes) |
| `styles.css` | Thème, mise en page, animations |
| `icon.svg` | Favicon |

## Lancer

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

## Mode édition dans le navigateur

Ouvre `index.html#edition` (ou ajoute `#edition` à l'URL) : un panneau permet de

- modifier le nom, le pseudo, l'ID Discord et la phrase d'accueil ;
- modifier / ajouter / retirer des projets, avec un champ bio par projet ;
- **Télécharger content.js** (ou copier le code), puis remplacer le `content.js` du dossier.

C'est le moyen le plus simple de remplir les bios sans écrire de code. Le fichier téléchargé
contient déjà les commentaires d'aide ; les listes « Bots » et « Résultats » sont conservées
telles quelles, elles se modifient directement dans `content.js`.

## Thème

Clair/sombre via le bouton ◐ de l'en-tête, mémorisé dans `localStorage`, avec détection de
`prefers-color-scheme`. L'écran de chargement est ignoré si `prefers-reduced-motion` est actif.

## Détails

- Aucun tracker, aucun cookie, aucune requête tierce à part les polices Google Fonts.
- Responsive jusqu'à 360 px, navigation par ancres, lien d'évitement clavier.
- `prefers-reduced-motion` respecté partout.

## Origine

Mise en page inspirée de [joynix28.me](https://joynix28.me/), refaite en HTML/CSS/JS simple et
adaptée à l'identité « Primary Asset ». Code, textes et assets propres à ce dépôt : aucun fichier
du site d'origine n'est copié.
