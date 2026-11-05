import { colors } from '../theme';
import type { Category, CategoryId } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'aufwaermen',
    title: 'Aufwärmspiele',
    short: 'Aufwärmen',
    emoji: '🔥',
    color: colors.orange,
    description:
      'Lauf- und Fangspiele, die Herz, Kreislauf und Muskeln auf Betriebstemperatur bringen – und für gute Laune sorgen.',
  },
  {
    id: 'hand-auge',
    title: 'Hand-Auge-Koordination',
    short: 'Hand-Auge',
    emoji: '🤾',
    color: colors.blue,
    description: 'Werfen, Fangen, Prellen und Jonglieren: Übungen, bei denen Augen und Hände perfekt zusammenarbeiten.',
  },
  {
    id: 'fuss-auge',
    title: 'Fuß-Auge-Koordination',
    short: 'Fuß-Auge',
    emoji: '⚽',
    color: colors.green,
    description:
      'Ballführung, Passen, Stoppen und präzise Fußarbeit – vom ersten Ballkontakt bis zum Koordinationsparcours.',
  },
  {
    id: 'schnelligkeit',
    title: 'Schnelligkeit & Reaktion',
    short: 'Schnelligkeit',
    emoji: '⚡',
    color: colors.yellow,
    description: 'Kurze, explosive Sprints, Reaktionsspiele und schnelle Füße. Wichtig: kurze Belastung, lange Pausen.',
  },
  {
    id: 'gleichgewicht',
    title: 'Gleichgewicht',
    short: 'Balance',
    emoji: '🤸',
    color: colors.blueDark,
    description: 'Balancieren, Stabilisieren und Körperspannung – die Basis für jede andere koordinative Fähigkeit.',
  },
  {
    id: 'kraft',
    title: 'Kraft',
    short: 'Kraft',
    emoji: '💪',
    color: colors.red,
    description:
      'Spielerisches Krafttraining mit dem eigenen Körpergewicht: Tiergänge, Stützspiele, Sprünge und Partnerübungen.',
  },
  {
    id: 'innere-staerke',
    title: 'Innere Stärke',
    short: 'Innere Stärke',
    emoji: '🦁',
    color: colors.purple,
    description:
      'Mut, Selbstvertrauen und ein starkes Mindset: Spiele rund um eigene Stärken, Fehler als Lernchance und Ruhe im Kopf.',
  },
  {
    id: 'hilfe-holen',
    title: 'Hilfe holen',
    short: 'Hilfe holen',
    emoji: '🤝',
    color: colors.teal,
    description:
      'Um Hilfe bitten, Hilfe annehmen, „Stopp!“ sagen und Vertrauenspersonen kennen – spielerisch und in Bewegung.',
  },
];

export function getCategory(id: CategoryId): Category {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`Unbekannte Kategorie: ${id}`);
  return category;
}
