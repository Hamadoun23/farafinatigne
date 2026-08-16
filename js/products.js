/* =========================================================
   Farafinatignɛ — source unique de vérité des produits
   Prix : tarifs GROS en euros, repris de la brochure officielle.
   price: null  ->  affiché « Prix sur demande / Price on request »
   unit :  piece | pair | set10 | set12 | set20 | set50 | set60 | douz20 | douz100 | metre
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
      { id: "mode", fr: "Mode & accessoires", en: "Fashion & accessories" }
    ]
  },
  {
    id: "decor",
    fr: "Décor & Art", en: "Decor & Art",
    subs: [
      { id: "pieces", fr: "Pièces spéciales", en: "Special pieces" },
      { id: "objets", fr: "Objets de décoration", en: "Decorative objects" },
      /* déplacé depuis Textile & Mode à la demande du client (août 2026) */
      { id: "chemins", fr: "Chemins de table", en: "Table runners" }
    ]
  }
];

const PRODUCTS = [
  /* ============ BIJOUX · BOUCLES D'OREILLES ============ */
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
    id: "bo-touareg-argent", cat: "bijoux", sub: "boucles", img: "boucle-touareg-argent",
    price: 4, unit: "pair",
    fr: { name: "Boucles Touareg gravées", desc: "Argent gravé à la main par les forgerons du Nord, motifs géométriques." },
    en: { name: "Engraved Tuareg earrings", desc: "Hand-engraved silver by northern smiths, geometric patterns." }
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
    id: "bo-coupe-coupe", cat: "bijoux", sub: "boucles", img: "boucle-coupe-coupe",
    price: 2, unit: "pair",
    fr: { name: "Boucles Coupé-coupé", desc: "Franges de perles heishi taillées dans du plastique recyclé, coloris assortis." },
    en: { name: "Coupé-coupé earrings", desc: "Fringes of heishi beads cut from recycled plastic, assorted colours." }
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
    id: "co-fulani-twist-or", cat: "bijoux", sub: "colliers", img: "collier-fulani-twist-or",
    price: 12, unit: "piece",
    fr: { name: "Collier Fulani Twist, or", desc: "Torsade de laiton doré sur chaîne fine, fermoir crochet." },
    en: { name: "Fulani Twist necklace, gold", desc: "Twisted golden brass on a fine chain with hook clasp." }
  },
  {
    id: "co-fulani-twist-argent", cat: "bijoux", sub: "colliers", img: "collier-fulani-twist-argent",
    price: 14, unit: "piece",
    fr: { name: "Collier Fulani Twist, argent", desc: "Même torsade travaillée dans l'argent, finition polie miroir." },
    en: { name: "Fulani Twist necklace, silver", desc: "The same twist worked in silver, mirror-polished finish." }
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
    id: "co-cauri-2tour", cat: "bijoux", sub: "colliers", img: "collier-cauri-2tour",
    price: 10, unit: "piece",
    fr: { name: "Collier cauri 2 tours", desc: "Double rang de cauris serrés, perles de verre noires en intercalaire." },
    en: { name: "Two-row cowrie necklace", desc: "Two tight rows of cowries with black glass bead spacers." }
  },
  {
    id: "co-cauri-sakolo", cat: "bijoux", sub: "colliers", img: "collier-cauri-sakolo",
    price: 8, unit: "piece", tag: "best",
    fr: { name: "Collier cauri Sakolo", desc: "Ras-de-cou souple, cauris montés en épi sur fil ciré." },
    en: { name: "Sakolo cowrie necklace", desc: "Soft choker, cowries set in a herringbone on waxed thread." }
  },
  {
    id: "co-cauri-parure", cat: "bijoux", sub: "colliers", img: "collier-cauri-parure",
    price: 22, unit: "piece", tag: "piece-speciale",
    fr: { name: "Parure cauri de cérémonie", desc: "Ensemble plastron et bracelets assortis, porté lors des mariages bozo." },
    en: { name: "Ceremonial cowrie set", desc: "Matching breastplate and bracelets, worn at Bozo weddings." }
  },
  {
    id: "co-coupe-coupe-bleu", cat: "bijoux", sub: "colliers", img: "collier-coupe-coupe-bleu",
    price: 12, unit: "piece",
    fr: { name: "Collier Coupé-coupé 20 fils", desc: "Vingt rangs de perles heishi en plastique recyclé, coloris indigo." },
    en: { name: "Coupé-coupé necklace, 20 strands", desc: "Twenty strands of recycled-plastic heishi beads, indigo tones." }
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
    id: "co-perles-multicolore", cat: "bijoux", sub: "colliers", img: "collier-perles-multicolore",
    price: 25, unit: "piece",
    fr: { name: "Collier Takayala multicolore", desc: "Version haute en couleur du Takayala, perles de verre de Djenné." },
    en: { name: "Multicolour Takayala necklace", desc: "The colourful version of the Takayala, Djenné glass beads." }
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
    id: "co-cristal-s", cat: "bijoux", sub: "colliers", img: "collier-cristal-s",
    price: 2, unit: "set10", setQty: 10, setPrice: 20,
    fr: { name: "Collier cristal pâte de verre S", desc: "Perles de pâte de verre filées au feu de bois. Lot de 10 colliers : 20 €." },
    en: { name: "Glass-paste necklace, S", desc: "Wood-fire spun glass-paste beads. Set of 10 necklaces: €20." }
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
    id: "br-laiton-large", cat: "bijoux", sub: "bracelets", img: "bracelet-laiton-large",
    price: 5, unit: "piece",
    fr: { name: "Bracelet laiton motif lune", desc: "Manchette étroite gravée de croissants et de points, laiton recyclé." },
    en: { name: "Moon-pattern brass bracelet", desc: "Narrow cuff engraved with crescents and dots, recycled brass." }
  },
  {
    id: "br-laiton-torsade", cat: "bijoux", sub: "bracelets", img: "bracelet-laiton-torsade",
    price: 4, unit: "piece",
    fr: { name: "Bracelet laiton torsadé", desc: "Torsade épaisse à quatre brins, finition satinée." },
    en: { name: "Twisted brass bracelet", desc: "Thick four-strand twist, satin finish." }
  },
  {
    id: "br-flipflop-lot", cat: "bijoux", sub: "bracelets", img: "bracelet-flipflop-lot",
    price: 300, unit: "douz100", setQty: 1200, setPrice: 300, tag: "gros",
    fr: { name: "Bracelets flipflop, 100 douzaines", desc: "Le grand lot export : 1 200 bracelets en plastique recyclé, coloris assortis. 300 €." },
    en: { name: "Flip-flop bracelets, 100 dozen", desc: "The big export lot: 1,200 recycled-plastic bracelets, assorted colours. €300." }
  },
  {
    id: "br-flipflop-couleur", cat: "bijoux", sub: "bracelets", img: "bracelet-flipflop-couleur",
    price: 30, unit: "set60", setQty: 60, setPrice: 30, tag: "best",
    fr: { name: "Bracelets flipflop, lot de 60", desc: "Soixante pièces en plastique recyclé de Mopti, mélange de couleurs. 30 €." },
    en: { name: "Flip-flop bracelets, set of 60", desc: "Sixty recycled-plastic pieces from Mopti, mixed colours. €30." }
  },
  {
    id: "br-flipflop-fin", cat: "bijoux", sub: "bracelets", img: "bracelet-flipflop-fin",
    price: 30, unit: "douz20", setQty: 240, setPrice: 30,
    fr: { name: "Bracelets Nate Mopti, 20 douzaines", desc: "Joncs fins tressés serré, 240 pièces coloris mixtes. 30 €." },
    en: { name: "Nate Mopti bracelets, 20 dozen", desc: "Slim tightly-woven bangles, 240 pieces in mixed colours. €30." }
  },
  {
    id: "br-nate-large", cat: "bijoux", sub: "bracelets", img: "bracelet-nate-large",
    price: 50, unit: "set50", setQty: 50, setPrice: 50,
    fr: { name: "Bracelets Nate recyclés, lot de 50", desc: "Joncs larges tressés de bandes de plastique, motifs damier et rayures. 50 €." },
    en: { name: "Recycled Nate bracelets, set of 50", desc: "Wide bangles woven from plastic strips, checks and stripes. €50." }
  },
  {
    id: "br-nate-mopti", cat: "bijoux", sub: "bracelets", img: "bracelet-nate-mopti",
    price: 30, unit: "douz20", setQty: 240, setPrice: 30,
    fr: { name: "Bracelets Nate Mopti fins", desc: "Le modèle fin qui s'empile par dizaines. 20 douzaines, coloris mixtes. 30 €." },
    en: { name: "Fine Nate Mopti bracelets", desc: "The slim model made to be stacked. 20 dozen, mixed colours. €30." }
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
    id: "tx-boubou-noir", cat: "textile", sub: "mode", img: "boubou-bogolan-noir",
    price: 50, unit: "piece", tag: "piece-speciale",
    fr: { name: "Grand boubou bogolan noir", desc: "Boubou taillé dans un bogolan noir à signes blancs, coupe ample unisexe." },
    en: { name: "Black bogolan grand boubou", desc: "Boubou cut from black bogolan with white signs, generous unisex cut." }
  },
  {
    id: "tx-boubou-or", cat: "textile", sub: "mode", img: "boubou-bogolan-or",
    price: 50, unit: "piece", tag: "piece-speciale",
    fr: { name: "Grand boubou bogolan ocre", desc: "Bogolan ocre et noir, encolure brodée. Pièce de cérémonie." },
    en: { name: "Ochre bogolan grand boubou", desc: "Ochre and black bogolan with an embroidered neckline. A ceremonial piece." }
  },
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
  {
    id: "dc-porte-cle", cat: "decor", sub: "objets", img: "porte-cle-cuir",
    price: 3, unit: "piece",
    fr: { name: "Porte-clés cuir à franges", desc: "Franges de cuir teint, anneau de laiton. Modèle rasta : 3 €." },
    en: { name: "Fringed leather keyring", desc: "Dyed leather fringes with a brass ring. Rasta model: €3." }
  },
  {
    id: "dc-porte-cle-xl", cat: "decor", sub: "objets", img: "porte-cle-cuir-xl",
    price: 6.5, unit: "piece",
    fr: { name: "Porte-clés cuir XL", desc: "Grand pompon de cuir à manchon perlé, motifs chevrons." },
    en: { name: "XL leather keyring", desc: "Large leather tassel with a beaded collar, chevron patterns." }
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
    const k = prefix[p.cat];
    counters[k] = (counters[k] || 0) + 1;
    p.ref = "FT-" + k + "-" + String(counters[k]).padStart(3, "0");
  });
})();

const MOQ = 500; // commande minimum en euros
