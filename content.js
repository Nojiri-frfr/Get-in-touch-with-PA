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
      lien: "",
    },
    {
      nom: "Botillon",
      bio: "Annuaire de bots Discord : catalogue vérifié à la main, dashboard, API ouverte, sans publicité ni paywall.",
      tags: ["Web", "Botlist"],
      lien: "",
    },
    {
      nom: "La place de PA",
      bio: "Mon serveur Discord : d'abord sur candidature, aujourd'hui ouvert, avec son propre site et ses salons thématiques.",
      tags: ["Communauté", "Discord"],
      lien: "",
    },
    {
      nom: "Wheatley",
      bio: "Petit bot expérimental, pensé comme un laboratoire pour tester des idées d'interactions.",
      tags: ["Bot", "Test"],
      lien: "",
    },

    /* --- À compléter : bio, tags et lien --- */
    {
      nom: "Eminium",
      bio: "",
      tags: [],
      lien: "",
    },
    {
      nom: "NationsEmpire",
      bio: "",
      tags: [],
      lien: "",
    },
    {
      nom: "Nd Protect",
      bio: "",
      tags: [],
      lien: "",
    },
  ],

  /* ----------------------- Bots & communautés ----------------------- */
  bots: [
    { nom: "Chell", detail: "Bot Discord · créé par Primary Asset" },
    { nom: "PA Assyst", detail: "Bot Discord · en préparation" },
    { nom: "Dispatch.IO", detail: "Communauté · support et animation" },
    { nom: "Botillon", detail: "Botlist · catalogue de bots" },
    { nom: "La place de PA", detail: "Serveur communautaire" },
    { nom: "FrenchGG", detail: "Communauté francophone" },
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
      detail: "Fiche du bot : modération, outils communautaires et gestion de serveur.",
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
      titre: "Dispatch.IO",
      detail: "Communauté francophone et support autour de Discord.",
      lien: "",
      etiquette: "Projet",
    },
    {
      titre: "One Peek",
      detail: "Messages anonymes, sans compte à créer.",
      lien: "",
      etiquette: "Projet",
    },
    {
      titre: "WaveOut",
      detail: "Application Android libre, sans traqueur.",
      lien: "",
      etiquette: "Projet",
    },
  ],
};
