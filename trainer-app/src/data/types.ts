export type CategoryId = 'aufwaermen' | 'hand-auge' | 'fuss-auge' | 'schnelligkeit' | 'gleichgewicht';

export type AgeGroup = '4-6' | '7-9' | '10-12';

export const AGE_GROUPS: AgeGroup[] = ['4-6', '7-9', '10-12'];

export type Category = {
  id: CategoryId;
  title: string;
  short: string;
  emoji: string;
  color: string;
  description: string;
};

export type Exercise = {
  id: string;
  title: string;
  category: CategoryId;
  ages: AgeGroup[];
  /** Dauer in Minuten */
  duration: number;
  /** z. B. "ab 6 Kinder" */
  players: string;
  /** 1 = locker, 2 = mittel, 3 = intensiv */
  intensity: 1 | 2 | 3;
  material: string[];
  goal: string;
  setup: string;
  steps: string[];
  easier: string;
  harder: string;
  tips: string[];
};
