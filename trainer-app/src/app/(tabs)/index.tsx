import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BRAND } from '../../brand';
import { ExerciseCard } from '../../components/ExerciseCard';
import { FilterPanel } from '../../components/FilterPanel';
import { CATEGORIES } from '../../data/categories';
import { EXERCISES } from '../../data/exercises';
import { countActiveFilters, filterExercises, useFilters } from '../../lib/filters';
import { colors, font, radius, spacing } from '../../theme';

export default function HomeScreen() {
  const { filters, setFilters } = useFilters();
  const showResults = filters.query.trim() !== '' || countActiveFilters(filters) > 0;
  const results = filterExercises(filters);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.brand}>
            PowerUp<Text style={{ color: colors.green }}>Kids</Text> ⚡
          </Text>
          <Text style={styles.slogan}>{BRAND.slogan.split(', ').join(' · ')}</Text>
          <Text style={styles.heroText}>
            {EXERCISES.length} Aufwärmspiele & Koordinationsübungen für dein Kindertraining.
          </Text>
        </View>

        <TextInput
          value={filters.query}
          onChangeText={(query) => setFilters((f) => ({ ...f, query }))}
          placeholder="Übung, Ziel oder Material suchen …"
          placeholderTextColor={colors.textMuted}
          style={styles.search}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />

        <FilterPanel color={colors.orange} />

        {showResults ? (
          <View style={styles.list}>
            <Text style={font.h2}>
              {results.length} {results.length === 1 ? 'Übung' : 'Übungen'}
            </Text>
            {results.length === 0 && (
              <Text style={font.small}>Keine Übung passt zu allen Filtern. Versuch es mit weniger Filtern.</Text>
            )}
            {results.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} showCategory />
            ))}
          </View>
        ) : (
          <>
            <Text style={font.h2}>Rubriken</Text>
            <View style={styles.grid}>
              {CATEGORIES.map((category) => {
                const count = EXERCISES.filter((e) => e.category === category.id).length;
                return (
                  <Pressable
                    key={category.id}
                    style={({ pressed }) => [
                      styles.tile,
                      { backgroundColor: category.color },
                      pressed && { transform: [{ scale: 0.97 }] },
                    ]}
                    onPress={() => router.push({ pathname: '/kategorie/[id]', params: { id: category.id } })}
                  >
                    <Text style={styles.tileEmoji}>{category.emoji}</Text>
                    <Text style={styles.tileTitle}>{category.title}</Text>
                    <Text style={styles.tileCount}>{count} Übungen</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.tipBox}>
              <Text style={font.h3}>💡 Trainer-Tipp</Text>
              <Text style={[font.body, { marginTop: 4 }]}>
                Stell deine Einheit mit „＋ Einheit“ zusammen und druck sie als PDF aus – mit Ablauf, Materialliste und
                Platz für Notizen.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  hero: { gap: 2, marginTop: spacing.sm },
  brand: { fontSize: 34, fontWeight: '900', color: colors.orange, letterSpacing: -0.5 },
  slogan: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  heroText: { fontSize: 16, color: colors.textMuted },
  search: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  tile: {
    flexGrow: 1,
    flexBasis: '45%',
    minHeight: 140,
    borderRadius: radius.lg,
    padding: spacing.lg,
    justifyContent: 'flex-end',
    gap: 2,
  },
  tileEmoji: { fontSize: 34, position: 'absolute', top: spacing.md, left: spacing.lg },
  tileTitle: { fontSize: 17, fontWeight: '900', color: colors.white },
  tileCount: { fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.85)' },
  list: { gap: spacing.md },
  tipBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
});
