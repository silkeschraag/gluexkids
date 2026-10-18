import { EXERCISES } from '../data/exercises';
import type { AgeGroup, CategoryId, Exercise } from '../data/types';

export type PlanPhase = 'aufwaermen' | 'hauptteil' | 'abschluss';

export type PlanItem = { phase: PlanPhase; exercise: Exercise };

export const PHASE_LABELS: Record<PlanPhase, string> = {
  aufwaermen: 'Aufwärmen',
  hauptteil: 'Hauptteil',
  abschluss: 'Abschlussspiel',
};

export type CoordinationFocus = Exclude<CategoryId, 'aufwaermen'>;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function forAge(age: AgeGroup) {
  return EXERCISES.filter((e) => e.ages.includes(age));
}

/**
 * Stellt eine Trainingseinheit zusammen: ein Aufwärmspiel, Koordinationsübungen
 * aus den gewählten Schwerpunkten (abwechselnd) bis die Zielzeit erreicht ist,
 * und ein lockeres Abschlussspiel.
 */
export function generatePlan(age: AgeGroup, totalMinutes: number, focus: CoordinationFocus[]): PlanItem[] {
  const pool = forAge(age);
  const warmups = shuffle(pool.filter((e) => e.category === 'aufwaermen'));
  const warmup = warmups[0];
  // Abschluss: ein Spiel, das nicht schon zum Aufwärmen dran war; gern mit Spaßfaktor.
  const finale = warmups.find((e) => e !== warmup) ?? warmup;

  const items: PlanItem[] = [];
  if (warmup) items.push({ phase: 'aufwaermen', exercise: warmup });

  const reserved = (warmup?.duration ?? 0) + (finale?.duration ?? 0);
  let remaining = totalMinutes - reserved;

  const queues = (focus.length ? focus : (['hand-auge', 'fuss-auge', 'schnelligkeit'] as CoordinationFocus[])).map(
    (category) => shuffle(pool.filter((e) => e.category === category)),
  );

  let added = true;
  while (remaining > 4 && added) {
    added = false;
    for (const queue of queues) {
      const next = queue.shift();
      if (!next || next.duration > remaining + 2) continue;
      items.push({ phase: 'hauptteil', exercise: next });
      remaining -= next.duration;
      added = true;
      if (remaining <= 4) break;
    }
  }

  if (finale) items.push({ phase: 'abschluss', exercise: finale });
  return items;
}

/** Ersetzt eine Übung durch eine andere passende Übung derselben Kategorie. */
export function swapExercise(items: PlanItem[], index: number, age: AgeGroup): PlanItem[] {
  const current = items[index];
  const used = new Set(items.map((i) => i.exercise.id));
  const candidates = forAge(age).filter((e) => e.category === current.exercise.category && !used.has(e.id));
  if (!candidates.length) return items;
  const replacement = shuffle(candidates)[0];
  return items.map((item, i) => (i === index ? { ...item, exercise: replacement } : item));
}

export function totalDuration(items: PlanItem[]) {
  return items.reduce((sum, item) => sum + item.exercise.duration, 0);
}

export function materialList(items: PlanItem[]) {
  return [...new Set(items.flatMap((i) => i.exercise.material))].sort((a, b) => a.localeCompare(b, 'de'));
}
