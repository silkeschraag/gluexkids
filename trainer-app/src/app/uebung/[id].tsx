import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Card, IntensityDots, Tag } from '../../components/ui';
import { getCategory } from '../../data/categories';
import { getExercise } from '../../data/exercises';
import { DIFFICULTY_LABELS } from '../../data/types';
import { useFavorites } from '../../lib/favorites';
import { useSession } from '../../lib/session';
import { formatSeconds, useIntervalTimer } from '../../lib/useIntervalTimer';
import { colors, font, radius, spacing } from '../../theme';

const INTENSITY_LABEL = { 1: 'locker', 2: 'mittel', 3: 'intensiv' } as const;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={font.h2}>{title}</Text>
      {children}
    </View>
  );
}

function ExerciseTimer({ minutes, color }: { minutes: number; color: string }) {
  const config = useMemo(() => ({ work: minutes * 60, rest: 0, rounds: 1 }), [minutes]);
  const timer = useIntervalTimer(config);
  return (
    <Card style={styles.timer}>
      <Text style={[styles.timerValue, timer.phase === 'fertig' && { color: colors.green }]}>
        {timer.phase === 'fertig' ? 'Fertig! 🎉' : formatSeconds(timer.secondsLeft)}
      </Text>
      <View style={styles.timerButtons}>
        <View style={{ flex: 1 }}>
          <Button
            label={timer.running ? 'Pause' : timer.phase === 'belastung' ? 'Weiter' : 'Übung starten'}
            onPress={timer.running ? timer.pause : timer.start}
            color={color}
          />
        </View>
        <Button label="↺" onPress={timer.reset} color={color} variant="outline" />
      </View>
    </Card>
  );
}

export default function ExerciseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const exercise = getExercise(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { has, toggle } = useSession();

  if (!exercise) {
    return (
      <View style={styles.empty}>
        <Text style={font.h2}>Übung nicht gefunden</Text>
      </View>
    );
  }

  const category = getCategory(exercise.category);
  const favorite = isFavorite(exercise.id);
  const inSession = has(exercise.id);

  return (
    <>
      <Stack.Screen
        options={{
          title: category.short,
          headerRight: () => (
            <Pressable
              onPress={() => toggleFavorite(exercise.id)}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={favorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
            >
              <Text style={{ fontSize: 26, color: colors.yellow }}>{favorite ? '★' : '☆'}</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.header, { backgroundColor: category.color }]}>
          <Text style={styles.headerCategory}>
            {category.emoji} {category.title}
          </Text>
          <Text style={styles.headerTitle}>{exercise.title}</Text>
          <Text style={styles.headerGoal}>🎯 {exercise.goal}</Text>
        </View>

        <View style={styles.facts}>
          <Tag>⏱ {exercise.duration} Min</Tag>
          <Tag>👧 {exercise.ages.join(' · ')} Jahre</Tag>
          <Tag>👥 {exercise.players}</Tag>
          <Tag>
            {'●'.repeat(exercise.difficulty)}
            {'○'.repeat(3 - exercise.difficulty)} {DIFFICULTY_LABELS[exercise.difficulty]}
          </Tag>
          <View style={styles.intensity}>
            <IntensityDots level={exercise.intensity} />
            <Text style={font.small}>Intensität {INTENSITY_LABEL[exercise.intensity]}</Text>
          </View>
        </View>

        <Button
          label={inSession ? '✓ In deiner Einheit – entfernen' : '＋ Zur Einheit hinzufügen'}
          color={inSession ? colors.green : colors.orange}
          variant={inSession ? 'outline' : 'solid'}
          onPress={() => toggle(exercise.id)}
        />

        <ExerciseTimer minutes={exercise.duration} color={category.color} />

        <Section title="Material">
          {exercise.material.length ? (
            exercise.material.map((m) => (
              <Text key={m} style={font.body}>
                • {m}
              </Text>
            ))
          ) : (
            <Text style={font.body}>Kein Material nötig 🙌</Text>
          )}
        </Section>

        <Section title="Aufbau">
          <Text style={font.body}>{exercise.setup}</Text>
        </Section>

        <Section title="Ablauf">
          {exercise.steps.map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: category.color }]}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={[font.body, { flex: 1 }]}>{step}</Text>
            </View>
          ))}
        </Section>

        <Section title="Variationen">
          <Card style={styles.variation}>
            <Text style={[font.h3, { color: colors.green }]}>⬇ Leichter</Text>
            <Text style={font.body}>{exercise.easier}</Text>
          </Card>
          <Card style={styles.variation}>
            <Text style={[font.h3, { color: colors.orange }]}>⬆ Schwerer</Text>
            <Text style={font.body}>{exercise.harder}</Text>
          </Card>
        </Section>

        <Section title="Coaching-Tipps">
          <View style={styles.tips}>
            {exercise.tips.map((tip) => (
              <Text key={tip} style={font.body}>
                💡 {tip}
              </Text>
            ))}
          </View>
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.xl, paddingBottom: spacing.xxl * 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { borderRadius: radius.lg, padding: spacing.xl, gap: spacing.sm },
  headerCategory: { fontSize: 14, fontWeight: '800', color: 'rgba(255,255,255,0.9)' },
  headerTitle: { fontSize: 26, fontWeight: '900', color: colors.white },
  headerGoal: { fontSize: 15, lineHeight: 21, color: colors.white },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, alignItems: 'center' },
  intensity: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  timer: { alignItems: 'center', gap: spacing.md },
  timerValue: { fontSize: 48, fontWeight: '900', color: colors.text, fontVariant: ['tabular-nums'] },
  timerButtons: { flexDirection: 'row', gap: spacing.sm, alignSelf: 'stretch' },
  section: { gap: spacing.sm },
  step: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  stepNumber: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { color: colors.white, fontWeight: '900' },
  variation: { gap: 4 },
  tips: { backgroundColor: colors.surfaceAlt, borderRadius: radius.md, padding: spacing.lg, gap: spacing.sm },
});
