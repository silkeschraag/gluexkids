# GlüXkids – Projektleitlinien („Mastercode“)

Projekt von Silke Schraag (GlüXkids, gluexkids.de). Sprache für alle Inhalte: Deutsch,
Eltern werden geduzt.

## Arbeitsweise – IMMER ZUERST FRAGEN
- **Bevor Inhalte in die App kommen, Silke immer zuerst fragen.** Das gilt für neue oder
  selbst formulierte Übungen, Texte, Impulse, Kursbeschreibungen und jede inhaltliche Änderung.
- Ablauf: Entwurf im Chat zeigen → fragen, ob Übungen und Text so passen oder ob sie etwas
  ändern möchte → **erst nach ihrem Okay** in `app/content.js` bzw. die App einfügen.
- Auch bei eigenen Ideen (z. B. zusätzliche Übungen, neue Formulierungen) nichts eigenmächtig
  einbauen, sondern als Vorschlag zur Freigabe vorlegen.

## Marke
- Das ist eine **GlüXkids-App** – keine TaffeTiger-App.
- **Hauptfigur ist Foxy, der Fuchs** (orange, grüner Hoodie). Die **GlüXbande** darf dezent
  auftauchen, aber nicht im Fokus stehen: Foxy (Fuchs), Lio (Löwe), PinguPik (Pinguin),
  Fina (Faultier), Samy (Schildkröte), Taffi (Tiger), Elli (Elefant). Clara (Chamäleon) gibt es nicht mehr.
  Einzelbilder (freigestellt): `app/img/bande/<name>.webp`. Gruppenbild: `app/img/glueckbande.webp`
  (noch die alte Version mit Clara – wird ersetzt, sobald Silke das neue Gruppenbild schickt).
- **TaffeTiger®** nur als Werbung/Hinweis bzw. als Silkes Qualifikation erwähnen – nicht
  in Übungsnamen, Figuren, Logo oder Bildsprache der App.
- Hauptlogo: `app/img/logo.png` (GlüXkids, „Bewegung • Mindset • Stärke“).
  App-Icon: das X mit Sonne aus dem Logo (`app/icons/`).

## Design
- Stilvoll, warm, ruhig – nie billig, nie „KI-generiert“, kein 0815-Look, nicht zu bunt.
- Leinen/Creme als Grund, warmes Dunkelbraun für Text, **ein** Akzent (Terrakotta),
  Salbei nur für „erledigt“. Fraunces für Überschriften, Nunito Sans für Text.
- Wärme kommt aus Silkes Aquarell-Illustrationen und Fotos, nicht aus bunten Flächen.
- Keine Emojis in der Oberfläche.

## Inhalte
- Freebies werden **nach Themen gebündelt** (z. B. Koordination, Mut & Selbstvertrauen,
  Gefühle & innere Ruhe) – keine einzelnen Übungen als eigene Freebies. Jedes Thema ist eine
  Serie mit Karten zum Durchwischen direkt in der App; PDFs nur als zusätzliche Druckversion.
- Silkes Schwerpunkt ist: **Kinder stärken, Selbstvertrauen fördern, Mobbingprävention** –
  Koordination/Bewegung ist ein Weg dorthin, nicht das Hauptthema.
- „Tiefer einsteigen?“ = Kurswerbung, nur passend zum Thema (Feld `kurs`) und auf der Startseite.
- Die Gesprächskarten „Erzähl doch mal“ sind ein **Verkaufsprodukt** – nicht als Freebie-Bild
  verwenden; später mit Link zur Bestellseite.
- Alle Inhalte in `app/content.js`; Anleitung in `app/README.md`.
- Online-Kurse: „No-Brainer“ für 19 €, zunächst als „Bald verfügbar“ mit Warteliste.
- Fachlich seriös bleiben: keine übertriebenen Wirkversprechen.
