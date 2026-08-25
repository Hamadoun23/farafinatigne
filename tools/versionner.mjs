/* =========================================================
   Farafinatignɛ — empreinte des scripts et de la feuille de style
   ---------------------------------------------------------
   Un navigateur garde js/common.js en cache et ne redemande pas
   un fichier qu'il croit connaître. Une correction mettait donc
   des heures à atteindre tout le monde, et il fallait demander
   aux visiteurs de vider leur cache — ce qu'on ne peut pas faire.

   On ajoute donc à chaque référence une empreinte du CONTENU :
     <script src="js/common.js?v=3f2a91c4">
   Tant que le fichier ne bouge pas, l'adresse ne bouge pas et le
   cache joue son rôle. Dès qu'il change, l'adresse change, et le
   navigateur n'a pas d'autre choix que de retélécharger.

   À relancer avant chaque déploiement :  node tools/versionner.mjs
   ========================================================= */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const racine = join(dirname(fileURLToPath(import.meta.url)), "..");

const empreinte = (chemin) =>
  createHash("sha256").update(readFileSync(chemin)).digest("hex").slice(0, 8);

const pages = readdirSync(racine).filter((f) => f.endsWith(".html"));
let total = 0;

for (const page of pages) {
  const fichier = join(racine, page);
  const avant = readFileSync(fichier, "utf8");

  /* On ne touche qu'aux adresses locales : une police Google ou un
     script tiers ne nous appartient pas. Une empreinte déjà posée est
     remplacée, jamais empilée. */
  const apres = avant.replace(
    /(src|href)="((?:js\/[\w.-]+\.js|style\.css))(?:\?v=[0-9a-f]+)?"/g,
    (tout, attribut, adresse) => {
      const cible = join(racine, adresse);
      if (!existsSync(cible)) {
        console.warn("  introuvable, laissé tel quel : " + adresse);
        return tout;
      }
      return `${attribut}="${adresse}?v=${empreinte(cible)}"`;
    }
  );

  if (apres !== avant) {
    writeFileSync(fichier, apres);
    const n = (apres.match(/\?v=[0-9a-f]{8}/g) || []).length;
    console.log(`${page} — ${n} référence(s) estampillée(s)`);
    total += n;
  } else {
    console.log(`${page} — inchangée`);
  }
}
console.log(`\n${total} référence(s) au total.`);
