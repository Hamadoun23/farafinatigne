/* =========================================================
   Farafinatignɛ — source unique de vérité des produits
   Prix : tarifs GROS en euros, repris de la brochure officielle.
   price: null  ->  affiché « Prix sur demande / Price on request »
   unit :  piece | pair | set10 | set12 | set20 | set50 | set60 | douz10 | douz100 | metre
   ========================================================= */

const CATEGORIES = [
  {
    id: "bijoux",
    fr: "Bijoux", en: "Jewellery",
    subs: [
      { id: "colliers", fr: "Colliers", en: "Necklaces" },
      { id: "bracelets", fr: "Bracelets", en: "Bracelets" },
      { id: "boucles", fr: "Boucles d'oreilles", en: "Earrings" },
      { id: "bagues", fr: "Bagues", en: "Rings" },
      { id: "earcuffs", fr: "Earcuffs", en: "Ear cuffs" }
    ]
  },
  {
    id: "textile",
    fr: "Textile & Mode", en: "Textile & Fashion",
    subs: [
      { id: "tissus", fr: "Tissus", en: "Fabrics" },
      { id: "coussins", fr: "Coussins", en: "Pillows" },
      { id: "couvertures", fr: "Couvertures & Plaids", en: "Blankets & Throws" },
      { id: "tshirts", fr: "T-shirts", en: "T-shirts" },
      { id: "tuniques", fr: "Tuniques & ponchos", en: "Tunics & ponchos" },
      { id: "sacs", fr: "Sacs & bagagerie", en: "Bags & luggage" },
      { id: "mode", fr: "Mode & accessoires", en: "Fashion & accessories" }
    ]
  },
  {
    id: "decor",
    fr: "Décor & Art", en: "Decor & Art",
    subs: [
      { id: "pieces", fr: "Pièces spéciales", en: "Special pieces" },
      { id: "objets", fr: "Objets de décoration", en: "Decorative objects" },
      /* sous-gamme demandée par le client (août 2026) */
      { id: "portecles", fr: "Porte-clés", en: "Keyrings" },
      /* déplacé depuis Textile & Mode à la demande du client (août 2026) */
      { id: "chemins", fr: "Chemins de table", en: "Table runners" }
    ]
  }
];

const PRODUCTS = [
  /* ============ BIJOUX · BOUCLES D'OREILLES ============ */
  /* Le lot export : les modèles gardent chacun leur prix ci-dessous,
     cette carte s'ajoute pour l'acheteur qui prend un panachage sans
     choisir modèle par modèle. */
  {
    id: "bo-assortiment", ref: "FT-BJ-LOT", cat: "bijoux", sub: "boucles", img: "boucle-fulani-creole",
    price: null, unit: "lot", setQty: 10, tag: "gros",
    gallery: [
      "boucle-fulani-creole",
      "boucle-fulani-twist",
      "boucle-fulani-boule",
      "boucle-ankh",
      "boucle-ankh-laiton",
      "boucle-tombouctou",
      "boucle-gao",
      "boucle-gye-nyame",
      "boucle-gye-nyame-laiton",
      "boucle-sankofa",
      "boucle-fulani-laiton",
      "boucle-cauri-fama",
      "boucle-cauri-sakolo",
      "boucle-touareg-pierre",
      "boucle-medaille-touareg"
    ],
    fr: { name: "Assortiment de 10 paires, modèles panachés", desc: "Dix paires choisies à l'atelier dans toute la collection ci-dessous : Fulani, Ankh, cauris, Touareg. Pour commander un modèle précis, prenez sa fiche. Prix du lot sur demande." },
    en: { name: "Assortment of 10 pairs, mixed designs", desc: "Ten pairs picked at the workshop from the whole collection below: Fulani, Ankh, cowrie, Tuareg. To order one specific design, use its own listing. Lot price on request." }
  },

  {
    id: "bo-fulani-creole", cat: "bijoux", sub: "boucles", img: "boucle-fulani-creole",
    price: 2.99, from: true, unit: "pair", tag: "signature", sizes: "XXS → XXL",
    fr: { name: "Boucles Fulani créoles", desc: "La pièce emblème du Sahel, martelée à la main dans du laiton recyclé. Sept tailles, de 2 cm à 9 cm. Or 2,99 € → 14 € · Argent 3,50 € → 16 €." },
    en: { name: "Fulani hoop earrings", desc: "The Sahel's signature piece, hand-hammered from recycled brass. Seven sizes, 2 cm to 9 cm. Gold €2.99 → €14 · Silver €3.50 → €16." }
  },
  {
    id: "bo-fulani-twist", cat: "bijoux", sub: "boucles", img: "boucle-fulani-twist",
    price: 4, unit: "pair", tag: "signature",
    fr: { name: "Boucles Fulani Twist", desc: "Torsade de laiton doré travaillée à chaud. Or 4 € · Argent 5 €." },
    en: { name: "Fulani Twist earrings", desc: "Hot-worked twisted brass. Gold €4 · Silver €5." }
  },
  {
    id: "bo-fulani-boule", cat: "bijoux", sub: "boucles", img: "boucle-fulani-boule",
    price: 4, unit: "pair",
    fr: { name: "Boucles Boule Fulani long", desc: "Navette allongée en laiton poli, crochet argenté. Or 4 € · Argent 5 €." },
    en: { name: "Long Fulani drop earrings", desc: "Elongated polished brass drop, silver hook. Gold €4 · Silver €5." }
  },
  {
    id: "bo-ankh", cat: "bijoux", sub: "boucles", img: "boucle-ankh",
    price: 4, unit: "pair",
    fr: { name: "Boucles Ankh", desc: "Croix de vie égyptienne découpée et ciselée dans du laiton recyclé." },
    en: { name: "Ankh earrings", desc: "Egyptian cross of life, cut and chiselled from recycled brass." }
  },
  {
    id: "bo-ankh-laiton", cat: "bijoux", sub: "boucles", img: "boucle-ankh-laiton",
    price: 4, unit: "pair",
    fr: { name: "Boucles Ankh martelées", desc: "Version large de la croix Ankh, surface martelée au marteau à panne." },
    en: { name: "Hammered Ankh earrings", desc: "Wide version of the Ankh cross with a hand-hammered surface." }
  },
  {
    id: "bo-tombouctou", cat: "bijoux", sub: "boucles", img: "boucle-tombouctou",
    price: 5, unit: "pair",
    fr: { name: "Boucles Tombouctou", desc: "Argent gravé au burin, motif touareg de la boucle de Tombouctou." },
    en: { name: "Timbuktu earrings", desc: "Chisel-engraved silver, Tuareg pattern from Timbuktu." }
  },
  {
    id: "bo-gao", cat: "bijoux", sub: "boucles", img: "boucle-gao",
    price: 4, unit: "pair",
    fr: { name: "Boucles Gao", desc: "Silhouette touareg gravée, argent poli sur crochet inoxydable." },
    en: { name: "Gao earrings", desc: "Engraved Tuareg silhouette, polished silver on stainless hook." }
  },
  {
    id: "bo-gye-nyame", cat: "bijoux", sub: "boucles", img: "boucle-gye-nyame",
    price: 4, unit: "pair",
    fr: { name: "Boucles Gye Nyame", desc: "Symbole adinkra « seul Dieu », laiton recyclé poinçonné." },
    en: { name: "Gye Nyame earrings", desc: "Adinkra symbol \"except God\", punched recycled brass." }
  },
  {
    id: "bo-gye-nyame-laiton", cat: "bijoux", sub: "boucles", img: "boucle-gye-nyame-laiton",
    price: 4, unit: "pair",
    fr: { name: "Boucles Gye Nyame larges", desc: "Grand format du symbole adinkra, laiton doré finement piqueté." },
    en: { name: "Large Gye Nyame earrings", desc: "Oversized adinkra symbol in finely stippled golden brass." }
  },
  {
    id: "bo-sankofa", cat: "bijoux", sub: "boucles", img: "boucle-sankofa",
    price: 4, unit: "pair",
    fr: { name: "Boucles Sankofa", desc: "L'oiseau qui regarde en arrière, gravé à la main dans l'argent." },
    en: { name: "Sankofa bird earrings", desc: "The bird looking back, hand-engraved in silver." }
  },
  {
    id: "bo-fulani-laiton", cat: "bijoux", sub: "boucles", img: "boucle-fulani-laiton",
    price: 6.99, unit: "pair",
    fr: { name: "Boucles Fulani M", desc: "Créole Fulani taille M (4,4 – 5,5 cm), laiton doré poli. Or 6,99 € · Argent 8 €." },
    en: { name: "Fulani earrings, size M", desc: "Fulani hoop size M (4.4 – 5.5 cm), polished golden brass. Gold €6.99 · Silver €8." }
  },
  {
    id: "bo-cauri-fama", cat: "bijoux", sub: "boucles", img: "boucle-cauri-fama",
    price: 3, unit: "pair", tag: "best",
    fr: { name: "Boucles Cauri Fama", desc: "Fleur de six cauris cousus main sur âme de coton tressé." },
    en: { name: "Cauri Fama earrings", desc: "Six-cowrie flower hand-sewn on a braided cotton core." }
  },
  {
    id: "bo-cauri-sakolo", cat: "bijoux", sub: "boucles", img: "boucle-cauri-sakolo",
    price: 3, unit: "pair",
    fr: { name: "Boucles Cauri Sakolo", desc: "Colonne de cauris alternés et perles noires, longueur 9 cm." },
    en: { name: "Cauri Sakolo earrings", desc: "Column of alternating cowries and black beads, 9 cm long." }
  },
  {
    id: "bo-touareg-pierre", cat: "bijoux", sub: "boucles", img: "boucle-touareg-pierre",
    price: null, unit: "pair",
    fr: { name: "Boucles Touareg pierre verte", desc: "Argent et pierre semi-précieuse sertie, pièce d'atelier." },
    en: { name: "Tuareg earrings with green stone", desc: "Silver with set semi-precious stone, workshop piece." }
  },
  {
    id: "bo-medaille", cat: "bijoux", sub: "boucles", img: "boucle-medaille-touareg",
    price: null, unit: "pair",
    fr: { name: "Boucles médaille touareg", desc: "Disque d'argent gravé, incrustations de laiton et cuivre." },
    en: { name: "Tuareg medallion earrings", desc: "Engraved silver disc with brass and copper inlays." }
  },

  /* ============ BIJOUX · COLLIERS ============ */
  {
    id: "co-fulani-large", cat: "bijoux", sub: "colliers", img: "collier-fulani-large",
    price: 18, unit: "piece", tag: "signature",
    fr: { name: "Collier Fulani large", desc: "Plastron de laiton martelé au feu, monté sur jonc rigide. Or 18 € · grand modèle 20 €." },
    en: { name: "Large Fulani necklace", desc: "Fire-hammered brass breastplate on a rigid collar. Gold €18 · large model €20." }
  },
  {
    id: "co-laiton-martele", cat: "bijoux", sub: "colliers", img: "collier-laiton-martele",
    price: 12, unit: "piece",
    fr: { name: "Collier laiton martelé", desc: "Plastron étroit en laiton recyclé, martelé et poli à la main." },
    en: { name: "Hammered brass necklace", desc: "Narrow recycled-brass collar, hand-hammered and polished." }
  },
  {
    id: "co-argent-martele", cat: "bijoux", sub: "colliers", img: "collier-argent-martele",
    price: 14, unit: "piece",
    fr: { name: "Collier argent martelé", desc: "Version argent du plastron Fulani, sur chaîne double." },
    en: { name: "Hammered silver necklace", desc: "Silver version of the Fulani collar on a double chain." }
  },
  {
    id: "co-cauri-massaye", cat: "bijoux", sub: "colliers", img: "collier-cauri-massaye",
    price: 22, unit: "piece", tag: "piece-speciale",
    fr: { name: "Collier cauri Massaye", desc: "Grand plastron de cauris cousus rang par rang. Environ 300 coquillages, trois jours de travail." },
    en: { name: "Massaye cowrie necklace", desc: "Large cowrie breastplate sewn row by row. Around 300 shells, three days of work." }
  },
  {
    id: "co-cauri-3force", cat: "bijoux", sub: "colliers", img: "collier-cauri-3force",
    price: 15, unit: "piece",
    fr: { name: "Collier cauri 3 force", desc: "Plastron triangulaire à trois pointes, cauris blanchis au soleil." },
    en: { name: "Cowrie necklace, 3 force", desc: "Three-point triangular breastplate, sun-bleached cowries." }
  },
  {
    id: "co-coupe-coupe-nb", cat: "bijoux", sub: "colliers", img: "collier-coupe-coupe-nb",
    price: 8, unit: "piece",
    fr: { name: "Collier Coupé-coupé 10 fils", desc: "Dix rangs noir et blanc, montage souple à nouer. Sautoir 3 fils : 6 €." },
    en: { name: "Coupé-coupé necklace, 10 strands", desc: "Ten black-and-white strands, soft tie fastening. 3-strand long necklace: €6." }
  },
  {
    id: "co-takayala", cat: "bijoux", sub: "colliers", img: "collier-takayala",
    price: 25, unit: "piece", tag: "piece-speciale",
    fr: { name: "Collier Takayala 20 fils", desc: "Vingt fils chargés de perles anciennes, verre, os et graines. Pièce unique par lot." },
    en: { name: "Takayala necklace, 20 strands", desc: "Twenty strands loaded with antique beads, glass, bone and seeds. One of a kind per batch." }
  },
  {
    id: "co-cuir-degrade", cat: "bijoux", sub: "colliers", img: "collier-cuir-degrade",
    price: 20, unit: "piece", tag: "best",
    fr: { name: "Collier cuir dégradé 100 brins", desc: "Cent brins de cuir de chèvre teints en dégradé, montés sur nœud plat." },
    en: { name: "Gradient leather necklace, 100 strands", desc: "One hundred goat-leather strands, gradient dyed, flat-knot mounted." }
  },
  {
    id: "co-cuir-tresse", cat: "bijoux", sub: "colliers", img: "collier-cuir-tresse",
    price: 6, unit: "set10", setQty: 10, setPrice: 60,
    fr: { name: "Collier cuir tressé S", desc: "Jonc de cuir tressé serré, teinture végétale. Vendu par lot de 10 : 60 €." },
    en: { name: "Braided leather necklace, S", desc: "Tightly braided leather torque, vegetable-dyed. Sold in sets of 10: €60." }
  },
  {
    id: "co-cuir-tresse-noir", cat: "bijoux", sub: "colliers", img: "collier-cuir-tresse-noir",
    price: 6, unit: "set10", setQty: 10, setPrice: 60,
    fr: { name: "Collier cuir tressé noir", desc: "Le même jonc en cuir noir mat, tressage huit brins. Lot de 10 : 60 €." },
    en: { name: "Black braided leather necklace", desc: "The same torque in matte black leather, eight-strand braid. Set of 10: €60." }
  },
  {
    id: "co-cristal-m", cat: "bijoux", sub: "colliers", img: "collier-cristal-m",
    price: 3, unit: "set10", setQty: 10, setPrice: 30,
    fr: { name: "Collier cristal pâte de verre M", desc: "Sautoir trois rangs en perles de verre multicolores. Lot de 10 : 30 €." },
    en: { name: "Glass-paste necklace, M", desc: "Three-strand long necklace in multicolour glass beads. Set of 10: €30." }
  },
  {
    id: "co-flipflop", cat: "bijoux", sub: "colliers", img: "collier-flipflop",
    price: 8, unit: "piece",
    fr: { name: "Collier flipflop 10 fils", desc: "Perles taillées dans des tongs récupérées à Mopti. 10 fils 8 € · 20 fils 15 €." },
    en: { name: "Flip-flop necklace, 10 strands", desc: "Beads cut from flip-flops collected in Mopti. 10 strands €8 · 20 strands €15." }
  },
  {
    id: "co-symbole-bronze", cat: "bijoux", sub: "colliers", img: "collier-symbole-bronze",
    price: 20, unit: "piece", tag: "piece-speciale",
    fr: { name: "Collier symbole Ankh, bronze", desc: "Pendentif de bronze coulé à la cire perdue, cordon de cuir tressé." },
    en: { name: "Ankh symbol necklace, bronze", desc: "Lost-wax cast bronze pendant on a braided leather cord." }
  },
  {
    id: "co-masque-bronze", cat: "bijoux", sub: "colliers", img: "collier-masque-bronze",
    price: 20, unit: "piece",
    fr: { name: "Collier masque, bronze", desc: "Masque baoulé miniature coulé à la cire perdue par les forgerons de Sévaré." },
    en: { name: "Mask necklace, bronze", desc: "Miniature Baule mask, lost-wax cast by the smiths of Sévaré." }
  },
  {
    id: "co-sankofa-bronze", cat: "bijoux", sub: "colliers", img: "collier-sankofa-bronze",
    price: 20, unit: "piece",
    fr: { name: "Collier Sankofa, bronze", desc: "L'oiseau Sankofa en bronze massif, sur lien de cuir noir." },
    en: { name: "Sankofa necklace, bronze", desc: "Solid bronze Sankofa bird on a black leather cord." }
  },
  {
    id: "co-gye-nyame-bronze", cat: "bijoux", sub: "colliers", img: "collier-gye-nyame-bronze",
    price: 20, unit: "piece",
    fr: { name: "Collier Gye Nyame, bronze", desc: "Grand symbole adinkra en bronze, cordon coton ciré réglable." },
    en: { name: "Gye Nyame necklace, bronze", desc: "Large adinkra symbol in bronze, adjustable waxed cotton cord." }
  },
  {
    id: "co-ankh-bois", cat: "bijoux", sub: "colliers", img: "collier-ankh-bois",
    price: 20, unit: "piece",
    fr: { name: "Collier Ankh bois & bronze", desc: "Croix de vie sculptée dans l'ébène, bagues de bronze, cordon tressé." },
    en: { name: "Wood & bronze Ankh necklace", desc: "Cross of life carved in ebony with bronze rings, braided cord." }
  },
  {
    id: "co-cauri-coffret", cat: "bijoux", sub: "colliers", img: "collier-cauri-parure-boite",
    price: null, unit: "lot", tag: "nouveau",
    fr: { name: "Colliers cauris, coffret", desc: "Quatre plastrons de cauris présentés en coffret bois, prêts pour la vitrine. Composition au choix." },
    en: { name: "Cowrie necklaces, boxed set", desc: "Four cowrie breastplates presented in a wooden box, ready for display. Composition to order." }
  },
  {
    id: "co-perles-assortiment", cat: "bijoux", sub: "colliers", img: "collier-buste-peint",
    price: null, unit: "lot", tag: "nouveau",
    fr: { name: "Colliers de perles, assortiment", desc: "Sautoirs et ras-de-cou en perles de verre et graines, présentés sur bustes peints à la main." },
    en: { name: "Bead necklaces, assortment", desc: "Long necklaces and chokers in glass beads and seeds, shown on hand-painted busts." }
  },
  {
    id: "co-plastron-perles", cat: "bijoux", sub: "colliers", img: "collier-buste-peint-2",
    price: null, unit: "lot", tag: "nouveau",
    fr: { name: "Plastrons perlés, assortiment", desc: "Plastrons à franges et pendentifs de bronze, montés sur perles de rocaille. Coloris assortis." },
    en: { name: "Beaded breastplates, assortment", desc: "Fringed breastplates with bronze pendants on seed beads. Assorted colours." }
  },

  /* ============ BIJOUX · BRACELETS ============ */
  {
    id: "br-fulani-twist", cat: "bijoux", sub: "bracelets", img: "bracelet-fulani-twist",
    price: 4, unit: "piece", tag: "best",
    fr: { name: "Bracelet Fulani Twist", desc: "Jonc ouvert torsadé, laiton recyclé. Or 4 € · Argent 5 €." },
    en: { name: "Fulani Twist bracelet", desc: "Open twisted bangle in recycled brass. Gold €4 · Silver €5." }
  },
  {
    id: "br-fulani-manchette", cat: "bijoux", sub: "bracelets", img: "bracelet-fulani-manchette",
    price: 10, unit: "piece",
    fr: { name: "Manchette Fulani large", desc: "Manchette lisse de 4 cm, martelée puis polie. Or 10 € · Argent 12 €." },
    en: { name: "Wide Fulani cuff", desc: "Smooth 4 cm cuff, hammered then polished. Gold €10 · Silver €12." }
  },
  {
    id: "br-touareg", cat: "bijoux", sub: "bracelets", img: "bracelet-touareg",
    price: 5, unit: "piece",
    fr: { name: "Bracelet Touareg", desc: "Jonc de laiton incrusté d'ébène et de fils de couleur, signature touareg." },
    en: { name: "Tuareg bracelet", desc: "Brass bangle inlaid with ebony and coloured threads, a Tuareg signature." }
  },
  {
    id: "br-laiton-recycle", cat: "bijoux", sub: "bracelets", img: "bracelet-laiton-recycle",
    price: 15, unit: "set4", setQty: 4, setPrice: 15,
    fr: { name: "Bracelets laiton recyclé, lot de 4", desc: "Quatre joncs ciselés de motifs différents. Le lot de 4 : 15 €." },
    en: { name: "Recycled brass bracelets, set of 4", desc: "Four bangles, each with a different chiselled pattern. Set of 4: €15." }
  },
  {
    id: "br-laiton-fin", cat: "bijoux", sub: "bracelets", img: "bracelet-laiton-fin",
    price: 5, unit: "piece",
    fr: { name: "Bracelet laiton ciselé fin", desc: "Jonc fin ciselé au burin, embouts boule. Laiton recyclé doré." },
    en: { name: "Fine chiselled brass bracelet", desc: "Slim chisel-worked bangle with ball ends. Golden recycled brass." }
  },
  {
    id: "br-flipflop-lot", cat: "bijoux", sub: "bracelets", img: "bracelet-flipflop-lot",
    price: 300, unit: "douz100", setQty: 1200, setPrice: 300, tag: "gros",
    fr: { name: "Bracelets flipflop, 100 douzaines", desc: "Le grand lot export : 1 200 bracelets en plastique recyclé, coloris assortis. 300 €." },
    en: { name: "Flip-flop bracelets, 100 dozen", desc: "The big export lot: 1,200 recycled-plastic bracelets, assorted colours. €300." }
  },
  {
    id: "br-flipflop-fin", cat: "bijoux", sub: "bracelets", img: "bracelet-flipflop-fin",
    price: 30, unit: "douz10", setQty: 120, setPrice: 30,
    fr: { name: "Bracelets Nate Mopti, 10 douzaines", desc: "Joncs fins tressés serré, 120 pièces coloris mixtes. 30 €." },
    en: { name: "Nate Mopti bracelets, 10 dozen", desc: "Slim tightly-woven bangles, 120 pieces in mixed colours. €30." }
  },
  {
    id: "br-nate-large", cat: "bijoux", sub: "bracelets", img: "bracelet-nate-large",
    price: 50, unit: "set50", setQty: 50, setPrice: 50,
    fr: { name: "Bracelets Nate recyclés, lot de 50", desc: "Joncs larges tressés de bandes de plastique, motifs damier et rayures. 50 €." },
    en: { name: "Recycled Nate bracelets, set of 50", desc: "Wide bangles woven from plastic strips, checks and stripes. €50." }
  },
  {
    id: "br-nate-mopti", cat: "bijoux", sub: "bracelets", img: "bracelet-nate-mopti",
    price: 30, unit: "douz10", setQty: 120, setPrice: 30,
    fr: { name: "Bracelets Nate Mopti fins", desc: "Le modèle fin qui s'empile par dizaines. 10 douzaines, coloris mixtes. 30 €." },
    en: { name: "Fine Nate Mopti bracelets", desc: "The slim model made to be stacked. 10 dozen, mixed colours. €30." }
  },
  {
    id: "br-perles-large", cat: "bijoux", sub: "bracelets", img: "bracelet-perles-large",
    price: 80, unit: "set20", setQty: 20, setPrice: 80,
    fr: { name: "Bracelets larges perlés, lot de 20", desc: "Manchettes de cuir entièrement brodées de perles de rocaille. Lot de 20 : 80 €." },
    en: { name: "Wide beaded bracelets, set of 20", desc: "Leather cuffs fully embroidered with seed beads. Set of 20: €80." }
  },
  {
    id: "br-cuir-lot", cat: "bijoux", sub: "bracelets", img: "bracelet-cuir-lot",
    price: 20, unit: "set10", setQty: 10, setPrice: 20,
    fr: { name: "Bracelets cuir tressé, lot de 10", desc: "Joncs de cuir de chèvre tressé, dix couleurs végétales. 20 €." },
    en: { name: "Braided leather bracelets, set of 10", desc: "Braided goat-leather bangles, ten vegetable-dyed colours. €20." }
  },
  {
    id: "br-cauri-sakolo", cat: "bijoux", sub: "bracelets", img: "bracelet-cauri-sakolo",
    price: 4, unit: "piece",
    fr: { name: "Bracelet cauri Sakolo", desc: "Rang unique de cauris montés en épi sur cordon coulissant." },
    en: { name: "Sakolo cowrie bracelet", desc: "Single row of cowries in a herringbone on a sliding cord." }
  },
  {
    id: "br-cauri-2sakolo", cat: "bijoux", sub: "bracelets", img: "bracelet-cauri-2sakolo",
    price: 8, unit: "piece",
    fr: { name: "Bracelet cauri 2 Sakolo", desc: "Double rang de cauris, perles noires en séparation. Modèle 2 tours : 5 €." },
    en: { name: "Two-row Sakolo cowrie bracelet", desc: "Double row of cowries with black bead spacers. Two-turn model: €5." }
  },

  {
    id: "br-jonc-tombouctou", cat: "bijoux", sub: "bracelets", img: "bracelet-jonc-tombouctou",
    price: 5, unit: "piece",
    fr: { name: "Jonc laiton Tombouctou", desc: "Jonc plat gravé d'une croix du Sud entre deux frises de rayures, embouts boule." },
    en: { name: "Timbuktu brass bangle", desc: "Flat bangle engraved with a southern cross between two striped friezes, ball ends." }
  },
  {
    id: "br-jonc-ecailles", cat: "bijoux", sub: "bracelets", img: "bracelet-jonc-ecailles",
    price: 5, unit: "piece",
    fr: { name: "Jonc laiton écailles", desc: "Rangées de demi-lunes frappées au poinçon sur toute la largeur du jonc." },
    en: { name: "Scale-pattern brass bangle", desc: "Rows of punch-struck half-moons across the whole width of the bangle." }
  },
  {
    id: "br-jonc-arcades", cat: "bijoux", sub: "bracelets", img: "bracelet-jonc-arcades",
    price: 5, unit: "piece",
    fr: { name: "Jonc laiton arcades", desc: "Arcades gravées en frise continue, rappel des façades de banco de Djenné." },
    en: { name: "Arcade brass bangle", desc: "Arcades engraved as a continuous frieze, echoing the mud façades of Djenné." }
  },
  {
    id: "br-jonc-filigrane", cat: "bijoux", sub: "bracelets", img: "bracelet-jonc-filigrane",
    price: 5, unit: "piece",
    fr: { name: "Jonc laiton filigrane", desc: "Semis de losanges ciselés au burin, finition dorée polie à la main." },
    en: { name: "Filigree brass bangle", desc: "A scatter of chisel-cut diamonds, hand-polished golden finish." }
  },
  {
    id: "br-jonc-petales", cat: "bijoux", sub: "bracelets", img: "bracelet-jonc-petales",
    price: 5, unit: "piece",
    fr: { name: "Jonc laiton pétales", desc: "Frise de pétales et de perles gravés, jonc légèrement bombé." },
    en: { name: "Petal brass bangle", desc: "Frieze of engraved petals and beads on a gently domed bangle." }
  },
  {
    id: "br-jonc-dentelle", cat: "bijoux", sub: "bracelets", img: "bracelet-jonc-dentelle",
    price: 5, unit: "piece",
    fr: { name: "Jonc laiton dentelle", desc: "Dentelure fine courant sur toute la longueur, le modèle le plus léger de l'atelier." },
    en: { name: "Lace brass bangle", desc: "A fine serration running the full length, the lightest model in the workshop." }
  },
  {
    id: "br-jonc-lisse", cat: "bijoux", sub: "bracelets", img: "bracelet-jonc-lisse",
    price: 4, unit: "piece",
    fr: { name: "Jonc laiton lisse", desc: "Le jonc nu, martelé puis poli miroir. Se porte seul ou empilé par trois." },
    en: { name: "Plain brass bangle", desc: "The bare bangle, hammered then mirror-polished. Worn alone or stacked in threes." }
  },

  /* ============ BIJOUX · BAGUES ============ */
  {
    id: "ba-cauri-fama", cat: "bijoux", sub: "bagues", img: "bague-cauri-fama",
    price: 2.5, unit: "piece",
    fr: { name: "Bague Cauri Fama", desc: "Fleur de cauris montée sur anneau de laiton réglable." },
    en: { name: "Cauri Fama ring", desc: "Cowrie flower set on an adjustable brass ring." }
  },
  {
    id: "ba-laiton-recycle", cat: "bijoux", sub: "bagues", img: "bague-laiton-recycle",
    price: null, unit: "set",
    fr: { name: "Bagues plastique recyclé", desc: "Anneaux taillés dans la matière recyclée, coloris et tailles assortis. Vendues au lot." },
    en: { name: "Recycled plastic rings", desc: "Rings cut from recycled material, assorted colours and sizes. Sold by the lot." }
  },

  {
    id: "ba-arche-sahel", cat: "bijoux", sub: "bagues", img: "bague-arche-sahel",
    price: null, unit: "piece", tag: "signature", sizes: "Ajustable",
    fr: { name: "Bague Arche du Sahel", desc: "Plaque bombée coulée à la cire perdue, striée à la lime en arcs concentriques. Modèle #1000, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Sahel Arch ring", desc: "Lost-wax cast domed plate, file-struck in concentric arcs. Model #1000, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-cauri-croissant", cat: "bijoux", sub: "bagues", img: "bague-cauri-croissant",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague Cauri croissant", desc: "Cauri du fleuve serti au centre d'un croissant ouvert. Modèle #1001, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Crescent cowrie ring", desc: "River cowrie set inside an open crescent. Model #1001, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-masque-double", cat: "bijoux", sub: "bagues", img: "bague-masque-double",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague double masque", desc: "Masque allongé et barre ajourée, portée sur deux doigts. Modèle #1002, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Double mask ring", desc: "Elongated mask and pierced bar, worn across two fingers. Model #1002, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-masque-marka", cat: "bijoux", sub: "bagues", img: "bague-masque-marka",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague masque Marka", desc: "Visage marka coulé à la cire perdue, scarifications au front. Modèle #1003, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Marka mask ring", desc: "Lost-wax cast Marka face with brow scarifications. Model #1003, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-masque-dan", cat: "bijoux", sub: "bagues", img: "bague-masque-dan",
    price: null, unit: "piece", tag: "piece-speciale", sizes: "Ajustable",
    fr: { name: "Bague masque Dan", desc: "Masque cerné d'une couronne de métal filé, deux anneaux de suspension. Modèle #1004, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Dan mask ring", desc: "Mask ringed by a drawn-metal crown with two suspension loops. Model #1004, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-toguna", cat: "bijoux", sub: "bagues", img: "bague-toguna",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague Toguna", desc: "Demi-lune et pilier martelés au burin, silhouette de la case à palabres dogon. Modèle #1005, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Toguna ring", desc: "Chisel-hammered half-moon and pillar, the outline of the Dogon palaver house. Model #1005, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-nefertiti-double", cat: "bijoux", sub: "bagues", img: "bague-nefertiti-double",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague Néfertiti double doigt", desc: "Profil de reine et barre ajourée montés sur un même anneau. Modèle #1006, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Two-finger Nefertiti ring", desc: "Queen's profile and pierced bar on a single band. Model #1006, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-peigne-duafe", cat: "bijoux", sub: "bagues", img: "bague-peigne-duafe",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague peigne Duafe", desc: "Symbole adinkra du peigne de bois, découpé et martelé à la main. Modèle #1007, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Duafe comb ring", desc: "The adinkra wooden-comb symbol, hand-cut and hammered. Model #1007, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-nefertiti", cat: "bijoux", sub: "bagues", img: "bague-nefertiti",
    price: null, unit: "piece", tag: "best", sizes: "Ajustable",
    fr: { name: "Bague Néfertiti", desc: "Le profil coiffé de la reine, coulé plein puis poli au chiffon. Modèle #1008, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Nefertiti ring", desc: "The queen's crowned profile, solid cast then cloth-polished. Model #1008, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-bouclier-grave", cat: "bijoux", sub: "bagues", img: "bague-bouclier-grave",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague bouclier gravée", desc: "Large plaque ovale ajourée d'un losange, gravée de chevrons touaregs. Modèle #1009, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Engraved shield ring", desc: "Wide oval plate pierced with a diamond, engraved with Tuareg chevrons. Model #1009, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-masque-os", cat: "bijoux", sub: "bagues", img: "bague-masque-os",
    price: null, unit: "piece", tag: "piece-speciale", sizes: "Ajustable",
    fr: { name: "Bague masque os & ébène", desc: "Masque incrusté d'os et d'ébène dans un sertissage de bronze. Modèle #1010, taille ajustable." },
    en: { name: "Bone & ebony mask ring", desc: "Mask inlaid with bone and ebony in a bronze bezel. Model #1010, adjustable size." }
  },
  {
    id: "ba-cauri-demilune", cat: "bijoux", sub: "bagues", img: "bague-cauri-demilune",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague Cauri demi-lune", desc: "Cauri serti face à une demi-lune piquetée au poinçon. Modèle #1011, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Half-moon cowrie ring", desc: "Set cowrie facing a punch-stippled half-moon. Model #1011, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-cauri-cerclee", cat: "bijoux", sub: "bagues", img: "bague-cauri-cerclee",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague Cauri cerclée", desc: "Cauri suspendu au centre d'un grand cercle plein. Modèle #1012, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Circled cowrie ring", desc: "Cowrie suspended inside a large solid circle. Model #1012, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-nefertiti-cerclee", cat: "bijoux", sub: "bagues", img: "bague-nefertiti-cerclee",
    price: null, unit: "piece", sizes: "Ajustable",
    fr: { name: "Bague Néfertiti cerclée", desc: "Le profil de la reine inscrit dans un anneau ouvert. Modèle #1013, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Circled Nefertiti ring", desc: "The queen's profile set within an open circle. Model #1013, adjustable size. Recycled bronze or copper ♻️." }
  },
  {
    id: "ba-cauri-sertie", cat: "bijoux", sub: "bagues", img: "bague-cauri-sertie",
    price: null, unit: "piece", tag: "nouveau", sizes: "Ajustable",
    fr: { name: "Bague Cauri sertie", desc: "Le cauri seul, serti clos sur un anneau lisse. Le modèle le plus commandé de la série. Modèle #1015, taille ajustable. Bronze ou cuivre recyclé ♻️." },
    en: { name: "Set cowrie ring", desc: "The cowrie alone, closed-set on a plain band. The most ordered model of the series. Model #1015, adjustable size. Recycled bronze or copper ♻️." }
  },

  /* ============ BIJOUX · EARCUFFS ============ */
  {
    id: "ec-cauri", cat: "bijoux", sub: "earcuffs", img: "earcuff-cauri",
    price: 4, unit: "piece", tag: "signature",
    fr: { name: "Earcuff Cauri Sorry", desc: "Arc de laiton spiralé habillé de neuf cauris, se porte sans perçage." },
    en: { name: "Cauri Sorry ear cuff", desc: "Spiralled brass arc dressed with nine cowries, no piercing needed." }
  },
  {
    id: "ec-cauri-porte", cat: "bijoux", sub: "earcuffs", img: "earcuff-cauri-porte",
    price: 4, unit: "piece",
    fr: { name: "Earcuff Cauri, modèle long", desc: "Le même arc en version longue, épouse tout le bord de l'oreille." },
    en: { name: "Cauri ear cuff, long model", desc: "The same arc in a long version, hugging the whole ear rim." }
  },

  /* ============ TEXTILE · TISSUS ============ */
  {
    id: "tx-echarpe-indigo", cat: "textile", sub: "tissus", img: "echarpe-indigo-dogon",
    price: 12, unit: "piece", tag: "signature",
    fr: { name: "Écharpe indigo Dogon, 2 yards", desc: "Coton teint à l'indigo naturel, noué-ligaturé à la main pays dogon. 2 yards." },
    en: { name: "Dogon indigo scarf, 2 yards", desc: "Cotton dyed with natural indigo, hand tie-dyed in Dogon country. 2 yards." }
  },
  {
    id: "tx-echarpe-bogolan", cat: "textile", sub: "tissus", img: "echarpe-bogolan",
    price: 12, unit: "piece", tag: "best",
    fr: { name: "Écharpe bogolan (mudcloth), 2 yards", desc: "Coton filé main, peint à la boue fermentée et aux écorces. 2 yards." },
    en: { name: "Bogolan (mudcloth) scarf, 2 yards", desc: "Hand-spun cotton painted with fermented mud and bark. 2 yards." }
  },
  {
    id: "tx-echarpe-segou", cat: "textile", sub: "tissus", img: "echarpe-bogolan-segou",
    price: 15, unit: "piece",
    fr: { name: "Écharpe bogolan de Ségou", desc: "Le bogolan de Ségou et ses figures libres, palette terre et ocre." },
    en: { name: "Ségou bogolan scarf", desc: "Ségou bogolan with its free figures, earth and ochre palette." }
  },
  {
    id: "tx-pagne-indigo", cat: "textile", sub: "tissus", img: "pagne-indigo-dogon",
    price: 30, unit: "piece",
    fr: { name: "Pagne indigo Dogon, 4 mètres", desc: "Quatre mètres d'indigo noué-ligaturé, de quoi tailler un boubou complet." },
    en: { name: "Dogon indigo wrapper, 4 metres", desc: "Four metres of tie-dyed indigo, enough for a full boubou." }
  },
  {
    id: "tx-pagne-bogolan", cat: "textile", sub: "tissus", img: "pagne-bogolan-authentique",
    price: 25, unit: "piece",
    fr: { name: "Pagne bogolan authentique 170 × 120", desc: "Bandes de coton cousues main, motifs peints à la boue. 2 yards." },
    en: { name: "Authentic bogolan wrapper, 170 × 120", desc: "Hand-sewn cotton strips, mud-painted patterns. 2 yards." }
  },
  {
    id: "tx-bogolan-lot", cat: "textile", sub: "tissus", img: "tissu-bogolan-lot",
    price: null, unit: "lot", tag: "gros",
    fr: { name: "Bogolan au mètre, lot assorti", desc: "Assortiment de bogolans pour la revente ou la confection. Métrage et coloris sur demande." },
    en: { name: "Bogolan by the metre, assorted lot", desc: "Assorted bogolans for resale or making-up. Yardage and colours on request." }
  },
  {
    id: "tx-indigo-motif", cat: "textile", sub: "tissus", img: "tissu-indigo-motif",
    price: null, unit: "lot",
    fr: { name: "Indigo au mètre, lot assorti", desc: "Indigos noués-ligaturés, motifs losanges et cercles. Métrage sur demande." },
    en: { name: "Indigo by the metre, assorted lot", desc: "Tie-dyed indigos, diamond and circle patterns. Yardage on request." }
  },

  {
    id: "tx-bogolan-planche", cat: "textile", sub: "tissus", img: "tissu-bogolan-planche",
    price: null, unit: "piece",
    fr: { name: "Bogolans assortis, la planche", desc: "Bandes de bogolan cousues, coloris terre, safran, indigo et blanc. Au mètre ou à la pièce." },
    en: { name: "Assorted bogolans, the board", desc: "Sewn bogolan strips in earth, saffron, indigo and white. By the metre or the piece." }
  },
  {
    id: "tx-indigo-planche", cat: "textile", sub: "tissus", img: "tissu-indigo-planche",
    price: null, unit: "piece",
    fr: { name: "Indigos assortis, la planche", desc: "Indigos noués-ligaturés de Djenné, une dizaine de dessins. Au mètre ou à la pièce." },
    en: { name: "Assorted indigos, the board", desc: "Tie-dyed indigos from Djenné, around ten designs. By the metre or the piece." }
  },

  /* ============ TEXTILE · COUSSINS ============ */
  {
    id: "tx-coussin-blanc", cat: "textile", sub: "coussins", img: "coussin-bogolan-blanc",
    price: 8, unit: "piece",
    fr: { name: "Housse de coussin bogolan écru", desc: "Coton écru à motif triangle. S : 40×40 et 30×50 — 8 € · L : 50×50 et 40×60 — 12 €." },
    en: { name: "Natural bogolan pillow case", desc: "Natural cotton, triangle pattern. S: 40×40 and 30×50 — €8 · L: 50×50 and 40×60 — €12." }
  },
  {
    id: "tx-coussin-noir", cat: "textile", sub: "coussins", img: "coussin-bogolan-noir",
    price: 8, unit: "piece", tag: "best",
    fr: { name: "Housse de coussin bogolan noir", desc: "Bogolan noir à croix blanches, fermeture à rabat. S 8 € · L 12 €." },
    en: { name: "Black bogolan pillow case", desc: "Black bogolan with white crosses, envelope closure. S €8 · L €12." }
  },
  {
    id: "tx-coussin-lot", cat: "textile", sub: "coussins", img: "coussin-bogolan-lot",
    price: 8, unit: "piece",
    fr: { name: "Housses bogolan, assortiment", desc: "Assortiment ocre, terre et noir pour composer une collection. S 8 € · L 12 €." },
    en: { name: "Bogolan pillow cases, assortment", desc: "Ochre, earth and black assortment to build a collection. S €8 · L €12." }
  },
  {
    id: "tx-coussin-deco", cat: "textile", sub: "coussins", img: "coussin-bogolan-deco",
    price: 12, unit: "piece",
    fr: { name: "Housse de coussin bogolan L", desc: "Grand format 50×50 ou rectangle 40×60, motifs peints à la boue." },
    en: { name: "Bogolan pillow case, L", desc: "Large 50×50 or 40×60 rectangle, mud-painted patterns." }
  },

  /* ============ TEXTILE · COUVERTURES ============ */
  {
    id: "tx-couverture-bogolan", cat: "textile", sub: "couvertures", img: "pagne-bogolan-authentique",
    price: 25, unit: "piece",
    fr: { name: "Couverture bogolan 170 × 120", desc: "Le pagne bogolan authentique se pose aussi en jeté de lit ou plaid de canapé." },
    en: { name: "Bogolan blanket, 170 × 120", desc: "The authentic bogolan wrapper also works as a bed throw or sofa plaid." }
  },
  {
    id: "tx-couverture-indigo", cat: "textile", sub: "couvertures", img: "pagne-indigo-dogon",
    price: 30, unit: "piece",
    fr: { name: "Jeté indigo Dogon, 4 mètres", desc: "Quatre mètres d'indigo, en jeté de lit ou tenture murale." },
    en: { name: "Dogon indigo throw, 4 metres", desc: "Four metres of indigo, as a bed throw or wall hanging." }
  },

  /* ============ TEXTILE · MODE ============ */
  {
    id: "tx-chapeau-fulani", cat: "textile", sub: "mode", img: "chapeau-fulani",
    price: 15, unit: "piece",
    fr: { name: "Chapeau Fulani", desc: "Chapeau de berger peul tressé en paille, cuir teint et clous de laiton." },
    en: { name: "Fulani hat", desc: "Fulani herder's hat woven in straw, dyed leather and brass studs." }
  },
  {
    id: "tx-echarpe-portee", cat: "textile", sub: "mode", img: "echarpe-bogolan-portee",
    price: 12, unit: "piece",
    fr: { name: "Étole bogolan à franges", desc: "Écharpe longue à franges nouées, coton bogolan souple." },
    en: { name: "Fringed bogolan stole", desc: "Long scarf with knotted fringes, soft bogolan cotton." }
  },
  {
    id: "tx-boubou-capuche", cat: "textile", sub: "mode", img: "boubou-bogolan-capuche",
    price: null, unit: "piece", tag: "nouveau",
    fr: { name: "Boubou bogolan à capuche", desc: "Coton écru peint à la boue, capuche et bords effrangés, cauris cousus à l'encolure. Coupe unisexe." },
    en: { name: "Hooded bogolan boubou", desc: "Mud-painted natural cotton, hood and frayed edges, cowries sewn at the neckline. Unisex cut." }
  },
  {
    id: "tx-poncho-bogolan", cat: "textile", sub: "mode", img: "poncho-bogolan-cauri",
    price: null, unit: "piece", tag: "nouveau",
    fr: { name: "Poncho bogolan à cauris", desc: "Bogolan noir à motifs blancs, semé de cauris cousus main, franges au bas." },
    en: { name: "Cowrie bogolan poncho", desc: "Black bogolan with white patterns, scattered hand-sewn cowries, fringed hem." }
  },
  {
    id: "tx-tunique-bogolan", cat: "textile", sub: "mode", img: "tunique-bogolan",
    price: null, unit: "piece", tag: "nouveau",
    fr: { name: "Tunique bogolan", desc: "Tunique droite en bogolan noir, motifs losanges peints à la boue, franges au bas." },
    en: { name: "Bogolan tunic", desc: "Straight black bogolan tunic, mud-painted diamond patterns, fringed hem." }
  },
  {
    id: "tx-ensemble-bogolan", cat: "textile", sub: "mode", img: "ensemble-bogolan",
    price: null, unit: "piece", tag: "nouveau",
    fr: { name: "Ensemble bogolan turquoise", desc: "Veste et pantalon assortis en bogolan teint turquoise, motifs géométriques peints à la main." },
    en: { name: "Turquoise bogolan set", desc: "Matching jacket and trousers in turquoise-dyed bogolan, hand-painted geometric patterns." }
  },
  {
    id: "tx-coiffe-cauri", cat: "textile", sub: "mode", img: "coiffe-cauri",
    price: null, unit: "piece", tag: "nouveau",
    fr: { name: "Coiffe de cauris", desc: "Calotte entièrement brodée de cauris, franges tombantes. Pièce de cérémonie, plusieurs longueurs." },
    en: { name: "Cowrie headpiece", desc: "Cap fully embroidered with cowries and falling fringes. A ceremonial piece, several lengths." }
  },
  {
    id: "tx-coiffe-perlee", cat: "textile", sub: "mode", img: "coiffe-cauri-perlee",
    price: null, unit: "piece", tag: "nouveau",
    fr: { name: "Coiffe cauris & perles", desc: "Variante mêlant cauris, perles de verre et fils dorés, montée sur résille." },
    en: { name: "Cowrie & bead headpiece", desc: "Variant mixing cowries, glass beads and gold thread on a net base." }
  },


  /* ============ TEXTILE · T-SHIRTS ============
     Les t-shirts sont peints à la main : chaque motif est une pièce
     unique, on ne peut pas garantir un modèle précis en gros. Ils ne
     sont donc pas vendus à l'unité mais par assortiment de dix, les
     motifs étant choisis à l'atelier dans la collection ci-dessous. */
  {
    id: "ts-assortiment", ref: "FT-TX-LOT10", cat: "textile", sub: "tshirts", img: "tshirt-cauris",
    price: null, unit: "lot", setQty: 10, tag: "gros", sizes: "S → 4XL",
    gallery: [
      "tshirt-cauris",
      "tshirt-masque-ocre",
      "tshirt-labyrinthe",
      "tshirt-case-dogon",
      "tshirt-chasseur",
      "tshirt-diagonale-cauris",
      "tshirt-afrique-grecque",
      "tshirt-rosaces",
      "tshirt-afrique-chevrons",
      "tshirt-formes-ocre",
      "tshirt-triangles",
      "tshirt-chasseur-mouchete",
      "tshirt-symboles",
      "tshirt-damiers",
      "tshirt-triangles-fins",
      "tshirt-carre-grecque",
      "tshirt-semis-bogolan",
      "tshirt-gye-nyame"
    ],
    fr: { name: "Assortiment de 10 t-shirts bogolan", desc: "Dix t-shirts peints à la main sur coton écru, motifs assortis choisis à l'atelier. Chaque pièce étant unique, les modèles ne se commandent pas séparément. Tailles panachées de S à 4XL sur demande." },
    en: { name: "Assortment of 10 bogolan T-shirts", desc: "Ten hand-painted T-shirts on ecru cotton, an assorted mix picked at the workshop. Each piece is unique, so individual designs cannot be ordered separately. Mixed sizes from S to 4XL on request." }
  },

  /* ============ TEXTILE · TUNIQUES & PONCHOS ============
     Même règle que les t-shirts : chaque piece est peinte a la main,
     le motif ne se reproduit pas à l'identique et l'atelier ne peut
     pas garantir un modèle précis en gros. On vend donc un
     assortiment, dont la carte montre la collection où l'atelier
     puise. Tuniques et ponchos restent deux lots distincts : ce ne
     sont pas les mêmes vêtements. */
  {
    id: "tu-assortiment", ref: "FT-TX-LOT-TUN", cat: "textile", sub: "tuniques", img: "tunique-case-ocre",
    price: null, unit: "lot", setQty: 10, tag: "gros", sizes: "S → 4XL",
    gallery: [
      "tunique-case-ocre",
      "tunique-ecru-fine",
      "tunique-plastron-ocre",
      "tunique-case-safran",
      "tunique-case-brune",
      "tunique-indigo-spirales",
      "tunique-symboles",
      "tunique-chevrons",
      "tunique-animaux",
      "tunique-croix-noire",
      "tunique-damier-noir",
      "tunique-dashiki-ocre"
    ],
    fr: { name: "Assortiment de 10 tuniques bogolan", desc: "Dix tuniques peintes à la main sur coton filé main, motifs assortis choisis à l'atelier. Chaque pièce étant unique, les modèles ne se commandent pas séparément. Tailles panachées sur demande." },
    en: { name: "Assortment of 10 bogolan tunics", desc: "Ten hand-painted tunics on hand-spun cotton, an assorted mix picked at the workshop. Each piece is unique, so individual designs cannot be ordered separately. Mixed sizes on request." }
  },
  {
    id: "po-assortiment", ref: "FT-TX-LOT-PON", cat: "textile", sub: "tuniques", img: "poncho-capuche-terre",
    price: null, unit: "lot", setQty: 10, tag: "gros", sizes: "Taille unique",
    gallery: [
      "poncho-capuche-terre",
      "poncho-bordeaux-safran",
      "poncho-capuche-noire",
      "poncho-safran-bordeaux",
      "poncho-brun-plastron",
      "poncho-patchwork-jaune",
      "poncho-ecru-terre",
      "poncho-noir-terre",
      "poncho-patchwork-indigo"
    ],
    fr: { name: "Assortiment de 10 ponchos bogolan", desc: "Dix ponchos peints à la main, avec ou sans capuche, motifs assortis choisis à l'atelier. Chaque pièce étant unique, les modèles ne se commandent pas séparément." },
    en: { name: "Assortment of 10 bogolan ponchos", desc: "Ten hand-painted ponchos, hooded or open, an assorted mix picked at the workshop. Each piece is unique, so individual designs cannot be ordered separately." }
  },

  /* ============ TEXTILE · SACS & BAGAGERIE ============ */
  {
    id: "sc-cuir-bogolan", cat: "textile", sub: "sacs", img: "sac-cuir-bogolan-duo",
    price: null, unit: "piece", tag: "nouveau",
    fr: { name: "Sacs à dos cuir & bogolan", desc: "Cuir pleine fleur et panneaux de bogolan, rabat à boucle. Deux tailles." },
    en: { name: "Leather & bogolan backpacks", desc: "Full-grain leather with bogolan panels and a buckled flap. Two sizes." }
  },
  {
    id: "sc-roll-top", cat: "textile", sub: "sacs", img: "sac-roll-top-duo",
    price: null, unit: "piece", tag: "nouveau",
    fr: { name: "Sacs à dos roll-top", desc: "Fermeture roulee, toile enduite et bogolan ocre. Deux tailles." },
    en: { name: "Roll-top backpacks", desc: "Rolled closure, coated canvas and ochre bogolan. Two sizes." }
  },
  {
    id: "sc-marine", cat: "textile", sub: "sacs", img: "sac-marine-duo",
    price: null, unit: "piece",
    fr: { name: "Sacs à dos marine", desc: "Toile marine, poches avant en bogolan jaune, sangles cuir." },
    en: { name: "Navy backpacks", desc: "Navy canvas, yellow bogolan front pockets, leather straps." }
  },
  {
    id: "sc-bordeaux", cat: "textile", sub: "sacs", img: "sac-bordeaux-duo",
    price: null, unit: "piece",
    fr: { name: "Sacs à dos bordeaux", desc: "Cuir bordeaux et bogolan ocre, deux poches latérales." },
    en: { name: "Burgundy backpacks", desc: "Burgundy leather and ochre bogolan with two side pockets." }
  },
  {
    id: "sc-roll-top-porte", cat: "textile", sub: "sacs", img: "sac-roll-top-porte",
    price: null, unit: "piece",
    fr: { name: "Sac roll-top, porté", desc: "Le grand modèle sur le dos : 45 cm de haut, sangles réglables." },
    en: { name: "Roll-top backpack, worn", desc: "The large model worn: 45 cm tall, adjustable straps." }
  },
  {
    id: "sc-bordeaux-porte", cat: "textile", sub: "sacs", img: "sac-bordeaux-porte",
    price: null, unit: "piece",
    fr: { name: "Sac bordeaux, porté", desc: "Le modèle compact, porté haut sur le dos." },
    en: { name: "Burgundy backpack, worn", desc: "The compact model, worn high on the back." }
  },

  /* ============ DÉCOR · PIÈCES SPÉCIALES ============ */
  {
    id: "dc-velo", cat: "decor", sub: "pieces", img: "decor-velo-recycle",
    price: 8, unit: "piece", tag: "piece-speciale",
    fr: { name: "Vélo en fil recyclé", desc: "Miniature entièrement montée en fil de fer et boîtes de conserve peintes." },
    en: { name: "Recycled wire bicycle", desc: "Miniature built entirely from wire and painted tin cans." }
  },
  {
    id: "dc-bougeoir", cat: "decor", sub: "pieces", img: "decor-bougeoir-recycle",
    price: 5.99, unit: "piece", tag: "best",
    fr: { name: "Bougeoir ange recyclé", desc: "Ange porteur découpé dans des boîtes de conserve imprimées, peint à la main." },
    en: { name: "Recycled angel candle holder", desc: "Carrier angel cut from printed tin cans, hand-painted." }
  },
  {
    id: "dc-pere-noel", cat: "decor", sub: "pieces", img: "decor-pere-noel",
    price: 5.99, unit: "piece",
    fr: { name: "Père Noël en métal recyclé", desc: "Figurine de fête découpée et peinte à la main, hauteur 15 cm environ." },
    en: { name: "Recycled metal Santa", desc: "Festive figurine, hand-cut and hand-painted, around 15 cm tall." }
  },

  /* ============ DÉCOR · OBJETS ============ */
  {
    id: "dc-etoile", cat: "decor", sub: "objets", img: "decor-etoile-recyclee",
    price: 3.99, unit: "piece",
    fr: { name: "Étoiles en métal recyclé", desc: "Étoiles à suspendre découpées dans des boîtes imprimées, coloris assortis." },
    en: { name: "Recycled metal stars", desc: "Hanging stars cut from printed cans, assorted colours." }
  },

  /* ============ DÉCOR · PORTE-CLÉS ============ */
  {
    id: "dc-porte-cle", cat: "decor", sub: "portecles", img: "porte-cle-cuir-piece",
    price: 3, unit: "piece", tag: "best",
    fr: { name: "Porte-clés cuir à franges", desc: "Franges de cuir de chèvre teint, manchon tressé et anneau de laiton. Modèle rasta : 3 €." },
    en: { name: "Fringed leather keyring", desc: "Dyed goat-leather fringes, braided collar and brass ring. Rasta model: €3." }
  },
  {
    id: "dc-porte-cle-lot", cat: "decor", sub: "portecles", img: "porte-cle-cuir",
    price: null, unit: "lot",
    fr: { name: "Porte-clés cuir, lot assorti", desc: "Le lot d'atelier : une vingtaine de pompons, toutes les teintes mélangées. Quantité et prix sur demande." },
    en: { name: "Leather keyrings, assorted lot", desc: "The workshop lot: around twenty tassels, all colours mixed. Quantity and price on request." }
  },
  {
    id: "dc-porte-cle-xl", cat: "decor", sub: "portecles", img: "porte-cle-cuir-xl-piece",
    price: 6.5, unit: "piece",
    fr: { name: "Porte-clés cuir XL", desc: "Grand pompon de cuir à manchon perlé, motifs chevrons et damiers." },
    en: { name: "XL leather keyring", desc: "Large leather tassel with a beaded collar, chevron and checkerboard patterns." }
  },
  {
    id: "dc-porte-cle-perle", cat: "decor", sub: "portecles", img: "porte-cle-cuir-xl",
    price: null, unit: "lot", tag: "nouveau",
    fr: { name: "Porte-clés perlés, les quatre modèles", desc: "Manchons brodés de perles de rocaille : chevrons blancs, indigo, terre et damier. Vendus par lot de quatre. Prix sur demande." },
    en: { name: "Beaded keyrings, the four models", desc: "Collars embroidered with seed beads: white chevrons, indigo, earth and checkerboard. Sold in sets of four. Price on request." }
  },

  /* ============ DÉCOR · CHEMINS DE TABLE ============ */
  {
    id: "dc-chemin-bogolan", cat: "decor", sub: "chemins", img: "echarpe-bogolan",
    price: null, unit: "piece",
    fr: { name: "Chemin de table bogolan", desc: "Bande de bogolan ourlée, longueur et largeur au choix. Dimensions et prix sur demande." },
    en: { name: "Bogolan table runner", desc: "Hemmed bogolan strip, length and width to order. Dimensions and price on request." }
  },
  {
    id: "dc-chemin-indigo", cat: "decor", sub: "chemins", img: "tissu-indigo-motif",
    price: null, unit: "piece",
    fr: { name: "Chemin de table indigo", desc: "Indigo noué-ligaturé monté en chemin de table. Dimensions sur demande." },
    en: { name: "Indigo table runner", desc: "Tie-dyed indigo made up as a table runner. Dimensions on request." }
  }
];

/* Références commerciales : FT-<CAT>-<n> */
(function assignRefs() {
  const prefix = { bijoux: "BJ", textile: "TX", decor: "DC" };
  const counters = {};
  PRODUCTS.forEach(p => {
    /* une reference ecrite a la main (un assortiment, par exemple) est
       gardee telle quelle : elle doit correspondre a celle de la base. */
    if (p.ref) return;
    const k = prefix[p.cat];
    counters[k] = (counters[k] || 0) + 1;
    p.ref = "FT-" + k + "-" + String(counters[k]).padStart(3, "0");
  });
})();

const MOQ = 500; // commande minimum en euros
