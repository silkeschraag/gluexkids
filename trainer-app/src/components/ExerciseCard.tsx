import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getCategory } from '../data/categories';
import { DIFFICULTY_LABELS, EQUIPMENT, type Exercise } from '../data/types';
import { useFavorites } from '../lib/favorites';
import { useSession } from '../lib/session';
import { colors, radius, spacing } from '../theme';
import { Tag } from './ui';

export function ExerciseCard({ exercise, showCategory }: { exercise: Exercise; showCategory?: boolean }) {
  const category = getCategory(exercise.category);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { has, toggle } = useSession();
  const favorite = isFavorite(exercise.id);
  const inSession = has(exercise.id);
  const equipment = EQUIPMENT.filter((item) => exercise.equipment.includes(item.id));

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      onPress={() => router.push({ pathname: '/uebung/[id]', params: { id: exercise.id } })}
    >
      <View style={[styles.stripe, { backgroundColor: category.color }]} />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {showCategory ? `${category.emoji} ` : ''}
            {exercise.title}
          </Text>
          <Pressable
            hitSlop={12}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(exercise.id);
            }}
            accessibilityRole="button"
            accessibilityLabel={favorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
          >
            <Text style={styles.star}>{favorite ? '★' : '☆'}</Text>
          </Pressable>
        </View>
        <Text style={styles.goal} numberOfLines={2}>
          {exercise.goal}
        </Text>
        <View style={styles.meta}>
          <Tag>⏱ {exercise.duration} Min</Tag>
          <Tag>👧 {exercise.ages.join(' · ')} J.</Tag>
          <Tag>
            {'●'.repeat(exercise.difficulty)}
            {'○'.repeat(3 - exercise.difficulty)} {DIFFICULTY_LABELS[exercise.difficulty]}
          </Tag>
        </View>
        <View style={styles.footer}>
          <Text style={styles.equipment} numberOfLines={1}>
            {equipment.length ? equipment.map((item) => `${item.emoji} ${item.label}`).join('  ') : '🚫 Ohne Material'}
          </Text>
          <Pressable
            hitSlop={8}
            onPress={(e) => {
              e.stopPropagation();
              toggle(exercise.id);
            }}
            style={[styles.add, inSession && { backgroundColor: colors.green, borderColor: colors.green }]}
            accessibilityRole="button"
            accessibilityLabel={inSession ? 'Aus Einheit entfernen' : 'Zur Einheit hinzufügen'}
          >
            <Text style={[styles.addText, inSession && { color: colors.white }]}>
              {inSession ? '✓ In Einheit' : '＋ Einheit'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  stripe: { width: 6 },
  body: { flex: 1, padding: spacing.md, gap: 6 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  title: { flex: 1, fontSize: 17, fontWeight: '800', color: colors.text },
  star: { fontSize: 22, color: colors.yellow, lineHeight: 24 },
  goal: { fontSize: 14, color: colors.textMuted },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 2 },
  equipment: { flex: 1, fontSize: 12, color: colors.textMuted },
  add: {
    borderWidth: 1.5,
    borderColor: colors.orange,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
  },
  addText: { fontSize: 13, fontWeight: '800', color: colors.orange },
});
