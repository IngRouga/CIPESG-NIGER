/* C.I.P.E.S.G. — script unique du site.
 * ─────────────────────────────────────────────────────────────
 * PARAMÈTRES MODIFIABLES : numéro WhatsApp, réseaux sociaux, année.
 * Les données des filières sont plus bas (FILIERES) : pour ajouter,
 * modifier ou retirer une filière, éditez simplement cette liste.
 * ───────────────────────────────────────────────────────────── */
const SITE = {
  whatsapp: "22781353131", // À CONFIRMER par l'école (indicatif 227, sans + ni espaces)
  whatsappMessage: "Bonjour C.I.P.E.S.G., je souhaite obtenir des informations sur les inscriptions.",
  email: "cipesg@yahoo.com",
  annee: "2026-2027",
  // Renseigner les liens : les icônes apparaissent automatiquement.
  reseaux: { facebook: "", instagram: "", tiktok: "" },
};

const NIVEAUX = {
  bac: { titre: "BAC Professionnel & Technique", court: "BAC Pro & Technique", diplome: "Baccalauréat professionnel et technique" },
  bts: { titre: "BTS d'État", court: "BTS d'État", diplome: "Brevet de Technicien Supérieur d'État" },
  lic: { titre: "Licence Professionnelle", court: "Licence Pro", diplome: "Licence professionnelle" },
  mas: { titre: "Master Professionnel", court: "Master Pro", diplome: "Master professionnel" },
};
const FRAIS = {
  bac: [["BAC Professionnel et Technique", 30000, [["Par an", 300000]]]],
  bts: [["BTS d'État (2 ans)", 50000, [["Par an", 450000]]]],
  lic12: [["Licence professionnelle (L1 & L2)", 50000, [["Par an", 450000]]]],
  lic3: [["Licence 3", 50000, [["Par an", 650000]]]],
  mas: [["Master professionnel", 50000, [["M1", 950000], ["M2", 1650000]]]],
};

// Source : brochure officielle. o = offres [niveau, durée, code]
const B = (c) => ["bac", "3 ans", c], BTS = ["bts", "2 ans"], L12 = ["lic", "L1 & L2 (2 ans)"], L3 = ["lic", "Licence 3"], M = ["mas", "M1 & M2"];
const FILIERES = [
  ["administration", "Administration", "Gestion & administration", [B("G1")], "Organisation administrative, gestion des documents et fonctionnement des services d'une entreprise ou d'une administration."],
  ["comptabilite", "Comptabilité", "Finance & comptabilité", [B("G2")], "Tenue des comptes, opérations courantes et bases de la gestion financière d'une organisation."],
  ["comptabilite-informatique", "Comptabilité Informatique", "Finance & comptabilité", [B("CI")], "La comptabilité pratiquée avec les outils informatiques : saisie, traitement et présentation des données comptables."],
  ["secretariat-informatique", "Secrétariat Informatique", "Gestion & administration", [B("SI")], "Rédaction, organisation du travail de bureau et maîtrise des outils bureautiques au service d'une équipe."],
  ["techniques-commerciales", "Techniques Commerciales", "Commerce & marketing", [B("G3")], "Vente, relation client et fondamentaux de l'action commerciale."],
  ["genie-civil", "Génie Civil", "Génie civil", [B("BTP"), BTS, L12], "Les métiers du bâtiment et des travaux publics : lecture de plans, organisation et suivi de chantier.", ["BTP"]],
  ["informatique-de-gestion", "Informatique de Gestion", "Informatique & numérique", [B("IG"), BTS, L12], "L'informatique appliquée à la gestion des organisations : outils, données et systèmes d'information."],
  ["transport-logistique", "Transport Logistique", "Transport & logistique", [B("TL"), BTS, L12, L3, M], "Organisation des flux de marchandises, gestion des stocks, transport et chaîne d'approvisionnement."],
  ["agriculture", "Agriculture", "Agriculture", [BTS, L12], "Économie et gestion des activités agricoles et rurales.", ["Socio-économie rurale", "Pêche et pisciculture"]],
  ["administration-gestion-organisations", "Administration et Gestion des Organisations", "Gestion & administration", [BTS, L12], "Pilotage administratif des organisations, gestion des ressources humaines et des projets.", ["AGO-GRH", "AGO-PMO"]],
  ["assistant-de-direction", "Assistant de Direction", "Gestion & administration", [BTS, L12], "Appui à la direction : organisation, communication écrite et orale, suivi des dossiers et des agendas."],
  ["banque-microfinance", "Banque et Microfinance", "Finance & comptabilité", [BTS, L12], "Opérations bancaires, crédit, relation client et fonctionnement des institutions de microfinance."],
  ["communication-des-organisations", "Communication des Organisations", "Communication", [BTS, L12], "Communication interne et externe des entreprises et institutions : messages, supports et relations publiques."],
  ["finance-comptabilite", "Finance Comptabilité", "Finance & comptabilité", [BTS, L12], "Comptabilité générale, analyse financière et gestion budgétaire des organisations."],
  ["horticulture", "Horticulture", "Agriculture", [BTS, L12], "Production et gestion des cultures horticoles, du maraîchage à l'arboriculture."],
  ["marketing-vente", "Marketing et Vente", "Commerce & marketing", [BTS, L12], "Étude de marché, stratégie commerciale, techniques de vente et relation client."],
  ["finance-digitale", "Finance Digitale", "Finance & comptabilité", [L3, M], "Les services financiers à l'ère du numérique : paiements électroniques et outils financiers digitaux."],
  ["marketing-digital", "Marketing Digital", "Commerce & marketing", [L3, M], "Stratégie de marque et d'acquisition sur les canaux numériques : réseaux sociaux, contenus, campagnes et mesure."],
  ["management-projets-numeriques", "Management des Projets Numériques", "Informatique & numérique", [L3, M], "Conduite de projets digitaux : cadrage, planification, coordination des équipes et suivi."],
].map(([slug, nom, domaine, offres, description, options]) => ({ slug, nom, domaine, offres, description, options: options || [] }));

/* ───────────── Utilitaires ───────────── */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fcfa = (n) => n.toLocaleString("fr-FR").replace(/ | /g, " ") + " FCFA";
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const wa = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ICON = {
  arrow: '<svg class="icon" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  x: '<svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  file: '<svg class="icon" viewBox="0 0 24 24"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"/><path d="M12 11v6M9 14l3-3 3 3"/></svg>',
};

/* ───────────── Commun à toutes les pages ───────────── */
(function common() {
  // Liens WhatsApp
  $$("[data-wa]").forEach((a) => (a.href = wa(a.dataset.wa || SITE.whatsappMessage)));
  // Réseaux sociaux (affichés seulement si renseignés)
  const paths = {
    facebook: "M14 13.5h2.5l1-4H14v-2c0-1 0-2 2-2h1.5V2.1A21 21 0 0 0 14.6 2C11.9 2 10 3.7 10 6.7v2.8H7v4h3V22h4z",
    instagram: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
    tiktok: "M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-2.6-2.6c0-1.7 1.7-3 3.4-2.5V9.7c-3.5-.5-6.5 2.2-6.5 5.6 0 3.3 2.8 5.7 5.7 5.7 3.1 0 5.7-2.6 5.7-5.7V9a7.4 7.4 0 0 0 4.3 1.4V7.3s-1.9.1-3.2-1.5Z",
  };
  $$(".socials").forEach((ul) => {
    ul.innerHTML = Object.entries(SITE.reseaux).filter(([, u]) => u).map(([k, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener" aria-label="C.I.P.E.S.G. sur ${k}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[k]}"/></svg></a></li>`).join("");
  });
  $$("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear()));

  // En-tête, progression, retour en haut
  const header = $(".header"), bar = $(".progress"), top = $(".to-top"), bg = $(".hero__bg");
  let ticking = false;
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle("is-solid", y > 24 || document.body.classList.contains("menu-open"));
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    top.classList.toggle("is-on", y > 900);
    if (bg && !reduce && y < innerHeight) bg.style.transform = `translateY(${y * 0.12}px)`;
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));

  // Menu mobile
  const burger = $(".burger"), menu = $(".menu");
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    menu.inert = !open;
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    burger.innerHTML = open ? ICON.x.replace('class="icon"', 'class="icon" aria-hidden="true"') : '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    $$(".menu nav li").forEach((li, i) => (li.style.transitionDelay = open ? 0.12 + i * 0.035 + "s" : "0s"));
    onScroll();
    if (open) $(".menu a")?.focus();
  };
  menu.inert = true;
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  addEventListener("keydown", (e) => e.key === "Escape" && menu.classList.contains("is-open") && (setMenu(false), burger.focus()));
  $$(".menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  // Apparition au scroll + compteurs
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add("is-in");
    if (el.dataset.count) count(el);
    if (el.dataset.fill) el.style.height = el.dataset.fill + "%";
    io.unobserve(el);
  }), { rootMargin: "0px 0px -12% 0px" });
  $$(".reveal,.timeline,.xp__img,[data-count],[data-fill]").forEach((el) => io.observe(el));
  function count(el) {
    const to = +el.dataset.count;
    if (reduce) return (el.textContent = to + " %");
    const t0 = performance.now(), d = 1600;
    const step = (t) => { const p = Math.min((t - t0) / d, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + " %"; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  // Panneaux des niveaux (accueil, desktop)
  $$(".levels--panels .level").forEach((lv, _, all) => {
    const act = () => all.forEach((x) => x.classList.toggle("is-active", x === lv));
    lv.addEventListener("mouseenter", act); lv.addEventListener("focusin", act);
  });

  // Partage d'article
  $$("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(location.href.split("#")[0] + (b.dataset.copy || "")); b.lastChild.textContent = " Lien copié"; } catch (e) { /* indisponible */ }
  }));
})();

/* ───────────── Fiches et explorateur de formations ───────────── */
function entries() {
  const out = [];
  FILIERES.forEach((f) => {
    const by = {};
    f.offres.forEach(([niv, duree, code]) => (by[niv] = by[niv] || []).push({ duree, code }));
    Object.entries(by).forEach(([niv, list]) => out.push({ f, niv, duree: list.map((x) => x.duree).join(" + "), code: list.find((x) => x.code)?.code || "" }));
  });
  const order = Object.keys(NIVEAUX);
  return out.sort((a, b) => order.indexOf(a.niv) - order.indexOf(b.niv) || a.f.nom.localeCompare(b.f.nom, "fr"));
}

function feesFor(e) {
  if (e.niv === "lic") return [...(e.duree.includes("L1") ? FRAIS.lic12 : []), ...(e.duree.includes("3") ? FRAIS.lic3 : [])];
  return FRAIS[e.niv];
}

const modal = $("#fiche");
function openFiche(key) {
  const e = entries().find((x) => `${x.niv}-${x.f.slug}` === key);
  if (!e || !modal) return;
  const n = NIVEAUX[e.niv], msg = `Bonjour C.I.P.E.S.G., je souhaite des informations sur la filière ${e.f.nom} (${n.court}).`;
  const pending = (what) => `<p class="pending">Le détail ${what} vous est communiqué par le service des admissions. <a class="u" style="color:var(--blue);font-weight:600" href="${wa(msg)}" target="_blank" rel="noopener">Demander sur WhatsApp</a></p>`;
  const autres = entries().filter((x) => x.f.slug === e.f.slug && x.niv !== e.niv);
  $(".modal__content", modal).innerHTML = `
    <p class="xrow__tags"><span class="badge">${n.titre}</span>${e.code ? `<span class="badge badge--violet">${e.code}</span>` : ""}<span>${esc(e.f.domaine)}</span></p>
    <h2 id="fiche-titre" class="mt-1">${esc(e.f.nom)}</h2>
    <p class="mt-1 muted">${esc(e.f.description)}</p>
    <dl class="dl"><div><dt>Diplôme</dt><dd>${n.diplome}</dd></div><div><dt>Durée</dt><dd>${e.duree}</dd></div>
    ${e.f.options.length ? `<div><dt>Options</dt><dd>${e.f.options.map(esc).join(", ")}</dd></div>` : ""}
    ${e.niv !== "bac" ? `<div><dt>Cadre</dt><dd>Délocalisation de l'ESCEN-Lomé</dd></div>` : ""}</dl>
    <h3>Programme</h3>${pending("du programme")}
    <h3>Conditions d'admission</h3>${pending("des conditions d'admission")}
    <h3>Débouchés</h3>${pending("des débouchés")}
    <h3>Documents à fournir</h3><ul class="checks checks--plain"><li>Pièce d'identité</li><li>Dernier diplôme ou relevé de notes</li><li>Photos d'identité</li></ul>
    <h3>Frais</h3><ul class="fee-cards" style="display:grid">${feesFor(e).map(([c, ins, an]) => `<li><b>${c}</b><dl><div><dt>Inscription</dt><dd>${fcfa(ins)}</dd></div>${an.map(([l, m]) => `<div><dt>${l}</dt><dd>${fcfa(m)}</dd></div>`).join("")}</dl></li>`).join("")}</ul>
    ${autres.length ? `<p class="small mt-2">Aussi proposée en : ${autres.map((a) => NIVEAUX[a.niv].titre).join(", ")}.</p>` : ""}
    <div class="btns mt-3"><a class="btn btn--apply" href="candidature.html?niveau=${e.niv}&filiere=${e.f.slug}">Candidater</a><a class="btn btn--outline" href="${wa(msg)}" target="_blank" rel="noopener">Poser une question</a></div>`;
  modal.classList.add("is-open");
  modal.inert = false;
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", "#" + key);
  $(".modal__x", modal).focus();
}
function closeFiche() {
  modal.classList.remove("is-open"); modal.inert = true; document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname + location.search);
}
if (modal) {
  modal.inert = true;
  modal.addEventListener("click", (e) => e.target === modal && closeFiche());
  $(".modal__x", modal).addEventListener("click", closeFiche);
  addEventListener("keydown", (e) => e.key === "Escape" && modal.classList.contains("is-open") && closeFiche());
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-fiche]"); if (b) { e.preventDefault(); openFiche(b.dataset.fiche); } });
  if (location.hash.length > 1) openFiche(location.hash.slice(1));
}

// Listes de filières par niveau (pages formations)
$$("[data-niveau-list]").forEach((ul) => {
  const niv = ul.dataset.niveauList;
  ul.innerHTML = entries().filter((e) => e.niv === niv).map((e) => `
    <li><button class="card" type="button" data-fiche="${e.niv}-${e.f.slug}">
      <span class="card__top"><h3>${esc(e.f.nom)}</h3>${ICON.arrow}</span>
      <p>${esc(e.f.description)}</p>
      <span class="badges">${e.code ? `<span class="badge badge--violet">${e.code}</span>` : ""}<span class="badge">${e.duree}</span>${e.f.options.map((o) => `<span class="badge">Option ${esc(o)}</span>`).join("")}</span>
    </button></li>`).join("");
});

// Explorateur
const explorer = $("#explorer-app");
if (explorer) {
  const all = entries();
  const q = $("#q"), sels = $$("select", explorer), list = $("#x-list"), countEl = $("#x-count"), reset = $("#x-reset"), more = $("#x-more");
  const opts = { niveau: Object.values(NIVEAUX).map((n) => n.titre), domaine: [...new Set(FILIERES.map((f) => f.domaine))].sort((a, b) => a.localeCompare(b, "fr")), duree: [...new Set(all.flatMap((e) => e.duree.split(" + ")))], diplome: Object.values(NIVEAUX).map((n) => n.diplome) };
  sels.forEach((s) => s.insertAdjacentHTML("beforeend", opts[s.name].map((o) => `<option>${esc(o)}</option>`).join("")));
  let limit = 12;
  const render = () => {
    const f = Object.fromEntries(sels.map((s) => [s.name, s.value])), words = norm(q.value.trim()).split(/\s+/).filter(Boolean);
    const res = all.filter((e) => {
      const n = NIVEAUX[e.niv];
      if (f.niveau && n.titre !== f.niveau) return false;
      if (f.domaine && e.f.domaine !== f.domaine) return false;
      if (f.duree && !e.duree.split(" + ").includes(f.duree)) return false;
      if (f.diplome && n.diplome !== f.diplome) return false;
      const hay = norm([e.f.nom, e.f.domaine, e.f.description, n.titre, e.code, ...e.f.options].join(" "));
      return words.every((w) => hay.includes(w));
    });
    countEl.innerHTML = `<b>${res.length}</b> formation${res.length > 1 ? "s" : ""} trouvée${res.length > 1 ? "s" : ""}`;
    reset.hidden = !(q.value || sels.some((s) => s.value));
    list.innerHTML = res.length ? res.slice(0, limit).map((e) => `
      <li><button class="xrow" type="button" data-fiche="${e.niv}-${e.f.slug}">
        <span><span class="xrow__tags"><span class="badge">${NIVEAUX[e.niv].court}</span>${e.code ? `<span class="badge badge--violet">${e.code}</span>` : ""}<span>${esc(e.f.domaine)}</span></span>
        <h3>${esc(e.f.nom)}</h3><p>${esc(e.f.description)}</p></span>
        <span class="xrow__end"><span>${e.duree}</span><span class="circle">${ICON.arrow}</span></span>
      </button></li>`).join("") : `<li class="empty"><b>Aucune formation ne correspond à cette recherche.</b><p class="muted mt-1">Essayez un autre mot-clé ou retirez un filtre.</p></li>`;
    more.hidden = res.length <= limit;
    more.textContent = `Afficher plus (${Math.max(res.length - limit, 0)} restantes)`;
  };
  q.addEventListener("input", () => { limit = 12; render(); });
  sels.forEach((s) => s.addEventListener("change", () => { limit = 12; render(); }));
  reset.addEventListener("click", () => { q.value = ""; sels.forEach((s) => (s.value = "")); limit = 12; render(); });
  more.addEventListener("click", () => { limit += 12; render(); });
  const p = new URLSearchParams(location.search).get("niveau");
  if (p && NIVEAUX[p]) $("select[name=niveau]", explorer).value = NIVEAUX[p].titre;
  render();
}

/* ───────────── Galerie ───────────── */
const gal = $("#galerie-app");
if (gal) {
  const items = $$(".masonry li", gal), lb = $(".lightbox"), stage = $(".lightbox__stage", lb), img = $("img", stage), cap = $(".lightbox__cap", lb), pos = $(".lb-pos", lb);
  let visible = items, i = 0, last;
  $$(".gal-filters button", gal).forEach((b, _, bs) => b.addEventListener("click", () => {
    bs.forEach((x) => x.setAttribute("aria-pressed", x === b));
    const c = b.dataset.cat;
    items.forEach((li) => (li.hidden = c !== "Tout" && !li.dataset.cat.split(",").includes(c)));
    visible = items.filter((li) => !li.hidden);
  }));
  const show = () => {
    const btn = $("button", visible[i]), t = $("img", btn);
    img.src = btn.dataset.full; img.alt = t.alt; cap.textContent = $("span", btn).textContent; pos.textContent = `${i + 1} / ${visible.length}`;
    stage.classList.remove("is-zoom");
  };
  const open = (n) => { i = n; last = document.activeElement; show(); lb.classList.add("is-open"); lb.inert = false; document.body.style.overflow = "hidden"; $(".lb-close", lb).focus(); };
  const close = () => { lb.classList.remove("is-open"); lb.inert = true; document.body.style.overflow = ""; last?.focus(); };
  const go = (d) => { i = (i + d + visible.length) % visible.length; show(); };
  lb.inert = true;
  items.forEach((li) => $("button", li).addEventListener("click", () => open(visible.indexOf(li))));
  $(".lb-close", lb).addEventListener("click", close);
  $(".lb-prev", lb).addEventListener("click", () => go(-1));
  $(".lb-next", lb).addEventListener("click", () => go(1));
  $(".lb-zoom", lb).addEventListener("click", () => stage.classList.toggle("is-zoom"));
  stage.addEventListener("click", (e) => e.target === stage && close());
  let sx = 0;
  stage.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  stage.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50 && !stage.classList.contains("is-zoom")) go(dx < 0 ? 1 : -1); });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1);
  });
  const id = new URLSearchParams(location.search).get("photo");
  if (id) { const n = items.findIndex((li) => li.id === id); if (n >= 0) open(n); }
}

/* ───────────── Formulaire de contact → WhatsApp ou e-mail ───────────── */
const contactForm = $("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(contactForm)), errs = {};
    if (!d.nom.trim()) errs.nom = "Indiquez votre nom.";
    if (!d.telephone.trim() && !d.email.trim()) errs.telephone = "Indiquez un téléphone ou un e-mail pour être recontacté.";
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errs.email = "Adresse e-mail invalide.";
    if (d.message.trim().length < 10) errs.message = "Votre message est trop court.";
    if (showErrors(contactForm, errs)) return;
    const txt = `Bonjour C.I.P.E.S.G.,\n\n${d.message.trim()}\n\n— ${d.nom.trim()}${d.telephone ? "\nTél. : " + d.telephone : ""}${d.email ? "\nE-mail : " + d.email : ""}\nSujet : ${d.sujet}`;
    const url = e.submitter?.value === "email" ? `mailto:${SITE.email}?subject=${encodeURIComponent(d.sujet + " — site web")}&body=${encodeURIComponent(txt)}` : wa(txt);
    if (url.startsWith("mailto:")) location.href = url; else open(url, "_blank", "noopener");
  });
}

function showErrors(form, errs) {
  $$(".err", form).forEach((x) => x.remove());
  $$("[aria-invalid]", form).forEach((x) => x.removeAttribute("aria-invalid"));
  $$(".has-err", form).forEach((x) => x.classList.remove("has-err"));
  const keys = Object.keys(errs);
  keys.forEach((k) => {
    const el = form.elements[k] || $(`[data-field="${k}"]`, form);
    const holder = el?.closest?.(".field") || $(`[data-field="${k}"]`, form)?.parentElement;
    if (el && el.setAttribute) el.setAttribute("aria-invalid", "true");
    $(`[data-field="${k}"]`, form)?.classList.add("has-err");
    holder?.insertAdjacentHTML("beforeend", `<p class="err" role="alert" id="err-${k}">${esc(errs[k])}</p>`);
  });
  if (keys.length) (form.elements[keys[0]] || $(`[data-field="${keys[0]}"] input`, form))?.focus?.();
  return keys.length > 0;
}

/* ───────────── Candidature en 4 étapes ───────────── */
const cand = $("#candidature");
if (cand) {
  const steps = $$(".step", cand), bars = $$(".steps li"), back = $("#c-back"), next = $("#c-next"), mob = $(".step-mobile");
  const TITRES = ["Informations personnelles", "Formation souhaitée", "Documents", "Confirmation"];
  const DOCS = [["piece_identite", "Pièce d'identité", true], ["diplome", "Dernier diplôme ou relevé de notes", true], ["photos", "Photos d'identité", true], ["autres", "Autres documents", false]];
  const files = {};
  let cur = 0;
  const niv = cand.elements.niveau, fil = cand.elements.filiere;
  niv.innerHTML = `<option value="">Choisir un niveau</option>` + Object.entries(NIVEAUX).map(([k, n]) => `<option value="${k}">${n.titre}</option>`).join("");
  const fillFil = () => {
    fil.disabled = !niv.value;
    fil.innerHTML = `<option value="">Choisir une filière</option>` + entries().filter((e) => e.niv === niv.value).map((e) => `<option value="${e.f.slug}">${esc(e.f.nom)}${e.code ? ` (${e.code})` : ""}</option>`).join("");
  };
  niv.addEventListener("change", fillFil);
  cand.elements.annee.innerHTML = `<option>${SITE.annee}</option>`;
  const p = new URLSearchParams(location.search);
  if (NIVEAUX[p.get("niveau")]) { niv.value = p.get("niveau"); fillFil(); fil.value = p.get("filiere") || ""; } else fillFil();
  if (p.get("offre")) cand.elements.offre.value = p.get("offre");
  cand.elements.date_naissance.max = new Date().toISOString().slice(0, 10);

  // Documents
  $("#docs").innerHTML = DOCS.map(([k, l, req]) => `
    <div data-field="${k}"><label class="drop" for="f-${k}" data-drop="${k}">
      <span class="drop__l"><span class="drop__ico">${ICON.file}</span><span><b>${l}</b>${req ? ' <i style="font-style:normal;color:var(--violet)">*</i>' : ""}<small>${k === "photos" || k === "autres" ? "Un ou plusieurs fichiers" : "Un fichier"} · glisser-déposer ou parcourir</small></span></span>
      <span class="pill">Choisir</span>
      <input class="sr-only" type="file" id="f-${k}" accept=".pdf,.jpg,.jpeg,.png,.webp" ${k === "photos" || k === "autres" ? "multiple" : ""}>
    </label><ul class="files" id="list-${k}"></ul></div>`).join("");
  const renderFiles = (k) => ($(`#list-${k}`).innerHTML = (files[k] || []).map((f, i) => `<li><span>${esc(f.name)}</span><button type="button" aria-label="Retirer ${esc(f.name)}" data-rm="${k}:${i}">${ICON.x}</button></li>`).join(""));
  const add = (k, list) => {
    const ok = [...list].filter((f) => /\.(pdf|jpe?g|png|webp)$/i.test(f.name) && f.size <= 5 * 1024 * 1024);
    files[k] = k === "photos" || k === "autres" ? [...(files[k] || []), ...ok].slice(0, 5) : ok.slice(0, 1);
    if (ok.length < list.length) alert("Certains fichiers ont été ignorés : formats acceptés PDF, JPG, PNG, WEBP, 5 Mo maximum.");
    renderFiles(k);
    $(`[data-field="${k}"]`).classList.remove("has-err"); $(`#err-${k}`)?.remove();
  };
  DOCS.forEach(([k]) => {
    const input = $(`#f-${k}`), drop = $(`[data-drop="${k}"]`);
    input.addEventListener("change", () => { add(k, input.files); input.value = ""; });
    drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("is-drag"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("is-drag"));
    drop.addEventListener("drop", (e) => { e.preventDefault(); drop.classList.remove("is-drag"); add(k, e.dataTransfer.files); });
  });
  cand.addEventListener("click", (e) => { const b = e.target.closest("[data-rm]"); if (b) { const [k, i] = b.dataset.rm.split(":"); files[k].splice(+i, 1); renderFiles(k); } });

  const val = (n) => cand.elements[n].value.trim();
  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!val("nom")) e.nom = "Indiquez votre nom.";
      if (!val("prenom")) e.prenom = "Indiquez votre prénom.";
      if (val("telephone").replace(/\D/g, "").length < 8) e.telephone = "Indiquez un numéro valide (8 chiffres minimum).";
      if (val("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("email"))) e.email = "Adresse e-mail invalide.";
      if (!val("date_naissance")) e.date_naissance = "Indiquez votre date de naissance.";
      if (!val("nationalite")) e.nationalite = "Indiquez votre nationalité.";
    }
    if (s === 1) { if (!val("niveau")) e.niveau = "Choisissez un niveau."; if (!val("filiere")) e.filiere = "Choisissez une filière."; }
    if (s === 2) DOCS.forEach(([k, , req]) => req && !(files[k] || []).length && (e[k] = "Ce document est obligatoire."));
    if (s === 3 && !cand.elements.consent.checked) e.consent = "Cochez cette case pour envoyer votre candidature.";
    return !showErrors(cand, e);
  };
  const label = (sel) => sel.options[sel.selectedIndex]?.text || "";
  const summary = () => {
    const d = (n) => esc(val(n)) || "Non renseigné";
    const block = (t, s, rows) => `<section class="summary"><div class="summary__h"><h3>${t}</h3><button type="button" data-goto="${s}">Modifier</button></div><dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl></section>`;
    $("#recap").innerHTML =
      block("Informations personnelles", 0, [["Nom", `${d("prenom")} ${d("nom")}`], ["Téléphone", d("telephone")], ["E-mail", d("email")], ["Date de naissance", val("date_naissance") ? new Date(val("date_naissance")).toLocaleDateString("fr-FR") : ""], ["Nationalité", d("nationalite")]]) +
      block("Formation souhaitée", 1, [["Niveau", esc(label(niv))], ["Filière", esc(label(fil))], ["Année académique", SITE.annee], ...(val("offre") ? [["Offre demandée", esc(label(cand.elements.offre))]] : [])]) +
      block("Documents", 2, DOCS.filter(([k]) => (files[k] || []).length).map(([k, l]) => [l, files[k].map((f) => esc(f.name)).join(", ")]));
  };
  const go = (s, scroll = true) => {
    cur = s;
    steps.forEach((x, i) => x.classList.toggle("is-cur", i === s));
    bars.forEach((b, i) => { b.classList.toggle("done", i <= s); b.classList.toggle("cur", i === s); b.toggleAttribute("aria-current", i === s); });
    mob.textContent = `Étape ${s + 1} sur 4 · ${TITRES[s]}`;
    back.hidden = s === 0;
    next.textContent = s === 3 ? "Envoyer ma candidature" : "Continuer";
    next.className = s === 3 ? "btn btn--apply btn--lg" : "btn btn--primary";
    if (s === 3) summary();
    if (scroll) $(".steps")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };
  cand.addEventListener("click", (e) => { const b = e.target.closest("[data-goto]"); if (b) go(+b.dataset.goto); });
  back.addEventListener("click", () => go(cur - 1));
  cand.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate(cur)) return;
    if (cur < 3) return go(cur + 1);
    // Numéro de candidature
    const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", r = crypto.getRandomValues(new Uint8Array(6));
    const num = `CIPESG-${String(new Date().getFullYear()).slice(2)}-${[...r].map((b) => A[b % A.length]).join("")}`;
    const docs = DOCS.filter(([k]) => (files[k] || []).length).map(([k, l]) => `• ${l} : ${files[k].map((f) => f.name).join(", ")}`).join("\n");
    const msg = `CANDIDATURE ${num}\n\nNom : ${val("prenom")} ${val("nom")}\nTéléphone : ${val("telephone")}\nE-mail : ${val("email") || "—"}\nDate de naissance : ${new Date(val("date_naissance")).toLocaleDateString("fr-FR")}\nNationalité : ${val("nationalite")}\n\nNiveau : ${label(niv)}\nFilière : ${label(fil)}\nAnnée académique : ${SITE.annee}${val("offre") ? "\nOffre demandée : " + label(cand.elements.offre) : ""}\n\nDocuments préparés :\n${docs}\n\n(J'envoie mes documents dans cette conversation.)`;
    $("#c-num").textContent = num;
    $("#c-wa").href = wa(msg);
    $("#c-mail").href = `mailto:${SITE.email}?subject=${encodeURIComponent("Candidature " + num)}&body=${encodeURIComponent(msg + "\n\n(Documents en pièces jointes.)")}`;
    cand.hidden = true; $(".steps").hidden = true; mob.hidden = true;
    $("#c-done").hidden = false;
    $("#c-done").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    open(wa(msg), "_blank", "noopener");
  });
  go(0, false);
}
