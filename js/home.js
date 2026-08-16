/* =========================================================
   Farafinatignɛ — page d'accueil
   ========================================================= */

const MARQUEE_WORDS = {
  fr: ["Cauris", "Bogolan", "Indigo Dogon", "Laiton recyclé", "Plastique de Mopti",
       "Cuir de chèvre", "Bronze à la cire perdue", "Pâte de verre", "Vente en gros"],
  en: ["Cowries", "Bogolan", "Dogon indigo", "Recycled brass", "Mopti plastic",
       "Goat leather", "Lost-wax bronze", "Glass paste", "Wholesale"]
};

/* visuel éditorial par gamme */
const RANGE_IMG = {
  bijoux: "look-plastron-cauri",
  textile: "look-hoodie-bogolan",
  decor: "atelier-decor"
};

function renderMarquee() {
  const track = $("#marquee-track");
  if (!track) return;
  const words = MARQUEE_WORDS[LANG] || MARQUEE_WORDS.fr;
  const seq = words.map(w => "<span>" + w + '</span><i aria-hidden="true">◆</i>').join("");
  track.innerHTML = seq + seq + seq;
}

/* index des gammes sous le titre du hero */
function renderHeroIndex() {
  const el = $("#hero-index");
  if (!el) return;
  el.innerHTML = CATEGORIES.map((c, i) => `
    <a href="boutique.html?cat=${c.id}">
      <b>0${i + 1}</b><span>${label(c)}</span>
    </a>`).join("");
}

function renderFeatured() {
  const grid = $("#featured-grid");
  if (!grid) return;
  const picks = ["bo-fulani-creole", "co-cauri-massaye", "tx-coiffe-cauri",
                 "br-flipflop-couleur", "tx-boubou-capuche", "ec-cauri",
                 "tx-echarpe-bogolan", "dc-bougeoir"];
  grid.innerHTML = picks.map(productById).filter(Boolean).map(cardHTML).join("");
  initReveal(grid);
}

/* gammes : blocs éditoriaux numérotés, image en arche */
function renderRanges() {
  const wrap = $("#ranges");
  if (!wrap) return;
  wrap.innerHTML = CATEGORIES.map((c, i) => {
    const n = PRODUCTS.filter(p => p.cat === c.id).length;
    const subs = c.subs.map(s =>
      `<a href="boutique.html?cat=${c.id}&sub=${s.id}">${label(s)}</a>`).join("");
    return `
    <article class="range reveal">
      <div class="range__media">
        <span class="range__num" aria-hidden="true">0${i + 1}</span>
        <div class="range__arch">
          <img src="assets/editorial/${RANGE_IMG[c.id]}.jpg" alt="${label(c)}" loading="lazy">
        </div>
      </div>
      <div class="range__body">
        <span class="range__count">${n} ${t("shop.count")}</span>
        <h3>${label(c)}</h3>
        <p>${t("cat." + c.id + ".d")}</p>
        <div class="range__subs">${subs}</div>
        <a class="link-u" href="boutique.html?cat=${c.id}">${t("cat.see")}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </article>`;
  }).join("");
  initReveal(wrap);
}

/* compteurs animés */
function initCounters() {
  const els = $$(".stat__num[data-count]");
  if (!els.length || !("IntersectionObserver" in window)) {
    els.forEach(e => { e.textContent = e.getAttribute("data-count"); });
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const target = parseInt(e.target.getAttribute("data-count"), 10);
      const dur = 1500, t0 = performance.now();
      const step = now => {
        const k = Math.min(1, (now - t0) / dur);
        const val = Math.round(target * (1 - Math.pow(1 - k, 3)));
        e.target.textContent = val.toLocaleString(LANG === "fr" ? "fr-FR" : "en-GB");
        if (k < 1) requestAnimationFrame(step);
        else e.target.textContent = target.toLocaleString(LANG === "fr" ? "fr-FR" : "en-GB");
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  els.forEach(e => io.observe(e));
}

function renderHome() {
  const count = $("#hero-count");
  if (count) count.textContent = PRODUCTS.length;   // suit le catalogue
  renderMarquee();
  renderHeroIndex();
  renderFeatured();
  renderRanges();
}

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  initCounters();
});
document.addEventListener("langchange", renderHome);
/* données rafraîchies depuis la base : on redessine à l'identique */
document.addEventListener("datachange", renderHome);
