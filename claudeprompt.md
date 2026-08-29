# Farafinatignɛ — contexte du site

Ce fichier résume le projet et **l'historique des décisions** pour qu'on puisse
reprendre le travail sans relire tout le code.

## Le projet

Site vitrine + **catalogue B2B (vente en gros uniquement)** pour **Farafinatignɛ**,
entreprise artisanale de **Mopti-Sévaré, Mali** (Rue RN6, Imm. Farafinatignɛ, BP 65).

Elle fabrique et commercialise les objets traditionnels, habits et parures
culturelles de nombreuses ethnies d'Afrique : bijoux en cauris, en plastique
recyclé, en métaux récupérés, en cuir et en pierres, bogolanfini, indigo.

- Signature FR : *« La réalité de l'Afrique »*
- Signature EN : *« From Mali to the world »*
- Domaine cible : **farafinatigne.com**
- Téléphone **et** WhatsApp : **+223 65 45 02 02** (`22365450202`) — **numéro unique**,
  décision client d'août 2026. Les deux numéros de la brochure (76 87 06 95 et
  76 11 06 32) ne doivent plus apparaître nulle part.
- E-mail : **farafinatigne@gmail.com**
- Réseaux : [Facebook](https://www.facebook.com/farafina.tigne/) ·
  [Instagram](https://www.instagram.com/farafinatigne/) · TikTok (identifiant **non
  communiqué** — la couverture de la brochure affiche l'icône, le lien reste à ajouter)

**Politique commerciale affichée partout** : prix unitaires **de gros en euros**,
**commande minimum 500 €**, frais de port calculés à la confirmation, **expédition
depuis l'atelier du Mali**. Aucun paiement en ligne : la sélection produit un
récapitulatif envoyé par WhatsApp ou e-mail, puis facture proforma et virement.

## Identité — logo et nom

Le client a fourni le **logo officiel** (`../assets/arrivage/IMG_5944`, version or `IMG_5945` —
ce dossier n'est qu'un dépôt de photos reçues, le mot « arrivage » ne doit pas
apparaître sur le site) : ovale à motif bogolan, wordmark condensé, baseline
« From Mali to the World », numéro de téléphone.

- **Le nom s'écrit `FARAFINATIGNƐ`** — en un seul mot, avec un **Ɛ** (U+0190, E ouvert
  du bambara). En texte courant on écrit **`Farafinatignɛ`** (ɛ minuscule, U+025B).
  Ni « Farafina Tignè » ni « Farafina Tigne » ne doivent réapparaître.
- **Piège technique** : Ɛ et ɛ sont **absents des sous-ensembles Google Fonts** de
  Fraunces et Manrope — le glyphe tombe alors sur une police système et jure.
  Deux parades en place :
  1. le **wordmark** utilise **Anton**, chargée avec `&text=FARAFINATIGNƐ` (l'API v2
     ne sert alors que les glyphes demandés) — c'est la seule condensée grasse de
     Google Fonts qui possède le Ɛ ;
  2. le **texte courant** ajoute `"Noto Serif"` et `"Noto Sans"` en repli dans
     `--font-display` / `--font-sans`, chargées avec `&text=Ɛɛ` (deux fichiers de
     quelques octets). Le navigateur ne bascule que sur ces deux caractères.
  Avant de changer une police, revérifier la couverture du Ɛ.
- Le **sceau** est redessiné en SVG inline d'après le logo : ovale, deux zigzags,
  rangée de points au centre, losanges en haut, points en bas. `viewBox="0 0 120 70"`.

## Direction artistique

Historique : le client a d'abord demandé « la même direction artistique que
vpofficiel.com » (sombre), puis un fond blanc, puis a jugé le résultat raté et
demandé une **refonte complète** orientée culture afro / artisanat, avec la
**palette extraite de son propre bandeau de marque** (le lettrage FARAFINATIGNE sur
motif bogolan ocre et brun).

### Palette — mesurée sur le bandeau, pas inventée

Quantification k-means du bandeau (`docs/…Brochure`, page 1) :

| Rôle | Hex | Part | Usage |
|---|---|---|---|
| ivoire (lettrage) | `#F8F7EE` | 21 % | fond de page, texte sur sombre |
| or clair | `#DBA54E` | 4 % | chiffres, accents sur sombre |
| or | `#CC8D3D` | 9 % | motif, pastilles, bouton catalogue |
| fauve | `#B3773F` | 13 % | dégradés |
| brun moyen | `#835436` | 11 % | italiques des titres |
| brun | `#6D412C` | 9 % | départ du dégradé sombre |
| brun profond | `#543025` | 10 % | dégradés |
| brun-noir | `#34171A` | 5 % | **couleur de texte principale** |
| espresso | `#1C0D0B` | — | bandeau, footer, boutons pleins |

Deux valeurs dérivées : `--sand #F1EADC` (sections alternées) et
**`--gold-deep #8A5E1C`**, seule déclinaison d'or qui atteint 5,3:1 sur l'ivoire —
c'est elle qu'on utilise pour les petits labels sur fond clair. **`#CC8D3D` et
`#DBA54E` ne passent pas en petit sur fond clair** (2,6:1 et 2,0:1) : réservés aux
surfaces sombres et au très gros texte.

Le « dégradé de marron et noir » du bandeau est reproduit dans `--dark-gradient`
(halo or en haut à gauche, puis `#6D412C → #34171A → #1C0D0B`).

### Typographie

- **Fraunces** (display variable, axes opsz/wght, italique) — chaleureuse, un peu
  « wonky », elle porte l'identité artisanale. Remplace Cormorant Garamond, jugé trop
  neutre.
- **Manrope** pour le texte courant, les labels capitales très espacés.

### Composition

Références 2026 pour l'artisanat : grille éditoriale asymétrique, hero « type-first »,
page-magazine (chaque section = une idée visuelle), palettes terreuses, récit de
fabrication, retenue plutôt qu'animation.

1. **Le hero est une double page de magazine** : colonne de titre à gauche sur
   ivoire, **panneau espresso à motif bogolan bord à bord à droite** (46 % de la
   largeur), et une **image en arche** posée dessus. L'arche est la signature
   formelle du site — on la retrouve sur les gammes, le savoir-faire et « à propos ».
   La hauteur de l'arche est pilotée par `100svh` pour ne jamais passer sous le
   bandeau de preuve qui ferme le hero (`500 € / n références / Mali`, le nombre
   étant calculé depuis `PRODUCTS.length`).
2. **Motif bogolan** : classe `.bogolan`, un SVG en data-URI (chevrons + points)
   posé via `.pattern-layer` à 7 % d'opacité sur toutes les surfaces sombres.
   C'est le seul ornement du site.
3. **Rythme** : ivoire → sable (`.section--sand`) → blanc → espresso (savoir-faire)
   → ivoire → blanc → footer espresso. Trois ancres sombres, pas plus.
4. **Angles droits partout**, sauf trois exceptions assumées : les arches
   (`border-radius: 999px 999px 3px 3px`), les **pastilles rondes des réseaux
   sociaux** et les **deux bulles flottantes** — ces dernières reprennent le
   traitement de vpofficiel.com à la demande du client.
5. Les **cartes produits sont sobres** : photo 4/5 plein cadre, pastille de tag
   collée au coin, nom, prix, référence, puis **un seul bouton « Ajouter à ma
   sélection »**. Les boutons WhatsApp et e-mail par produit ont été retirés à la
   demande du client (août 2026) : le cahier des charges les prévoyait, mais le
   parcours passe désormais entièrement par la sélection. Pas de cadre, pas d'ombre,
   pas de rappel MOQ par carte — il est déjà dans le bandeau haut et en pied de boutique.
6. La **bulle WhatsApp est en bas à gauche**, le bouton de remontée en bas à droite :
   ils ne doivent jamais se toucher.
7. Le **sceau ovale à chevrons** (repris du logo tampon « Farafina tigné ») est
   dessiné en SVG inline dans la nav et le footer, et dans `assets/favicon.svg`.
8. Le **mot fantôme** en filigrane (`-webkit-text-stroke`) reste dans les en-têtes de
   page et le footer.

## Stack

- **100 % statique** : HTML / CSS / JS vanilla, aucun framework, aucun build, aucune
  dépendance npm. Se dépose tel quel sur n'importe quel hébergement.
- Polices Google Fonts : `Fraunces` + `Manrope` (variables), `Anton` (wordmark) et
  `Noto Serif` / `Noto Sans` réduites aux deux glyphes Ɛ et ɛ.
- Persistance `localStorage` : `ft-cart` (sélection), `ft-lang` (langue),
  `ft-leads` (prospects du catalogue PDF, secours local).
- Dev local : `python -m http.server 5510 --bind 127.0.0.1` depuis ce dossier.
  ⚠️ viser **`127.0.0.1`** et non `localhost` (capté par Docker/WSL sur ce poste).
- Vérification visuelle : Playwright installé à la volée dans le dossier temporaire,
  captures desktop 1440×900 et mobile 390×844 — pas de dépendance ajoutée au projet.

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | bandeau B2B, nav, hero (arche + panneau), marquee, manifeste, gammes numérotées, sélection, savoir-faire (bande espresso), catalogue PDF, processus, footer |
| `boutique.html` | en-tête de page, filtres catégorie + sous-catégorie collants, grille produits, rappel MOQ |
| `a-propos.html` | histoire, atelier, matières, engagements, savoir-faire, galerie |
| `contact.html` | coordonnées, réseaux, formulaire (mailto), CTA WhatsApp |

Le **bloc nav + le bloc footer/overlays sont identiques sur les 4 pages**.
`index.html` en est la **source unique** : après toute modification de la nav ou du
footer, lancer

```bash
python tools/build-pages.py
```

qui régénère `boutique.html`, `a-propos.html` et `contact.html`. **Ne jamais éditer
ces trois fichiers à la main** : le contenu propre à chaque page vit dans les blocs
`BOUTIQUE` / `APROPOS` / `CONTACT` du script, tout le reste serait écrasé.
Le lien actif est marqué dynamiquement par `markCurrentNav()` dans `common.js` — ne
pas coder « en dur » une classe `is-current`.

## JS — ordre de chargement

`i18n.js` → `products.js` → `common.js` → `cart.js` → (`home.js` / `boutique.js` /
`contact.js` selon la page). Cet ordre est **obligatoire** : `common.js` utilise
`t()` et `PRODUCTS`, `cart.js` utilise les helpers de `common.js`.

- **`js/i18n.js`** — dictionnaire FR/EN complet + moteur. Tout texte d'interface
  passe par `data-i18n="clé"` (et `data-i18n-attr` pour traduire un attribut).
  Langue déduite dans l'ordre : `?lang=`, `localStorage`, langue du navigateur.
  Changer de langue déclenche l'événement `langchange`, écouté par les pages pour
  re-render les grilles.
- **`js/products.js`** — **source unique de vérité**. `CATEGORIES` (3 gammes,
  12 sous-catégories) et `PRODUCTS` (96 références bilingues). Chaque produit :
  `id, cat, sub, img, price, unit, tag, fr:{name,desc}, en:{name,desc}`.
  Les **références `FT-BJ-001`… sont générées automatiquement** en fin de fichier
  dans l'ordre du tableau : **insérer un produit au milieu décale toutes les
  références suivantes** — ajouter plutôt en fin de bloc de catégorie.
  `MOQ = 500` y est aussi défini.
- **`js/common.js`** — coordonnées (`WHATSAPP_NUMBER`, `EMAIL`, `CATALOGUE_PDF`,
  `LEAD_ENDPOINT`), helpers, `cardHTML()`, nav, reveal, spotlight, lightbox, toast,
  modale du catalogue PDF, délégation globale des clics.
- **`js/cart.js`** — sélection / demande de devis : quantités, total, contrôle du
  MOQ, récapitulatif texte envoyé vers WhatsApp ou mailto. Chaque ligne du
  récapitulatif porte l'**URL absolue de la photo** (`productImageUrl()` dans
  `common.js`, basée sur `SITE_URL`) : WhatsApp affiche alors un aperçu de chaque
  article. Si le domaine change, mettre `SITE_URL` à jour, sinon les aperçus cassent.
- **`js/home.js`** — marquee, index des gammes du hero, blocs `.range` numérotés,
  sélection de la home (liste `picks` codée en dur), compteurs animés.
- **`js/boutique.js`** — filtres, lecture/écriture de `?cat=` et `?sub=`.
- **`js/contact.js`** — validation + envoi du formulaire.

**Piège** : si on retire une section du HTML qui porte un `id`, grepper `js/*.js`
avant de considérer le nettoyage terminé — un `$("#truc").addEventListener(...)` sans
garde plante silencieusement et interrompt le reste du bloc `DOMContentLoaded`.

## Prix et données produits

Les **prix viennent de la brochure officielle** (`docs/…Brochure farafinatigne.pdf`,
tarifs export en euros) et ont été transcrits page par page. Exemples : boucles
Fulani 2,99 € → 14 € selon la taille, collier cauri Massaye 22 €, écharpe bogolan
12 €, grand boubou bogolan 50 €, lot de 100 douzaines de bracelets flipflop 300 €.

- `price: null` → la fiche affiche **« Prix sur demande »**. C'est le cas des
  références dont la brochure ne donne pas de tarif (chemins de table, bogolan au
  mètre, bagues en plastique, deux modèles de boucles touareg). **Ne pas inventer de
  prix** : demander au client et remplacer le `null`.
- `unit` pilote le libellé : `piece`, `pair`, ou un lot (`setQty` + `setPrice`).
- `tag` affiche une pastille : `signature`, `best`, `gros`, `piece-speciale`.

## Assets

```
assets/
  images/      83 photos produits (max 1100–1300 px, JPEG progressif ~82)
  editorial/   18 visuels éditoriaux (hero, portraits, atelier, couverture)
  catalogue-farafinatigne.pdf   catalogue grossiste 20 pages, 5,8 Mo
  favicon.svg  sceau ovale à chevrons
```

Toutes les photos ont été **extraites de la brochure PDF** (les planches y sont
stockées en une seule image par page, **retournées verticalement** sauf la
couverture et la 4e de couverture) puis recadrées produit par produit, ou reprises
des visuels fournis dans `../assets/`.

Pour ajouter un produit : déposer la photo dans `assets/images/<slug>.jpg`
(carré de préférence, ≤ 1100 px) puis ajouter l'entrée dans `PRODUCTS`.

## Capture des prospects (catalogue PDF)

Depuis le 29 août 2026, le téléchargement est **conditionné à un formulaire**
(prénom, nom, entreprise facultative, téléphone **ou** e-mail — l'un des deux
suffit). `common.js` (`initPdfGate`) dépose directement le prospect dans la
table Supabase `leads` via `window.FT_API` (clé anonyme, écriture seule — la
sécurité par ligne empêche toute lecture). Le téléchargement démarre même si
l'envoi échoue (réseau coupé, base injoignable) : capter le contact ne doit
jamais bloquer un acheteur pressé.

Les prospects apparaissent dans **FarafinaOffice → Clients → Prospects**, prêts
à convertir en fiche client. Ancien mécanisme (`LEAD_ENDPOINT`, `localStorage`)
abandonné à la même date.

## Catalogue PDF — mise à jour automatique

`tools/build-catalogue.mjs` sait déjà lire les prix **en direct depuis la
base de production** (repli sur `js/products.js` si elle est injoignable) :
le PDF dit donc toujours ce que dit la boutique, sans double saisie. Ce qui
manquait : quelqu'un pour le relancer à chaque changement de prix.

Depuis le 30 août 2026, une tâche planifiée sur le VPS s'en charge, toutes
les 6 heures (00h07 / 06h07 / 12h07 / 18h07) :

- script : `tools/build-catalogue-cron.sh` dans ce dépôt, déployé sur le VPS
  dans `/opt/farafina/scripts/` (pas dans `site/`, pour ne rien exposer) ;
  la crontab elle-même (`crontab -l` sous root) n'est pas versionnée ;
- il démarre un Chrome headless éphémère (`chromedp/headless-shell`) et un
  conteneur Node 22 jetables, relance `tools/build-catalogue.mjs` contre
  `https://farafinatigne.com`, puis nettoie tout ;
- `tools/build-catalogue.mjs` **n'écrit le PDF qu'à la toute fin**, une fois
  le rendu terminé sans erreur : un passage qui échoue laisse le fichier en
  ligne intact ;
- journal : `/opt/farafina/backups/catalogue-cron.log` (tronqué automatiquement
  au-delà de 2000 lignes).

`tools/build-catalogue.mjs` est déployé sur le VPS dans `site/tools/`, un
chemin **bloqué à la lecture publique par nginx** (`location ^~ /tools/`)
puisqu'il n'a rien à faire dans le site servi.

Relancer à la main depuis le VPS : `ssh bekst-vps
/opt/farafina/scripts/build-catalogue-cron.sh` (compter ~30 secondes). Depuis
un poste de travail, la méthode historique reste valable : voir l'en-tête de
`tools/build-catalogue.mjs`.

## Dépôt Git

Ce dossier **est** le dépôt : `git init` a été fait **dans `site/`** et non dans
`FaraFinaTigne/`, parce que tout le dossier personnel de la machine est couvert par
un dépôt `.git` parasite — ne jamais lancer `git add` / `git commit` depuis un parent.

Dépôt public : **`Hamadoun23/farafinatigne`** —
<https://github.com/Hamadoun23/farafinatigne>, branche `main`.
Le PDF du catalogue n'est **plus** versionné depuis le 30 août 2026 (voir
plus haut, généré automatiquement sur le VPS) ; la brochure source de 59 Mo
(`../docs/`) et les visuels bruts (`../assets/`) restent hors dépôt aussi.

## Mise en ligne

1. Brancher le dépôt sur Netlify ou Vercel (aucun build, dossier racine), ou activer
   GitHub Pages sur `main` / racine.
2. Faire pointer **farafinatigne.com** dessus et forcer le HTTPS.
3. Remplacer `https://farafinatigne.com/` dans les balises `canonical`, `og:url`,
   `sitemap.xml` et `robots.txt` si le domaine final diffère.
4. Soumettre `sitemap.xml` à Google Search Console.
5. Générer le QR code des salons vers `https://farafinatigne.com/boutique.html`.

## Points ouverts

- **Identifiant TikTok** à récupérer (icône présente sur la brochure, lien absent).
- **`LEAD_ENDPOINT`** à configurer (voir ci-dessus).
- **Prix manquants** : 16 références en `price: null` — dont les 9 nouveautés d'août
  2026 (coiffes de cauris, boubou à capuche, poncho, tunique, ensemble bogolan,
  coffret et assortiments de colliers). Chercher `price: null` dans `js/products.js`.
- Adresse e-mail : `farafinatigne@gmail.com`, confirmée par le client en août 2026
  (remplace l'ancienne adresse hotmail de la brochure).
- **Chemins de table** ont été déplacés de Textile & Mode vers **Décor & Art**
  (demande client, août 2026). Ils restent en « prix sur demande », comme
  **Couvertures & Plaids** : ces deux gammes n'ont ni photo dédiée ni tarif.
