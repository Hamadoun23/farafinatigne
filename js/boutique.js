/* =========================================================
   Farafinatignɛ — boutique / catalogue
   URL : boutique.html?cat=bijoux&sub=colliers
   ========================================================= */

let FILTER = { cat: "all", sub: "all" };

function readUrlFilter() {
  const q = new URLSearchParams(location.search);
  const cat = q.get("cat");
  const sub = q.get("sub");
  FILTER.cat = cat && catById(cat) ? cat : "all";
  FILTER.sub = FILTER.cat !== "all" && sub && subById(FILTER.cat, sub) ? sub : "all";
}

function pushUrlFilter() {
  const q = new URLSearchParams();
  if (FILTER.cat !== "all") q.set("cat", FILTER.cat);
  if (FILTER.sub !== "all") q.set("sub", FILTER.sub);
  const s = q.toString();
  history.replaceState(null, "", s ? "?" + s : location.pathname);
}

function filteredProducts() {
  return PRODUCTS.filter(p =>
    (FILTER.cat === "all" || p.cat === FILTER.cat) &&
    (FILTER.sub === "all" || p.sub === FILTER.sub));
}

function renderFilters() {
  const cats = $("#filters-cat");
  const subs = $("#filters-sub");
  if (!cats) return;

  cats.innerHTML =
    '<button class="filter' + (FILTER.cat === "all" ? " is-active" : "") + '" data-cat="all">' +
    t("shop.all") + "</button>" +
    CATEGORIES.map(c =>
      '<button class="filter' + (FILTER.cat === c.id ? " is-active" : "") + '" data-cat="' + c.id + '">' +
      label(c) + "</button>").join("");

  if (FILTER.cat === "all") {
    subs.innerHTML = "";
    subs.classList.remove("is-visible");
  } else {
    const c = catById(FILTER.cat);
    subs.innerHTML =
      '<button class="filter filter--sub' + (FILTER.sub === "all" ? " is-active" : "") + '" data-sub="all">' +
      t("shop.all") + "</button>" +
      c.subs.map(s => {
        const n = PRODUCTS.filter(p => p.cat === c.id && p.sub === s.id).length;
        return '<button class="filter filter--sub' + (FILTER.sub === s.id ? " is-active" : "") +
          '" data-sub="' + s.id + '">' + label(s) + '<i>' + n + "</i></button>";
      }).join("");
    subs.classList.add("is-visible");
  }
}

function renderGrid() {
  const grid = $("#shop-grid");
  if (!grid) return;
  const list = filteredProducts();
  const count = $("#shop-count");
  if (count) count.textContent = list.length + " " + t("shop.count");

  const title = $("#shop-heading");
  if (title) {
    if (FILTER.cat === "all") title.textContent = t("shop.title");
    else {
      const c = catById(FILTER.cat);
      const s = FILTER.sub !== "all" ? subById(FILTER.cat, FILTER.sub) : null;
      title.textContent = s ? label(c) + " — " + label(s) : label(c);
    }
  }

  grid.innerHTML = list.length
    ? list.map(cardHTML).join("")
    : '<p class="shop__empty">' + t("shop.empty") + "</p>";
  initReveal(grid);
}

function renderShop() {
  renderFilters();
  renderGrid();
}

document.addEventListener("DOMContentLoaded", () => {
  readUrlFilter();
  renderShop();

  document.addEventListener("click", e => {
    const c = e.target.closest("[data-cat]");
    if (c) {
      FILTER.cat = c.getAttribute("data-cat");
      FILTER.sub = "all";
      pushUrlFilter();
      renderShop();
      const anchor = $("#shop-top");
      if (anchor) window.scrollTo({ top: anchor.offsetTop - 90, behavior: "smooth" });
      return;
    }
    const s = e.target.closest("[data-sub]");
    if (s) {
      FILTER.sub = s.getAttribute("data-sub");
      pushUrlFilter();
      renderShop();
    }
  });
});

document.addEventListener("langchange", renderShop);
document.addEventListener("datachange", renderShop);
