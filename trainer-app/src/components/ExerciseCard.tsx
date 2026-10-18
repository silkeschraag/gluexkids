import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getCategory } from '../data/categories';
import type { Exercise } from '../data/types';
import { useFavorites } from '../lib/favorites';
import { colors, radius, spacing } from '../theme';
import { IntensityDots, Tag } from './ui';

export function ExerciseCard({ exercise, showCategory }: { exercise: Exercise; showCategory?: boolean }) {
  const category = getCategory(exercise.category);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(exercise.id);

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
          <IntensityDots level={exercise.intensity} />
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
});
