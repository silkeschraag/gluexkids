import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Card, Chip } from '../../components/ui';
import { getCategory } from '../../data/categories';
import { AGE_GROUPS, type AgeGroup } from '../../data/types';
import {
  generatePlan,
  materialList,
  PHASE_LABELS,
  swapExercise,
  totalDuration,
  type CoordinationFocus,
  type PlanItem,
} from '../../lib/plan';
import { colors, font, radius, spacing } from '../../theme';

const DURATIONS = [30, 45, 60, 90];
const FOCUS_OPTIONS: CoordinationFocus[] = ['hand-auge', 'fuss-auge', 'schnelligkeit', 'gleichgewicht'];

export default function TrainingScreen() {
  const [age, setAge] = useState<AgeGroup>('7-9');
  const [minutes, setMinutes] = useState(60);
  const [focus, setFocus] = useState<CoordinationFocus[]>(['hand-auge', 'fuss-auge', 'schnelligkeit']);
  const [plan, setPlan] = useState<PlanItem[] | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());

  const toggleFocus = (f: CoordinationFocus) =>
    setFocus((current) => (current.includes(f) ? current.filter((x) => x !== f) : [...current, f]));

  const toggleDone = (id: string) =>
    setDone((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const createPlan = () => {
    setPlan(generatePlan(age, minutes, focus));
    setDone(new Set());
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card style={styles.settings}>
        <Text style={font.h3}>Altersgruppe</Text>
        <View style={styles.row}>
          {AGE_GROUPS.map((group) => (
            <Chip key={group} label={`${group} J.`} active={age === group} onPress={() => setAge(group)} />
          ))}
        </View>

        <Text style={font.h3}>Dauer</Text>
        <View style={styles.row}>
          {DURATIONS.map((d) => (
            <Chip key={d} label={`${d} Min`} active={minutes === d} onPress={() => setMinutes(d)} />
          ))}
        </View>

        <Text style={font.h3}>Schwerpunkte</Text>
        <View style={styles.row}>
          {FOCUS_OPTIONS.map((f) => {
            const category = getCategory(f);
            return (
              <Chip
                key={f}
                label={`${category.emoji} ${category.short}`}
                active={focus.includes(f)}
                onPress={() => toggleFocus(f)}
                color={category.color}
              />
            );
          })}
        </View>

        <Button label={plan ? '🎲 Neu zusammenstellen' : '✨ Training erstellen'} onPress={createPlan} />
      </Card>

      {plan && (
        <>
          <View style={styles.summary}>
            <Text style={font.h2}>Dein Training</Text>
            <Text style={font.small}>
              ca. {totalDuration(plan)} Min · {done.size}/{plan.length} erledigt
            </Text>
          </View>

          {plan.map((item, index) => {
            const category = getCategory(item.exercise.category);
            const isDone = done.has(item.exercise.id);
            const showPhase = index === 0 || plan[index - 1].phase !== item.phase;
            return (
              <View key={`${item.phase}-${item.exercise.id}`} style={{ gap: spacing.sm }}>
                {showPhase && <Text style={styles.phase}>{PHASE_LABELS[item.phase]}</Text>}
                <View style={[styles.planItem, isDone && { opacity: 0.55 }]}>
                  <Pressable
                    onPress={() => toggleDone(item.exercise.id)}
                    style={[styles.check, isDone && { backgroundColor: colors.green, borderColor: colors.green }]}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isDone }}
                    hitSlop={8}
                  >
                    {isDone && <Text style={styles.checkMark}>✓</Text>}
                  </Pressable>
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() => router.push({ pathname: '/uebung/[id]', params: { id: item.exercise.id } })}
                  >
                    <Text style={[font.h3, isDone && styles.strike]}>
                      {category.emoji} {item.exercise.title}
                    </Text>
                    <Text style={font.small}>
                      {item.exercise.duration} Min · {category.short}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setPlan((p) => (p ? swapExercise(p, index, age) : p))}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Übung austauschen"
                  >
                    <Text style={styles.swap}>🔄</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}

          <Card style={{ gap: 4 }}>
            <Text style={font.h3}>🎒 Materialliste</Text>
            {materialList(plan).length ? (
              materialList(plan).map((m) => (
                <Text key={m} style={font.body}>
                  • {m}
                </Text>
              ))
            ) : (
              <Text style={font.body}>Kein Material nötig.</Text>
            )}
          </Card>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  settings: { gap: spacing.md },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  summary: { marginTop: spacing.md, gap: 2 },
  phase: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: spacing.sm,
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: colors.white, fontWeight: '900', fontSize: 16 },
  strike: { textDecorationLine: 'line-through' },
  swap: { fontSize: 20 },
});
