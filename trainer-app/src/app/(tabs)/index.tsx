import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExerciseCard } from '../../components/ExerciseCard';
import { Chip } from '../../components/ui';
import { CATEGORIES } from '../../data/categories';
import { EXERCISES } from '../../data/exercises';
import { AGE_GROUPS, type AgeGroup } from '../../data/types';
import { colors, font, radius, spacing } from '../../theme';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [age, setAge] = useState<AgeGroup | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return EXERCISES.filter(
      (e) =>
        (!age || e.ages.includes(age)) &&
        [e.title, e.goal, ...e.material].some((text) => text.toLowerCase().includes(q)),
    );
  }, [query, age]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.brand}>
            Glü<Text style={{ color: colors.orange }}>X</Text>kids <Text style={styles.brandSub}>Trainer</Text>
          </Text>
          <Text style={styles.heroText}>
            {EXERCISES.length} Aufwärmspiele & Koordinationsübungen für dein Kindertraining.
          </Text>
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Übung, Ziel oder Material suchen …"
          placeholderTextColor={colors.textMuted}
          style={styles.search}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />

        <View style={styles.ageRow}>
          <Text style={styles.ageLabel}>Alter:</Text>
          <Chip label="Alle" active={age === null} onPress={() => setAge(null)} />
          {AGE_GROUPS.map((group) => (
            <Chip key={group} label={`${group} J.`} active={age === group} onPress={() => setAge(group)} />
          ))}
        </View>

        {query.trim() ? (
          <View style={styles.list}>
            <Text style={font.h2}>{results.length} Treffer</Text>
            {results.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} showCategory />
            ))}
          </View>
        ) : (
          <View style={styles.grid}>
            {CATEGORIES.map((category) => {
              const count = EXERCISES.filter(
                (e) => e.category === category.id && (!age || e.ages.includes(age)),
              ).length;
              return (
                <Pressable
                  key={category.id}
                  style={({ pressed }) => [
                    styles.tile,
                    { backgroundColor: category.color },
                    pressed && { transform: [{ scale: 0.97 }] },
                  ]}
                  onPress={() =>
                    router.push({ pathname: '/kategorie/[id]', params: { id: category.id, ...(age ? { age } : {}) } })
                  }
                >
                  <Text style={styles.tileEmoji}>{category.emoji}</Text>
                  <Text style={styles.tileTitle}>{category.title}</Text>
                  <Text style={styles.tileCount}>{count} Übungen</Text>
                </Pressable>
              );
            })}
          </View>
        )}

        <View style={styles.tipBox}>
          <Text style={font.h3}>💡 Trainer-Tipp</Text>
          <Text style={[font.body, { marginTop: 4 }]}>
            Kinder lernen Koordination am besten ausgeruht: Koordinations- und Schnelligkeitsübungen gehören an den
            Anfang des Hauptteils – direkt nach dem Aufwärmen.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  hero: { gap: 4, marginTop: spacing.sm },
  brand: { fontSize: 32, fontWeight: '900', color: colors.green },
  brandSub: { color: colors.text, fontWeight: '800' },
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
  ageRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' },
  ageLabel: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
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
