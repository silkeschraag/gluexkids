export type CategoryId = 'aufwaermen' | 'hand-auge' | 'fuss-auge' | 'schnelligkeit' | 'gleichgewicht';

export type AgeGroup = '4-6' | '7-9' | '10-12';

export const AGE_GROUPS: AgeGroup[] = ['4-6', '7-9', '10-12'];

export type Difficulty = 1 | 2 | 3;

export const DIFFICULTY_LABELS: Record<Difficulty, string> = { 1: 'Leicht', 2: 'Mittel', 3: 'Schwer' };

export type DurationBucket = 'kurz' | 'mittel' | 'lang';

export const DURATION_BUCKETS: { id: DurationBucket; label: string; min: number; max: number }[] = [
  { id: 'kurz', label: 'bis 6 Min', min: 0, max: 6 },
  { id: 'mittel', label: '7–10 Min', min: 7, max: 10 },
  { id: 'lang', label: 'über 10 Min', min: 11, max: Infinity },
];

export type EquipmentId =
  | 'ball'
  | 'kleinball'
  | 'luftballon'
  | 'huetchen'
  | 'reifen'
  | 'bank'
  | 'matte'
  | 'leibchen'
  | 'karten'
  | 'tuecher'
  | 'becher'
  | 'leiter'
  | 'sandsaeckchen'
  | 'seil'
  | 'musik';

export const EQUIPMENT: { id: EquipmentId; label: string; emoji: string }[] = [
  { id: 'ball', label: 'Ball', emoji: '⚽' },
  { id: 'kleinball', label: 'Tennis-/Softball', emoji: '🎾' },
  { id: 'luftballon', label: 'Luftballon', emoji: '🎈' },
  { id: 'huetchen', label: 'Hütchen', emoji: '🔺' },
  { id: 'reifen', label: 'Reifen', emoji: '⭕' },
  { id: 'bank', label: 'Langbank', emoji: '🪵' },
  { id: 'matte', label: 'Matte', emoji: '🟦' },
  { id: 'leibchen', label: 'Leibchen', emoji: '🎽' },
  { id: 'karten', label: 'Farbkarten', emoji: '🟥' },
  { id: 'tuecher', label: 'Tücher', emoji: '🧣' },
  { id: 'becher', label: 'Becher', emoji: '🥤' },
  { id: 'leiter', label: 'Koordinationsleiter', emoji: '🪜' },
  { id: 'sandsaeckchen', label: 'Sandsäckchen', emoji: '🫘' },
  { id: 'seil', label: 'Seil', emoji: '🪢' },
  { id: 'musik', label: 'Musik', emoji: '🎵' },
];

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
  difficulty: Difficulty;
  /** Strukturierte Material-Tags für den Filter */
  equipment: EquipmentId[];
  /** Ausführliche Materialangabe */
  material: string[];
  goal: string;
  setup: string;
  steps: string[];
  easier: string;
  harder: string;
  tips: string[];
};
