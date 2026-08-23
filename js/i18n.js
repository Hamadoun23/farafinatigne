/* =========================================================
   Farafinatignɛ — bilingue FR / EN
   Tout texte d'interface passe par data-i18n="clé".
   data-i18n-attr="placeholder|aria-label|content|title" pour traduire un attribut.
   ========================================================= */

const I18N = {
  fr: {
    /* --- bandeau & navigation --- */
    "topbar.moq": "Prix grossiste · Commande minimum 500 €",
    "topbar.ship": "Expédié depuis notre atelier au Mali",
    "nav.home": "Accueil",
    "nav.shop": "Boutique",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.cart": "Ma sélection",
    "nav.menu": "Menu",
    "nav.lang": "Langue",

    /* --- hero --- */
    "hero.eyebrow": "Artisanat malien · Vente en gros",
    "hero.sub": "Bijoux, bogolan et objets d'art produits par nos artisans de Mopti et Djenné, exportés en gros dans le monde entier.",
    "hero.cta": "Voir la boutique",
    "hero.wa": "Demander un devis sur WhatsApp",
    "hero.side": "Mopti — Sévaré, Mali",
    "hero.badge": "Commande minimum",
    "hero.band1": "Commande minimum",
    "hero.band2": "Références en gros",
    "hero.band3": "Expédié de notre atelier",
    "hero.stamp": "Bogolan · fait main",
    "hero.index": "Nos gammes",

    /* --- manifeste --- */
    "mani.eyebrow": "Notre maison",
    "mani.lead": "Depuis Mopti-Sévaré, nous fabriquons et exportons les objets, les parures et les étoffes de <em>nombreuses ethnies d'Afrique de l'Ouest</em>.",
    "mani.p1": "Cauris du fleuve, laiton et bronze refondus à la cire perdue, tongs de plastique ramassées dans les rues, cuir de chèvre tanné au village, coton filé main et peint à la boue fermentée : rien n'arrive neuf, tout renaît entre les mains de nos artisanes et artisans.",
    "mani.p2": "Nous ne vendons qu'en gros, à des boutiques, des créateurs et des importateurs. C'est ce qui permet de payer le travail à son juste prix et de faire vivre les gestes, saison après saison.",
    "mani.quote": "De Mopti et Djenné au reste du monde, depuis mars 2000.",

    "hero.scroll": "Découvrir",

    /* --- bandeau B2B --- */
    "b2b.title": "Nos conditions de gros",
    "b2b.1.t": "Prix grossiste",
    "b2b.1.d": "Prix unitaires en euros affichés sur chaque fiche produit, sans intermédiaire.",
    "b2b.2.t": "Commande minimum 500 €",
    "b2b.2.d": "Toutes gammes confondues. Les frais de port sont calculés à la confirmation.",
    "b2b.3.t": "Expédié depuis le Mali",
    "b2b.3.d": "Départ de notre atelier de Sévaré vers l'Europe, les États-Unis et l'Afrique.",

    /* --- catégories --- */
    "cat.eyebrow": "Nos gammes",
    "cat.title1": "Trois familles, un même",
    "cat.title2": "savoir-faire",
    "cat.lead": "Du bijou de cauris au grand boubou bogolan, chaque pièce sort de l'atelier de Sévaré ou des mains de nos artisanes partenaires.",
    "cat.see": "Voir la gamme",
    "cat.bijoux.d": "Cauris, laiton et argent recyclés, plastique de Mopti, cuir de chèvre, pâte de verre.",
    "cat.textile.d": "Bogolan peint à la boue, indigo noué-ligaturé, coussins, boubous et étoles.",
    "cat.decor.d": "Objets d'art en métal recyclé, bronzes coulés à la cire perdue, pièces de collection.",

    /* --- lookbook --- */
    "look.eyebrow": "Nouveautés",
    "look.title1": "Les pièces de la",
    "look.title2": "saison",
    "look.lead": "Coiffes de cauris, bogolan porté, plastrons de cérémonie : les dernières pièces sorties de l'atelier de Sévaré.",
    "look.1": "Coiffes de cauris",
    "look.2": "Boubou bogolan à capuche",
    "look.3": "Plastron de cauris",
    "look.4": "Ensemble bogolan turquoise",
    "look.5": "Ras-de-cou de cauris",
    "look.6": "Torques en laiton",
    "look.7": "Bagues de bronze recyclé",
    "look.hint": "Faites défiler pour parcourir la sélection.",

    /* --- produits phares --- */
    "feat.eyebrow": "Sélection",
    "feat.title1": "Nos pièces les plus",
    "feat.title2": "demandées",
    "feat.lead": "Les références que nos clients grossistes recommandent saison après saison.",
    "feat.all": "Voir tout le catalogue",

    /* --- savoir-faire --- */
    "know.eyebrow": "Savoir-faire",
    "know.title1": "Du déchet au",
    "know.title2": "bijou",
    "know.p1": "Les femmes bozo de Mopti rapportent les vieilles tongs abandonnées, les « tapettes ». Elles les lavent, les découpent, puis chauffent les morceaux au charbon ardent jusqu'à obtenir une pâte modelable.",
    "know.p2": "Cette pâte est enroulée autour de tiges de fer, les deux bouts sont soudés à la main : le bracelet est né. Le même geste, répété depuis deux générations, fait vivre des dizaines de familles à Mopti et Djenné.",
    "know.stat1": "douzaines de bracelets expédiées vers un seul client américain l'an passé",
    "know.stat2": "familles d'artisans et d'artisanes partenaires à Mopti et Djenné",
    "know.stat3": "années d'atelier à Sévaré, sur la route nationale 6",
    "know.more": "Notre histoire",

    /* --- catalogue PDF --- */
    "pdf.eyebrow": "Catalogue grossiste",
    "pdf.title1": "Le catalogue complet en",
    "pdf.title2": "PDF",
    "pdf.lead": "Vingt pages de références, tailles et tarifs de gros. Laissez-nous votre nom et votre e-mail, le téléchargement démarre aussitôt.",
    "pdf.cta": "Télécharger le catalogue",
    "pdf.form.title": "Accès au catalogue grossiste",
    "pdf.form.lead": "Merci de vous présenter — nous réservons le catalogue et nos tarifs aux acheteurs professionnels.",
    "pdf.form.name": "Nom et prénom",
    "pdf.form.company": "Société (facultatif)",
    "pdf.form.email": "Adresse e-mail",
    "pdf.form.country": "Pays",
    "pdf.form.submit": "Recevoir le catalogue",
    "pdf.form.ok": "Merci ! Le téléchargement démarre.",
    "pdf.form.err": "Merci de renseigner un nom et un e-mail valides.",

    /* --- processus --- */
    "proc.eyebrow": "Commander",
    "proc.title1": "Quatre étapes, aucune",
    "proc.title2": "surprise",
    "proc.1.t": "Composez votre sélection",
    "proc.1.d": "Ajoutez les références et les quantités souhaitées depuis la boutique.",
    "proc.2.t": "Envoyez la demande",
    "proc.2.d": "Un clic transmet le récapitulatif par WhatsApp ou par e-mail.",
    "proc.3.t": "Recevez la facture proforma",
    "proc.3.d": "Nous confirmons disponibilité, poids, frais de port et délais.",
    "proc.4.t": "Réglez et recevez",
    "proc.4.d": "Paiement par virement bancaire ou transfert international, puis expédition depuis Sévaré.",

    /* --- boutique --- */
    "shop.title": "Boutique",
    "shop.eyebrow": "Catalogue de gros",
    "shop.lead": "Tous nos prix sont des prix grossistes en euros. Commande minimum 500 €, toutes gammes confondues.",
    "shop.all": "Tout voir",
    "shop.count": "référence(s)",
    "shop.empty": "Aucune référence dans cette catégorie pour le moment.",
    "shop.pdf": "Catalogue PDF",

    /* --- fiche produit --- */
    "p.add": "Ajouter à ma sélection",
    "p.added": "Ajouté à votre sélection",
    "p.quote": "Prix sur demande",
    "p.from": "à partir de",
    "p.unit.piece": "la pièce",
    "p.unit.pair": "la paire",
    "p.unit.lot": "le lot",
    "p.unit.set": "le lot",
    "p.moq": "Prix grossiste — Commande minimum 500 €",
    "p.zoom": "Agrandir l'image",
    "p.prev": "Motif précédent",
    "p.next": "Motif suivant",
    "p.sizes": "Tailles ",
    "p.motifs": "Motifs de la collection — assortiment composé à l'atelier",
    "p.ref": "Réf.",

    /* --- panier / devis --- */
    "cart.title": "Ma sélection",
    "cart.eyebrow": "Demande de devis",
    "cart.empty": "Votre sélection est vide.",
    "cart.emptyCta": "Parcourir la boutique",
    "cart.total": "Total estimé",
    "cart.moqOk": "Commande minimum atteinte.",
    "cart.moqKo": "Il manque {x} pour atteindre la commande minimum de 500 €.",
    "cart.note": "Les articles « prix sur demande » sont chiffrés dans la facture proforma.",
    "cart.wa": "Envoyer par WhatsApp",
    "cart.mail": "Envoyer par e-mail",
    "cart.clear": "Vider la sélection",
    "cart.remove": "Retirer",

    /* --- à propos --- */
    "about.title": "À propos",
    "about.eyebrow": "Notre maison",
    "about.h1a": "L'Afrique de l'Ouest,",
    "about.h1b": "de la main à la main",
    "about.intro": "L'entreprise artisanale Farafinatignɛ fabrique et commercialise les objets traditionnels, les habits et les parures culturelles de nombreuses ethnies d'Afrique. Bijoux de cauris, de plastique recyclé, de métaux récupérés, de cuir et de pierres, bogolanfini : nous vous faisons découvrir le joyau de l'Afrique occidentale à travers l'art, l'histoire et la tradition.",
    "about.s1.t": "L'atelier de Sévaré",
    "about.s1.p": "Notre atelier se tient à Mopti-Sévaré, sur la route nationale 6, au carrefour des routes qui montent vers le pays dogon et Tombouctou. C'est là que se rassemblent les pièces venues des forgerons, des teinturières et des tisserands de toute la région.",
    "about.s2.t": "Les matières",
    "about.s2.p": "Cauris du fleuve, laiton et bronze récupérés puis refondus à la cire perdue, tongs de plastique ramassées dans les rues de Mopti, cuir de chèvre tanné au village, coton filé main et teint à la boue fermentée ou à l'indigo. Rien n'arrive neuf, tout renaît.",
    "about.s3.t": "Nos engagements",
    "about.s3.p": "Un travail payé à son juste prix aux artisanes et artisans, des matières recyclées chaque fois que c'est possible, et des gestes transmis tels quels, sans machine intermédiaire. Vendre en gros, c'est faire durer ces gestes.",
    "about.gal": "L'atelier en images",

    /* --- signature de marque --- */
    "sign.eyebrow": "Notre promesse",
    "sign.line": "If you can not come to Timbuctou and Djené then we can bring to you",
    "sign.sub": "Si vous ne pouvez pas venir jusqu'à Tombouctou et Djenné, alors nous vous les apportons.",

    /* --- à propos : profil d'entreprise --- */
    "about.tagline": "L'excellence de l'artisanat malien, du cœur du Delta au reste du monde.",
    "about.story.eyebrow": "Notre histoire",
    "about.story.t": "Fondée en mars 2000",
    "about.story.p1": "Farafinatignɛ a été fondée en mars 2000 par <b>Oumar Cissé</b>. Vingt-six ans plus tard, la maison est devenue une institution de l'artisanat malien, installée à Mopti-Sévaré, au carrefour des routes qui montent vers le pays dogon et Tombouctou.",
    "about.story.p2": "Nous sommes aujourd'hui une équipe de <b>trente collaborateurs</b>. Nous ne sommes pas seulement des créateurs : nous sommes aussi des formateurs. Plusieurs générations d'artisanes et d'artisans maliens sont passées par nos ateliers, et c'est ainsi que les métiers d'art continuent de vivre dans le pays.",
    "about.story.dirlabel": "Direction",
    "about.story.teamlabel": "Équipe",
    "about.story.dir": "Direction générale : Issouf Cissé",
    "about.story.team": "collaborateurs à Mopti-Sévaré",
    "about.story.since": "depuis mars 2000, sans interruption",
    "about.story.fairs": "ans de présence continue sur les salons internationaux",

    "about.savoir.eyebrow": "Savoir-faire",
    "about.savoir.t1": "Entre tradition et modernité",
    "about.savoir.lead": "Nous maîtrisons des techniques ancestrales tout en restant tournés vers l'avenir.",
    "about.savoir.a.t": "Bijoux ethniques & créations",
    "about.savoir.a.p": "Colliers, bracelets, bagues et boucles d'oreilles. Nous créons constamment des nouveautés adaptées aux nouvelles générations, en fusionnant les tendances actuelles avec l'originalité de la culture malienne.",
    "about.savoir.b.t": "Éco-responsabilité & recyclage ♻️",
    "about.savoir.b.p": "Nous intégrons une forte dimension écologique dans notre production en recyclant de nombreux matériaux — laiton, bronze, cuivre, plastique, boîtes de conserve — pour les transformer en accessoires de mode uniques.",
    "about.savoir.c.t": "Bogolan & perlerie",
    "about.savoir.c.p": "Une expertise reconnue dans la teinture naturelle (bogolan) et une connaissance encyclopédique des perles africaines, transmise de Mopti à Djenné.",

    "about.world.eyebrow": "Présence internationale",
    "about.world.t1": "Sur les grands salons",
    "about.world.t2": "depuis 2001",
    "about.world.lead": "Une marque de confiance présente sur les plus grands salons mondiaux depuis plus de vingt-cinq ans.",
    "about.world.c1": "Foire de Paris",
    "about.world.c2": "Salon Maison &amp; Objet",
    "about.world.c3": "New York",
    "about.world.c4": "Le stand",
    "about.world.c5": "L'équipe",
    "about.world.c6": "Le mur de colliers",
    "about.world.c7": "SIAO &amp; SIAMA",
    "about.world.1.t": "France",
    "about.world.1.d": "Foire de Paris et Salon Maison &amp; Objet, en janvier et en septembre, en continu depuis 2001.",
    "about.world.2.t": "Allemagne",
    "about.world.2.d": "Foire Bazaar Berlin.",
    "about.world.3.t": "États-Unis",
    "about.world.3.d": "International African Art Festival, New York.",
    "about.world.4.t": "Afrique",
    "about.world.4.d": "SIAO à Ouagadougou et SIAMA à Bamako.",

    "about.musee.t": "Le Musée des Perles",
    "about.musee.p": "À Mopti, Farafinatignɛ a ouvert un Musée des Perles, où sont rassemblées les perles anciennes d'Afrique de l'Ouest et la mémoire des routes commerciales du Delta intérieur. Le musée est <em>actuellement fermé pour raisons de sécurité</em> ; les collections, elles, continuent d'alimenter nos créations.",

    "about.gros.t": "Vente en gros et exportation",
    "about.gros.p": "Farafinatignɛ est spécialisée dans la production de masse et la vente en gros internationale. Nous offrons aux boutiques, aux distributeurs et aux institutions culturelles des produits authentiques, durables et adaptés au goût du marché contemporain, avec une logistique d'exportation maîtrisée.",

    "about.adr.eyebrow": "Nos adresses",
    "about.adr.1.t": "Ateliers & boutique",
    "about.adr.1.d": "Mopti — Sévaré, Rue RN6, Imm. Farafinatignɛ, BP 65, Mali.",
    "about.adr.2.t": "Point de vente",
    "about.adr.2.d": "Boutique Farafinatignɛ, Bamako, Mali.",
    "about.adr.3.t": "Patrimoine",
    "about.adr.3.d": "Musée des Perles, Mopti — actuellement fermé pour raisons de sécurité.",
    "about.adr.4.t": "Contact",
    "about.adr.4.d": "farafinatigne@gmail.com<br>+223 76 87 06 95 · +223 65 45 02 02",

    /* --- contact --- */
    "contact.title": "Contact",
    "contact.eyebrow": "Parlons commande",
    "contact.h1a": "Écrivez-nous, nous",
    "contact.h1b": "répondons",
    "contact.lead": "Une question sur une référence, un devis, un conteneur à préparer : WhatsApp reste le plus rapide, l'e-mail le plus complet.",
    "contact.addr": "Adresse",
    "contact.addrv": "Mopti — Sévaré, Rue RN6<br>Imm. Farafinatignɛ, BP 65<br>Mali",
    "contact.phone": "Téléphone & WhatsApp",
    "contact.mail": "E-mail",
    "contact.hours": "Horaires",
    "contact.hoursv": "Lundi – samedi, 8 h – 18 h (GMT)",
    "contact.social": "Réseaux",
    "contact.form.title": "Formulaire de contact",
    "contact.form.name": "Nom et prénom",
    "contact.form.company": "Société",
    "contact.form.email": "Adresse e-mail",
    "contact.form.country": "Pays",
    "contact.form.subject": "Objet",
    "contact.form.msg": "Votre message",
    "contact.form.msgph": "Références, quantités, destination…",
    "contact.form.send": "Envoyer le message",
    "contact.form.ok": "Merci ! Votre messagerie s'ouvre avec le message pré-rempli.",
    "contact.form.err": "Merci de remplir les champs obligatoires.",
    "contact.wa": "Ouvrir WhatsApp",

    /* --- footer --- */
    "foot.tag": "L'excellence de l'artisanat malien, du cœur du Delta au reste du monde.",
    "foot.nav": "Navigation",
    "foot.cats": "Nos gammes",
    "foot.contact": "Contact",
    "foot.rights": "Tous droits réservés.",
    "foot.top": "Haut de page",

    /* --- divers --- */
    "misc.wa": "Discuter sur WhatsApp",
    "misc.close": "Fermer",
    "misc.required": "obligatoire"
  },

  en: {
    "topbar.moq": "Wholesale prices · Minimum order €500",
    "topbar.ship": "Shipped directly from our workshop in Mali",
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cart": "My selection",
    "nav.menu": "Menu",
    "nav.lang": "Language",

    "hero.eyebrow": "Malian craft · Wholesale only",
    "hero.sub": "Jewellery, bogolan and art objects made by our artisans in Mopti and Djenné, exported wholesale worldwide.",
    "hero.cta": "Enter the shop",
    "hero.wa": "Request a quote on WhatsApp",
    "hero.side": "Mopti — Sévaré, Mali",
    "hero.badge": "Minimum order",
    "hero.band1": "Minimum order",
    "hero.band2": "Wholesale references",
    "hero.band3": "Shipped from our workshop",
    "hero.stamp": "Bogolan · handmade",
    "hero.index": "Our ranges",

    "mani.eyebrow": "Our house",
    "mani.lead": "From Mopti-Sévaré, we make and export the objects, adornments and cloths of <em>many West African peoples</em>.",
    "mani.p1": "Cowries from the river, brass and bronze recast by lost wax, plastic flip-flops picked up in the streets, village-tanned goat leather, hand-spun cotton painted with fermented mud: nothing arrives new, everything is reborn in the hands of our artisans.",
    "mani.p2": "We sell wholesale only, to shops, designers and importers. That is what lets us pay the work its fair price and keep these gestures alive, season after season.",
    "mani.quote": "From Mopti and Djenné to the rest of the world, since March 2000.",

    "hero.scroll": "Discover",

    "b2b.title": "Our wholesale terms",
    "b2b.1.t": "Wholesale pricing",
    "b2b.1.d": "Unit prices in euros shown on every product card, with no middleman.",
    "b2b.2.t": "€500 minimum order",
    "b2b.2.d": "Across all ranges. Shipping is calculated at confirmation.",
    "b2b.3.t": "Shipped from Mali",
    "b2b.3.d": "Leaving our Sévaré workshop for Europe, the United States and Africa.",

    "cat.eyebrow": "Our ranges",
    "cat.title1": "Three families, one",
    "cat.title2": "craft",
    "cat.lead": "From the cowrie necklace to the grand bogolan boubou, every piece comes out of the Sévaré workshop or the hands of our partner artisans.",
    "cat.see": "View the range",
    "cat.bijoux.d": "Cowries, recycled brass and silver, Mopti plastic, goat leather, glass paste.",
    "cat.textile.d": "Mud-painted bogolan, tie-dyed indigo, pillows, boubous and stoles.",
    "cat.decor.d": "Recycled-metal art objects, lost-wax bronzes, collector's pieces.",

    "look.eyebrow": "New in",
    "look.title1": "This season's",
    "look.title2": "pieces",
    "look.lead": "Cowrie headpieces, bogolan worn, ceremonial breastplates: the latest pieces out of the Sévaré workshop.",
    "look.1": "Cowrie headpieces",
    "look.2": "Hooded bogolan boubou",
    "look.3": "Cowrie breastplate",
    "look.4": "Turquoise bogolan set",
    "look.5": "Cowrie choker",
    "look.6": "Brass torques",
    "look.7": "Recycled bronze rings",
    "look.hint": "Scroll to browse the selection.",

    "feat.eyebrow": "Selection",
    "feat.title1": "Our most requested",
    "feat.title2": "pieces",
    "feat.lead": "The references our wholesale customers reorder season after season.",
    "feat.all": "View the full catalogue",

    "know.eyebrow": "Craft",
    "know.title1": "From waste to",
    "know.title2": "jewel",
    "know.p1": "The Bozo women of Mopti collect discarded flip-flops, locally called \"tapettes\". They wash them, cut them up, then heat the pieces over glowing charcoal until they become a mouldable paste.",
    "know.p2": "That paste is wound around iron rods and the two ends are welded by hand: the bracelet is born. The same gesture, repeated for two generations, supports dozens of families in Mopti and Djenné.",
    "know.stat1": "dozen bracelets shipped to a single American client last year",
    "know.stat2": "partner artisan families in Mopti and Djenné",
    "know.stat3": "years of workshop in Sévaré, on national road 6",
    "know.more": "Our story",

    "pdf.eyebrow": "Wholesale catalogue",
    "pdf.title1": "The full catalogue in",
    "pdf.title2": "PDF",
    "pdf.lead": "Twenty pages of references, sizes and wholesale prices. Leave your name and e-mail and the download starts right away.",
    "pdf.cta": "Download the catalogue",
    "pdf.form.title": "Access the wholesale catalogue",
    "pdf.form.lead": "Please introduce yourself — the catalogue and our prices are reserved for trade buyers.",
    "pdf.form.name": "Full name",
    "pdf.form.company": "Company (optional)",
    "pdf.form.email": "E-mail address",
    "pdf.form.country": "Country",
    "pdf.form.submit": "Get the catalogue",
    "pdf.form.ok": "Thank you! Your download is starting.",
    "pdf.form.err": "Please enter a valid name and e-mail.",

    "proc.eyebrow": "Ordering",
    "proc.title1": "Four steps, no",
    "proc.title2": "surprises",
    "proc.1.t": "Build your selection",
    "proc.1.d": "Add the references and quantities you need from the shop.",
    "proc.2.t": "Send the request",
    "proc.2.d": "One click sends the summary by WhatsApp or e-mail.",
    "proc.3.t": "Receive the proforma invoice",
    "proc.3.d": "We confirm availability, weight, shipping cost and lead time.",
    "proc.4.t": "Pay and receive",
    "proc.4.d": "Payment by bank transfer or international remittance, then shipping from Sévaré.",

    "shop.title": "Shop",
    "shop.eyebrow": "Wholesale catalogue",
    "shop.lead": "All prices are wholesale prices in euros. Minimum order €500 across all ranges.",
    "shop.all": "View all",
    "shop.count": "reference(s)",
    "shop.empty": "No reference in this category yet.",
    "shop.pdf": "PDF catalogue",

    "p.add": "Add to my selection",
    "p.added": "Added to your selection",
    "p.quote": "Price on request",
    "p.from": "from",
    "p.unit.piece": "each",
    "p.unit.pair": "per pair",
    "p.unit.lot": "per lot",
    "p.unit.set": "per set",
    "p.moq": "Wholesale price — Minimum order €500",
    "p.zoom": "Enlarge image",
    "p.prev": "Previous design",
    "p.next": "Next design",
    "p.sizes": "Sizes ",
    "p.motifs": "Designs in the collection — assortment made up at the workshop",
    "p.ref": "Ref.",

    "cart.title": "My selection",
    "cart.eyebrow": "Quote request",
    "cart.empty": "Your selection is empty.",
    "cart.emptyCta": "Browse the shop",
    "cart.total": "Estimated total",
    "cart.moqOk": "Minimum order reached.",
    "cart.moqKo": "{x} to go before the €500 minimum order.",
    "cart.note": "Items marked \"price on request\" are quoted in the proforma invoice.",
    "cart.wa": "Send via WhatsApp",
    "cart.mail": "Send by e-mail",
    "cart.clear": "Clear selection",
    "cart.remove": "Remove",

    "about.title": "About",
    "about.eyebrow": "Our house",
    "about.h1a": "West Africa,",
    "about.h1b": "hand to hand",
    "about.intro": "Farafinatignɛ is a craft company that makes and sells the traditional objects, garments and cultural adornments of many African peoples. Jewellery of cowries, recycled plastic, reclaimed metals, leather and stones, bogolanfini: we let you discover the jewel of West Africa through art, history and tradition.",
    "about.s1.t": "The Sévaré workshop",
    "about.s1.p": "Our workshop stands in Mopti-Sévaré, on national road 6, where the roads to Dogon country and Timbuktu meet. This is where the pieces from smiths, dyers and weavers of the whole region come together.",
    "about.s2.t": "The materials",
    "about.s2.p": "Cowries from the river, brass and bronze reclaimed and recast by lost wax, plastic flip-flops picked up in the streets of Mopti, village-tanned goat leather, hand-spun cotton dyed with fermented mud or indigo. Nothing arrives new, everything is reborn.",
    "about.s3.t": "Our commitments",
    "about.s3.p": "Fair pay for the women and men who make the pieces, recycled materials whenever possible, and gestures passed on unchanged, with no machine in between. Selling wholesale is how those gestures survive.",
    "about.gal": "The workshop in pictures",

    /* --- brand signature --- */
    "sign.eyebrow": "Our promise",
    "sign.line": "If you can not come to Timbuctou and Djené then we can bring to you",
    "sign.sub": "If you cannot travel to Timbuktu and Djenné, then we bring them to you.",

    /* --- about: company profile --- */
    "about.tagline": "The excellence of Malian craft, from the heart of the Delta to the rest of the world.",
    "about.story.eyebrow": "Our story",
    "about.story.t": "Founded in March 2000",
    "about.story.p1": "Farafinatignɛ was founded in March 2000 by <b>Oumar Cissé</b>. Twenty-six years on, the house has become an institution of Malian craft, based in Mopti-Sévaré, where the roads to Dogon country and Timbuktu meet.",
    "about.story.p2": "We are now a team of <b>thirty people</b>. We are not only makers: we are trainers too. Several generations of Malian craftswomen and craftsmen have passed through our workshops, and that is how the art trades stay alive in this country.",
    "about.story.dirlabel": "Management",
    "about.story.teamlabel": "Team",
    "about.story.dir": "Managing director: Issouf Cissé",
    "about.story.team": "people at Mopti-Sévaré",
    "about.story.since": "since March 2000, without a break",
    "about.story.fairs": "years of continuous presence at international trade fairs",

    "about.savoir.eyebrow": "Know-how",
    "about.savoir.t1": "Between tradition and modernity",
    "about.savoir.lead": "We master ancestral techniques while keeping our eyes on what comes next.",
    "about.savoir.a.t": "Ethnic jewellery & creations",
    "about.savoir.a.p": "Necklaces, bracelets, rings and earrings. We constantly design new pieces for younger generations, blending current trends with the originality of Malian culture.",
    "about.savoir.b.t": "Eco-responsibility & recycling ♻️",
    "about.savoir.b.p": "We build a strong ecological dimension into our production by recycling many materials — brass, bronze, copper, plastic, tin cans — and turning them into one-of-a-kind fashion accessories.",
    "about.savoir.c.t": "Bogolan & beadwork",
    "about.savoir.c.p": "A recognised expertise in natural dyeing (bogolan) and an encyclopaedic knowledge of African beads, carried from Mopti to Djenné.",

    "about.world.eyebrow": "International presence",
    "about.world.t1": "At the great trade fairs",
    "about.world.t2": "since 2001",
    "about.world.lead": "A trusted brand present at the world's largest trade fairs for more than twenty-five years.",
    "about.world.c1": "Foire de Paris",
    "about.world.c2": "Salon Maison &amp; Objet",
    "about.world.c3": "New York",
    "about.world.c4": "The stand",
    "about.world.c5": "The team",
    "about.world.c6": "The necklace wall",
    "about.world.c7": "SIAO &amp; SIAMA",
    "about.world.1.t": "France",
    "about.world.1.d": "Foire de Paris and Salon Maison &amp; Objet, in January and September, continuously since 2001.",
    "about.world.2.t": "Germany",
    "about.world.2.d": "Bazaar Berlin fair.",
    "about.world.3.t": "United States",
    "about.world.3.d": "International African Art Festival, New York.",
    "about.world.4.t": "Africa",
    "about.world.4.d": "SIAO in Ouagadougou and SIAMA in Bamako.",

    "about.musee.t": "The Bead Museum",
    "about.musee.p": "In Mopti, Farafinatignɛ opened a Bead Museum, gathering the antique beads of West Africa and the memory of the trade routes of the Inner Delta. The museum is <em>currently closed for security reasons</em>; the collections keep feeding our designs.",

    "about.gros.t": "Wholesale and export",
    "about.gros.p": "Farafinatignɛ specialises in mass production and international wholesale. We supply shops, distributors and cultural institutions with authentic, durable products suited to contemporary taste, backed by a well-run export logistics chain.",

    "about.adr.eyebrow": "Our addresses",
    "about.adr.1.t": "Workshops & shop",
    "about.adr.1.d": "Mopti — Sévaré, Rue RN6, Imm. Farafinatignɛ, BP 65, Mali.",
    "about.adr.2.t": "Retail outlet",
    "about.adr.2.d": "Farafinatignɛ shop, Bamako, Mali.",
    "about.adr.3.t": "Heritage",
    "about.adr.3.d": "Bead Museum, Mopti — currently closed for security reasons.",
    "about.adr.4.t": "Contact",
    "about.adr.4.d": "farafinatigne@gmail.com<br>+223 76 87 06 95 · +223 65 45 02 02",

    "contact.title": "Contact",
    "contact.eyebrow": "Let's talk orders",
    "contact.h1a": "Write to us, we",
    "contact.h1b": "answer",
    "contact.lead": "A question on a reference, a quote, a container to prepare: WhatsApp is fastest, e-mail is most complete.",
    "contact.addr": "Address",
    "contact.addrv": "Mopti — Sévaré, Rue RN6<br>Imm. Farafinatignɛ, BP 65<br>Mali",
    "contact.phone": "Phone & WhatsApp",
    "contact.mail": "E-mail",
    "contact.hours": "Opening hours",
    "contact.hoursv": "Monday – Saturday, 8 am – 6 pm (GMT)",
    "contact.social": "Social",
    "contact.form.title": "Contact form",
    "contact.form.name": "Full name",
    "contact.form.company": "Company",
    "contact.form.email": "E-mail address",
    "contact.form.country": "Country",
    "contact.form.subject": "Subject",
    "contact.form.msg": "Your message",
    "contact.form.msgph": "References, quantities, destination…",
    "contact.form.send": "Send the message",
    "contact.form.ok": "Thank you! Your mail app opens with the message ready.",
    "contact.form.err": "Please fill in the required fields.",
    "contact.wa": "Open WhatsApp",

    "foot.tag": "The excellence of Malian craft, from the heart of the Delta to the rest of the world.",
    "foot.nav": "Navigation",
    "foot.cats": "Our ranges",
    "foot.contact": "Contact",
    "foot.rights": "All rights reserved.",
    "foot.top": "Back to top",

    "misc.wa": "Chat on WhatsApp",
    "misc.close": "Close",
    "misc.required": "required"
  }
};

/* ---------- moteur ---------- */
const LANG_KEY = "ft-lang";

function getLang() {
  const url = new URLSearchParams(location.search).get("lang");
  if (url && I18N[url]) return url;
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && I18N[saved]) return saved;
  return (navigator.language || "fr").toLowerCase().startsWith("en") ? "en" : "fr";
}

let LANG = getLang();

function t(key, vars) {
  let s = (I18N[LANG] && I18N[LANG][key]) || (I18N.fr[key] || key);
  if (vars) Object.keys(vars).forEach(k => { s = s.replace("{" + k + "}", vars[k]); });
  return s;
}

function applyI18n(root) {
  (root || document).querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const attr = el.getAttribute("data-i18n-attr");
    const val = t(key);
    if (attr) el.setAttribute(attr, val.replace(/<[^>]+>/g, " "));
    else el.innerHTML = val;
  });
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-lang-btn]").forEach(b => {
    b.classList.toggle("is-active", b.getAttribute("data-lang-btn") === LANG);
    b.setAttribute("aria-pressed", b.getAttribute("data-lang-btn") === LANG);
  });
}

function setLang(lang) {
  if (!I18N[lang] || lang === LANG) return;
  LANG = lang;
  localStorage.setItem(LANG_KEY, lang);
  applyI18n();
  document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
}
