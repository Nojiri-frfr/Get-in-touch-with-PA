/* ------------------------------------------------------------------
   Primary Asset — affichage et interactions
   Le contenu (textes, projets, liens) n'est PAS ici : voir content.js
   ------------------------------------------------------------------ */

const SITE = window.SITE || {
  profil: {
    nom: "Primary Asset",
    pseudo: "@primary-asset",
    discordId: "1156589290252419212",
    accroche: "",
    langue: "FR",
  },
  projets: [],
  bots: [],
  resultats: [],
};

const q = (sel, root = document) => root.querySelector(sel);
const qa = (sel, root = document) => [...root.querySelectorAll(sel)];

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
}

const pad = (n, size = 2) => String(n).padStart(size, "0");

/** Lien externe : profil Discord si le champ "lien" est vide. */
function linkFor(value) {
  const raw = (value || "").trim();
  if (!raw) return `https://discord.com/users/${SITE.profil.discordId}`;
  return raw;
}

function isExternal(url) {
  return /^https?:\/\//i.test(url);
}

function decorateLink(node, url) {
  node.href = url;
  node.rel = "noopener";
  if (isExternal(url)) node.target = "_blank";
  return node;
}

/* ------------------------------- Profil --------------------------- */

function renderProfile() {
  const { nom, pseudo, discordId, accroche, langue } = SITE.profil;

  const title = q("#titre");
  if (title) {
    const words = String(nom).trim().split(/\s+/).filter(Boolean);
    title.textContent = "";
    if (words.length > 1) {
      title.append(document.createTextNode(words[0] + " "));
      title.append(el("span", "slash", "/"));
      title.append(document.createTextNode(" " + words.slice(1).join(" ")));
    } else {
      title.textContent = words[0] || "";
    }
  }

  const lede = q("#accroche");
  if (lede && accroche) lede.textContent = accroche;

  const pseudoNode = q("#pseudo");
  if (pseudoNode) pseudoNode.textContent = pseudo;

  const idNode = q("#badge-id");
  if (idNode) idNode.textContent = discordId;

  const contactId = q("#discord-id");
  if (contactId) contactId.textContent = discordId;

  const footId = q("#foot-id");
  if (footId) footId.textContent = discordId;

  const copy = q("#copy");
  if (copy) copy.dataset.copy = discordId;

  const lang = q("#stat-langue");
  if (lang) lang.textContent = langue;

  const url = `https://discord.com/users/${discordId}`;
  qa("[data-discord]").forEach((node) => {
    node.href = url;
    node.rel = "me noopener";
  });
}

/* ------------------------------ Projets --------------------------- */

function renderProjects() {
  const host = q("#projects");
  if (!host) return;

  host.textContent = "";
  const frag = document.createDocumentFragment();

  SITE.projets.forEach((project, i) => {
    const url = linkFor(project.lien);
    const card = decorateLink(el("a", "card"), url);

    card.append(el("span", "idx", pad(i + 1)));
    card.append(el("h3", null, project.nom || "Sans titre"));

    const empty = !String(project.bio || "").trim();
    const bio = el("p", empty ? "bio is-empty" : "bio", empty ? "Bio à venir." : project.bio);
    card.append(bio);

    const tags = (project.tags || []).filter(Boolean);
    if (tags.length) {
      const row = el("div", "tags");
      tags.forEach((tag) => row.append(el("span", null, tag)));
      card.append(row);
    }

    frag.append(card);
  });

  host.append(frag);

  const stat = q("#stat-projects");
  if (stat) stat.textContent = SITE.projets.length;
}

/* -------------------------- Bots / résultats ---------------------- */

function renderBots() {
  const host = q("#bots-list");
  if (!host) return;

  host.textContent = "";
  const frag = document.createDocumentFragment();

  SITE.bots.forEach((bot, i) => {
    const li = el("li");
    const body = el("div");
    body.append(el("b", null, bot.nom || "—"));
    body.append(el("small", null, bot.detail || ""));

    li.append(el("span", "n", pad(i + 1)));
    li.append(body);
    li.append(el("span", "go", "—"));
    frag.append(li);
  });

  host.append(frag);

  const stat = q("#stat-bots");
  if (stat) stat.textContent = SITE.bots.length;
}

function renderResults() {
  const host = q("#results-list");
  if (!host) return;

  host.textContent = "";
  const frag = document.createDocumentFragment();

  SITE.resultats.forEach((result, i) => {
    const url = linkFor(result.lien);
    const li = el("li");
    const body = el("div");

    body.append(decorateLink(el("a", "name", result.titre || "—"), url));
    body.append(el("small", null, result.detail || ""));

    li.append(el("span", "n", pad(i + 1, 3)));
    li.append(body);
    li.append(decorateLink(el("a", "go", result.etiquette || "Voir"), url));
    frag.append(li);
  });

  host.append(frag);

  const stat = q("#stat-results");
  if (stat) stat.textContent = SITE.resultats.length;
}

/* -------------------------------- Thème --------------------------- */

function initTheme() {
  const root = document.documentElement;
  const btn = q("#theme");
  const stored = localStorage.getItem("pa-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  root.dataset.theme = stored || (prefersLight ? "light" : "dark");

  btn?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("pa-theme", next);
    btn.setAttribute(
      "aria-label",
      next === "dark" ? "Passer en thème clair" : "Passer en thème sombre"
    );
  });
}

/* -------------------------------- Copie --------------------------- */

function initCopy() {
  const btn = q("#copy");
  if (!btn) return;

  const initial = btn.textContent;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy || SITE.profil.discordId);
      btn.textContent = "Copié";
    } catch {
      btn.textContent = "Ctrl+C";
    }
    setTimeout(() => {
      btn.textContent = initial;
    }, 1600);
  });
}

/* -------------------------------- Boot ---------------------------- */

function initBoot() {
  const boot = q("#boot");
  if (!boot) return;

  const done = () => boot.classList.add("is-done");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    done();
    return;
  }

  const timer = setTimeout(done, 1300);
  boot.addEventListener("click", () => {
    clearTimeout(timer);
    done();
  });
}

/* ------------------------------- Reveal --------------------------- */

function initReveal() {
  const targets = qa("[data-reveal]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );

  targets.forEach((t) => io.observe(t));
}

/* ==================================================================
   Mode édition — index.html#edition
   Permet de modifier les bios et les projets, puis de télécharger un
   content.js prêt à remplacer l'actuel.
   ================================================================== */

const str = (v) => JSON.stringify(v == null ? "" : String(v));

function serializeSite(site) {
  const p = site.profil;

  const projects = site.projets
    .map(
      (item) => `    {
      nom: ${str(item.nom)},
      bio: ${str(item.bio)},
      tags: [${(item.tags || []).filter(Boolean).map(str).join(", ")}],
      lien: ${str(item.lien)},
    },`
    )
    .join("\n");

  const bots = site.bots
    .map((item) => `    { nom: ${str(item.nom)}, detail: ${str(item.detail)} },`)
    .join("\n");

  const results = site.resultats
    .map(
      (item) => `    {
      titre: ${str(item.titre)},
      detail: ${str(item.detail)},
      lien: ${str(item.lien)},
      etiquette: ${str(item.etiquette)},
    },`
    )
    .join("\n");

  return `/* ============================================================================
   CONTENU DU SITE — généré depuis le mode édition (index.html#edition)
   ----------------------------------------------------------------------------
   • une fiche projet = un bloc { ... } dans "projets"
   • bio vide ("")  -> la carte affiche "Bio à venir."
   • tags vide ([]) -> aucune étiquette affichée
   • lien vide ("") -> le bouton pointe vers ton profil Discord
   • attention aux virgules entre deux blocs, sinon la page reste blanche.
   ========================================================================== */

window.SITE = {
  /* Profil */
  profil: {
    nom: ${str(p.nom)},
    pseudo: ${str(p.pseudo)},
    discordId: ${str(p.discordId)},
    accroche:
      ${str(p.accroche)},
    langue: ${str(p.langue)},
  },

  /* Projets */
  projets: [
${projects}
  ],

  /* Bots & communautés */
  bots: [
${bots}
  ],

  /* Résultats web */
  resultats: [
${results}
  ],
};
`;
}

function openEditor() {
  const state = JSON.parse(JSON.stringify(SITE));

  const overlay = el("div", "editor-overlay");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Édition du contenu");

  const panel = el("div", "editor-panel");

  const head = el("div", "editor-head");
  head.append(el("h2", null, "Édition rapide"));
  head.append(
    el("p", "editor-sub", "Modifie les textes, puis télécharge content.js et remplace l'ancien fichier.")
  );
  const close = el("button", "editor-close", "✕");
  close.type = "button";
  close.setAttribute("aria-label", "Fermer");
  close.addEventListener("click", () => overlay.remove());
  head.append(close);

  const body = el("div", "editor-body");

  /* --- Profil --- */
  const profileBlock = el("fieldset", "editor-group");
  profileBlock.append(el("legend", null, "Profil"));

  const mkInput = (label, value, opts = {}) => {
    const wrap = el("label", "editor-field");
    wrap.append(el("span", null, label));
    const input = opts.multiline ? el("textarea") : el("input");
    if (opts.multiline) input.rows = 3;
    else input.type = "text";
    input.value = value ?? "";
    input.dataset.key = opts.key || "";
    wrap.append(input);
    return { wrap, input };
  };

  const nom = mkInput("Nom affiché", state.profil.nom);
  const pseudo = mkInput("Pseudo", state.profil.pseudo);
  const discordId = mkInput("ID Discord", state.profil.discordId);
  const accroche = mkInput("Phrase d'accueil", state.profil.accroche, { multiline: true });
  profileBlock.append(nom.wrap, pseudo.wrap, discordId.wrap, accroche.wrap);
  body.append(profileBlock);

  /* --- Projets --- */
  const projectsBlock = el("fieldset", "editor-group");
  projectsBlock.append(el("legend", null, "Projets"));
  const projectsList = el("div", "editor-projects");
  projectsBlock.append(projectsList);

  const addProjectRow = (project = { nom: "", bio: "", tags: [], lien: "" }) => {
    const row = el("div", "editor-project");

    const rowHead = el("div", "editor-project-head");
    const nameWrap = mkInput("Nom du projet", project.nom);
    const remove = el("button", "btn btn-sm editor-remove", "Retirer");
    remove.type = "button";
    remove.addEventListener("click", () => row.remove());
    rowHead.append(nameWrap.wrap, remove);

    const bio = mkInput("Bio", project.bio, { multiline: true });
    const tags = mkInput("Tags (séparés par des virgules)", (project.tags || []).join(", "));
    const lien = mkInput("Lien (vide = profil Discord)", project.lien);

    row.append(rowHead, bio.wrap, tags.wrap, lien.wrap);
    row._data = { nameInput: nameWrap.input, bioInput: bio.input, tagsInput: tags.input, lienInput: lien.input };
    projectsList.append(row);
  };

  state.projets.forEach((project) => addProjectRow(project));
  body.append(projectsBlock);

  const addBtn = el("button", "btn btn-sm", "+ Ajouter un projet");
  addBtn.type = "button";
  addBtn.addEventListener("click", () => {
    addProjectRow();
    projectsList.lastElementChild.querySelector("input").focus();
  });
  projectsBlock.append(addBtn);

  /* --- Actions --- */
  const actions = el("div", "editor-actions");
  const download = el("button", "btn btn-primary", "Télécharger content.js");
  const copyAll = el("button", "btn", "Copier le code");
  const reset = el("button", "btn btn-ghost", "Annuler");

  const collect = () => {
    const next = JSON.parse(JSON.stringify(state));

    next.profil.nom = nom.input.value.trim();
    next.profil.pseudo = pseudo.input.value.trim();
    next.profil.discordId = discordId.input.value.trim();
    next.profil.accroche = accroche.input.value.trim();

    next.projets = [...projectsList.children].map((row) => ({
      nom: row._data.nameInput.value.trim(),
      bio: row._data.bioInput.value.trim(),
      tags: row._data.tagsInput.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      lien: row._data.lienInput.value.trim(),
    })).filter((p) => p.nom || p.bio);

    return next;
  };

  download.type = "button";
  download.addEventListener("click", () => {
    const code = serializeSite(collect());
    const blob = new Blob([code], { type: "text/javascript;charset=utf-8" });
    const a = el("a");
    a.href = URL.createObjectURL(blob);
    a.download = "content.js";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    download.textContent = "Téléchargé ✓";
    setTimeout(() => {
      download.textContent = "Télécharger content.js";
    }, 2200);
  });

  copyAll.type = "button";
  copyAll.addEventListener("click", async () => {
    const code = serializeSite(collect());
    try {
      await navigator.clipboard.writeText(code);
      copyAll.textContent = "Copié ✓";
    } catch {
      copyAll.textContent = "Copie impossible";
    }
    setTimeout(() => {
      copyAll.textContent = "Copier le code";
    }, 2000);
  });

  reset.type = "button";
  reset.addEventListener("click", () => overlay.remove());

  actions.append(download, copyAll, reset);
  body.append(actions);

  panel.append(head, body);
  overlay.append(panel);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape" && overlay.isConnected) overlay.remove();
    },
    { once: true }
  );

  document.body.append(overlay);
  nom.input.focus();

  window.__serializeSite = serializeSite;
}

/* -------------------------------- Init ---------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderProjects();
  renderBots();
  renderResults();
  initTheme();
  initCopy();
  initBoot();
  initReveal();

  const year = q("#year");
  if (year) year.textContent = new Date().getFullYear();

  if (location.hash.replace("#", "").toLowerCase() === "edition") openEditor();
});
