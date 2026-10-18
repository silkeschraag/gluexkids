# PowerUpKids ⚡

**Bewegung, Mindset, Stärke.** Eine Expo-App (iOS, Android, Web) für Trainerinnen und Trainer im Kindertraining,
mit Aufwärmspielen und Koordinationsübungen für Kinder von 4 bis 12 Jahren.

## Funktionen

- **Übungskatalog** mit 35 Übungen in 5 Rubriken:
  🔥 Aufwärmspiele · 🤾 Hand-Auge · ⚽ Fuß-Auge · ⚡ Schnelligkeit & Reaktion · 🤸 Gleichgewicht
- **Filter** (kombinierbar, auf der Startseite und in jeder Rubrik):
  - Rubrik
  - Alter (4–6, 7–9, 10–12 Jahre)
  - Dauer (bis 6 Min, 7–10 Min, über 10 Min)
  - Schwierigkeit (leicht, mittel, schwer)
  - Material: Wähle, was du dabei hast, und es erscheinen nur Übungen, die damit auskommen. Oder wähle „Ohne Material“.
- **Suche** nach Name, Ziel oder Material.
- **Einheit zusammenstellen**: Übungen per „＋ Einheit“ sammeln, sortieren, austauschen und Phasen zuordnen
  (Aufwärmen, Hauptteil, Abschluss). Alternativ macht die App einen automatischen Vorschlag passend zu Alter,
  Dauer und Schwerpunkten.
- **PDF zum Ausdrucken**: Kopf mit PowerUpKids-Logo, Ablauf zum Abhaken, Materialliste und jede Übung mit Aufbau,
  Ablauf, Varianten, Coaching-Tipps und einer Notizzeile. Auf dem Handy wird das PDF über den Teilen-Dialog
  geteilt oder gespeichert, im Browser über den Druckdialog („Als PDF speichern“).
- **Intervall-Timer** und Übungs-Timer, **Favoriten**.

## Starten

```bash
cd trainer-app
npm install
npx expo start
```

Dann den QR-Code mit **Expo Go** scannen – oder `w` für die Web-Version drücken.

## Struktur

```
src/
  app/                 Screens (Expo Router)
    (tabs)/            Übungen, Einheit, Timer, Favoriten
    kategorie/[id].tsx Rubrik mit Filtern
    uebung/[id].tsx    Übungsdetail mit Timer
  components/          UI-Bausteine, FilterPanel, ExerciseCard
  data/                Rubriken, Material-Tags & Übungen  ← hier neue Übungen ergänzen
  lib/
    filters.tsx        Filterlogik
    session.tsx        Zusammengestellte Einheit (lokal gespeichert)
    plan.ts            Automatischer Vorschlag
    sessionHtml.ts     Druckvorlage (HTML)
    pdf.ts             PDF erzeugen, teilen, drucken
  brand.ts             Name & Slogan
  theme.ts             Farben
```

### Neue Übung hinzufügen

In `src/data/exercises.ts` ein weiteres Objekt vom Typ `Exercise` anhängen. Mit `difficulty` (1–3) und `equipment`
(Material-Tags aus `src/data/types.ts`) erscheint die Übung automatisch richtig in den Filtern, in der Suche,
im Vorschlag und im PDF.
