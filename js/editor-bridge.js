/* =========================================================
   Farafinatignɛ — pont d'édition en direct
   ---------------------------------------------------------
   Chargé sur TOUTES les pages, mais il ne fait rien tant que
   les trois conditions ne sont pas réunies :
     1. l'URL porte ?edit=1
     2. la page est affichée dans un cadre (iframe)
     3. le cadre parent est bien le back-office autorisé

   Ce fichier n'écrit JAMAIS dans la base et ne détient aucune
   clé. Il se contente de deux choses :
     - signaler au back-office l'élément cliqué ;
     - appliquer un aperçu que le back-office lui renvoie.
   L'enregistrement est fait par le back-office, avec la
   session de l'administrateur connecté. C'est ce qui permet
   de laisser ce script en place sur le site public sans
   ouvrir la moindre porte.
   ========================================================= */
(function () {
  "use strict";

  /* Origines autorisées à piloter l'édition. */
  var ALLOWED = [
    "https://office.farafinatigne.com",
    "http://127.0.0.1:3100"
  ];

  var params = new URLSearchParams(location.search);
  if (params.get("edit") !== "1") return;
  if (window.parent === window) return;            // pas dans un cadre

  /* Qui nous encadre ?
     Surtout PAS document.referrer : au premier chargement il désigne
     bien l'office, mais après un location.reload() — celui que l'office
     déclenche à chaque enregistrement — il désigne la page elle-même.
     Le pont se croyait alors encadré par un inconnu et se coupait : plus
     rien n'était cliquable tant qu'on ne rechargeait pas l'office.
     ancestorOrigins, lui, dit toujours la vérité. */
  function origineParente() {
    try {
      var a = location.ancestorOrigins;
      if (a && a.length) return a[0];
    } catch (e) { /* pas supporté : on retombe sur le referrer */ }
    try {
      return document.referrer ? new URL(document.referrer).origin : null;
    } catch (e) { return null; }
  }

  var parentOrigin = origineParente();

  if (parentOrigin && ALLOWED.indexOf(parentOrigin) !== -1) {
    demarrer(parentOrigin);
  } else {
    /* Filet pour les navigateurs sans ancestorOrigins : on reste muet
       jusqu'à ce que l'office se manifeste. L'origine d'un message reçu
       est donnée par le navigateur, elle ne se falsifie pas. */
    window.addEventListener("message", function armer(e) {
      if (ALLOWED.indexOf(e.origin) === -1) return;
      if (!e.data || e.data.source !== "farafina-office") return;
      window.removeEventListener("message", armer);
      demarrer(e.origin);
    });
  }

  function demarrer(parentOrigin) {

  /* ---------- styles du mode édition ---------- */
  var css = document.createElement("style");
  css.textContent = [
    ".ft-edit [data-ft-edit]{outline:1px dashed rgba(179,84,30,.55);outline-offset:3px;cursor:pointer;transition:outline-color .15s,background-color .15s}",
    ".ft-edit [data-ft-edit]:hover{outline:2px solid #B3541E;background:rgba(204,141,61,.12)}",
    ".ft-edit [data-ft-edit].ft-active{outline:2px solid #1C0D0B;background:rgba(204,141,61,.2)}",
    ".ft-edit img[data-ft-edit]:hover{filter:brightness(.9)}",
    ".ft-badge{position:fixed;left:12px;bottom:12px;z-index:99999;background:#1C0D0B;color:#F8F7EE;",
    "font:700 11px/1 Manrope,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;",
    "padding:10px 14px;border-radius:999px;pointer-events:none}"
  ].join("");
  document.head.appendChild(css);
  document.documentElement.classList.add("ft-edit");

  var badge = document.createElement("div");
  badge.className = "ft-badge";
  badge.textContent = "Mode édition";
  document.body.appendChild(badge);

  var send = function (msg) { window.parent.postMessage(msg, parentOrigin); };

  /* ---------- repérage des éléments modifiables ----------
     Deux familles :
       · texte  : tout élément portant déjà data-i18n
       · produit: les champs d'une carte, repérés par sa référence  */
  function mark() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.hasAttribute("data-ft-edit")) return;
      el.setAttribute("data-ft-edit", "content");
      el.setAttribute("data-ft-key", el.getAttribute("data-i18n"));
    });

    document.querySelectorAll(".card[data-id]").forEach(function (card) {
      var id = card.getAttribute("data-id");
      var fields = {
        ".card__name": "name",
        ".card__desc": "desc",
        ".price": "price",
        ".card__media img": "image"
      };
      Object.keys(fields).forEach(function (sel) {
        var el = card.querySelector(sel);
        if (!el || el.hasAttribute("data-ft-edit")) return;
        el.setAttribute("data-ft-edit", "product");
        el.setAttribute("data-ft-key", id);
        el.setAttribute("data-ft-field", fields[sel]);
      });
    });

    document.querySelectorAll(".hero__arch img, .range__arch img, .about__media img, .craft__media img, .lookbook__strip img")
      .forEach(function (el) {
        if (el.hasAttribute("data-ft-edit")) return;
        el.setAttribute("data-ft-edit", "media");
        el.setAttribute("data-ft-key", (el.getAttribute("src") || "").split("/").pop());
      });
  }

  mark();
  /* les grilles sont rendues par JS : on repasse après chaque rendu */
  new MutationObserver(function () { mark(); })
    .observe(document.body, { childList: true, subtree: true });

  /* ---------- sélection ---------- */
  var active = null;
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-ft-edit]");
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    if (active) active.classList.remove("ft-active");
    active = el;
    el.classList.add("ft-active");

    var kind = el.getAttribute("data-ft-edit");
    var payload = {
      source: "farafina-site",
      type: "select",
      kind: kind,
      key: el.getAttribute("data-ft-key"),
      field: el.getAttribute("data-ft-field") || null,
      lang: document.documentElement.lang || "fr",
      value: kind === "media" || el.tagName === "IMG"
        ? el.getAttribute("src")
        : el.innerHTML.trim()
    };
    send(payload);
  }, true);

  /* la navigation reste possible, mais jamais par accident */
  document.addEventListener("submit", function (e) { e.preventDefault(); }, true);

  /* ---------- aperçu renvoyé par le back-office ---------- */
  window.addEventListener("message", function (e) {
    if (e.origin !== parentOrigin) return;
    var m = e.data;
    if (!m || m.source !== "farafina-office") return;

    if (m.type === "preview") {
      if (m.kind === "content") {
        document.querySelectorAll('[data-i18n="' + m.key + '"]').forEach(function (el) {
          var attr = el.getAttribute("data-i18n-attr");
          if (attr) el.setAttribute(attr, String(m.value).replace(/<[^>]+>/g, " "));
          else el.innerHTML = m.value;
        });
      } else if (m.kind === "product") {
        document.querySelectorAll('.card[data-id="' + m.key + '"]').forEach(function (card) {
          var sel = { name: ".card__name", desc: ".card__desc",
                      price: ".price", image: ".card__media img" }[m.field];
          var el = sel && card.querySelector(sel);
          if (!el) return;
          if (m.field === "image") el.src = m.value;
          else el.innerHTML = m.value;
        });
      } else if (m.kind === "media") {
        document.querySelectorAll('img[data-ft-key="' + m.key + '"]').forEach(function (el) {
          el.src = m.value;
        });
      }
    }

    if (m.type === "scrollTo") {
      var t = document.querySelector('[data-ft-key="' + m.key + '"]');
      if (t) t.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (m.type === "reload") location.reload();
  });

  /* ---------- inventaire envoyé à l'ouverture ---------- */
  function announce() {
    var contents = [];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (contents.indexOf(k) === -1) contents.push(k);
    });
    send({
      source: "farafina-site",
      type: "ready",
      page: location.pathname.split("/").pop() || "index.html",
      lang: document.documentElement.lang || "fr",
      contents: contents,
      products: Array.from(document.querySelectorAll(".card[data-id]"))
        .map(function (c) { return c.getAttribute("data-id"); })
    });
  }
  if (document.readyState === "complete") announce();
  else window.addEventListener("load", announce);

  }
})();
