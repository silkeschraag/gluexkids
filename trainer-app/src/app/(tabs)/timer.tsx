import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Card } from '../../components/ui';
import { formatSeconds, useIntervalTimer, type TimerPhase } from '../../lib/useIntervalTimer';
import { colors, font, radius, spacing } from '../../theme';

const PRESETS = [
  { label: 'Sprints', work: 5, rest: 45, rounds: 6 },
  { label: 'Schnelle Füße', work: 10, rest: 30, rounds: 6 },
  { label: 'Stationen', work: 60, rest: 20, rounds: 8 },
  { label: 'Spielrunde', work: 120, rest: 30, rounds: 4 },
];

const PHASE_STYLE: Record<TimerPhase, { label: string; color: string }> = {
  bereit: { label: 'Bereit?', color: colors.blue },
  belastung: { label: 'LOS!', color: colors.orange },
  pause: { label: 'Pause', color: colors.green },
  fertig: { label: 'Geschafft! 🎉', color: colors.blueDark },
};

function Stepper({
  label,
  value,
  onChange,
  step,
  min,
  format = (v: number) => `${v}`,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step: number;
  min: number;
  format?: (v: number) => string;
}) {
  return (
    <View style={styles.stepper}>
      <Text style={font.h3}>{label}</Text>
      <View style={styles.stepperRow}>
        <Pressable style={styles.stepperButton} onPress={() => onChange(Math.max(min, value - step))}>
          <Text style={styles.stepperButtonText}>−</Text>
        </Pressable>
        <Text style={styles.stepperValue}>{format(value)}</Text>
        <Pressable style={styles.stepperButton} onPress={() => onChange(value + step)}>
          <Text style={styles.stepperButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function TimerScreen() {
  const [work, setWork] = useState(10);
  const [rest, setRest] = useState(30);
  const [rounds, setRounds] = useState(6);
  const config = useMemo(() => ({ work, rest, rounds }), [work, rest, rounds]);
  const timer = useIntervalTimer(config);
  const phase = PHASE_STYLE[timer.phase];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={[styles.display, { backgroundColor: phase.color }]}>
        <Text style={styles.phaseLabel}>{phase.label}</Text>
        <Text style={styles.time}>{formatSeconds(timer.secondsLeft)}</Text>
        <Text style={styles.round}>
          Runde {timer.round} / {rounds}
        </Text>
      </View>

      <View style={styles.controls}>
        <View style={{ flex: 1 }}>
          <Button
            label={timer.running ? 'Pause' : timer.phase === 'bereit' || timer.phase === 'fertig' ? 'Start' : 'Weiter'}
            onPress={timer.running ? timer.pause : timer.start}
            color={colors.orange}
          />
        </View>
        <Button label="Zurücksetzen" onPress={timer.reset} color={colors.text} variant="outline" />
      </View>

      <Card style={{ gap: spacing.md }}>
        <Text style={font.h3}>Vorlagen</Text>
        <View style={styles.presets}>
          {PRESETS.map((p) => (
            <Pressable
              key={p.label}
              style={({ pressed }) => [styles.preset, pressed && { opacity: 0.7 }]}
              onPress={() => {
                setWork(p.work);
                setRest(p.rest);
                setRounds(p.rounds);
              }}
            >
              <Text style={font.h3}>{p.label}</Text>
              <Text style={font.small}>
                {p.work}s / {p.rest}s × {p.rounds}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card style={styles.steppers}>
        <Stepper label="Belastung" value={work} onChange={setWork} step={5} min={5} format={formatSeconds} />
        <Stepper label="Pause" value={rest} onChange={setRest} step={5} min={0} format={formatSeconds} />
        <Stepper label="Runden" value={rounds} onChange={setRounds} step={1} min={1} />
      </Card>

      <Text style={[font.small, { textAlign: 'center' }]}>
        Faustregel Schnelligkeit: max. 5–10 s Belastung und mindestens die 5-fache Zeit als Pause.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  display: { borderRadius: radius.lg, paddingVertical: spacing.xxl, alignItems: 'center', gap: 4 },
  phaseLabel: { fontSize: 22, fontWeight: '900', color: colors.white },
  time: { fontSize: 84, fontWeight: '900', color: colors.white, fontVariant: ['tabular-nums'] },
  round: { fontSize: 16, fontWeight: '700', color: 'rgba(255,255,255,0.9)' },
  controls: { flexDirection: 'row', gap: spacing.sm },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  preset: {
    flexGrow: 1,
    flexBasis: '45%',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  steppers: { gap: spacing.md },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: { fontSize: 20, fontWeight: '800', color: colors.text },
  stepperValue: { fontSize: 16, fontWeight: '800', minWidth: 56, textAlign: 'center', color: colors.text },
});
