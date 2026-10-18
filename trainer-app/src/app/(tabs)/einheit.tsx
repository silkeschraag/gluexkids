import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { Button, Card, Chip } from '../../components/ui';
import { getCategory } from '../../data/categories';
import { AGE_GROUPS } from '../../data/types';
import { shareSessionPdf, printSession } from '../../lib/pdf';
import {
  generatePlan,
  materialList,
  PHASE_LABELS,
  resolveItems,
  swapExercise,
  totalDuration,
  type CoordinationFocus,
  type PlanPhase,
} from '../../lib/plan';
import { useSession } from '../../lib/session';
import { colors, font, radius, spacing } from '../../theme';

const DURATIONS = [30, 45, 60, 90];
const FOCUS_OPTIONS: CoordinationFocus[] = ['hand-auge', 'fuss-auge', 'schnelligkeit', 'gleichgewicht'];
const PHASES: PlanPhase[] = ['aufwaermen', 'hauptteil', 'abschluss'];
const PHASE_COLORS: Record<PlanPhase, string> = {
  aufwaermen: colors.orange,
  hauptteil: colors.blue,
  abschluss: colors.green,
};

function IconButton({
  label,
  onPress,
  a11y,
  disabled,
}: {
  label: string;
  onPress: () => void;
  a11y: string;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={a11y}
      style={[styles.iconButton, disabled && { opacity: 0.3 }]}
    >
      <Text style={styles.iconButtonText}>{label}</Text>
    </Pressable>
  );
}

export default function SessionScreen() {
  const { session, update, remove, move, setPhase, clear } = useSession();
  const [showGenerator, setShowGenerator] = useState(false);
  const [minutes, setMinutes] = useState(60);
  const [focus, setFocus] = useState<CoordinationFocus[]>(['hand-auge', 'fuss-auge', 'schnelligkeit']);
  const [detailed, setDetailed] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  const items = resolveItems(session.items);
  const exercises = items.map((i) => i.exercise);
  const materials = materialList(exercises);

  const toggleFocus = (f: CoordinationFocus) =>
    setFocus((current) => (current.includes(f) ? current.filter((x) => x !== f) : [...current, f]));

  const exportPdf = async (action: 'share' | 'print') => {
    setStatus(null);
    try {
      if (action === 'share') await shareSessionPdf(session, { detailed });
      else await printSession(session, { detailed });
    } catch {
      setStatus('Das PDF konnte nicht erstellt werden. Bitte versuch es noch einmal.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Card style={styles.gap}>
        <TextInput
          value={session.title}
          onChangeText={(title) => update({ title })}
          placeholder="Titel, z. B. „Dienstag – U8 Koordination“"
          placeholderTextColor={colors.textMuted}
          style={styles.titleInput}
        />
        <Text style={font.h3}>Altersgruppe</Text>
        <View style={styles.row}>
          <Chip label="Gemischt" active={!session.age} onPress={() => update({ age: null })} />
          {AGE_GROUPS.map((group) => (
            <Chip
              key={group}
              label={`${group} J.`}
              active={session.age === group}
              onPress={() => update({ age: group })}
            />
          ))}
        </View>
        <TextInput
          value={session.notes}
          onChangeText={(notes) => update({ notes })}
          placeholder="Notizen für den Ausdruck (Ort, Gruppe, Schwerpunkt …)"
          placeholderTextColor={colors.textMuted}
          style={[styles.input, { minHeight: 64 }]}
          multiline
        />
      </Card>

      <Card style={styles.gap}>
        <Pressable style={styles.collapse} onPress={() => setShowGenerator((s) => !s)} accessibilityRole="button">
          <Text style={font.h3}>🎲 Automatisch vorschlagen</Text>
          <Text style={font.small}>{showGenerator ? '▲' : '▼'}</Text>
        </Pressable>
        {showGenerator && (
          <>
            <Text style={font.small}>
              Erstellt Aufwärmen, Hauptteil und Abschluss passend zur Altersgruppe. Ersetzt die aktuelle Liste.
            </Text>
            <View style={styles.row}>
              {DURATIONS.map((d) => (
                <Chip key={d} label={`${d} Min`} active={minutes === d} onPress={() => setMinutes(d)} />
              ))}
            </View>
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
            <Button
              label="Vorschlag erstellen"
              color={colors.blue}
              onPress={() => update({ items: generatePlan(session.age, minutes, focus) })}
            />
          </>
        )}
      </Card>

      <View style={styles.summary}>
        <View>
          <Text style={font.h2}>Übungen ({items.length})</Text>
          <Text style={font.small}>ca. {totalDuration(exercises)} Minuten</Text>
        </View>
        {items.length > 0 && (
          <Pressable onPress={clear} hitSlop={8} accessibilityRole="button">
            <Text style={styles.clear}>Liste leeren</Text>
          </Pressable>
        )}
      </View>

      {items.length === 0 && (
        <Card style={styles.emptyCard}>
          <Text style={{ fontSize: 40 }}>📋</Text>
          <Text style={[font.body, { textAlign: 'center' }]}>
            Noch keine Übungen. Tippe im Katalog bei einer Übung auf „＋ Einheit“ oder lass dir oben einen Vorschlag
            machen.
          </Text>
          <Button label="Zum Übungskatalog" variant="outline" onPress={() => router.navigate('/')} />
        </Card>
      )}

      {items.map((item, index) => {
        const category = getCategory(item.exercise.category);
        const nextPhase = PHASES[(PHASES.indexOf(item.phase) + 1) % PHASES.length];
        return (
          <View key={item.exerciseId} style={styles.item}>
            <View style={[styles.itemStripe, { backgroundColor: category.color }]} />
            <View style={styles.itemBody}>
              <View style={styles.itemTop}>
                <Pressable
                  onPress={() => setPhase(index, nextPhase)}
                  style={[styles.phase, { backgroundColor: PHASE_COLORS[item.phase] }]}
                  accessibilityRole="button"
                  accessibilityLabel={`Phase: ${PHASE_LABELS[item.phase]}. Tippen zum Ändern.`}
                >
                  <Text style={styles.phaseText}>{PHASE_LABELS[item.phase]}</Text>
                </Pressable>
                <Text style={font.small}>{item.exercise.duration} Min</Text>
              </View>
              <Pressable onPress={() => router.push({ pathname: '/uebung/[id]', params: { id: item.exerciseId } })}>
                <Text style={font.h3}>
                  {index + 1}. {category.emoji} {item.exercise.title}
                </Text>
              </Pressable>
              <View style={styles.actions}>
                <IconButton label="↑" a11y="Nach oben" disabled={index === 0} onPress={() => move(index, -1)} />
                <IconButton
                  label="↓"
                  a11y="Nach unten"
                  disabled={index === items.length - 1}
                  onPress={() => move(index, 1)}
                />
                <IconButton
                  label="🔄"
                  a11y="Übung austauschen"
                  onPress={() => update({ items: swapExercise(session.items, index, session.age) })}
                />
                <IconButton label="✕" a11y="Entfernen" onPress={() => remove(item.exerciseId)} />
              </View>
            </View>
          </View>
        );
      })}

      {items.length > 0 && (
        <>
          <Card style={{ gap: 4 }}>
            <Text style={font.h3}>🎒 Materialliste</Text>
            {materials.length ? (
              materials.map((m) => (
                <Text key={m} style={font.body}>
                  • {m}
                </Text>
              ))
            ) : (
              <Text style={font.body}>Kein Material nötig.</Text>
            )}
          </Card>

          <Card style={[styles.gap, { borderColor: colors.orange, borderWidth: 2 }]}>
            <Text style={font.h2}>📄 Als PDF ausdrucken</Text>
            <View style={styles.switchRow}>
              <Text style={[font.body, { flex: 1 }]}>Ausführlich (mit Varianten & Coaching-Tipps)</Text>
              <Switch
                value={detailed}
                onValueChange={setDetailed}
                trackColor={{ true: colors.orange, false: colors.border }}
              />
            </View>
            <Button label="PDF erstellen & teilen" onPress={() => exportPdf('share')} />
            <Button label="🖨 Direkt drucken" variant="outline" onPress={() => exportPdf('print')} />
            {status && <Text style={[font.small, { color: colors.red }]}>{status}</Text>}
          </Card>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  gap: { gap: spacing.md },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  titleInput: { fontSize: 20, fontWeight: '800', color: colors.text, paddingVertical: 4 },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    fontSize: 15,
    color: colors.text,
    textAlignVertical: 'top',
  },
  collapse: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: spacing.sm },
  clear: { color: colors.red, fontWeight: '800' },
  emptyCard: { alignItems: 'center', gap: spacing.md },
  item: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  itemStripe: { width: 6 },
  itemBody: { flex: 1, padding: spacing.md, gap: 6 },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  phase: { borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  phaseText: { color: colors.white, fontSize: 12, fontWeight: '800' },
  actions: { flexDirection: 'row', gap: spacing.sm, justifyContent: 'flex-end' },
  iconButton: {
    width: 36,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonText: { fontSize: 16, fontWeight: '800', color: colors.text },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
