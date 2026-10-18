# GlüXkids Trainer

Eine Expo-App (iOS, Android, Web) für Trainerinnen und Trainer im Kindertraining, mit Aufwärmspielen und
Koordinationsübungen für Kinder von 4 bis 12 Jahren.

## Funktionen

- **Übungskatalog** mit 35 Übungen in 5 Kategorien:
  - 🔥 Aufwärmspiele
  - 🤾 Hand-Auge-Koordination
  - ⚽ Fuß-Auge-Koordination
  - ⚡ Schnelligkeit & Reaktion
  - 🤸 Gleichgewicht
- Jede Übung hat Ziel, Alter, Dauer, Gruppengröße, Intensität, Material, Aufbau, Ablauf in Schritten,
  eine leichtere und eine schwerere Variante sowie Coaching-Tipps.
- **Suche** nach Name, Ziel oder Material und **Altersfilter** (4–6, 7–9, 10–12 Jahre).
- **Übungs-Timer** direkt in jeder Übung.
- **Trainingsplaner**: Altersgruppe, Dauer (30–90 Min) und Schwerpunkte wählen. Die App stellt daraus
  eine Einheit aus Aufwärmen, Hauptteil und Abschlussspiel zusammen. Einzelne Übungen lassen sich austauschen
  und abhaken, eine Materialliste wird automatisch erstellt.
- **Intervall-Timer** mit Vorlagen (Sprints, Schnelle Füße, Stationen, Spielrunde). Er hält den Bildschirm wach
  und vibriert bei jedem Phasenwechsel.
- **Favoriten**, die auf dem Gerät gespeichert werden.

## Starten

```bash
cd trainer-app
npm install
npx expo start
```

Dann den QR-Code mit **Expo Go** scannen (Android) bzw. mit der Kamera-App (iOS) – oder `w` für die Web-Version drücken.

## Prüfen

```bash
npm run typecheck
```

## Struktur

```
src/
  app/                 Screens (Expo Router)
    (tabs)/            Übungen, Training, Timer, Favoriten
    kategorie/[id].tsx Übungsliste einer Kategorie
    uebung/[id].tsx    Übungsdetail mit Timer
  components/          UI-Bausteine
  data/                Kategorien & Übungen  ← hier neue Übungen ergänzen
  lib/                 Favoriten, Trainingsplan-Generator, Intervall-Timer
  theme.ts             GlüXkids-Farben
```

### Neue Übung hinzufügen

In `src/data/exercises.ts` ein weiteres Objekt vom Typ `Exercise` an das Array anhängen. Die Übung erscheint
dann automatisch in der Kategorie, in der Suche und im Trainingsplaner.
