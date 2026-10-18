import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { EXERCISES } from '../data/exercises';
import {
  DURATION_BUCKETS,
  type AgeGroup,
  type CategoryId,
  type Difficulty,
  type DurationBucket,
  type EquipmentId,
  type Exercise,
} from '../data/types';

export type Filters = {
  query: string;
  categories: CategoryId[];
  age: AgeGroup | null;
  durations: DurationBucket[];
  difficulties: Difficulty[];
  /**
   * null = Material egal. Sonst werden nur Übungen gezeigt, die ausschließlich
   * mit dem gewählten Material auskommen ([] = „ohne Material").
   */
  equipment: EquipmentId[] | null;
};

export const EMPTY_FILTERS: Filters = {
  query: '',
  categories: [],
  age: null,
  durations: [],
  difficulties: [],
  equipment: null,
};

export function countActiveFilters(f: Filters, { ignoreCategories = false } = {}) {
  return (
    (ignoreCategories ? 0 : f.categories.length) +
    (f.age ? 1 : 0) +
    f.durations.length +
    f.difficulties.length +
    (f.equipment === null ? 0 : Math.max(1, f.equipment.length))
  );
}

export function matchesFilters(e: Exercise, f: Filters) {
  const q = f.query.trim().toLowerCase();
  if (q && ![e.title, e.goal, e.setup, ...e.steps, ...e.material].some((text) => text.toLowerCase().includes(q))) return false;
  if (f.categories.length && !f.categories.includes(e.category)) return false;
  if (f.age && !e.ages.includes(f.age)) return false;
  if (
    f.durations.length &&
    !DURATION_BUCKETS.some((b) => f.durations.includes(b.id) && e.duration >= b.min && e.duration <= b.max)
  )
    return false;
  if (f.difficulties.length && !f.difficulties.includes(e.difficulty)) return false;
  if (f.equipment !== null && !e.equipment.every((item) => f.equipment!.includes(item))) return false;
  return true;
}

export function filterExercises(f: Filters, exercises: Exercise[] = EXERCISES) {
  return exercises.filter((e) => matchesFilters(e, f));
}

export function toggleIn<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

type FiltersContextValue = {
  filters: Filters;
  setFilters: (update: (current: Filters) => Filters) => void;
  resetFilters: () => void;
};

const FiltersContext = createContext<FiltersContextValue | null>(null);

/** Filter werden zwischen Startseite und Rubrik-Ansicht geteilt. */
export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<Filters>(EMPTY_FILTERS);
  const value = useMemo(
    () => ({
      filters,
      setFilters: (update: (current: Filters) => Filters) => setFiltersState(update),
      resetFilters: () => setFiltersState((current) => ({ ...EMPTY_FILTERS, query: current.query })),
    }),
    [filters],
  );
  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) throw new Error('useFilters muss innerhalb von FiltersProvider verwendet werden');
  return context;
}
