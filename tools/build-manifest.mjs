/**
 * Inventaire des photos du site.
 *
 *   node tools/build-manifest.mjs
 *
 * Ecrit assets/manifest.json : la liste des fichiers ranges sous assets/,
 * classes par dossier. Le back-office la lit pour proposer les photos
 * deja livrees avec le site, au lieu d'obliger a reteleverser une image
 * qui s'y trouve deja.
 *
 * A relancer apres avoir ajoute des photos dans assets/.
 */
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(SITE, "assets");

/* Ce qui n'a rien a faire dans un choix de photo : le PDF, les favicons. */
const IGNORE = new Set(["catalogue", "marque"]);
const IMAGES = /\.(webp|jpe?g|png)$/i;

function parcourir(dossier, prefixe = "") {
  const sortie = [];
  for (const entree of readdirSync(dossier)) {
    const complet = join(dossier, entree);
    const chemin = prefixe ? `${prefixe}/${entree}` : entree;
    if (statSync(complet).isDirectory()) {
      if (!prefixe && IGNORE.has(entree)) continue;
      sortie.push(...parcourir(complet, chemin));
    } else if (IMAGES.test(entree)) {
      sortie.push({ chemin, poids: statSync(complet).size });
    }
  }
  return sortie;
}

const fichiers = parcourir(ASSETS);

/* Deux familles : les photos de reference, rangees sous produits/, et
   les photos editoriales (salons, ateliers, portraits). */
const manifeste = {
  genere: new Date().toISOString().slice(0, 10),
  total: fichiers.length,
  produits: fichiers.filter((f) => f.chemin.startsWith("produits/")).map((f) => f.chemin).sort(),
  editorial: fichiers.filter((f) => !f.chemin.startsWith("produits/")).map((f) => f.chemin).sort(),
};

writeFileSync(join(ASSETS, "manifest.json"), JSON.stringify(manifeste, null, 1) + "\n", "utf8");
console.log(
  `assets/manifest.json : ${manifeste.produits.length} photos de reference, ` +
  `${manifeste.editorial.length} editoriales`
);
