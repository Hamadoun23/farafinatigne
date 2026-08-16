/* =========================================================
   Farafinatignɛ — code partagé par toutes les pages
   Chargé après products.js et i18n.js, avant cart.js.
   ========================================================= */

/* ---------- coordonnées (source unique) ---------- */
const WHATSAPP_NUMBER = "22365450202";          // +223 65 45 02 02 — numéro unique
const EMAIL = "farafinatigne@gmail.com";
const CATALOGUE_PDF = "assets/catalogue-farafinatigne.pdf";

/* Adresse publique du site. Sert à construire les URL d'images envoyées dans
   les demandes de devis : WhatsApp et les messageries n'affichent un aperçu
   que sur une URL absolue. À changer si le nom de domaine change. */
const SITE_URL = "https://farafinatigne.com/";
const productImageUrl = p => SITE_URL + "assets/images/" + p.img + ".jpg";

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

const productById = id => PRODUCTS.find(p => p.id === id);
const catById = id => CATEGORIES.find(c => c.id === id);
const subById = (cat, sub) => {
  const c = catById(cat);
  return c && c.subs.find(s => s.id === sub);
};
const label = obj => (obj ? obj[LANG] || obj.fr : "");

/* prix affiché d'un produit */
function priceLabel(p) {
  if (p.price == null) return '<span class="price price--quote">' + t("p.quote") + "</span>";
  const from = p.from ? '<i class="price__from">' + t("p.from") + "</i> " : "";
  let unit = "";
  if (p.unit === "pair") unit = t("p.unit.pair");
  else if (p.unit === "piece") unit = t("p.unit.piece");
  else if (p.setQty) unit = (LANG === "fr" ? "le lot de " : "set of ") + p.setQty;
  else unit = t("p.unit.lot");
  return '<span class="price">' + from + euro(p.price) +
    '<i class="price__unit">' + unit + "</i></span>";
}

/* ---------- carte produit ---------- */
function cardHTML(p) {
  const cat = catById(p.cat), sub = subById(p.cat, p.sub);
  const tag = p.tag
    ? '<span class="card__tag card__tag--' + p.tag + '">' +
      ({
        signature: LANG === "fr" ? "Signature" : "Signature",
        best: LANG === "fr" ? "Best-seller" : "Best-seller",
        gros: LANG === "fr" ? "Lot export" : "Export lot",
        "piece-speciale": LANG === "fr" ? "Pièce spéciale" : "Special piece",
        nouveau: LANG === "fr" ? "Nouveauté" : "New"
      }[p.tag] || "") + "</span>"
    : "";
  return `
  <article class="card reveal" data-id="${p.id}">
    <div class="card__media">
      <img src="assets/images/${p.img}.jpg" alt="${p[LANG].name}" loading="lazy" width="800" height="800">
      ${tag}
      <button class="card__zoom" data-zoom="assets/images/${p.img}.jpg" aria-label="${t("p.zoom")}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.7" y2="16.7"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </button>
    </div>
    <div class="card__body">
      <span class="card__cat">${label(sub) || label(cat)}</span>
      <h3 class="card__name">${p[LANG].name}</h3>
      <p class="card__desc">${p[LANG].desc}</p>
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

  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
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
      if (window.matchMedia("(hover: hover)").matches) return; // desktop : survol
      e.preventDefault();
      drop.classList.toggle("open");
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

/* ---------- sélecteur de langue ---------- */
function initLangSwitch() {
  $$("[data-lang-btn]").forEach(b => {
    b.addEventListener("click", () => setLang(b.getAttribute("data-lang-btn")));
  });
}

/* ---------- délégation globale ---------- */
document.addEventListener("click", e => {
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
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
});
