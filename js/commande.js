/* =========================================================
   Farafinatignɛ — dépôt d'une demande de devis
   ---------------------------------------------------------
   Avant, la sélection partait sur WhatsApp sans laisser de
   trace : si l'acheteur n'écrivait jamais, personne ne savait
   qu'il était passé. Un court formulaire recueille de quoi le
   rappeler, la demande est enregistrée, PUIS WhatsApp s'ouvre
   avec le récapitulatif et le numéro de commande.

   L'enregistrement passe par une fonction de la base qui ne
   sait faire que cela — le site n'a aucun droit d'écriture sur
   les commandes existantes. Les prix sont relus du catalogue,
   jamais repris du navigateur.

   Si la base est injoignable, on n'empêche pas la vente : le
   message part quand même, sans numéro.
   ========================================================= */
(function () {
  "use strict";

  var MEMOIRE = "ft-client";

  function retenu() {
    try { return JSON.parse(localStorage.getItem(MEMOIRE) || "{}"); }
    catch (_) { return {}; }
  }
  function retenir(c) {
    try { localStorage.setItem(MEMOIRE, JSON.stringify(c)); } catch (_) {}
  }

  var champs = [
    { cle: "prenom",  label: "Prénom",            en: "First name",       type: "text",  auto: "given-name" },
    { cle: "nom",     label: "Nom",               en: "Last name",        type: "text",  auto: "family-name", requis: true },
    { cle: "tel",     label: "Téléphone",         en: "Phone",            type: "tel",   auto: "tel" },
    { cle: "email",   label: "Adresse e-mail",    en: "Email address",    type: "email", auto: "email" },
    { cle: "societe", label: "Société",           en: "Company",          type: "text",  auto: "organization" },
    { cle: "pays",    label: "Pays de livraison", en: "Delivery country", type: "text",  auto: "country-name" },
    { cle: "adresse", label: "Adresse",           en: "Address",          type: "text",  auto: "street-address", large: true }
  ];

  var fr = function () { return (typeof LANG === "undefined" ? "fr" : LANG) === "fr"; };

  function bati() {
    var d = retenu();
    var lignes = champs.map(function (c) {
      var etiquette = (fr() ? c.label : c.en) + (c.requis ? " *" : "");
      return '<div class="cf__champ' + (c.large ? " cf__champ--large" : "") + '">' +
        '<label for="cf-' + c.cle + '">' + etiquette + "</label>" +
        '<input id="cf-' + c.cle + '" name="' + c.cle + '" type="' + c.type +
        '" autocomplete="' + c.auto + '" value="' + (d[c.cle] || "").replace(/"/g, "&quot;") + '">' +
      "</div>";
    }).join("");

    var html =
      '<div class="cf" id="cf" role="dialog" aria-modal="true" aria-labelledby="cf-titre">' +
        '<div class="cf__boite">' +
          '<button class="cf__fermer" id="cf-fermer" aria-label="' + (fr() ? "Fermer" : "Close") + '">&times;</button>' +
          '<span class="cf__eyebrow">' + (fr() ? "Demande de devis" : "Quote request") + "</span>" +
          '<h3 id="cf-titre">' + (fr() ? "Vos coordonnées" : "Your details") + "</h3>" +
          '<p class="cf__lead">' +
            (fr()
              ? "Pour que nous puissions vous répondre et chiffrer le transport. Un téléphone ou un e-mail suffit."
              : "So we can reply and quote shipping. A phone number or an email is enough.") +
          "</p>" +
          '<form id="cf-form" novalidate><div class="cf__grille">' + lignes + "</div>" +
            '<p class="cf__erreur" id="cf-erreur" role="alert"></p>' +
            '<button type="submit" class="btn btn--gold btn--full" id="cf-envoyer">' +
              (fr() ? "Continuer" : "Continue") +
            "</button>" +
          "</form>" +
        "</div>" +
      "</div>";

    var hote = document.createElement("div");
    hote.innerHTML = html;
    document.body.appendChild(hote.firstChild);
    return document.getElementById("cf");
  }

  function fermer() {
    var b = document.getElementById("cf");
    if (b) b.remove();
    document.body.style.overflow = "";
  }

  /** Enregistre la demande. Renvoie le numéro, ou null si la base est muette. */
  function deposer(client) {
    if (!window.FT_API || !CART.length) return Promise.resolve(null);
    var articles = CART.map(function (l) { return { slug: l.id, qty: l.qty }; });

    return fetch(window.FT_API.url + "/rest/v1/rpc/deposer_commande", {
      method: "POST",
      headers: Object.assign({ "Content-Type": "application/json" }, window.FT_API.headers),
      body: JSON.stringify({
        p_nom: client.nom, p_prenom: client.prenom, p_adresse: client.adresse,
        p_tel: client.tel, p_email: client.email, p_pays: client.pays,
        p_societe: client.societe, p_langue: typeof LANG === "undefined" ? "fr" : LANG,
        p_message: "", p_articles: articles
      })
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  /** Ouvre le formulaire, puis le canal choisi. */
  function demander(canal) {
    if (!CART.length) return;
    var boite = bati();
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      requestAnimationFrame(function () { boite.classList.add("open"); });
      var p = document.getElementById("cf-prenom");
      if (p) p.focus();
    }, 10);

    document.getElementById("cf-fermer").addEventListener("click", fermer);
    boite.addEventListener("mousedown", function (e) { if (e.target === boite) fermer(); });

    document.getElementById("cf-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var client = {};
      champs.forEach(function (c) {
        client[c.cle] = (document.getElementById("cf-" + c.cle).value || "").trim();
      });

      var err = document.getElementById("cf-erreur");
      if (client.nom.length < 2) {
        err.textContent = fr() ? "Merci d'indiquer votre nom." : "Please enter your name.";
        document.getElementById("cf-nom").focus();
        return;
      }
      if (!client.tel && !client.email) {
        err.textContent = fr()
          ? "Un téléphone ou une adresse e-mail est nécessaire."
          : "A phone number or an email address is required.";
        document.getElementById("cf-tel").focus();
        return;
      }
      if (client.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(client.email)) {
        err.textContent = fr() ? "Adresse e-mail illisible." : "That email address looks wrong.";
        document.getElementById("cf-email").focus();
        return;
      }
      err.textContent = "";
      retenir(client);

      var bouton = document.getElementById("cf-envoyer");
      bouton.disabled = true;
      bouton.textContent = fr() ? "Enregistrement…" : "Saving…";

      deposer(client).then(function (res) {
        fermer();
        var entete = "";
        if (res && res.numero) {
          entete = (fr() ? "Commande n° " : "Order no. ") + res.numero + "\n\n";
          if (typeof toast === "function") {
            toast(fr()
              ? "Demande enregistrée sous le n° " + res.numero
              : "Request saved as no. " + res.numero);
          }
        }
        var corps = entete + cartSummary() + coordonnees(client);
        if (canal === "email") {
          var sujet = fr()
            ? "Demande de devis de gros — " + cartCount() + " article(s)"
            : "Wholesale quote request — " + cartCount() + " item(s)";
          window.location.href = mailLink(sujet, corps);
        } else {
          window.open(waLink(corps), "_blank");
        }
      });
    });
  }

  /** Les coordonnées recopiées dans le message, pour le vendeur. */
  function coordonnees(c) {
    var l = [
      (fr() ? "Nom : " : "Name: ") + (c.prenom ? c.prenom + " " : "") + c.nom,
      c.societe ? (fr() ? "Société : " : "Company: ") + c.societe : null,
      c.tel ? (fr() ? "Téléphone : " : "Phone: ") + c.tel : null,
      c.email ? (fr() ? "E-mail : " : "Email: ") + c.email : null,
      c.pays ? (fr() ? "Pays : " : "Country: ") + c.pays : null,
      c.adresse ? (fr() ? "Adresse : " : "Address: ") + c.adresse : null
    ].filter(Boolean);
    return "\n\n" + l.join("\n");
  }

  /* On remplace les deux boutons du panier : ils passent maintenant par
     le formulaire. cart.js pose ses propres écouteurs au chargement, on
     neutralise les siens en clonant les boutons. */
  document.addEventListener("DOMContentLoaded", function () {
    [["cart-wa", "whatsapp"], ["cart-mail", "email"]].forEach(function (p) {
      var b = document.getElementById(p[0]);
      if (!b) return;
      var neuf = b.cloneNode(true);
      b.parentNode.replaceChild(neuf, b);
      neuf.addEventListener("click", function () { demander(p[1]); });
    });
  });

  window.demanderDevis = demander;
})();
