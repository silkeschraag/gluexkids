# GlüXkids – Die Eltern-App

Installierbare Web-App (PWA) für Eltern: Freebies, Alltagsübungen, Wochenimpulse
und – Schritt für Schritt – die 19-€-Online-Kurse.

Die App braucht keinen App Store: Eltern öffnen den Link und tippen auf
„Zum Home-Bildschirm“ – dann liegt GlüXkids wie eine normale App auf dem Handy
und funktioniert auch offline.

## Inhalte pflegen – nur `content.js`

| Was | Wie |
|---|---|
| Neues Freebie | Eintrag in `freebies` kopieren und anpassen. Typen: `uebung`, `alltag`, `download`, `serie` |
| Übungsserie | `typ: "serie"` mit einer Liste `uebungen` – jede Übung wird eine Karte zum Durchwischen (Vorlage: „Koordination für zu Hause“) |
| Hervorheben | `neu: true` – Etikett „Neu“ und großer Hinweis oben auf der Startseite |
| Download-Datei | Datei (PDF/PNG) in `downloads/` legen, bei `datei:` eintragen |
| Titelbild | Bild in `img/` legen, bei `bild:` eintragen |
| Wochenimpuls | Eintrag in `impulse` – erscheint automatisch ab `datum`, du kannst also vorplanen |
| Kurs freischalten | `status: "verfuegbar"` und `kaufLink:` (z. B. Digistore24, CopeCart, Stripe) setzen |
| Links | Newsletter, Mail, Impressum usw. oben unter `einstellungen` (**noch prüfen!**) |

Nach größeren Änderungen in `sw.js` die `VERSION` hochzählen (z. B. `gluexkids-v2`),
damit alle installierten Apps die neuen Dateien laden.

## Design

Warm und ruhig: Leinen/Creme als Grund, Terrakotta als einziger Akzent,
Salbei für „erledigt“, Fraunces (Serif) für Überschriften, Nunito Sans für Text.
Die Farbe kommt aus Silkes Illustrationen und Fotos – nicht aus bunten Flächen.

## Lokal ansehen

```
cd app && python3 -m http.server 8000
```
→ http://localhost:8000

## Veröffentlichen

Der Ordner `app/` ist statisch und läuft auf jedem Webspace (z. B. als
`app.gluexkids.de`), auf Netlify oder GitHub Pages. HTTPS ist nötig, damit man
die App installieren kann.
