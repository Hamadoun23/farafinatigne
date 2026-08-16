# Farafinatignɛ — site vitrine & catalogue de gros

Site de **Farafinatignɛ**, entreprise artisanale de Mopti-Sévaré (Mali) :
bijoux en cauris, laiton et plastique recyclés, textiles bogolan et indigo,
objets d'art. Vente **en gros uniquement**, prix en euros, commande minimum 500 €,
expédition depuis l'atelier.

🌍 Domaine cible : **farafinatigne.com**

## Ce que c'est

Un site **100 % statique** : HTML, CSS et JavaScript vanilla. Aucun framework,
aucune étape de build, aucune dépendance npm en production. Le dossier se dépose
tel quel sur n'importe quel hébergement.

| | |
|---|---|
| Pages | Accueil, Boutique, À propos, Contact |
| Langues | Français / Anglais (sélecteur en en-tête, persistant, `?lang=en`) |
| Catalogue | 96 références, 3 gammes, 12 sous-catégories, tarifs de gros en euros |
| Commande | Pas de paiement en ligne : sélection → récapitulatif WhatsApp ou e-mail → facture proforma |
| Catalogue PDF | 20 pages (5,8 Mo), derrière un formulaire nom + e-mail (capture de prospects) |

## Démarrer en local

```bash
python -m http.server 5510 --bind 127.0.0.1
```

Puis ouvrir <http://127.0.0.1:5510>.

> Viser `127.0.0.1` et non `localhost` : sur certaines machines `localhost` part en
> IPv6 vers un service Docker et renvoie une erreur trompeuse.

## Structure

```
index.html  boutique.html  a-propos.html  contact.html
style.css                     feuille unique, tokens CSS en tête de fichier
js/
  i18n.js                     dictionnaire FR/EN + moteur (data-i18n)
  products.js                 source unique de vérité : catégories et 87 produits
  common.js                   coordonnées, carte produit, nav, modale catalogue
  cart.js                     sélection / demande de devis
  home.js  boutique.js  contact.js
assets/
  images/                     83 photos produits optimisées
  editorial/                  18 visuels éditoriaux
  catalogue-farafinatigne.pdf catalogue grossiste
  favicon.svg
tools/build-pages.py          régénère les 3 pages secondaires depuis index.html
claudeprompt.md               contexte du projet, direction artistique, points ouverts
```

`boutique.html`, `a-propos.html` et `contact.html` sont **générés** : la nav et le
footer viennent d'`index.html`. Après les avoir modifiés, lancer
`python tools/build-pages.py` plutôt que d'éditer les trois fichiers à la main.

**Lire `claudeprompt.md` avant toute modification** : il contient la palette (extraite
du bandeau de marque), les règles de composition, l'origine des prix et les pièges
connus.

## Avant la mise en production

- [ ] Renseigner `LEAD_ENDPOINT` dans `js/common.js` (Formspree, Getform, Basin…),
      sinon les prospects du catalogue ne remontent que par e-mail pré-rempli.
- [ ] Ajouter le lien TikTok (l'icône figure sur la brochure, l'identifiant manque).
- [ ] Compléter les 16 références en « prix sur demande » (`price: null`).
- [ ] Faire pointer le domaine, forcer le HTTPS, soumettre `sitemap.xml`.

## Déploiement

Aucun build : brancher le dépôt sur Vercel, Netlify ou GitHub Pages, ou déposer les
fichiers par FTP. Si le domaine final diffère, remplacer `https://farafinatigne.com/`
dans les balises `canonical` / `og:url`, `sitemap.xml` et `robots.txt`.

---

© Farafinatignɛ — Mopti-Sévaré, Mali.
