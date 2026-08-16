"""Regenere boutique.html, a-propos.html et contact.html.

Le bandeau B2B, la navigation, le menu mobile, le footer, le panier et les
modales sont IDENTIQUES sur les quatre pages : index.html en est la source
unique. Ce script en extrait les blocs et les recolle autour du contenu
propre a chaque page.

    python tools/build-pages.py

A lancer apres toute modification de la nav ou du footer dans index.html.
Le contenu specifique de chaque page (BOUTIQUE, APROPOS, CONTACT) se trouve
plus bas dans ce fichier : c'est la qu'il faut le modifier, jamais dans le
HTML genere, qui serait ecrase au prochain lancement.
"""
import io, os, re

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
idx = io.open(os.path.join(SITE, "index.html"), encoding="utf-8").read()

def between(start, end):
    a = idx.index(start)
    b = idx.index(end)
    return idx[a:b]

NAV = between("<!-- ===== BANDEAU B2B ===== -->", "<!-- ===== HERO ===== -->")
TAIL = idx[idx.index("<!-- ===== FOOTER ===== -->"):idx.index('<script src="js/i18n.js">')]

HEAD_LINKS = """<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/favicon.svg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&family=Manrope:wght@300..800&display=swap" rel="stylesheet">
<!-- Wordmark du logo : Anton, seule condensée grasse de Google Fonts qui possède le Ɛ -->
<link href="https://fonts.googleapis.com/css2?family=Anton&text=FARAFINATIGN%C6%90&display=swap" rel="stylesheet">
<!-- Ɛ et ɛ sont absents des sous-ensembles Fraunces et Manrope : repli dédié sur ces deux glyphes -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400..700;1,400..700&text=%C6%90%C9%9B&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300..800;1,300..800&text=%C6%90%C9%9B&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">"""


def page(fname, title, desc, canonical, body, extra_script, ogimg):
    html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="format-detection" content="telephone=no">
<meta name="theme-color" content="#1C0D0B">
<link rel="canonical" href="https://farafinatigne.com/{canonical}">
<link rel="alternate" hreflang="fr" href="https://farafinatigne.com/{canonical}?lang=fr">
<link rel="alternate" hreflang="en" href="https://farafinatigne.com/{canonical}?lang=en">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Farafinatign\u025b">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="https://farafinatigne.com/{canonical}">
<meta property="og:image" content="https://farafinatigne.com/assets/editorial/{ogimg}.jpg">
<meta name="twitter:card" content="summary_large_image">
{HEAD_LINKS}
</head>
<body>

{NAV}{body}

{TAIL}<script src="js/i18n.js"></script>
<script src="js/products.js"></script>
<script src="js/common.js"></script>
<script src="js/cart.js"></script>
{extra_script}<!-- Données vivantes : contenu embarqué d'abord, puis valeurs de la base -->
<script src="js/live-data.js"></script>
<!-- Édition en direct depuis le back-office (inerte hors du cadre autorisé) -->
<script src="js/editor-bridge.js"></script>
</body>
</html>
"""
    io.open(os.path.join(SITE, fname), "w", encoding="utf-8", newline="\n").write(html)
    print("ecrit :", fname, len(html), "octets")


# ---------------------------------------------------------------- BOUTIQUE
BOUTIQUE = """<!-- ===== EN-TÊTE DE PAGE ===== -->
<header class="page-head" id="shop-top">
  <div class="page-head__ghost" aria-hidden="true" data-i18n="shop.title">Boutique</div>
  <div class="wrap page-head__inner">
    <span class="eyebrow" data-i18n="shop.eyebrow">Catalogue de gros</span>
    <h1><span data-i18n="shop.title">Boutique</span></h1>
    <p data-i18n="shop.lead">Tous nos prix sont des prix grossistes en euros. Commande minimum 500 €, toutes gammes confondues.</p>
    <div class="page-head__actions">
      <button class="btn btn--solid" data-pdf data-i18n="pdf.cta">Télécharger le catalogue</button>
      <a href="https://wa.me/22365450202?text=Bonjour%20Farafinatign%C9%9B%2C%20je%20souhaite%20un%20devis%20de%20gros." target="_blank" rel="noopener" class="btn btn--wa">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.58-.34"/></svg>
        <span data-i18n="hero.wa">Demander un devis sur WhatsApp</span>
      </a>
    </div>
  </div>
</header>

<!-- ===== FILTRES ===== -->
<div class="filters">
  <div class="wrap">
    <div class="filters__row" id="filters-cat"></div>
    <div class="filters__row" id="filters-sub"></div>
  </div>
</div>

<!-- ===== GRILLE ===== -->
<section class="shop">
  <div class="wrap">
    <div class="shop__bar">
      <h2 id="shop-heading">Boutique</h2>
      <span class="shop__count" id="shop-count"></span>
    </div>
    <div class="products" id="shop-grid"></div>

    <div class="shop__note">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      <span data-i18n="p.moq">Prix grossiste — Commande minimum 500 €</span>
      <span data-i18n="topbar.ship">Expédié depuis notre atelier au Mali</span>
    </div>
  </div>
</section>
"""

# ---------------------------------------------------------------- À PROPOS
APROPOS = """<!-- ===== EN-TÊTE DE PAGE ===== -->
<header class="page-head">
  <div class="page-head__ghost" aria-hidden="true">Tignè</div>
  <div class="wrap page-head__inner">
    <span class="eyebrow" data-i18n="about.eyebrow">Notre maison</span>
    <h1><span data-i18n="about.h1a">L'Afrique de l'Ouest,</span> <em data-i18n="about.h1b">de la main à la main</em></h1>
  </div>
</header>

<section style="padding-top:0">
  <div class="wrap">
    <p class="about__intro reveal" data-i18n="about.intro">L'entreprise artisanale Farafinatignɛ fabrique et commercialise les objets traditionnels, les habits et les parures culturelles de nombreuses ethnies d'Afrique.</p>

    <div class="about__block reveal">
      <div class="about__media"><img src="assets/editorial/atelier-indigo-couple.jpg" alt="Atelier Farafinatignɛ à Sévaré" loading="lazy"></div>
      <div class="about__text">
        <h2 data-i18n="about.s1.t">L'atelier de Sévaré</h2>
        <p data-i18n="about.s1.p"></p>
      </div>
    </div>

    <div class="about__block reveal">
      <div class="about__media"><img src="assets/editorial/atelier-bogolan-femme.jpg" alt="Textiles bogolan et indigo" loading="lazy"></div>
      <div class="about__text">
        <h2 data-i18n="about.s2.t">Les matières</h2>
        <p data-i18n="about.s2.p"></p>
      </div>
    </div>

    <div class="about__block reveal">
      <div class="about__media"><img src="assets/editorial/lifestyle-parure.jpg" alt="Parures en laiton recyclé" loading="lazy"></div>
      <div class="about__text">
        <h2 data-i18n="about.s3.t">Nos engagements</h2>
        <p data-i18n="about.s3.p"></p>
      </div>
    </div>
  </div>
</section>

<!-- ===== SAVOIR-FAIRE ===== -->
<section class="craft">
  <div class="pattern-layer bogolan" aria-hidden="true"></div>
  <div class="wrap craft__grid">
    <figure class="craft__media reveal">
      <img src="assets/editorial/lifestyle-bracelets.jpg" alt="Bracelets en plastique recyclé portés" loading="lazy">
      <figcaption>Mopti — bracelets en plastique recyclé</figcaption>
    </figure>
    <div class="reveal">
      <span class="rule-label" data-i18n="know.eyebrow">Savoir-faire</span>
      <h2 class="section-title"><span data-i18n="know.title1">Du déchet au</span> <em data-i18n="know.title2">bijou</em></h2>
      <p data-i18n="know.p1"></p>
      <p data-i18n="know.p2"></p>
      <div class="stats">
        <div class="stat"><div class="stat__num" data-count="24000">24 000</div><p data-i18n="know.stat1"></p></div>
        <div class="stat"><div class="stat__num" data-count="60">60</div><p data-i18n="know.stat2"></p></div>
        <div class="stat"><div class="stat__num" data-count="20">20</div><p data-i18n="know.stat3"></p></div>
      </div>
    </div>
  </div>
</section>

<!-- ===== GALERIE ===== -->
<section style="padding-top:0">
  <div class="wrap">
    <div class="section-head section-head--left reveal">
      <span class="eyebrow" data-i18n="about.gal">L'atelier en images</span>
    </div>
    <div class="gallery reveal">
      <img src="assets/editorial/portrait-fulani-or.jpg" alt="Parure Fulani en laiton" loading="lazy" data-zoom="assets/editorial/portrait-fulani-or.jpg">
      <img src="assets/editorial/portrait-cauri-sakolo.jpg" alt="Collier cauri Sakolo porté" loading="lazy" data-zoom="assets/editorial/portrait-cauri-sakolo.jpg">
      <img src="assets/editorial/atelier-bogolan-duo.jpg" alt="Pagnes bogolan" loading="lazy" data-zoom="assets/editorial/atelier-bogolan-duo.jpg">
      <img src="assets/editorial/hero-boubou-bogolan.jpg" alt="Grand boubou bogolan" loading="lazy" data-zoom="assets/editorial/hero-boubou-bogolan.jpg">
      <img src="assets/editorial/portrait-laiton.jpg" alt="Collier en laiton martelé" loading="lazy" data-zoom="assets/editorial/portrait-laiton.jpg">
      <img src="assets/editorial/portrait-argent.jpg" alt="Collier en argent martelé" loading="lazy" data-zoom="assets/editorial/portrait-argent.jpg">
      <img src="assets/editorial/hero-cuir-degrade.jpg" alt="Collier en cuir dégradé" loading="lazy" data-zoom="assets/editorial/hero-cuir-degrade.jpg">
      <img src="assets/editorial/galerie-atelier.jpg" alt="La collection Farafinatignɛ" loading="lazy" data-zoom="assets/editorial/galerie-atelier.jpg">
    </div>
    <div class="products-more">
      <a href="boutique.html" class="btn btn--gold" data-i18n="feat.all">Voir tout le catalogue</a>
    </div>
  </div>
</section>
"""

# ---------------------------------------------------------------- CONTACT
CONTACT = """<!-- ===== EN-TÊTE DE PAGE ===== -->
<header class="page-head">
  <div class="page-head__ghost" aria-hidden="true">Contact</div>
  <div class="wrap page-head__inner">
    <span class="eyebrow" data-i18n="contact.eyebrow">Parlons commande</span>
    <h1><span data-i18n="contact.h1a">Écrivez-nous, nous</span> <em data-i18n="contact.h1b">répondons</em></h1>
    <p data-i18n="contact.lead">Une question sur une référence, un devis, un conteneur à préparer : WhatsApp reste le plus rapide, l'e-mail le plus complet.</p>
  </div>
</header>

<section style="padding-top:clamp(20px,3vw,40px)">
  <div class="wrap contact__grid">
    <div class="contact__info reveal">
      <div class="contact__item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <div><h3 data-i18n="contact.addr">Adresse</h3><p data-i18n="contact.addrv">Mopti — Sévaré, Rue RN6<br>Imm. Farafinatignɛ, BP 65<br>Mali</p></div>
      </div>
      <div class="contact__item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 4.2 12 19.8 19.8 0 0 1 1.1 3.4 2 2 0 0 1 3.1 1h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 8.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>
        <div>
          <h3 data-i18n="contact.phone">Téléphone &amp; WhatsApp</h3>
          <p><a href="https://wa.me/22365450202" target="_blank" rel="noopener">+223 65 45 02 02</a> — WhatsApp</p>
        </div>
      </div>
      <div class="contact__item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="4" width="20" height="16"/><polyline points="22,6 12,13 2,6"/></svg>
        <div><h3 data-i18n="contact.mail">E-mail</h3><p><a href="mailto:farafinatigne@gmail.com">farafinatigne@gmail.com</a></p></div>
      </div>
      <div class="contact__item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <div><h3 data-i18n="contact.hours">Horaires</h3><p data-i18n="contact.hoursv">Lundi – samedi, 8 h – 18 h (GMT)</p></div>
      </div>
      <div class="contact__item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z"/></svg>
        <div>
          <h3 data-i18n="contact.social">Réseaux</h3>
          <div class="socials" style="margin-top:8px">
            <a href="https://www.instagram.com/farafinatigne/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.28 2.69.08 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32m0 10.16a4 4 0 110-8 4 4 0 010 8m6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88"/></svg></a>
            <a href="https://www.facebook.com/farafina.tigne/" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07"/></svg></a>
            <a href="https://wa.me/22365450202" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.58-.34m-5.42 7.4c-1.77 0-3.5-.48-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c0 5.45-4.43 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z"/></svg></a>
          </div>
        </div>
      </div>
      <a href="https://wa.me/22365450202?text=Bonjour%20Farafinatign%C9%9B%2C%20je%20souhaite%20un%20devis%20de%20gros." target="_blank" rel="noopener" class="btn btn--wa" data-i18n="contact.wa">Ouvrir WhatsApp</a>
    </div>

    <form class="form reveal" id="contact-form" novalidate>
      <h2 data-i18n="contact.form.title">Formulaire de contact</h2>
      <div class="form__row">
        <div class="field">
          <label for="c-name" data-i18n="contact.form.name">Nom et prénom</label>
          <input id="c-name" type="text" required autocomplete="name">
        </div>
        <div class="field">
          <label for="c-company" data-i18n="contact.form.company">Société</label>
          <input id="c-company" type="text" autocomplete="organization">
        </div>
      </div>
      <div class="form__row">
        <div class="field">
          <label for="c-email" data-i18n="contact.form.email">Adresse e-mail</label>
          <input id="c-email" type="email" required autocomplete="email">
        </div>
        <div class="field">
          <label for="c-country" data-i18n="contact.form.country">Pays</label>
          <input id="c-country" type="text" autocomplete="country-name">
        </div>
      </div>
      <div class="field">
        <label for="c-subject" data-i18n="contact.form.subject">Objet</label>
        <input id="c-subject" type="text">
      </div>
      <div class="field">
        <label for="c-msg" data-i18n="contact.form.msg">Votre message</label>
        <textarea id="c-msg" required data-i18n="contact.form.msgph" data-i18n-attr="placeholder" placeholder="Références, quantités, destination…"></textarea>
      </div>
      <button type="submit" class="btn btn--solid btn--full" data-i18n="contact.form.send">Envoyer le message</button>
      <p class="form__msg" id="c-msg-out"></p>
      <p class="form__legal">Farafinatign\u025b — Mopti-S\u00e9var\u00e9, Mali · farafinatigne@gmail.com</p>
    </form>
  </div>
</section>
"""

page("boutique.html",
     "Boutique — Catalogue de gros | Farafinatign\u025b",
     "Catalogue de gros Farafinatign\u025b : bijoux en cauris, laiton et plastique recycl\u00e9s, bogolan, indigo, coussins et objets d'art. Prix grossiste en euros, commande minimum 500 \u20ac.",
     "boutique.html", BOUTIQUE, '<script src="js/boutique.js"></script>\n', "galerie-collection")

page("a-propos.html",
     "\u00c0 propos — L'atelier de S\u00e9var\u00e9 | Farafinatign\u025b",
     "Farafinatign\u025b, entreprise artisanale de Mopti-S\u00e9var\u00e9 : notre atelier, nos mati\u00e8res recycl\u00e9es, le savoir-faire des artisanes de Mopti et Djenn\u00e9.",
     "a-propos.html", APROPOS, '<script src="js/home.js"></script>\n', "atelier-bogolan-duo")

page("contact.html",
     "Contact — Devis de gros | Farafinatign\u025b",
     "Contactez Farafinatign\u025b \u00e0 Mopti-S\u00e9var\u00e9 (Mali) : WhatsApp +223 65 45 02 02, farafinatigne@gmail.com. Devis de gros, facture proforma, expédition internationale.",
     "contact.html", CONTACT, '<script src="js/contact.js"></script>\n', "portrait-cauri-mariee")
