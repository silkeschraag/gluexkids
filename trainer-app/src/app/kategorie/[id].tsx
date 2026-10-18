import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ExerciseCard } from '../../components/ExerciseCard';
import { Chip } from '../../components/ui';
import { CATEGORIES } from '../../data/categories';
import { EXERCISES } from '../../data/exercises';
import { AGE_GROUPS, type AgeGroup } from '../../data/types';
import { colors, font, spacing } from '../../theme';

export default function CategoryScreen() {
  const params = useLocalSearchParams<{ id: string; age?: string }>();
  const category = CATEGORIES.find((c) => c.id === params.id);
  const [age, setAge] = useState<AgeGroup | null>(
    AGE_GROUPS.includes(params.age as AgeGroup) ? (params.age as AgeGroup) : null,
  );

  const exercises = useMemo(
    () => EXERCISES.filter((e) => e.category === category?.id && (!age || e.ages.includes(age))),
    [category, age],
  );

  if (!category) {
    return (
      <View style={styles.empty}>
        <Text style={font.h2}>Kategorie nicht gefunden</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: category.short }} />
      <FlatList
        data={exercises}
        keyExtractor={(e) => e.id}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={[styles.banner, { backgroundColor: category.color }]}>
              <Text style={styles.bannerEmoji}>{category.emoji}</Text>
              <Text style={styles.bannerTitle}>{category.title}</Text>
              <Text style={styles.bannerText}>{category.description}</Text>
            </View>
            <View style={styles.ageRow}>
              <Chip label="Alle" active={age === null} onPress={() => setAge(null)} color={category.color} />
              {AGE_GROUPS.map((group) => (
                <Chip
                  key={group}
                  label={`${group} J.`}
                  active={age === group}
                  onPress={() => setAge(group)}
                  color={category.color}
                />
              ))}
            </View>
          </View>
        }
        ListEmptyComponent={<Text style={font.small}>Für diese Altersgruppe gibt es hier noch keine Übungen.</Text>}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { gap: spacing.lg, marginBottom: spacing.lg },
  banner: { borderRadius: 24, padding: spacing.xl, gap: 6 },
  bannerEmoji: { fontSize: 40 },
  bannerTitle: { fontSize: 24, fontWeight: '900', color: colors.white },
  bannerText: { fontSize: 15, lineHeight: 21, color: colors.white },
  ageRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
