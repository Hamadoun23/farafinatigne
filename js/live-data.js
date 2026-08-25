/* =========================================================
   Farafinatignɛ — données vivantes
   ---------------------------------------------------------
   Le site s'affiche d'abord avec les données embarquées
   (products.js / i18n.js) : premier rendu immédiat, lisible
   par les moteurs de recherche, et qui fonctionne même si la
   base est injoignable.

   Ensuite, et seulement ensuite, on interroge Supabase. Si des
   valeurs plus récentes existent — un prix modifié depuis le
   back-office, un texte réécrit — on les applique et on
   redessine. L'internaute ne voit jamais de page vide.

   Ce fichier n'utilise que la clé publique : la sécurité par
   ligne n'autorise que la lecture du catalogue publié.
   ========================================================= */
(function () {
  "use strict";

  var LOCAL = /^(127\.0\.0\.1|localhost|\[::1\])$/.test(location.hostname);

  /* En production l'API est servie sous le même domaine que le site
     (nginx la relaie sur /supabase) : aucune requête inter-origine. */
  var API = LOCAL ? "http://127.0.0.1:8100" : location.origin + "/supabase";

  /* Clés publiques, une par environnement. Sans danger : la sécurité par
     ligne n'autorise que la lecture du catalogue publié et des textes.
     Régénérées par tools/generate-env.py — les remplacer si la pile change. */
  var ANON = LOCAL
    ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzg2ODk2MzY0LCJleHAiOjIxMDIyNTYzNjR9.Xrks1vw2gKVjTyEdIA8M-D6OYt2xcQdVF8rdYEg_TVM"
    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzg2OTEwNTk0LCJleHAiOjIxMDIyNzA1OTR9.AtWePbKudaWAPA_Oqhkg5CuPLDLnaz6yqaoyuyNflsM";

  if (!ANON || ANON.indexOf("__") === 0) return;   // clé non injectée : on reste sur le statique

  var headers = { apikey: ANON, Authorization: "Bearer " + ANON };

  /* Le formulaire de commande a besoin des memes coordonnees : on les
     partage plutot que de les recopier dans un second fichier. */
  window.FT_API = { url: API, anon: ANON, headers: headers };

  function get(chemin) {
    return fetch(API + "/rest/v1/" + chemin, { headers: headers, cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error(chemin + " : " + r.status);
        return r.json();
      });
  }

  /* image : chemin absolu tel quel, sinon fichier local déjà déployé */
  function imageDe(p) {
    var v = p.image_path || "";
    if (!v) return null;
    if (v.indexOf("://") !== -1) return v;
    // chemin depuis assets/ (produits/<gamme>/<sous-gamme>/<nom>) ou simple
    // nom de fichier : imgUrl() sait traiter les deux.
    return v.replace(/\.(jpe?g|png|webp)$/i, "");
  }

  /* ---------- etat du site ----------
     Trois états, décidés depuis le back-office :
       ouvert  — rien ne change ;
       annonce — un bandeau prévient, la boutique reste ouverte ;
       ferme   — le site ne s'affiche plus du tout, seul le message reste.

     L'état connu est gardé en mémoire locale et appliqué AVANT même la
     réponse du serveur : sans cela, un visiteur verrait la boutique une
     demi-seconde avant qu'elle ne disparaisse. La réponse corrige
     ensuite, dans un sens comme dans l'autre. */
  var MEMOIRE_ETAT = "ft-etat";

  function appliquerEtat(r) {
    var etat = (r && r["site.etat"]) || "ouvert";
    var titre = (r && r["site.titre"]) || "";
    var texte = (r && r["site.message"]) || "";
    var reprise = (r && r["site.reprise"]) || "";
    var en = document.documentElement.lang === "en";

    /* on efface ce qui a pu être posé par la mémoire locale */
    var ancien = document.getElementById("ft-etat");
    if (ancien) ancien.remove();
    document.documentElement.classList.remove("ft-avis", "ft-ferme");

    if (etat === "ouvert") return;

    var quand = reprise
      ? (en ? "Back on " : "Réouverture le ") +
        new Date(reprise + "T00:00:00").toLocaleDateString(en ? "en-GB" : "fr-FR",
          { day: "numeric", month: "long", year: "numeric" })
      : "";

    var bloc = document.createElement("div");
    bloc.id = "ft-etat";

    if (etat === "ferme") {
      /* Page pleine : plus rien du site ne s'affiche. On garde de quoi
         nous joindre — le message invite à écrire, autant que ce soit
         possible d'un clic. */
      bloc.className = "ferme";
      bloc.innerHTML =
        '<div class="ferme__pattern bogolan" aria-hidden="true"></div>' +
        '<div class="ferme__inner">' +
          '<img class="ferme__mark" src="assets/marque/lockup-white.png" alt="Farafinatignɛ" width="300" height="120">' +
          (titre ? "<h1>" + titre + "</h1>" : "") +
          (texte ? "<p>" + texte + "</p>" : "") +
          (quand ? '<p class="ferme__quand">' + quand + "</p>" : "") +
          '<div class="ferme__liens">' +
            '<a class="btn btn--gold" href="https://wa.me/22365450202" target="_blank" rel="noopener">WhatsApp</a>' +
            '<a class="btn btn--line" href="mailto:farafinatigne@gmail.com">farafinatigne@gmail.com</a>' +
          "</div>" +
        "</div>";
      document.documentElement.classList.add("ft-ferme");
      document.body.appendChild(bloc);
      return;
    }

    bloc.className = "avis";
    bloc.setAttribute("role", "status");
    bloc.innerHTML =
      '<div class="wrap avis__inner">' +
        (titre ? "<b>" + titre + "</b>" : "") +
        (texte ? "<span>" + texte + "</span>" : "") +
        (quand ? "<i>" + quand + "</i>" : "") +
      "</div>";
    document.documentElement.classList.add("ft-avis");
    document.body.insertBefore(bloc, document.body.firstChild);
  }

  function etatDuSite(reglages) {
    var r = {};
    reglages.forEach(function (x) { r[x.key] = x.value; });
    try { localStorage.setItem(MEMOIRE_ETAT, JSON.stringify(r)); } catch (_) {}
    appliquerEtat(r);
  }

  /* l'état de la dernière visite, le temps que le serveur réponde */
  try {
    var memoire = JSON.parse(localStorage.getItem(MEMOIRE_ETAT) || "null");
    if (memoire && memoire["site.etat"] && memoire["site.etat"] !== "ouvert") {
      if (document.body) appliquerEtat(memoire);
      else document.addEventListener("DOMContentLoaded", function () { appliquerEtat(memoire); });
    }
  } catch (_) {}

  Promise.all([
    get("contents?select=key,fr,en"),
    get("categories?select=slug,fr_name,en_name,position&order=position"),
    get("subcategories?select=slug,fr_name,en_name,position,category_id,categories(slug)&order=position"),
    get("products?select=id,slug,ref,fr_name,fr_desc,en_name,en_desc,price,price_from,unit,set_qty,sizes,tag,image_path,discount_percent,discount_until,category_id,subcategory_id,categories(slug),subcategories(slug)&is_published=eq.true&order=position"),
    get("product_images?select=product_id,path,position&order=position"),
    get("settings?select=key,value").catch(function () { return []; })
  ])
    .then(function (res) {
      var contents = res[0], cats = res[1], subs = res[2], prods = res[3];
      var planches = res[4] || [];
      etatDuSite(res[5] || []);
      if (!contents.length || !cats.length || !prods.length) return;   // base vide : on garde le statique

      /* ---------- textes ---------- */
      /* Les cles « media.<fichier> » ne sont pas des textes : elles portent
         l'adresse d'une image remplacee depuis l'editeur. On les met de cote. */
      var medias = {};
      contents.forEach(function (c) {
        if (c.key.indexOf("media.") === 0) {
          if (c.fr) medias[c.key.slice(6)] = c.fr;
          return;
        }
        if (typeof I18N !== "undefined") {
          if (c.fr) I18N.fr[c.key] = c.fr;
          if (c.en) I18N.en[c.key] = c.en;
        }
      });

      /* Une image du site remplacee depuis le back-office : on la substitue
         partout ou son nom de fichier apparait, y compris apres un rendu JS. */
      function appliquerMedias() {
        Object.keys(medias).forEach(function (fichier) {
          document.querySelectorAll("img").forEach(function (img) {
            var src = img.getAttribute("src") || "";
            if (src === medias[fichier]) return;
            if (src.split("/").pop() === fichier) img.src = medias[fichier];
          });
        });
      }
      if (Object.keys(medias).length) {
        appliquerMedias();
        document.addEventListener("datachange", appliquerMedias);
        new MutationObserver(appliquerMedias)
          .observe(document.body, { childList: true, subtree: true });
      }

      /* ---------- gammes ---------- */
      var parSlug = {};
      var nouvellesCats = cats.map(function (c) {
        var entree = { id: c.slug, fr: c.fr_name, en: c.en_name, subs: [] };
        parSlug[c.slug] = entree;
        return entree;
      });
      subs.forEach(function (s) {
        var parent = s.categories && parSlug[s.categories.slug];
        if (parent) parent.subs.push({ id: s.slug, fr: s.fr_name, en: s.en_name });
      });

      /* ---------- planches de motifs ----------
         Les photos secondaires d'une référence : elles servent aux
         assortiments, où l'acheteur voit la collection sans choisir. */
      var parProduit = {};
      planches.forEach(function (i) {
        (parProduit[i.product_id] = parProduit[i.product_id] || []).push(
          String(i.path).replace(/\.(jpe?g|png|webp)$/i, "")
        );
      });

      /* ---------- références ---------- */
      var nouveauxProduits = prods.map(function (p) {
        return {
          id: p.slug,
          ref: p.ref,
          cat: p.categories ? p.categories.slug : null,
          sub: p.subcategories ? p.subcategories.slug : null,
          img: imageDe(p),
          price: p.price === null ? null : Number(p.price),
          from: !!p.price_from,
          unit: p.unit || "piece",
          discount: p.discount_percent || 0,
          discountUntil: p.discount_until || null,
          gallery: parProduit[p.id] || undefined,
          setQty: p.set_qty || undefined,
          sizes: p.sizes || undefined,
          tag: p.tag || undefined,
          fr: { name: p.fr_name, desc: p.fr_desc || "" },
          en: { name: p.en_name, desc: p.en_desc || "" }
        };
      }).filter(function (p) { return p.cat && p.img; });

      if (!nouveauxProduits.length) return;

      /* remplacement sur place : les tableaux sont référencés ailleurs */
      CATEGORIES.length = 0;
      nouvellesCats.forEach(function (c) { CATEGORIES.push(c); });
      PRODUCTS.length = 0;
      nouveauxProduits.forEach(function (p) { PRODUCTS.push(p); });

      /* ---------- on redessine ---------- */
      if (typeof applyI18n === "function") applyI18n();
      document.dispatchEvent(new CustomEvent("datachange"));
      if (typeof renderCart === "function") renderCart();
    })
    .catch(function (e) {
      /* base injoignable : le site reste parfaitement fonctionnel
         avec les données embarquées. On ne dérange pas l'internaute. */
      if (window.console && console.debug) console.debug("données vivantes indisponibles :", e.message);
    });
})();
