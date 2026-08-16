/* =========================================================
   Farafina Tignè — sélection / demande de devis
   Pas de paiement en ligne : la sélection produit un récapitulatif
   envoyé par WhatsApp ou par e-mail pour facture proforma.
   ========================================================= */

const CART_KEY = "ft-cart";
let CART = [];

try { CART = JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch (_) { CART = []; }

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(CART)); } catch (_) {}
  renderCart();
}

function cartCount() { return CART.reduce((n, l) => n + l.qty, 0); }
function cartTotal() {
  return CART.reduce((s, l) => {
    const p = productById(l.id);
    return s + (p && p.price != null ? p.price * l.qty : 0);
  }, 0);
}

function addToCart(id) {
  const p = productById(id);
  if (!p) return;
  const line = CART.find(l => l.id === id);
  if (line) line.qty++;
  else CART.push({ id, qty: 1 });
  saveCart();
  toast(t("p.added"));
  const btn = document.querySelector('.nav__cart');
  if (btn) { btn.classList.remove("pulse"); void btn.offsetWidth; btn.classList.add("pulse"); }
}

function changeQty(id, delta) {
  const line = CART.find(l => l.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) CART = CART.filter(l => l.id !== id);
  saveCart();
}

function removeFromCart(id) {
  CART = CART.filter(l => l.id !== id);
  saveCart();
}

function clearCart() {
  CART = [];
  saveCart();
}

/* ---------- rendu ---------- */
function renderCart() {
  const count = $("#cart-count");
  if (count) {
    count.textContent = cartCount();
    count.classList.toggle("show", cartCount() > 0);
  }

  const body = $("#cart-body");
  if (!body) return;

  if (!CART.length) {
    body.innerHTML =
      '<div class="cart__empty">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M1 2h3.6l2.4 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 6H5.6"/></svg>' +
      "<p>" + t("cart.empty") + "</p>" +
      '<a href="boutique.html" class="btn btn--gold btn--sm">' + t("cart.emptyCta") + "</a>" +
      "</div>";
  } else {
    body.innerHTML = CART.map(l => {
      const p = productById(l.id);
      if (!p) return "";
      const price = p.price != null
        ? euro(p.price * l.qty)
        : '<span class="price--quote">' + t("p.quote") + "</span>";
      return `
      <div class="cart-line">
        <img src="assets/images/${p.img}.jpg" alt="${p[LANG].name}" loading="lazy">
        <div class="cart-line__body">
          <span class="cart-line__ref">${p.ref}</span>
          <h4>${p[LANG].name}</h4>
          <div class="cart-line__row">
            <div class="qty">
              <button data-dec="${p.id}" aria-label="-">−</button>
              <span>${l.qty}</span>
              <button data-inc="${p.id}" aria-label="+">+</button>
            </div>
            <b class="cart-line__price">${price}</b>
          </div>
        </div>
        <button class="cart-line__rm" data-remove="${p.id}" aria-label="${t("cart.remove")}">&times;</button>
      </div>`;
    }).join("");
  }

  const total = $("#cart-total");
  if (total) total.textContent = euro(cartTotal());

  const moq = $("#cart-moq");
  if (moq) {
    const diff = MOQ - cartTotal();
    if (!CART.length) { moq.textContent = ""; moq.className = "cart__moq"; }
    else if (diff <= 0) { moq.textContent = t("cart.moqOk"); moq.className = "cart__moq is-ok"; }
    else { moq.textContent = t("cart.moqKo", { x: euro(diff) }); moq.className = "cart__moq is-ko"; }
  }
}

/* ---------- récapitulatif ---------- */
function cartSummary() {
  const fr = LANG === "fr";
  const lines = CART.map(l => {
    const p = productById(l.id);
    const price = p.price != null ? euro(p.price) : (fr ? "prix sur demande" : "price on request");
    const sub = p.price != null ? " = " + euro(p.price * l.qty) : "";
    return "• " + l.qty + " × " + p[LANG].name + " (" + p.ref + ") — " + price + sub;
  }).join("\n");

  const head = fr
    ? "Bonjour Farafina Tignè,\nVoici ma demande de devis de gros :\n\n"
    : "Hello Farafina Tignè,\nHere is my wholesale quote request:\n\n";
  const foot = fr
    ? "\n\nTotal estimé : " + euro(cartTotal()) +
      "\n(Commande minimum 500 € — merci de me transmettre la facture proforma avec les frais de port.)" +
      "\n\nSociété : \nPays de livraison : \nAdresse : "
    : "\n\nEstimated total: " + euro(cartTotal()) +
      "\n(Minimum order €500 — please send the proforma invoice including shipping.)" +
      "\n\nCompany: \nDelivery country: \nAddress: ";
  return head + lines + foot;
}

/* ---------- drawer ---------- */
function openCart() {
  const c = $("#cart");
  if (!c) return;
  c.classList.add("open");
  $("#overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  const c = $("#cart");
  if (!c) return;
  c.classList.remove("open");
  $("#overlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  const open = $("#cart-open"), close = $("#cart-close"), ov = $("#overlay");
  if (open) open.addEventListener("click", openCart);
  if (close) close.addEventListener("click", closeCart);
  if (ov) ov.addEventListener("click", closeCart);

  const wa = $("#cart-wa");
  if (wa) wa.addEventListener("click", () => {
    if (!CART.length) return;
    window.open(waLink(cartSummary()), "_blank");
  });

  const mail = $("#cart-mail");
  if (mail) mail.addEventListener("click", () => {
    if (!CART.length) return;
    const subject = LANG === "fr"
      ? "Demande de devis de gros — " + cartCount() + " article(s)"
      : "Wholesale quote request — " + cartCount() + " item(s)";
    window.location.href = mailLink(subject, cartSummary());
  });

  const clear = $("#cart-clear");
  if (clear) clear.addEventListener("click", clearCart);
});

document.addEventListener("langchange", renderCart);
