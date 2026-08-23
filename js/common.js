/* =========================================================
   Farafinatignɛ — code partagé par toutes les pages
   Chargé après products.js et i18n.js, avant cart.js.
   ========================================================= */

/* ---------- coordonnées (source unique) ---------- */
const WHATSAPP_NUMBER = "22365450202";          // +223 65 45 02 02 — numéro unique
const EMAIL = "farafinatigne@gmail.com";
const CATALOGUE_PDF = "assets/catalogue/catalogue-farafinatigne.pdf";

/* Adresse publique du site. Sert à construire les URL d'images envoyées dans
   les demandes de devis : WhatsApp et les messageries n'affichent un aperçu
   que sur une URL absolue. À changer si le nom de domaine change. */
const SITE_URL = "https://farafinatigne.com/";
/* Les photos sont servies en WebP. On coupe l'extension eventuellement
   enregistree en base (« ...jpg ») avant d'ajouter la bonne : une fiche
   creee avant la bascule continue de s'afficher. */
const baseImage = v => String(v || "").replace(/\.(jpe?g|png|webp)$/i, "");
/* Les fiches produit sont rangees par gamme : assets/produits/<gamme>/
   <sous-gamme>/<fichier>.webp. La base peut enregistrer soit le chemin
   complet depuis assets/, soit le seul nom de fichier — les deux marchent. */
const cheminProduit = p => {
  const v = baseImage(p.img);
  return (v.indexOf("/") !== -1 ? v : "produits/" + p.cat + "/" + p.sub + "/" + v) + ".webp";
};
const productImageUrl = p => (p.img && p.img.indexOf("://") !== -1)
  ? p.img
  : SITE_URL + "assets/" + cheminProduit(p);

/* Endpoint de collecte des prospects (Formspree, Getform, Basin…).
   Laisser vide : le formulaire bascule alors sur un envoi par e-mail. */
const LEAD_ENDPOINT = "";

/* ---------- helpers ---------- */
const $ = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

const euro = n => {
  const s = Number(n).toFixed(2).replace(/\.00$/, "").replace(".", ",");
  return s + " €";
};

const waLink = txt => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(txt);
const mailLink = (subject, body) =>
  "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

/* URL d'une photo produit : nom de fichier local, ou adresse absolue
   quand l'image a été remplacée depuis le back-office. */
const imgUrl = p => (p.img && p.img.indexOf("://") !== -1)
  ? p.img
  : "assets/" + cheminProduit(p);

const productById = id => PRODUCTS.find(p => p.id === id);
const catById = id => CATEGORIES.find(c => c.id === id);
const subById = (cat, sub) => {
  const c = catById(cat);
  return c && c.subs.find(s => s.id === sub);
};
const label = obj => (obj ? obj[LANG] || obj.fr : "");

/* ---------- promotions ----------
   Une remise en pourcentage posee par le back-office sur les references
   choisies. Elle s'arrete d'elle-meme a la date de fin : passe ce jour,
   le site reaffiche le prix plein sans qu'on ait rien a faire. */
function promoActive(p) {
  if (!p || !p.discount) return false;
  if (p.price == null) return false;
  if (!p.discountUntil) return true;
  return new Date(p.discountUntil + "T23:59:59") >= new Date();
}
/* prix reellement paye */
function netPrice(p) {
  if (!p || p.price == null) return null;
  if (!promoActive(p)) return p.price;
  return Math.round(p.price * (1 - p.discount / 100) * 100) / 100;
}

/* prix affiche d'un produit */
function priceLabel(p) {
  if (p.price == null) return '<span class="price price--quote">' + t("p.quote") + "</span>";
  const from = p.from ? '<i class="price__from">' + t("p.from") + "</i> " : "";
  let unit = "";
  if (p.unit === "pair") unit = t("p.unit.pair");
  else if (p.unit === "piece") unit = t("p.unit.piece");
  else if (p.setQty) unit = (LANG === "fr" ? "le lot de " : "set of ") + p.setQty;
  else unit = t("p.unit.lot");

  if (promoActive(p)) {
    return '<span class="price price--promo">' + from +
      '<s class="price__was">' + euro(p.price) + "</s>" +
      '<b class="price__now">' + euro(netPrice(p)) + "</b>" +
      '<i class="price__off">−' + p.discount + " %</i>" +
      '<i class="price__unit">' + unit + "</i></span>";
  }
  return '<span class="price">' + from + euro(p.price) +
    '<i class="price__unit">' + unit + "</i></span>";
}

/* ---------- assortiment : carrousel de motifs ----------
   Une reference vendue en lot n'a pas un modele mais une collection.
   La carte garde exactement la taille des autres : c'est la meme fenetre
   4/5, on y fait defiler les motifs au lieu d'en figer un seul. */
function galerieUrls(p) {
  return p.gallery.map(function (nom) {
    return String(nom).indexOf("://") !== -1
      ? nom
      : "assets/" + cheminProduit({ img: nom, cat: p.cat, sub: p.sub });
  });
}

function carouselHTML(p, coiffe) {
  const urls = galerieUrls(p);
  return '<div class="card__media card__media--carousel" data-carousel>' +
    '<div class="card__track">' +
      urls.map(function (u, i) {
        return '<img src="' + u + '" alt="' + p[LANG].name + ' — ' + (i + 1) +
          '" loading="' + (i ? "lazy" : "eager") + '" width="800" height="1000">';
      }).join("") +
    "</div>" +
    coiffe +
    '<span class="card__count"><b>1</b>/' + urls.length + "</span>" +
    '<button class="card__zoom" data-zoom="' + urls[0] + '" aria-label="' + t("p.zoom") + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.7" y2="16.7"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' +
    "</button>" +
    "</div>";
}

/* La bande de vignettes sert de navigation : un clic ouvre le motif
   dans le carrousel au-dessus, il ne quitte pas la carte. */
function motifsHTML(p) {
  const urls = galerieUrls(p);
  return '<div class="card__motifs">' +
    '<span class="card__motifs-t">' + t("p.motifs") + " · " + urls.length + "</span>" +
    '<div class="card__motifs-strip">' +
      urls.map(function (u, i) {
        return '<button class="card__motif' + (i ? "" : " is-on") + '" data-goto="' + i +
          '" aria-label="' + (i + 1) + '"><img src="' + u +
          '" alt="" loading="lazy" width="120" height="150"></button>';
      }).join("") +
    "</div></div>";
}

/* ---------- carte produit ---------- */
function cardHTML(p) {
  const cat = catById(p.cat), sub = subById(p.cat, p.sub);
  const promo = promoActive(p)
    ? '<span class="card__tag card__tag--promo">−' + p.discount + " %</span>"
    : "";
  const tag = promo ? "" : p.tag
    ? '<span class="card__tag card__tag--' + p.tag + '">' +
      ({
        signature: LANG === "fr" ? "Signature" : "Signature",
        best: LANG === "fr" ? "Best-seller" : "Best-seller",
        gros: LANG === "fr" ? "Lot export" : "Export lot",
        "piece-speciale": LANG === "fr" ? "Pièce spéciale" : "Special piece",
        nouveau: LANG === "fr" ? "Nouveauté" : "New"
      }[p.tag] || "") + "</span>"
    : "";

  const coiffe = promo + tag;
  const mediaHTML = p.gallery && p.gallery.length
    ? carouselHTML(p, coiffe)
    : `<div class="card__media">
      <img src="${imgUrl(p)}" alt="${p[LANG].name}" loading="lazy" width="800" height="800">
      ${coiffe}
      <button class="card__zoom" data-zoom="${imgUrl(p)}" aria-label="${t("p.zoom")}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.7" y2="16.7"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </button>
    </div>`;

  return `
  <article class="card reveal" data-id="${p.id}">
    ${mediaHTML}
    <div class="card__body">
      <span class="card__cat">${label(sub) || label(cat)}</span>
      <h3 class="card__name">${p[LANG].name}</h3>
      <p class="card__desc">${p[LANG].desc}</p>
      ${p.sizes ? '<p class="card__sizes"><span>' + t("p.sizes") + '</span>' + p.sizes + "</p>" : ""}
      ${p.gallery && p.gallery.length ? motifsHTML(p) : ""}
      <div class="card__foot">
        ${priceLabel(p)}
        <span class="card__ref">${t("p.ref")} ${p.ref}</span>
      </div>
      <div class="card__actions">
        <button class="card__add" data-add="${p.id}">${t("p.add")}</button>
      </div>
    </div>
  </article>`;
}

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  $("#toast-msg").textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- reveal au scroll ---------- */
function initReveal(root) {
  const els = $$(".reveal:not(.is-in)", root);
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  els.forEach(e => io.observe(e));
}

/* Filet de sécurité : si l'observateur rate un élément (scroll très rapide,
   restauration de position…), on révèle tout ce qui est entré dans la fenêtre.
   Un contenu ne doit jamais rester invisible. */
let revealTimer;
window.addEventListener("scroll", () => {
  clearTimeout(revealTimer);
  revealTimer = setTimeout(() => {
    $$(".reveal:not(.is-in)").forEach(e => {
      if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add("is-in");
    });
  }, 400);
}, { passive: true });

/* ---------- lightbox ---------- */
function openLightbox(src, alt) {
  const lb = $("#lightbox");
  if (!lb) return;
  $("#lightbox-img").src = src;
  $("#lightbox-img").alt = alt || "";
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  const lb = $("#lightbox");
  if (!lb) return;
  lb.classList.remove("open");
  if (!$("#cart") || !$("#cart").classList.contains("open")) document.body.style.overflow = "";
}

/* ---------- navigation ---------- */
/* marque le lien de la page courante (le bloc nav est identique sur les 4 pages) */
function markCurrentNav() {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav__links a, .nav-mobile__links a").forEach(a => a.classList.remove("is-current"));
  if (file.startsWith("boutique")) {
    const btn = $(".nav__drop-btn");
    if (btn) btn.classList.add("is-current");
    const m = $('.nav-mobile__links a[href^="boutique"]');
    if (m) m.classList.add("is-current");
    return;
  }
  const target = file === "" ? "index.html" : file;
  $$('.nav__links a, .nav-mobile__links a').forEach(a => {
    if ((a.getAttribute("href") || "").toLowerCase().split("?")[0] === target) a.classList.add("is-current");
  });
}

function initNav() {
  markCurrentNav();
  const nav = $("#nav");
  const burger = $("#burger");
  const mobile = $("#nav-mobile");

  /* --- escamotage de la barre ---------------------------------------
     On descend : la barre s'efface et rend la photo du hero entiere.
     On remonte, ou on s'arrete cinq secondes : elle revient.
     Elle reste toujours visible en haut de page, menu ouvert, ou panier
     ouvert — sinon on masquerait une commande dont l'internaute se sert. */
  const topbar = $(".topbar");
  const DEPART = 220;   // hauteur en deca de laquelle on ne masque jamais
  const SEUIL = 8;      // en pixels, pour ignorer les micro-mouvements
  const REPOS = 5000;   // reapparition apres cinq secondes d'immobilite
  let dernierY = window.scrollY;
  let minuteurRepos;

  const montreBarre = () => {
    if (nav) nav.classList.remove("is-hidden");
    if (topbar) topbar.classList.remove("is-hidden");
  };
  const cacheBarre = () => {
    if (document.body.style.overflow === "hidden") return;   // menu ou panier ouvert
    if (nav && nav.querySelector(".nav__drop.open")) return;
    if (nav) nav.classList.add("is-hidden");
    if (topbar) topbar.classList.add("is-hidden");
  };

  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);

    const y = window.scrollY;
    const ecart = y - dernierY;
    if (y <= DEPART) montreBarre();
    else if (ecart > SEUIL) cacheBarre();
    else if (ecart < -SEUIL) montreBarre();
    if (Math.abs(ecart) > SEUIL) dernierY = y;
    clearTimeout(minuteurRepos);
    minuteurRepos = setTimeout(montreBarre, REPOS);

    const toTop = $("#to-top");
    if (toTop) toTop.classList.toggle("show", window.scrollY > 700);
    const wa = $(".whatsapp-float");
    if (wa) {
      const hero = $(".hero");
      const limit = hero ? hero.offsetHeight - 120 : 420;
      wa.classList.toggle("show", window.scrollY > limit);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", e => { if (e.key === "Tab") montreBarre(); });
  onScroll();

  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      burger.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", mobile).forEach(a => a.addEventListener("click", () => {
      mobile.classList.remove("open");
      burger.classList.remove("open");
      document.body.style.overflow = "";
    }));
  }

  /* sous-menu boutique au clavier / tactile */
  $$(".nav__drop").forEach(drop => {
    const btn = $(".nav__drop-btn", drop);
    if (!btn) return;
    btn.addEventListener("click", e => {
      if (window.matchMedia("(hover: hover)").matches) return; // desktop : le lien suit
      // sans survol : la premiere tape deploie le sous-menu, la seconde
      // laisse le lien mener a la boutique.
      if (drop.classList.contains("open")) return;
      e.preventDefault();
      drop.classList.add("open");
      montreBarre();
    });
  });

  const toTop = $("#to-top");
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- spotlight du hero ---------- */
function initSpotlight() {
  const hero = $(".hero");
  const spot = $(".hero__spotlight");
  if (!hero || !spot || !window.matchMedia("(hover: hover)").matches) return;
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    spot.style.setProperty("--x", (e.clientX - r.left) + "px");
    spot.style.setProperty("--y", (e.clientY - r.top) + "px");
  });
}

/* ---------- boutons magnétiques ---------- */
function initMagnetic() {
  if (!window.matchMedia("(hover: hover)").matches) return;
  $$(".whatsapp-float, .to-top, .cta-pill__orb").forEach(el => {
    const parent = el.closest(".cta-pill") || el;
    parent.addEventListener("pointermove", e => {
      const r = parent.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.22;
      el.style.transform = "translate(" + x + "px," + y + "px)";
    });
    parent.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });
}

/* ---------- accès au catalogue PDF (capture de prospect) ---------- */
const LEADS_KEY = "ft-leads";

function openPdfGate() {
  const m = $("#pdf-modal");
  if (!m) { window.open(CATALOGUE_PDF, "_blank"); return; }
  m.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => { const f = $("#pdf-name"); if (f) f.focus(); }, 260);
}
function closePdfGate() {
  const m = $("#pdf-modal");
  if (!m) return;
  m.classList.remove("open");
  document.body.style.overflow = "";
}

function initPdfGate() {
  const form = $("#pdf-form");
  $$("[data-pdf]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); openPdfGate(); }));
  if (!form) return;
  $$("[data-pdf-close]").forEach(b => b.addEventListener("click", closePdfGate));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#pdf-name").value.trim();
    const email = $("#pdf-email").value.trim();
    const company = $("#pdf-company").value.trim();
    const country = $("#pdf-country").value.trim();
    const msg = $("#pdf-msg");
    if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      msg.textContent = t("pdf.form.err");
      msg.className = "form__msg form__msg--err";
      return;
    }
    const lead = { name, email, company, country, date: new Date().toISOString(), lang: LANG };

    /* 1. conservation locale (récupérable par l'exploitant) */
    try {
      const all = JSON.parse(localStorage.getItem(LEADS_KEY) || "[]");
      all.push(lead);
      localStorage.setItem(LEADS_KEY, JSON.stringify(all));
    } catch (_) { /* stockage indisponible */ }

    /* 2. transmission : endpoint si configuré, sinon e-mail */
    if (LEAD_ENDPOINT) {
      fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(lead)
      }).catch(() => {});
    } else {
      const body = "Nouveau téléchargement du catalogue grossiste\n\n" +
        "Nom : " + name + "\nSociété : " + (company || "—") +
        "\nE-mail : " + email + "\nPays : " + (country || "—") +
        "\nLangue : " + LANG + "\nDate : " + new Date().toLocaleString();
      window.open(mailLink("Catalogue grossiste — " + name, body), "_blank");
    }

    msg.textContent = t("pdf.form.ok");
    msg.className = "form__msg form__msg--ok";
    const a = document.createElement("a");
    a.href = CATALOGUE_PDF;
    a.download = "catalogue-farafinatigne.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(closePdfGate, 1600);
  });
}

/* ---------- theme clair / sombre ----------
   Le theme est deja pose sur <html> par le script du <head>, avant
   le premier rendu. Ici on ne fait que l'inverser et le retenir.
   Tant que l'internaute n'a pas choisi, on suit son systeme. */
const THEME_KEY = "ft-theme";

function themeCourant() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function poserTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  /* la barre du navigateur suit, sur Android comme sur iOS */
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", t === "dark" ? "#1C0D0B" : "#F8F7EE");
  try { localStorage.setItem(THEME_KEY, t); } catch (_) {}
  document.dispatchEvent(new CustomEvent("themechange", { detail: t }));
}

function initTheme() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeCourant() === "dark" ? "#1C0D0B" : "#F8F7EE");

  /* Choix systeme suivi tant que l'internaute n'a rien decide lui-meme. */
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const suivre = e => {
    let choisi = null;
    try { choisi = localStorage.getItem(THEME_KEY); } catch (_) {}
    if (choisi !== "dark" && choisi !== "light") {
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    }
  };
  if (mq.addEventListener) mq.addEventListener("change", suivre);
}

/* ---------- sélecteur de langue ---------- */
function initLangSwitch() {
  $$("[data-lang-btn]").forEach(b => {
    b.addEventListener("click", () => setLang(b.getAttribute("data-lang-btn")));
  });
}

/* ---------- carrousel d'assortiment ----------
   Aucune bibliotheque : une piste que l'on decale, un compteur, et la
   vignette active. Le bouton de zoom suit le motif affiche. */
function allerAuMotif(carousel, index) {
  const piste = carousel.querySelector(".card__track");
  if (!piste) return;
  const vues = piste.children.length;
  const i = (index % vues + vues) % vues;
  piste.style.transform = "translateX(" + (-i * 100) + "%)";
  carousel.setAttribute("data-index", i);

  const compteur = carousel.querySelector(".card__count b");
  if (compteur) compteur.textContent = i + 1;

  const zoom = carousel.querySelector(".card__zoom");
  const img = piste.children[i];
  if (zoom && img) zoom.setAttribute("data-zoom", img.getAttribute("src"));

  const carte = carousel.closest(".card");
  if (carte) {
    carte.querySelectorAll(".card__motif").forEach(function (b, j) {
      b.classList.toggle("is-on", j === i);
    });
    const bande = carte.querySelector(".card__motifs-strip");
    const actif = carte.querySelectorAll(".card__motif")[i];
    if (bande && actif) {
      const dx = actif.offsetLeft - bande.clientWidth / 2 + actif.clientWidth / 2;
      bande.scrollTo({ left: dx, behavior: "smooth" });
    }
  }
}

function motifCourant(carousel) {
  return Number(carousel.getAttribute("data-index") || 0);
}

/* glisser du doigt, sur mobile */
document.addEventListener("touchstart", function (e) {
  const c = e.target.closest("[data-carousel]");
  if (c) c._x0 = e.touches[0].clientX;
}, { passive: true });
document.addEventListener("touchend", function (e) {
  const c = e.target.closest("[data-carousel]");
  if (!c || c._x0 == null) return;
  const dx = e.changedTouches[0].clientX - c._x0;
  c._x0 = null;
  if (Math.abs(dx) > 40) allerAuMotif(c, motifCourant(c) + (dx < 0 ? 1 : -1));
}, { passive: true });

/* ---------- délégation globale ---------- */
document.addEventListener("click", e => {
  const theme = e.target.closest("[data-theme-btn]");
  if (theme) { poserTheme(themeCourant() === "dark" ? "light" : "dark"); return; }

  const vignette = e.target.closest("[data-goto]");
  if (vignette) {
    const carte = vignette.closest(".card");
    const c = carte && carte.querySelector("[data-carousel]");
    if (c) allerAuMotif(c, Number(vignette.getAttribute("data-goto")));
    return;
  }

  const zoom = e.target.closest("[data-zoom]");
  if (zoom) { openLightbox(zoom.getAttribute("data-zoom")); return; }
  if (e.target.closest("#lightbox-close") || e.target.id === "lightbox") { closeLightbox(); return; }

  const add = e.target.closest("[data-add]");
  if (add) { addToCart(add.getAttribute("data-add")); return; }
  const inc = e.target.closest("[data-inc]");
  if (inc) { changeQty(inc.getAttribute("data-inc"), 1); return; }
  const dec = e.target.closest("[data-dec]");
  if (dec) { changeQty(dec.getAttribute("data-dec"), -1); return; }
  const rm = e.target.closest("[data-remove]");
  if (rm) { removeFromCart(rm.getAttribute("data-remove")); return; }
});

document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  closeLightbox();
  closePdfGate();
  if (typeof closeCart === "function") closeCart();
  const mobile = $("#nav-mobile");
  if (mobile && mobile.classList.contains("open")) {
    mobile.classList.remove("open");
    $("#burger").classList.remove("open");
    document.body.style.overflow = "";
  }
});

/* ---------- démarrage ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
  initNav();
  initReveal();
  initSpotlight();
  initMagnetic();
  initPdfGate();
  initLangSwitch();
  initTheme();
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
});
