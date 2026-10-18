import { EXERCISES, getExercise } from '../data/exercises';
import type { AgeGroup, CategoryId, Exercise } from '../data/types';

export type PlanPhase = 'aufwaermen' | 'hauptteil' | 'abschluss';

export type PlanItem = { phase: PlanPhase; exerciseId: string };

export const PHASE_LABELS: Record<PlanPhase, string> = {
  aufwaermen: 'Aufwärmen',
  hauptteil: 'Hauptteil',
  abschluss: 'Abschluss',
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

function forAge(age: AgeGroup | null) {
  return age ? EXERCISES.filter((e) => e.ages.includes(age)) : EXERCISES;
}

export function defaultPhase(exercise: Exercise): PlanPhase {
  return exercise.category === 'aufwaermen' ? 'aufwaermen' : 'hauptteil';
}

/** Übungen zu den Einträgen einer Einheit (unbekannte IDs werden übersprungen). */
export function resolveItems(items: PlanItem[]) {
  return items.flatMap((item) => {
    const exercise = getExercise(item.exerciseId);
    return exercise ? [{ ...item, exercise }] : [];
  });
}

/**
 * Stellt eine Trainingseinheit zusammen: ein Aufwärmspiel, Koordinationsübungen
 * aus den gewählten Schwerpunkten (abwechselnd) bis die Zielzeit erreicht ist,
 * und ein lockeres Abschlussspiel.
 */
export function generatePlan(age: AgeGroup | null, totalMinutes: number, focus: CoordinationFocus[]): PlanItem[] {
  const pool = forAge(age);
  const warmups = shuffle(pool.filter((e) => e.category === 'aufwaermen'));
  const warmup = warmups[0];
  // Abschluss: ein Spiel, das nicht schon zum Aufwärmen dran war.
  const finale = warmups.find((e) => e !== warmup) ?? warmup;

  const items: PlanItem[] = [];
  if (warmup) items.push({ phase: 'aufwaermen', exerciseId: warmup.id });

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
      items.push({ phase: 'hauptteil', exerciseId: next.id });
      remaining -= next.duration;
      added = true;
      if (remaining <= 4) break;
    }
  }

  if (finale) items.push({ phase: 'abschluss', exerciseId: finale.id });
  return items;
}

/** Ersetzt eine Übung durch eine andere passende Übung derselben Rubrik. */
export function swapExercise(items: PlanItem[], index: number, age: AgeGroup | null): PlanItem[] {
  const current = getExercise(items[index].exerciseId);
  if (!current) return items;
  const used = new Set(items.map((i) => i.exerciseId));
  const candidates = forAge(age).filter((e) => e.category === current.category && !used.has(e.id));
  if (!candidates.length) return items;
  const replacement = shuffle(candidates)[0];
  return items.map((item, i) => (i === index ? { ...item, exerciseId: replacement.id } : item));
}

export function totalDuration(exercises: Exercise[]) {
  return exercises.reduce((sum, e) => sum + e.duration, 0);
}

export function materialList(exercises: Exercise[]) {
  return [...new Set(exercises.flatMap((e) => e.material))].sort((a, b) => a.localeCompare(b, 'de'));
}
