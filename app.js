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

function cdnUrl(kind, hash, size) {
  const id = SITE.profil.discordId;
  if (!hash || !id) return "";
  return `https://cdn.discordapp.com/${kind}/${id}/${hash}.webp?size=${size}`;
}

function mediaSrc(value, kind, size) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw) || raw.includes("/")) return raw;
  return cdnUrl(kind, raw, size);
}

function renderCard() {
  const c = SITE.carte || {};
  const set = (sel, value) => {
    const node = q(sel);
    if (node && value != null) node.textContent = value;
  };

  const banner = mediaSrc(c.banniere, "banners", 1024);
  const avatar = mediaSrc(c.avatar, "avatars", 256);

  const bannerNode = q("#dc-banner");
  const card = q(".dcard");

  const paintBanner = () => {
    if (!bannerNode || !banner) return;
    bannerNode.style.backgroundImage = `url("${banner}")`;
    const probe = new Image();
    probe.onerror = () => {
      bannerNode.style.backgroundImage = "";
    };
    probe.src = banner;
  };

  if (card && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          paintBanner();
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(card);
    setTimeout(() => {
      paintBanner();
      io.disconnect();
    }, 2500);
  } else {
    paintBanner();
  }

  const avatarNode = q("#dc-avatar");
  if (avatarNode) {
    avatarNode.setAttribute("aria-label", `Avatar Discord de ${SITE.profil.nom}`);
    if (avatar) {
      avatarNode.style.backgroundImage = `url("${avatar}")`;
      const probe = new Image();
      probe.onerror = () => {
        avatarNode.style.backgroundImage = "";
      };
      probe.src = avatar;
    }
  }

  set("#dc-label", c.label || "PROFIL DISCORD");
  set("#dc-id", SITE.profil.discordId);
  set("#dc-statut", c.statut || "HORS LIGNE");
  set("#dc-state", c.statut || "HORS LIGNE");
  set("#dc-tag", c.tag ? `🇫🇷 ${c.tag}` : "");
  set("#dc-role", c.role || "—");
  set("#dc-serveur", c.serveur || "—");
  set("#dc-membres", c.membres ? `${c.membres}${c.enLigne ? ` · ${c.enLigne} en ligne` : ""}` : "—");
  set("#dc-connexion", c.connexion || "—");
  set("#dc-langue", SITE.profil.langue);

  const online = /en ligne|online/i.test(c.statut || "");
  q("#dc-dot")?.classList.toggle("is-on", online);
  q("#dc-state")?.classList.toggle("is-on", online);

  set("#dc-projets", SITE.projets.length);
  set("#dc-resultats", SITE.resultats.length);
}

function initClock() {
  const dateNode = q("#dc-date");
  const timeNode = q("#dc-time");
  if (!dateNode || !timeNode) return;

  const tick = () => {
    const now = new Date();
    dateNode.textContent = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    timeNode.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  };

  tick();
  setInterval(tick, 1000);
}

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

const str = (v) => JSON.stringify(v == null ? "" : String(v));

function serializeSite(site) {
  const p = site.profil;
  const c = site.carte || {};

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

  return `window.SITE = {
  profil: {
    nom: ${str(p.nom)},
    pseudo: ${str(p.pseudo)},
    discordId: ${str(p.discordId)},
    accroche:
      ${str(p.accroche)},
    langue: ${str(p.langue)},
  },

  carte: {
    label: ${str(c.label)},
    tag: ${str(c.tag)},
    role: ${str(c.role)},
    serveur: ${str(c.serveur)},
    membres: ${str(c.membres)},
    enLigne: ${str(c.enLigne)},
    statut: ${str(c.statut)},
    connexion: ${str(c.connexion)},
    avatar: ${str(c.avatar)},
    banniere: ${str(c.banniere)},
  },

  projets: [
${projects}
  ],

  bots: [
${bots}
  ],

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

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderCard();
  renderProjects();
  renderBots();
  renderResults();
  initTheme();
  initCopy();
  initBoot();
  initReveal();
  initClock();

  const year = q("#year");
  if (year) year.textContent = new Date().getFullYear();

  if (location.hash.replace("#", "").toLowerCase() === "edition") openEditor();
});
