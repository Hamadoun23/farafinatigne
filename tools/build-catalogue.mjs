/**
 * Fabrique le catalogue de gros en PDF.
 *
 *   node tools/build-catalogue.mjs
 *
 * Les données viennent de la base (celle que lit le site), avec repli sur
 * js/products.js si elle est injoignable : le PDF dit donc toujours la
 * même chose que la boutique en ligne, prix compris.
 *
 * Le rendu est fait par Chrome, à partir d'une page HTML mise en pages A4.
 * Aucune bibliothèque PDF : la mise en forme est du CSS, donc modifiable
 * par n'importe qui sachant lire une feuille de style.
 *
 * Prérequis : le site servi en local (python -m http.server 5510) et un
 * Chrome joignable en --remote-debugging-port=9222. Le script les vérifie
 * et le dit clairement s'il en manque un.
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SERVEUR = process.env.FT_SERVEUR || "http://127.0.0.1:5510";
const CHROME = Number(process.env.FT_CHROME || 9222);
const SORTIE = join(SITE, "assets", "catalogue", "catalogue-farafinatigne.pdf");
const ANNEE = new Date().getFullYear();

/* =========================================================
   1. Les données
   ========================================================= */
function depuisLeFichier() {
  const src = readFileSync(join(SITE, "js", "products.js"), "utf8");
  const { CATEGORIES, PRODUCTS } = new Function(
    `${src}; return { CATEGORIES, PRODUCTS };`
  )();
  return {
    origine: "js/products.js",
    categories: CATEGORIES,
    produits: PRODUCTS.map((p) => ({
      ...p,
      image: p.img.includes("://")
        ? p.img
        : `assets/produits/${p.cat}/${p.sub}/${p.img}.webp`,
      galerie: (p.gallery || []).map((g) =>
        g.includes("://") ? g : `assets/produits/${p.cat}/${p.sub}/${g}.webp`
      ),
    })),
  };
}

async function depuisLaBase() {
  const live = readFileSync(join(SITE, "js", "live-data.js"), "utf8");
  const cles = live.match(/eyJ[A-Za-z0-9_.-]{60,}/g) || [];
  const anon = cles[cles.length - 1];
  if (!anon) throw new Error("clé publique introuvable dans live-data.js");

  const api = "https://farafinatigne.com/supabase/rest/v1/";
  const get = async (chemin) => {
    const r = await fetch(api + chemin, {
      headers: { apikey: anon, Authorization: "Bearer " + anon },
    });
    if (!r.ok) throw new Error(chemin + " : " + r.status);
    return r.json();
  };

  const [cats, subs, prods, images] = await Promise.all([
    get("categories?select=slug,fr_name,en_name,description_fr,position&order=position"),
    get("subcategories?select=slug,fr_name,en_name,position,categories(slug)&order=position"),
    get(
      "products?select=id,slug,ref,fr_name,fr_desc,en_name,price,price_from,unit,set_qty,sizes,tag," +
        "image_path,discount_percent,discount_until,categories(slug),subcategories(slug)" +
        "&is_published=eq.true&order=position"
    ),
    get("product_images?select=product_id,path,position&order=position"),
  ]);
  if (!cats.length || !prods.length) throw new Error("base vide");

  const parCat = {};
  const categories = cats.map((c) => {
    const e = { id: c.slug, fr: c.fr_name, en: c.en_name, desc: c.description_fr || "", subs: [] };
    parCat[c.slug] = e;
    return e;
  });
  subs.forEach((s) => {
    const parent = s.categories && parCat[s.categories.slug];
    if (parent) parent.subs.push({ id: s.slug, fr: s.fr_name, en: s.en_name });
  });

  const planches = {};
  images.forEach((i) => (planches[i.product_id] ||= []).push(chemin(i.path)));

  return {
    origine: "base de production",
    categories,
    produits: prods
      .filter((p) => p.categories && p.image_path)
      .map((p) => ({
        id: p.slug,
        ref: p.ref,
        cat: p.categories.slug,
        sub: p.subcategories ? p.subcategories.slug : null,
        image: chemin(p.image_path),
        galerie: planches[p.id] || [],
        price: p.price === null ? null : Number(p.price),
        from: !!p.price_from,
        unit: p.unit || "piece",
        setQty: p.set_qty || null,
        sizes: p.sizes || null,
        tag: p.tag || null,
        remise: remiseActive(p) ? p.discount_percent : 0,
        fr: { name: p.fr_name, desc: p.fr_desc || "" },
        en: { name: p.en_name },
      })),
  };
}

const chemin = (v) => (String(v).includes("://") ? v : "assets/" + String(v).replace(/^assets\//, ""));

function remiseActive(p) {
  if (!p.discount_percent || p.price === null) return false;
  if (!p.discount_until) return true;
  return new Date(p.discount_until + "T23:59:59") >= new Date();
}

/* =========================================================
   2. Mise en forme
   ========================================================= */
const euro = (n) =>
  Number(n).toFixed(2).replace(/\.00$/, "").replace(".", ",") + " €";

function prix(p) {
  if (p.price === null) return '<b class="q">Prix sur demande</b>';
  const net = p.remise ? Math.round(p.price * (1 - p.remise / 100) * 100) / 100 : p.price;
  const unite = p.unit === "pair" ? "la paire"
    : p.unit === "piece" ? "la pièce"
    : p.setQty ? "le lot de " + p.setQty
    : p.unit === "metre" ? "le mètre" : "le lot";
  const avant = p.from ? '<i>à partir de</i> ' : "";
  if (p.remise) {
    return `${avant}<s>${euro(p.price)}</s> <b class="promo">${euro(net)}</b><i>${unite} · −${p.remise} %</i>`;
  }
  return `${avant}<b>${euro(net)}</b><i>${unite}</i>`;
}

const echapper = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function fiche(p) {
  const planche = p.galerie.length
    ? `<div class="motifs">${p.galerie
        .slice(0, 6)
        .map((u) => `<img src="${u}" data-max="120" alt="">`)
        .join("")}<span>+ ${p.galerie.length} modèles</span></div>`
    : "";
  const etiquette = p.tag === "gros" ? '<span class="lot">Lot export</span>' : "";
  return `<article class="fiche">
    <div class="vue"><img src="${p.image}" data-max="460" alt="">${etiquette}</div>
    <h3>${echapper(p.fr.name)}</h3>
    <p class="en">${echapper(p.en.name)}</p>
    ${p.sizes ? `<p class="tailles">${echapper(p.sizes)}</p>` : ""}
    ${planche}
    <div class="pied"><span class="ref">${p.ref}</span><span class="prix">${prix(p)}</span></div>
  </article>`;
}

/** Découpe une gamme en pages de douze fiches. */
function pagesDeGamme(cat, produits, numero) {
  const lot = 9;
  const dedans = produits.filter((p) => p.cat === cat.id);
  const tranches = [];
  for (let i = 0; i < dedans.length; i += lot) tranches.push(dedans.slice(i, i + lot));

  const ouverture = `<section class="page page--gamme">
    <div class="gamme">
      <span class="gamme__num">${String(numero).padStart(2, "0")}</span>
      <h2>${echapper(cat.fr)}</h2>
      <p class="gamme__en">${echapper(cat.en)}</p>
      ${cat.desc ? `<p class="gamme__desc">${echapper(cat.desc)}</p>` : ""}
      <ul class="gamme__subs">${cat.subs.map((s) => `<li>${echapper(s.fr)}</li>`).join("")}</ul>
      <p class="gamme__compte">${dedans.length} références</p>
    </div>
  </section>`;

  const grilles = tranches.map(
    (t, i) => `<section class="page">
      <header class="entete"><span>${echapper(cat.fr)}</span><span>${i + 1} / ${tranches.length}</span></header>
      <div class="grille">${t.map(fiche).join("")}</div>
      <footer class="pied-page">Prix de gros en euros · Commande minimum 500 € · farafinatigne.com</footer>
    </section>`
  );
  return ouverture + grilles.join("");
}

function document_(d) {
  const total = d.produits.length;
  const gammes = d.categories
    .map((c, i) => pagesDeGamme(c, d.produits, i + 1))
    .join("");

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<title>Catalogue de gros Farafinatignɛ ${ANNEE}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&family=Manrope:wght@300..800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Anton&text=FARAFINATIGN%C6%90&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400..700&text=%C6%90%C9%9B&display=swap" rel="stylesheet">
<style>
:root{
  --ivory:#F8F7EE; --sand:#F1EADC; --ink:#34171A; --espresso:#1C0D0B;
  --gold:#CC8D3D; --gold-light:#DBA54E; --gold-deep:#8A5E1C;
  --brown:#6D412C; --tx-2:#6B564C; --tx-3:#9A8579; --line:rgba(52,23,26,.14);
  --serif:"Fraunces","Noto Serif",Georgia,serif;
  --sans:"Manrope",system-ui,sans-serif;
  --mark:"Anton","Arial Narrow",sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
@page{size:A4;margin:0}
body{font-family:var(--sans);color:var(--ink);background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
img{display:block;max-width:100%}

.page{
  width:210mm;height:297mm;padding:14mm 15mm 10mm;position:relative;
  page-break-after:always;break-after:page;overflow:hidden;background:var(--ivory);
  display:flex;flex-direction:column;
}
.page:last-child{page-break-after:auto;break-after:auto}

/* ---------- couverture ---------- */
.couv{
  padding:0;color:var(--ivory);
  background:
    radial-gradient(900px 620px at 12% -6%,rgba(219,165,78,.42) 0%,transparent 60%),
    radial-gradient(760px 620px at 108% 20%,rgba(96,42,58,.46) 0%,transparent 66%),
    linear-gradient(155deg,#4A2A1D 0%,#3A2019 26%,#2C1720 60%,#1A0D11 100%);
}
.couv__inner{padding:22mm 18mm;display:flex;flex-direction:column;height:100%}
.couv__mark{font-family:var(--mark);font-size:15mm;letter-spacing:.01em;line-height:1}
.couv__base{font-size:2.6mm;letter-spacing:.42em;text-transform:uppercase;color:var(--gold-light);margin-top:2.5mm}
.couv__arch{
  margin:14mm 0 auto;width:100%;height:118mm;overflow:hidden;
  border-radius:60mm 60mm 3mm 3mm;border:.5mm solid rgba(219,165,78,.5);
}
.couv__arch img{width:100%;height:100%;object-fit:cover;object-position:50% 28%}
.couv__t{font-family:var(--serif);font-size:13mm;font-weight:600;line-height:1.02;letter-spacing:-.02em;margin-top:10mm}
.couv__t em{font-style:italic;font-weight:500;color:var(--gold-light);display:block}
.couv__sub{margin-top:5mm;font-size:3.4mm;color:rgba(248,247,238,.82);max-width:110mm;line-height:1.6}
.couv__bar{
  margin-top:8mm;padding-top:5mm;border-top:.3mm solid rgba(248,247,238,.24);
  display:flex;justify-content:space-between;font-size:2.7mm;letter-spacing:.2em;
  text-transform:uppercase;color:var(--gold-light)
}

/* ---------- la maison ---------- */
.maison h2{font-family:var(--serif);font-size:11mm;font-weight:600;line-height:1.06;letter-spacing:-.02em}
.maison h2 em{font-style:italic;color:var(--brown)}
.maison__lead{margin-top:6mm;font-size:3.6mm;line-height:1.75;color:var(--tx-2);max-width:150mm}
.maison__grid{margin-top:12mm;display:grid;grid-template-columns:repeat(2,1fr);gap:7mm}
.bloc{border-top:.4mm solid var(--line);padding-top:4mm}
.bloc h3{font-size:2.7mm;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-deep);font-weight:800}
.bloc p{margin-top:2.5mm;font-size:3.2mm;line-height:1.6;color:var(--tx-2)}
.bande{margin-top:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.bande figure{margin:0}
.bande img{width:100%;aspect-ratio:1/1.12;object-fit:cover;object-position:50% 24%;border-radius:1.5mm}
.bande figcaption{margin-top:2.5mm;font-size:2.6mm;letter-spacing:.14em;text-transform:uppercase;
  color:var(--tx-3);font-weight:800;text-align:center}
.chiffres{margin-top:9mm;display:grid;grid-template-columns:repeat(3,1fr);gap:6mm;
  background:var(--sand);padding:8mm;border-radius:2mm}
.chiffre b{font-family:var(--serif);font-size:9mm;font-weight:700;color:var(--ink);display:block;line-height:1}
.chiffre span{font-size:2.7mm;letter-spacing:.18em;text-transform:uppercase;color:var(--tx-3);font-weight:800}

/* ---------- ouverture de gamme ---------- */
.page--gamme{
  color:var(--ivory);justify-content:center;
  background:
    radial-gradient(760px 520px at 90% 4%,rgba(219,165,78,.34) 0%,transparent 62%),
    linear-gradient(158deg,#6D412C 0%,#34171A 48%,#1C0D0B 100%);
}
.gamme__num{font-family:var(--serif);font-size:34mm;font-weight:700;color:rgba(219,165,78,.34);line-height:.8;display:block}
.gamme h2{font-family:var(--serif);font-size:17mm;font-weight:600;letter-spacing:-.02em;margin-top:4mm}
.gamme__en{font-family:var(--serif);font-style:italic;font-size:6mm;color:var(--gold-light);margin-top:1mm}
.gamme__desc{margin-top:7mm;font-size:3.6mm;line-height:1.7;color:rgba(248,247,238,.8);max-width:130mm}
.gamme__subs{list-style:none;margin-top:9mm;display:flex;flex-wrap:wrap;gap:2.5mm}
.gamme__subs li{border:.3mm solid rgba(248,247,238,.34);padding:2mm 4mm;border-radius:20mm;
  font-size:2.9mm;letter-spacing:.12em;text-transform:uppercase;font-weight:700}
.gamme__compte{margin-top:9mm;font-size:2.9mm;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-light);font-weight:800}

/* ---------- grille de fiches ---------- */
.entete{display:flex;justify-content:space-between;font-size:2.7mm;letter-spacing:.22em;
  text-transform:uppercase;color:var(--tx-3);font-weight:800;
  border-bottom:.3mm solid var(--line);padding-bottom:3mm;margin-bottom:6mm}
.grille{display:grid;grid-template-columns:repeat(3,1fr);gap:7mm 5mm;flex:1;align-content:start}
.fiche{display:flex;flex-direction:column}
.vue{position:relative;aspect-ratio:1/.86;overflow:hidden;background:var(--sand);border-radius:1.5mm}
.vue img{width:100%;height:100%;object-fit:cover;object-position:50% 38%}
.lot{position:absolute;top:0;left:0;background:var(--gold);color:var(--espresso);
  font-size:2.2mm;font-weight:800;letter-spacing:.16em;text-transform:uppercase;padding:1.4mm 2.6mm}
.fiche h3{font-family:var(--serif);font-size:3.7mm;font-weight:600;line-height:1.2;margin-top:3mm;color:var(--ink);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.fiche .en{font-family:var(--serif);font-style:italic;font-size:3mm;color:var(--tx-3);margin-top:.8mm}
.tailles{font-size:2.5mm;letter-spacing:.1em;text-transform:uppercase;color:var(--tx-3);margin-top:1.5mm;font-weight:700}
.motifs{display:flex;align-items:center;gap:1mm;margin-top:2mm}
.motifs img{width:6mm;height:7mm;object-fit:cover;border-radius:.6mm;border:.2mm solid var(--line)}
.motifs span{font-size:2.2mm;color:var(--tx-3);font-weight:700;letter-spacing:.06em}
.pied{margin-top:auto;padding-top:2.5mm;border-top:.3mm solid var(--line);
  display:flex;justify-content:space-between;align-items:baseline;gap:2mm}
.ref{font-size:2.4mm;letter-spacing:.1em;color:var(--tx-3);font-weight:700;white-space:nowrap}
.prix{text-align:right;line-height:1.25}
.prix b{font-family:var(--serif);font-size:4.4mm;font-weight:700;display:block}
.prix b.q{font-size:3.2mm;font-style:italic;font-weight:500;color:var(--brown)}
.prix b.promo{color:#A33A1E}
.prix s{font-size:2.7mm;color:var(--tx-3)}
.prix i{display:block;font-style:normal;font-size:2.2mm;letter-spacing:.12em;
  text-transform:uppercase;color:var(--tx-3);font-weight:700}
.pied-page{margin-top:6mm;padding-top:3mm;border-top:.3mm solid var(--line);
  font-size:2.5mm;letter-spacing:.14em;text-transform:uppercase;color:var(--tx-3);
  text-align:center;font-weight:700}

/* ---------- quatrième de couverture ---------- */
.fin{color:var(--ivory);justify-content:space-between;
  background:linear-gradient(155deg,#3A2019 0%,#2C1720 50%,#160A0E 100%)}
.fin__mark{font-family:var(--mark);font-size:11mm;line-height:1}
.fin h2{font-family:var(--serif);font-size:11mm;font-weight:600;line-height:1.08;max-width:140mm}
.fin h2 em{font-style:italic;color:var(--gold-light)}
.fin__coord{display:grid;grid-template-columns:repeat(2,1fr);gap:8mm;font-size:3.4mm;line-height:1.8}
.fin__coord h3{font-size:2.7mm;letter-spacing:.24em;text-transform:uppercase;color:var(--gold-light);font-weight:800;margin-bottom:2.5mm}
.fin__coord p{color:rgba(248,247,238,.86)}
.fin__note{border-top:.3mm solid rgba(248,247,238,.24);padding-top:5mm;
  font-size:2.7mm;letter-spacing:.16em;text-transform:uppercase;color:rgba(248,247,238,.6)}
</style></head><body>

<section class="page couv">
  <div class="couv__inner">
    <div>
      <div class="couv__mark">FARAFINATIGNƐ</div>
      <div class="couv__base">From Mali to the World</div>
    </div>
    <div class="couv__arch"><img src="assets/portraits/portrait-maison-3.webp" data-max="1100" alt=""></div>
    <h1 class="couv__t">Catalogue de gros<em>${ANNEE}</em></h1>
    <p class="couv__sub">Bijoux, bogolan et objets d'art produits par nos artisans de Mopti et Djenné, exportés en gros dans le monde entier.</p>
    <div class="couv__bar"><span>${total} références</span><span>Prix grossiste en euros</span></div>
  </div>
</section>

<section class="page maison">
  <h2>Depuis Mopti-Sévaré, nous fabriquons et exportons les objets, les parures et les étoffes de <em>nombreuses ethnies d'Afrique de l'Ouest</em>.</h2>
  <p class="maison__lead">Cauris du fleuve, laiton et bronze refondus à la cire perdue, tongs de plastique ramassées dans les rues, cuir de chèvre tanné au village, coton filé main et peint à la boue fermentée : rien n'arrive neuf, tout renaît entre les mains de nos artisanes et artisans.</p>
  <div class="maison__grid">
    <div class="bloc"><h3>Vente en gros uniquement</h3><p>Nous vendons aux boutiques, aux créateurs et aux importateurs. C'est ce qui permet de payer le travail à son juste prix et de faire vivre les gestes, saison après saison.</p></div>
    <div class="bloc"><h3>Commande minimum</h3><p>500 € toutes gammes confondues. Les frais de port sont chiffrés selon la destination et le poids, sur la facture proforma.</p></div>
    <div class="bloc"><h3>Pièces uniques et assortiments</h3><p>Les t-shirts, tuniques et ponchos sont peints à la main : le motif ne se reproduit pas à l'identique. Ils se commandent par assortiment, composé à l'atelier.</p></div>
    <div class="bloc"><h3>Comment commander</h3><p>Relevez les références qui vous intéressent et envoyez-les par WhatsApp ou par e-mail. Nous répondons par une facture proforma sous 48 heures.</p></div>
  </div>
  <div class="bande">
    <figure><img src="assets/atelier/atelier-bogolan-femme.webp" data-max="520" alt=""><figcaption>La peinture à la boue fermentée</figcaption></figure>
    <figure><img src="assets/atelier/atelier-artisane.webp" data-max="520" alt=""><figcaption>L'atelier de Sévaré</figcaption></figure>
    <figure><img src="assets/patrimoine/groupe-farafinatigne.webp" data-max="520" alt=""><figcaption>Trente collaborateurs</figcaption></figure>
  </div>
  <div class="chiffres">
    <div class="chiffre"><b>${total}</b><span>Références</span></div>
    <div class="chiffre"><b>500 €</b><span>Commande minimum</span></div>
    <div class="chiffre"><b>2000</b><span>Année de fondation</span></div>
  </div>
</section>

${gammes}

<section class="page fin">
  <div class="fin__mark">FARAFINATIGNƐ</div>
  <h2>Si vous ne pouvez pas venir jusqu'à Tombouctou et Djenné, <em>alors nous vous les apportons.</em></h2>
  <div class="fin__coord">
    <div><h3>Atelier</h3><p>Mopti — Sévaré, Rue RN6<br>Imm. Farafinatignɛ, BP 65<br>Mali</p></div>
    <div><h3>Contact</h3><p>+223 65 45 02 02<br>farafinatigne@gmail.com<br>farafinatigne.com</p></div>
  </div>
  <div class="fin__note">Catalogue ${ANNEE} · Prix de gros en euros, hors transport · Sous réserve de disponibilité</div>
</section>

<script>
/* Chrome integre les photos telles quelles : un catalogue de 117 fiches
   pesait 78 Mo. On les redessine ici a la taille reellement imprimee et
   on les repasse en JPEG — meme rendu a l'oeil, quinze fois plus leger. */
window.alleger = function () {
  var faits = 0, total = 0;
  [].forEach.call(document.images, function (img) {
    var max = Number(img.getAttribute("data-max") || 0);
    if (!max || !img.naturalWidth) return;
    total++;
    try {
      var ech = Math.min(1, max / img.naturalWidth);
      var c = document.createElement("canvas");
      c.width = Math.round(img.naturalWidth * ech);
      c.height = Math.round(img.naturalHeight * ech);
      var x = c.getContext("2d");
      x.fillStyle = "#F1EADC";
      x.fillRect(0, 0, c.width, c.height);
      x.drawImage(img, 0, 0, c.width, c.height);
      img.src = c.toDataURL("image/jpeg", 0.76);
      faits++;
    } catch (e) { /* image d'une autre origine : on la garde telle quelle */ }
  });
  return faits + "/" + total;
};
</script>
</body></html>`;
}

/* =========================================================
   3. Le rendu par Chrome
   ========================================================= */
async function imprimer(cheminHtml) {
  const liste = await fetch(`http://127.0.0.1:${CHROME}/json`).then((r) => r.json());
  const cible = liste.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
  if (!cible) throw new Error("aucun onglet Chrome pilotable");

  const ws = new WebSocket(cible.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let n = 0;
  const att = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && att.has(m.id)) { att.get(m.id)(m); att.delete(m.id); }
  };
  const cmd = (method, params = {}) =>
    new Promise((res) => { const id = ++n; att.set(id, res); ws.send(JSON.stringify({ id, method, params })); });

  await cmd("Network.enable");
  await cmd("Network.setCacheDisabled", { cacheDisabled: true });
  await cmd("Emulation.setDeviceMetricsOverride", { width: 1240, height: 1754, deviceScaleFactor: 1, mobile: false });
  await cmd("Page.navigate", { url: `${SERVEUR}/${cheminHtml}` });

  /* on attend que toutes les photos soient décodées, sinon Chrome
     imprime des cases vides */
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 700));
    const p = await cmd("Runtime.evaluate", {
      returnByValue: true,
      expression:
        "(() => { const i = [...document.images]; return i.filter(x => x.complete && x.naturalWidth).length + '/' + i.length; })()",
    });
    const [ok, tot] = String(p.result.result?.value || "0/1").split("/").map(Number);
    process.stdout.write(`\r   images prêtes : ${ok}/${tot}   `);
    if (tot && ok === tot) break;
  }
  console.log();

  const allege = await cmd("Runtime.evaluate", { returnByValue: true, expression: "window.alleger()" });
  console.log("   photos recompressees : " + (allege.result.result?.value || "?"));
  await new Promise((r) => setTimeout(r, 2500));

  const pdf = await cmd("Page.printToPDF", {
    printBackground: true,
    preferCSSPageSize: true,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
  });
  ws.close();
  return Buffer.from(pdf.result.data, "base64");
}

/* =========================================================
   4. Marche à suivre
   ========================================================= */
try {
  await fetch(SERVEUR + "/index.html");
} catch {
  console.error(`Le site n'est pas servi sur ${SERVEUR}.\n  cd site && python -m http.server 5510`);
  process.exit(1);
}

let donnees;
try {
  donnees = await depuisLaBase();
} catch (e) {
  console.log("base injoignable (" + e.message + ") — repli sur le fichier");
  donnees = depuisLeFichier();
}
console.log(`source : ${donnees.origine} · ${donnees.produits.length} références`);

const tmp = "_catalogue-print.html";
writeFileSync(join(SITE, tmp), document_(donnees), "utf8");

try {
  const pdf = await imprimer(tmp);
  writeFileSync(SORTIE, pdf);
  console.log(`écrit : ${SORTIE} (${(pdf.length / 1048576).toFixed(2)} Mo)`);
} finally {
  /* FT_GARDER=1 laisse la page HTML en place : c'est elle qu'on relit
     pour verifier une mise en page sans regenerer tout le PDF. */
  if (!process.env.FT_GARDER && existsSync(join(SITE, tmp))) unlinkSync(join(SITE, tmp));
}
process.exit(0);
