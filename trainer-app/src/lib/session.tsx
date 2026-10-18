import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { getExercise } from '../data/exercises';
import type { AgeGroup } from '../data/types';
import { defaultPhase, type PlanItem, type PlanPhase } from './plan';

const STORAGE_KEY = 'powerupkids/session';

/** Die Trainingseinheit, die gerade zusammengestellt wird. */
export type Session = {
  title: string;
  age: AgeGroup | null;
  notes: string;
  items: PlanItem[];
};

const EMPTY_SESSION: Session = { title: '', age: null, notes: '', items: [] };

type SessionContextValue = {
  session: Session;
  update: (patch: Partial<Session>) => void;
  has: (exerciseId: string) => boolean;
  add: (exerciseId: string) => void;
  remove: (exerciseId: string) => void;
  toggle: (exerciseId: string) => void;
  move: (index: number, delta: -1 | 1) => void;
  setPhase: (index: number, phase: PlanPhase) => void;
  clear: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(EMPTY_SESSION);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setSession({ ...EMPTY_SESSION, ...JSON.parse(raw) });
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(session)).catch(() => {});
  }, [session, loaded]);

  const update = useCallback((patch: Partial<Session>) => setSession((s) => ({ ...s, ...patch })), []);

  const add = useCallback((exerciseId: string) => {
    const exercise = getExercise(exerciseId);
    if (!exercise) return;
    setSession((s) =>
      s.items.some((i) => i.exerciseId === exerciseId)
        ? s
        : { ...s, items: [...s.items, { exerciseId, phase: defaultPhase(exercise) }] },
    );
  }, []);

  const remove = useCallback(
    (exerciseId: string) => setSession((s) => ({ ...s, items: s.items.filter((i) => i.exerciseId !== exerciseId) })),
    [],
  );

  const move = useCallback((index: number, delta: -1 | 1) => {
    setSession((s) => {
      const target = index + delta;
      if (target < 0 || target >= s.items.length) return s;
      const items = [...s.items];
      [items[index], items[target]] = [items[target], items[index]];
      return { ...s, items };
    });
  }, []);

  const setPhase = useCallback((index: number, phase: PlanPhase) => {
    setSession((s) => ({ ...s, items: s.items.map((item, i) => (i === index ? { ...item, phase } : item)) }));
  }, []);

  const clear = useCallback(() => setSession((s) => ({ ...s, items: [] })), []);

  const value = useMemo(() => {
    const has = (exerciseId: string) => session.items.some((i) => i.exerciseId === exerciseId);
    return {
      session,
      update,
      has,
      add,
      remove,
      toggle: (exerciseId: string) => (has(exerciseId) ? remove(exerciseId) : add(exerciseId)),
      move,
      setPhase,
      clear,
    };
  }, [session, update, add, remove, move, setPhase, clear]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession muss innerhalb von SessionProvider verwendet werden');
  return context;
}
