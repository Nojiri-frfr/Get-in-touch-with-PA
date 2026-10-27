/* ------------------------------------------------------------------
   Primary Asset — données + comportements
   Tout le contenu éditable est dans DATA, juste en dessous.
   ------------------------------------------------------------------ */

const DISCORD_ID = "1156589290252419212";

const DATA = {
  projects: [
    {
      name: "Chell",
      desc: "Bot Discord français orienté modération et outils communautaires. Le projet sur lequel je passe le plus de temps.",
      tags: ["Bot", "Modération"],
      url: "https://discord.com/users/" + DISCORD_ID,
    },
    {
      name: "Botillon",
      desc: "Annuaire de bots Discord : catalogue vérifié à la main, dashboard, API ouverte, sans publicité ni paywall.",
      tags: ["Web", "Botlist"],
      url: "https://discord.com/users/" + DISCORD_ID,
    },
    {
      name: "La place de PA",
      desc: "Mon serveur Discord : d'abord sur candidature, aujourd'hui ouvert, avec son propre site et ses salons thématiques.",
      tags: ["Communauté", "Discord"],
      url: "https://discord.com/users/" + DISCORD_ID,
    },
    {
      name: "Wheatley",
      desc: "Petit bot expérimental, pensé comme un laboratoire pour tester des idées d'interactions.",
      tags: ["Bot", "Test"],
      url: "https://discord.com/users/" + DISCORD_ID,
    },

    // --- À compléter : bio, tags et URL ---
    {
      name: "Eminium",
      desc: "Bio à venir.",
      tags: [],
      url: "https://discord.com/users/" + DISCORD_ID,
    },
    {
      name: "NationsEmpire",
      desc: "Bio à venir.",
      tags: [],
      url: "https://discord.com/users/" + DISCORD_ID,
    },
    {
      name: "Nd Protect",
      desc: "Bio à venir.",
      tags: [],
      url: "https://discord.com/users/" + DISCORD_ID,
    },
  ],

  bots: [
    { name: "Chell", meta: "Bot Discord · créé par Primary Asset" },
    { name: "PA Assyst", meta: "Bot Discord · en préparation" },
    { name: "Dispatch.IO", meta: "Communauté · support et animation" },
    { name: "Botillon", meta: "Botlist · catalogue de bots" },
    { name: "La place de PA", meta: "Serveur communautaire" },
    { name: "FrenchGG", meta: "Communauté francophone" },
  ],

  results: [
    {
      name: "Profil Discord — Primary Asset",
      desc: "Le point d'entrée : identifiant " + DISCORD_ID + ".",
      url: "https://discord.com/users/" + DISCORD_ID,
      label: "Discord",
    },
    {
      name: "Chell",
      desc: "Fiche du bot : modération, outils communautaires et gestion de serveur.",
      url: "https://discord.com/users/" + DISCORD_ID,
      label: "Projet",
    },
    {
      name: "Botillon",
      desc: "Annuaire francophone de bots Discord, catalogue et dashboard.",
      url: "https://discord.com/users/" + DISCORD_ID,
      label: "Projet",
    },
    {
      name: "Dispatch.IO",
      desc: "Communauté francophone et support autour de Discord.",
      url: "https://discord.com/users/" + DISCORD_ID,
      label: "Projet",
    },
    {
      name: "One Peek",
      desc: "Messages anonymes, sans compte à créer.",
      url: "https://discord.com/users/" + DISCORD_ID,
      label: "Projet",
    },
    {
      name: "WaveOut",
      desc: "Application Android libre, sans traqueur.",
      url: "https://discord.com/users/" + DISCORD_ID,
      label: "Projet",
    },
  ],
};

/* --------------------------------- Utils -------------------------- */

const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
};

const pad = (n) => String(n).padStart(2, "0");

/* ------------------------------- Renders -------------------------- */

function renderProjects() {
  const host = $("#projects");
  if (!host) return;

  const frag = document.createDocumentFragment();

  DATA.projects.forEach((project, i) => {
    const card = el("a", "card");
    card.href = project.url;
    card.rel = "noopener";
    if (project.url.startsWith("http")) card.target = "_blank";

    card.append(el("span", "idx", pad(i + 1)));
    card.append(el("h3", null, project.name));
    card.append(el("p", null, project.desc));

    if (project.tags?.length) {
      const tags = el("div", "tags");
      project.tags.forEach((tag) => tags.append(el("span", null, tag)));
      card.append(tags);
    }

    frag.append(card);
  });

  host.append(frag);
  $("#stat-projects").textContent = DATA.projects.length;
}

function renderBots() {
  const host = $("#bots-list");
  if (!host) return;

  const frag = document.createDocumentFragment();

  DATA.bots.forEach((bot, i) => {
    const li = el("li");
    const body = el("div");
    body.append(el("b", null, bot.name));
    body.append(el("small", null, bot.meta));

    li.append(el("span", "n", pad(i + 1)));
    li.append(body);
    li.append(el("span", "go", "—"));
    frag.append(li);
  });

  host.append(frag);
  $("#stat-bots").textContent = DATA.bots.length;
}

function renderResults() {
  const host = $("#results-list");
  if (!host) return;

  const frag = document.createDocumentFragment();

  DATA.results.forEach((result, i) => {
    const li = el("li");
    const body = el("div");

    const link = el("a", "name", result.name);
    link.href = result.url;
    link.rel = "noopener";
    if (result.url.startsWith("http")) link.target = "_blank";

    body.append(link);
    body.append(el("small", null, result.desc));

    const go = el("a", "go", result.label || "Voir");
    go.href = result.url;
    go.rel = "noopener";
    if (result.url.startsWith("http")) go.target = "_blank";

    li.append(el("span", "n", String(i + 1).padStart(3, "0")));
    li.append(body);
    li.append(go);
    frag.append(li);
  });

  host.append(frag);
  $("#stat-results").textContent = DATA.results.length;
}

/* -------------------------------- Theme --------------------------- */

function initTheme() {
  const root = document.documentElement;
  const btn = $("#theme");
  const stored = localStorage.getItem("pa-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  root.dataset.theme = stored || (prefersLight ? "light" : "dark");

  btn?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("pa-theme", next);
    btn.setAttribute("aria-label", next === "dark" ? "Passer en thème clair" : "Passer en thème sombre");
  });
}

/* -------------------------------- Copy ---------------------------- */

function initCopy() {
  const btn = $("#copy");
  if (!btn) return;

  const initial = btn.textContent;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy || DISCORD_ID);
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
  const boot = $("#boot");
  if (!boot) return;

  const done = () => boot.classList.add("is-done");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
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
  const targets = document.querySelectorAll("[data-reveal]");
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

/* -------------------------------- Init ---------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderBots();
  renderResults();
  initTheme();
  initCopy();
  initBoot();
  initReveal();

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  const badge = $("#badge-id");
  if (badge) badge.textContent = "@" + DISCORD_ID;
});
