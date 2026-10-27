# Primary Asset — portfolio Discord

Page statique (HTML/CSS/JS, sans build ni dépendance) reprenant la structure d'un portfolio
Discord : accueil, projets, bots & communautés, résultats web et contact.

Identité affichée : **Primary Asset** · Discord `1156589290252419212`
→ https://discord.com/users/1156589290252419212

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page (sections, en-tête, pied de page) |
| `styles.css` | Thème sombre/clair, mise en page responsive, animations |
| `app.js` | Données (projets, bots, résultats) + interactions |
| `icon.svg` | Favicon |

## Lancer

Double-clique sur `index.html` : la page fonctionne en local, sans serveur.

Pour un rendu identique à la production (chemins relatifs, polices), un petit serveur statique suffit :

```powershell
cd "C:\Users\Shadow\Documents\Get-in-touch-with-PA"
python -m http.server 8756
# puis http://127.0.0.1:8756/
```

## Modifier le contenu

Tout est centralisé en haut de `app.js` :

```js
const DISCORD_ID = "1156589290252419212";

const DATA = {
  projects: [ { name, desc, tags, url } ],
  bots:     [ { name, meta } ],
  results:  [ { name, desc, url, label } ],
};
```

Les compteurs affichés dans l'accueil et le nombre de lignes se recalculent tout seuls à partir de
ces tableaux : ajouter un projet suffit à mettre à jour la page.

Pour changer l'identifiant Discord partout d'un coup :

```powershell
(Get-Content index.html, app.js) -replace "1156589290252419212", "NOUVEL_ID" | Set-Content index.html, app.js
```

## Détails

- Aucun tracker, aucun cookie, aucune requête vers un tiers à part les polices Google Fonts.
- Thème clair/sombre mémorisé dans `localStorage`, détection de `prefers-color-scheme`.
- Écran de chargement ignoré si `prefers-reduced-motion` est actif.
- Responsive jusqu'à 360 px, navigation par ancres, lien d'évitement clavier.

## Origine

Mise en page inspirée de [joynix28.me](https://joynix28.me/) (portfolio de Samaritain), refaite en
HTML/CSS/JS simple et adaptée à l'identité « Primary Asset ». Le code, les textes et les assets de
ce dépôt sont propres à ce projet : aucun fichier du site d'origine n'est copié.
