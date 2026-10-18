import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ExerciseCard } from '../../components/ExerciseCard';
import { FilterPanel } from '../../components/FilterPanel';
import { CATEGORIES } from '../../data/categories';
import { filterExercises, useFilters } from '../../lib/filters';
import { colors, font, spacing } from '../../theme';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = CATEGORIES.find((c) => c.id === id);
  const { filters } = useFilters();

  if (!category) {
    return (
      <View style={styles.empty}>
        <Text style={font.h2}>Rubrik nicht gefunden</Text>
      </View>
    );
  }

  // Die Rubrik ergibt sich aus der Seite, alle anderen Filter gelten weiter.
  const exercises = filterExercises({ ...filters, query: '', categories: [category.id] });

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
            <FilterPanel hideCategories color={category.color} />
            <Text style={font.small}>{exercises.length} Übungen</Text>
          </View>
        }
        ListEmptyComponent={<Text style={font.small}>Keine Übung passt zu den gewählten Filtern.</Text>}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { gap: spacing.md, marginBottom: spacing.md },
  banner: { borderRadius: 24, padding: spacing.xl, gap: 6 },
  bannerEmoji: { fontSize: 40 },
  bannerTitle: { fontSize: 24, fontWeight: '900', color: colors.white },
  bannerText: { fontSize: 15, lineHeight: 21, color: colors.white },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
