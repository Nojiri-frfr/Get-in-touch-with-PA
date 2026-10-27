/* ============================================================================
   CONTENU DU SITE — c'est le seul fichier à modifier pour changer les textes.
   ----------------------------------------------------------------------------
   • Une fiche projet = un bloc { ... } dans la liste "projets"
   • bio vide ("")  -> la carte affiche "Bio à venir."
   • tags vide ([]) -> aucune étiquette affichée
   • lien vide ("") -> le bouton pointe vers ton profil Discord
   • Pas de virgule oubliée entre deux blocs, sinon la page reste blanche.
   • Astuce : ouvre index.html#edition pour éditer dans le navigateur et
     télécharger un content.js prêt à remplacer celui-ci.
   ========================================================================== */

window.SITE = {
  /* ----------------------------- Profil ----------------------------- */
  profil: {
    nom: "Primary Asset",
    pseudo: "@primary-asset",
    discordId: "1156589290252419212",
    accroche:
      "Je construis des bots et des sites, et je fais vivre des communautés Discord. Toujours un projet en cours, toujours quelque chose à tester.",
    langue: "FR",
  },

  /* ---------------------------- Projets ----------------------------- */
  projets: [
    {
      nom: "Chell",
      bio: "Bot Discord français orienté modération et outils communautaires. Le projet sur lequel je passe le plus de temps.",
      tags: ["Bot", "Modération"],
      lien: "https://Chell.fr",
    },
    {
      nom: "Botillon",
      bio: "Annuaire de bots Discord : catalogue vérifié à la main, dashboard, API ouverte, sans publicité ni paywall.",
      tags: ["Web", "Botlist"],
      lien: "https://Botillon.fr",
    },
    {
      nom: "La place de PA",
      bio: "Mon serveur Discord : d'abord sur candidature, aujourd'hui ouvert, avec son propre site et ses salons thématiques.",
      tags: ["Communauté", "Discord"],
      lien: "https://Mon-discord.fr",
    },
    {
      nom: "Wheatley",
      bio: "Petit bot expérimental, pensé comme un laboratoire pour tester des idées d'interactions.",
      tags: ["Bot", "Test"],
      lien: "https://wheatley.fourty3000.fr/",
    },
    {
      nom: "Eminium",
      bio: "Serveur Minecraft PVP Faction sous launcher personnalisé, avec un système de factions et d'économie. Le projet connait une baisse de joueurs",
      tags: ["Serveur", "Minecraft"],
      lien: "https://eminium.ovh",
    },
    {
      nom: "NationsEmpire",
      bio: "Serveur Minecraft Semi RP, avec un système de nations et d'économie. Le projet est en Beta",
      tags: ["Jeu", "Minecraft"],
      lien: "https://nationsempire.eminium.ovh/",
    },
    {
      nom: "Nd Protect",
      bio: "Bot de protection contre le spam et les raids sur Discord, avec un système de modération automatique.",
      tags: ["Bot", "Modération", "Protection"],
      lien: "https://ndprotect.com/",
    },
  ],

  /* ----------------------- Bots & communautés ----------------------- */
  bots: [
    { nom: "Chell", detail: "Bot Discord · créé par Primary Asset" },
    { nom: "Botillon", detail: "Botlist · catalogue de bots" },
    { nom: "La place de PA", detail: "Serveur communautaire" },
    { nom: "Wheatley", detail: "Bot Discord · expérimental" },
    { nom: "Eminium", detail: "Serveur Minecraft PVP Faction" },
    { nom: "NationsEmpire", detail: "Serveur Minecraft Semi RP" },
    { nom: "Nd Protect", detail: "Bot de protection Discord" },
  ],

  /* -------------------------- Résultats web ------------------------- */
  resultats: [
    {
      titre: "Profil Discord — Primary Asset",
      detail: "Le point d'entrée : identifiant 1156589290252419212.",
      lien: "",
      etiquette: "Discord",
    },
    {
      titre: "Chell",
      detail: "Bot Discord français orienté modération et outils communautaires.",
      lien: "",
      etiquette: "Projet",
    },
    {
      titre: "Botillon",
      detail: "Annuaire francophone de bots Discord, catalogue et dashboard.",
      lien: "",
      etiquette: "Projet",
    },
    {
      titre: "La place de PA",
      detail: "Serveur Discord communautaire, ouvert au public.",
      lien: "",
      etiquette: "Projet",
    },
    {
      titre: "Wheatley",
      detail: "Bot expérimental, laboratoire d'idées d'interactions.",
      lien: "",
      etiquette: "Projet",
    },
    {
      titre: "Eminium",
      detail: "Serveur Minecraft PVP Faction",
      lien: "",
      etiquette: "Projet",
    },
    {
      titre: "NationsEmpire",
      detail: "Serveur Minecraft Semi RP",
      lien: "",
      etiquette: "Projet",
    },
    {
      titre: "Nd Protect",
      detail: "Bot de protection Discord",
      lien: "",
      etiquette: "Projet",
    },
  ],
};
