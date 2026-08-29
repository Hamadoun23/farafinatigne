#!/bin/bash
# =============================================================
#  Regeneration automatique du catalogue PDF — Farafinatigne
#
#  Le catalogue se telecharge en ligne : il doit dire les memes prix
#  que la boutique, sans qu'un humain ait a penser a relancer un
#  script sur son poste a chaque changement de tarif. Ce script fait
#  ce que le poste de travail faisait a la main (Chrome + serveur
#  local) mais avec un Chrome et un Node ephemeres, sur le serveur
#  lui-meme, plantes en tache planifiee (cron).
#
#  Si une etape echoue, le fichier deja en ligne n'est jamais touche :
#  tools/build-catalogue.mjs n'ecrit le PDF qu'a la toute fin, une
#  fois le rendu termine avec succes.
# =============================================================
set -uo pipefail

SITE=/opt/farafina/site
LOG=/opt/farafina/backups/catalogue-cron.log
LOCK=/tmp/ft-catalogue.lock
CHROME_PORT=9333
CHROME_NAME=ft-chrome-cron

exec 9>"$LOCK"
if ! flock -n 9; then
  echo "$(date -Iseconds) — deja en cours, on saute ce passage" >> "$LOG"
  exit 0
fi

# le journal ne grossit pas indefiniment
if [ -f "$LOG" ] && [ "$(wc -l < "$LOG")" -gt 2000 ]; then
  tail -n 500 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
fi

nettoyer() { docker rm -f "$CHROME_NAME" >/dev/null 2>&1 || true; }
trap nettoyer EXIT

echo "$(date -Iseconds) — debut" >> "$LOG"

docker rm -f "$CHROME_NAME" >/dev/null 2>&1 || true
docker run -d --rm --name "$CHROME_NAME" \
  -p 127.0.0.1:${CHROME_PORT}:9222 --shm-size=512m \
  chromedp/headless-shell:latest >/dev/null

# attendre que Chrome reponde, puis ouvrir un onglet : headless-shell
# n'en propose aucun par defaut, et le script s'attend a en trouver un.
pret=0
for i in $(seq 1 20); do
  if curl -sf "http://127.0.0.1:${CHROME_PORT}/json/version" >/dev/null 2>&1; then pret=1; break; fi
  sleep 1
done
if [ "$pret" != "1" ]; then
  echo "$(date -Iseconds) — echec : Chrome ne repond pas" >> "$LOG"
  exit 1
fi
curl -sf -X PUT "http://127.0.0.1:${CHROME_PORT}/json/new?about:blank" >/dev/null

if docker run --rm --network host \
     -v "$SITE":/site -w /site \
     -e FT_SERVEUR=https://farafinatigne.com \
     -e FT_CHROME=${CHROME_PORT} \
     node:22-alpine node tools/build-catalogue.mjs >> "$LOG" 2>&1; then
  taille=$(stat -c%s "$SITE/assets/catalogue/catalogue-farafinatigne.pdf" 2>/dev/null || echo "?")
  echo "$(date -Iseconds) — reussi (${taille} octets)" >> "$LOG"
else
  echo "$(date -Iseconds) — echec de la generation, le catalogue en ligne n'a pas bouge" >> "$LOG"
fi

# le script laisse parfois le HTML temporaire si une etape a mal tourne
rm -f "$SITE/_catalogue-print.html"
