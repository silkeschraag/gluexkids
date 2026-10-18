import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ExerciseCard } from '../../components/ExerciseCard';
import { EXERCISES } from '../../data/exercises';
import { useFavorites } from '../../lib/favorites';
import { colors, font, spacing } from '../../theme';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const exercises = EXERCISES.filter((e) => favorites.includes(e.id));

  return (
    <FlatList
      data={exercises}
      keyExtractor={(e) => e.id}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      renderItem={({ item }) => <ExerciseCard exercise={item} showCategory />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>⭐</Text>
          <Text style={font.h2}>Noch keine Favoriten</Text>
          <Text style={[font.body, { textAlign: 'center', color: colors.textMuted }]}>
            Tippe bei einer Übung auf den Stern, um sie hier für dein nächstes Training zu sammeln.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, flexGrow: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm, padding: spacing.xl },
  emptyIcon: { fontSize: 48 },
});
