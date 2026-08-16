/* =========================================================
   Farafina Tignè — formulaire de contact
   Site statique : le message part par e-mail (mailto) si aucun
   endpoint n'est configuré dans common.js (LEAD_ENDPOINT).
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = $("#contact-form");
  if (!form) return;
  const out = $("#c-msg-out");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#c-name").value.trim();
    const email = $("#c-email").value.trim();
    const company = $("#c-company").value.trim();
    const country = $("#c-country").value.trim();
    const subject = $("#c-subject").value.trim();
    const message = $("#c-msg").value.trim();

    if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 5) {
      out.textContent = t("contact.form.err");
      out.className = "form__msg form__msg--err";
      return;
    }

    const fr = LANG === "fr";
    const subj = subject || (fr ? "Demande — site Farafina Tignè" : "Enquiry — Farafina Tignè website");
    const body =
      (fr ? "Nom : " : "Name: ") + name + "\n" +
      (fr ? "Société : " : "Company: ") + (company || "—") + "\n" +
      (fr ? "E-mail : " : "E-mail: ") + email + "\n" +
      (fr ? "Pays : " : "Country: ") + (country || "—") + "\n\n" +
      message;

    if (LEAD_ENDPOINT) {
      fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, company, country, subject: subj, message, lang: LANG })
      }).catch(() => {});
    }
    window.location.href = mailLink(subj, body);

    out.textContent = t("contact.form.ok");
    out.className = "form__msg form__msg--ok";
    form.reset();
  });
});
