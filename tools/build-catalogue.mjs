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

/**
 * Bande bogolan a bord dechire, en SVG.
 *
 * En CSS (clip-path + motif repete), Chrome rasterise la page entiere
 * pour l'imprimer : le PDF gagnait plusieurs mega-octets par page. En
 * SVG tout reste vectoriel — plus leger, et net a n'importe quel zoom.
 */
function bandeBogolan(id, hauteur = 66) {
  let graine = 20260823;
  const hasard = () => ((graine = (graine * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  const pics = 54;
  let d = `M0 0 H210 V${(hauteur - 4).toFixed(2)} `;
  for (let i = pics; i >= 0; i--) {
    const x = (i / pics) * 210;
    const y = hauteur - (hasard() * 3.2 + (i % 2 ? 0.3 : 1.9));
    d += `L${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  d += "Z";

  /* Les chevrons du bandeau, traces un par un dans une teinte deja
     assombrie. Toute transparence — opacity, pattern — pousse Chrome a
     rasteriser la bande entiere : 250 Ko de bitmap par page. En aplat
     opaque, la bande reste vectorielle et pese quelques octets. */
  const pas = 10.5, larg = 5.3;
  let chevrons = "";
  for (let y = 0; y < hauteur + pas; y += pas) {
    let haut = `M0 ${(y + 3.2).toFixed(2)}`, bas = `M0 ${(y + 7.3).toFixed(2)}`;
    for (let x = 0; x < 210; x += larg) {
      const demi = (x + larg / 2).toFixed(2), plein = (x + larg).toFixed(2);
      haut += ` L${demi} ${(y + 0.75).toFixed(2)} L${plein} ${(y + 3.2).toFixed(2)}`;
      bas += ` L${demi} ${(y + 9.75).toFixed(2)} L${plein} ${(y + 7.3).toFixed(2)}`;
    }
    chevrons += `<path d="${haut}"/><path d="${bas}"/>`;
  }
  let points = "";
  for (let y = 0; y < hauteur + pas; y += pas) {
    for (let x = 2.65; x < 210; x += larg * 2) {
      points += `<circle cx="${x.toFixed(2)}" cy="${(y + 5.25).toFixed(2)}" r=".42"/>`;
    }
  }

  return `<svg class="bande" viewBox="0 0 210 ${hauteur}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="or-${id}" x1="0" y1="0" x2=".3" y2="1">
        <stop offset="0" stop-color="#D9A24A"/><stop offset=".52" stop-color="#C6873A"/><stop offset="1" stop-color="#A9682F"/>
      </linearGradient>
      <clipPath id="cl-${id}"><path d="${d}"/></clipPath>
    </defs>
    <path d="${d}" fill="url(#or-${id})"/>
    <g clip-path="url(#cl-${id})">
      <g fill="none" stroke="#A0672B" stroke-width=".38" stroke-linecap="square">${chevrons}</g>
      <g fill="#A0672B">${points}</g>
    </g>
  </svg>`;
}

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
        .map((u) => `<img src="${u}" data-max="120" crossorigin="anonymous" alt="">`)
        .join("")}<span>+ ${p.galerie.length} modèles</span></div>`
    : "";
  const etiquette = p.tag === "gros" ? '<span class="lot">Lot export</span>' : "";
  return `<article class="fiche">
    <div class="vue"><img src="${p.image}" data-max="430" crossorigin="anonymous" alt="">${etiquette}</div>
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
    ${bandeBogolan("g" + numero, 42)}
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
  padding:0;color:var(--ivory);position:relative;overflow:hidden;
  background:
    radial-gradient(820px 560px at 12% 26%,rgba(219,165,78,.30) 0%,transparent 62%),
    radial-gradient(760px 640px at 106% 74%,rgba(96,42,58,.44) 0%,transparent 68%),
    linear-gradient(158deg,#3E2318 0%,#2C1720 46%,#1A0D11 100%);
}
.bande{position:absolute;top:0;left:0;width:100%;display:block}
.couv .bande{height:66mm}
.page--gamme .bande{height:42mm;opacity:.92}
.couv__inner{position:relative;z-index:2;padding:16mm 16mm 12mm;display:flex;flex-direction:column;height:100%}
.couv__mark{
  font-family:var(--mark);font-size:16.5mm;letter-spacing:.005em;line-height:.92;
  color:var(--ivory);text-shadow:0 1.2mm 0 rgba(28,13,11,.28)
}
.couv__base{
  font-family:var(--serif);font-style:italic;font-size:5.6mm;margin-top:2.5mm;
  color:#2C1720;letter-spacing:.01em
}
/* l'Afrique, detouree de son fond blanc puis posee sur le degrade */
.couv__afrique{
  margin:2mm auto auto;width:126mm;position:relative;
  filter:drop-shadow(0 3mm 6mm rgba(0,0,0,.5))
}
.couv__afrique img{width:100%;height:auto}
.couv__t{font-family:var(--serif);font-size:12mm;font-weight:600;line-height:.98;letter-spacing:-.025em;margin-top:5mm}
.couv__t em{font-style:italic;font-weight:500;color:var(--gold-light);display:block}
.couv__bloc{
  margin-top:6mm;display:flex;justify-content:space-between;align-items:flex-end;gap:8mm
}
.couv__adr{font-size:3.1mm;line-height:1.65;color:rgba(248,247,238,.86)}
.couv__adr b{display:block;font-family:var(--serif);font-size:3.9mm;font-weight:600;color:var(--gold-light);margin-bottom:1mm}
.couv__bar{
  margin-top:6mm;padding-top:4.5mm;border-top:.3mm solid rgba(248,247,238,.26);
  display:flex;justify-content:space-between;font-size:2.7mm;letter-spacing:.2em;
  text-transform:uppercase;color:var(--gold-light);font-weight:800
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
  color:var(--ivory);justify-content:center;position:relative;overflow:hidden;
  background:
    radial-gradient(760px 520px at 90% 4%,rgba(219,165,78,.34) 0%,transparent 62%),
    linear-gradient(158deg,#6D412C 0%,#34171A 48%,#1C0D0B 100%);
}
.page--gamme .gamme{position:relative;z-index:2}
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
.fin{color:var(--ivory);justify-content:space-between;position:relative;overflow:hidden;
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
  ${bandeBogolan("couv", 66)}
  <div class="couv__inner">
    <div>
      <div class="couv__mark">FARAFINATIGNƐ</div>
      <div class="couv__base">From Mali to the World</div>
    </div>
    <div class="couv__afrique">
      <img src="assets/catalogue/catalogue-cover.webp" data-max="620" data-detour="1" crossorigin="anonymous" data-crop="0.05,0.255,0.95,0.762" alt="">
    </div>
    <h1 class="couv__t">Catalogue de gros<em>${ANNEE}</em></h1>
    <div class="couv__bloc">
      <p class="couv__adr"><b>Farafinatignɛ</b>La réalité de l'Afrique<br>Mopti — Sévaré, Rue RN6<br>Imm. Farafinatignɛ, BP 65 — Mali</p>
      <p class="couv__adr" style="text-align:right"><b>Nous joindre</b>+223 65 45 02 02<br>farafinatigne@gmail.com<br>farafinatigne.com</p>
    </div>
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
    <figure><img src="assets/atelier/atelier-bogolan-femme.webp" data-max="520" crossorigin="anonymous" alt=""><figcaption>La peinture à la boue fermentée</figcaption></figure>
    <figure><img src="assets/atelier/atelier-artisane.webp" data-max="520" crossorigin="anonymous" alt=""><figcaption>L'atelier de Sévaré</figcaption></figure>
    <figure><img src="assets/patrimoine/groupe-farafinatigne.webp" data-max="520" crossorigin="anonymous" alt=""><figcaption>Trente collaborateurs</figcaption></figure>
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
/* Detoure une image de son fond blanc : on part des quatre bords et on
   efface le blanc de proche en proche. Un remplissage depuis les bords,
   et non un simple seuil, pour ne pas trouer le sujet — l'enseigne
   blanche au milieu de la photo doit rester. */
function detourerBlanc(img) {
  /* data-crop="x0,y0,x1,y1" en fractions : le fichier fourni par le
     client est la photo de son ancienne couverture entiere, on n'en
     garde que le panneau blanc ou figure l'Afrique. */
  var co = (img.getAttribute("data-crop") || "0,0,1,1").split(",").map(Number);
  var sx = Math.round(img.naturalWidth * co[0]), sy = Math.round(img.naturalHeight * co[1]);
  var sw = Math.round(img.naturalWidth * (co[2] - co[0]));
  var sh = Math.round(img.naturalHeight * (co[3] - co[1]));
  var c = document.createElement("canvas");
  c.width = sw; c.height = sh;
  var x = c.getContext("2d", { willReadFrequently: true });
  x.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  var d = x.getImageData(0, 0, c.width, c.height), px = d.data;
  var W = c.width, H = c.height, vu = new Uint8Array(W * H), pile = [];
  var clair = function (i) { return px[i * 4] > 228 && px[i * 4 + 1] > 224 && px[i * 4 + 2] > 216; };
  for (var i = 0; i < W; i++) { pile.push(i); pile.push((H - 1) * W + i); }
  for (var j = 0; j < H; j++) { pile.push(j * W); pile.push(j * W + W - 1); }
  while (pile.length) {
    var k = pile.pop();
    if (vu[k] || !clair(k)) continue;
    vu[k] = 1; px[k * 4 + 3] = 0;
    var xx = k % W, yy = (k / W) | 0;
    if (xx > 0) pile.push(k - 1);
    if (xx < W - 1) pile.push(k + 1);
    if (yy > 0) pile.push(k - W);
    if (yy < H - 1) pile.push(k + W);
  }
  /* un pixel de fondu sur le contour, sinon le bord est en escalier */
  for (var n = 0; n < W * H; n++) {
    if (vu[n] || px[n * 4 + 3] === 0) continue;
    var voisins = 0;
    if (n % W > 0 && vu[n - 1]) voisins++;
    if (n % W < W - 1 && vu[n + 1]) voisins++;
    if (n >= W && vu[n - W]) voisins++;
    if (n < W * (H - 1) && vu[n + W]) voisins++;
    if (voisins) px[n * 4 + 3] = 120;
  }
  /* Ne garder que les taches assez grandes : le continent et Madagascar
     restent, les logos des reseaux sociaux et le « € » de l'ancienne
     couverture disparaissent. */
  var lab = new Int32Array(W * H).fill(-1), tailles = [], nb = 0;
  for (var p0 = 0; p0 < W * H; p0++) {
    if (px[p0 * 4 + 3] < 30 || lab[p0] !== -1) continue;
    var file = [p0], aire = 0;
    lab[p0] = nb;
    while (file.length) {
      var q = file.pop(); aire++;
      var qx = q % W, qy = (q / W) | 0;
      var vois = [];
      if (qx > 0) vois.push(q - 1);
      if (qx < W - 1) vois.push(q + 1);
      if (qy > 0) vois.push(q - W);
      if (qy < H - 1) vois.push(q + W);
      for (var v = 0; v < vois.length; v++) {
        var u = vois[v];
        if (lab[u] === -1 && px[u * 4 + 3] >= 30) { lab[u] = nb; file.push(u); }
      }
    }
    tailles.push(aire); nb++;
  }
  var plusGrande = Math.max.apply(null, tailles.length ? tailles : [0]);
  var seuil = plusGrande * 0.02;
  for (var r0 = 0; r0 < W * H; r0++) {
    if (lab[r0] >= 0 && tailles[lab[r0]] < seuil) px[r0 * 4 + 3] = 0;
  }

  x.putImageData(d, 0, 0);

  /* recadrage au plus juste sur ce qui reste opaque : on obtient le
     contour du continent, sans marge blanche autour */
  var x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (var m = 0; m < W * H; m++) {
    if (px[m * 4 + 3] < 30) continue;
    var mx = m % W, my = (m / W) | 0;
    if (mx < x0) x0 = mx;
    if (mx > x1) x1 = mx;
    if (my < y0) y0 = my;
    if (my > y1) y1 = my;
  }
  if (x1 <= x0 || y1 <= y0) return c;
  var t = document.createElement("canvas");
  t.width = x1 - x0 + 1; t.height = y1 - y0 + 1;
  t.getContext("2d").drawImage(c, x0, y0, t.width, t.height, 0, 0, t.width, t.height);
  return t;
}

window.alleger = function () {
  var faits = 0, total = 0;
  [].forEach.call(document.images, function (img) {
    var max = Number(img.getAttribute("data-max") || 0);
    if (!max || !img.naturalWidth) return;
    total++;
    try {
      var detour = img.getAttribute("data-detour");
      var source = detour ? detourerBlanc(img) : img;
      var large = detour ? source.width : img.naturalWidth;
      var haut = detour ? source.height : img.naturalHeight;
      var ech = Math.min(1, max / large);
      var c = document.createElement("canvas");
      c.width = Math.round(large * ech);
      c.height = Math.round(haut * ech);
      var x = c.getContext("2d");
      if (!detour) { x.fillStyle = "#F1EADC"; x.fillRect(0, 0, c.width, c.height); }
      x.drawImage(source, 0, 0, c.width, c.height);
      img.src = c.toDataURL(detour ? "image/png" : "image/jpeg", 0.72);
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
