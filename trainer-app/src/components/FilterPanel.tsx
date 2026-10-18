import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CATEGORIES } from '../data/categories';
import { AGE_GROUPS, DIFFICULTY_LABELS, DURATION_BUCKETS, EQUIPMENT, type Difficulty } from '../data/types';
import { countActiveFilters, toggleIn, useFilters } from '../lib/filters';
import { colors, font, radius, spacing } from '../theme';
import { Chip } from './ui';

const DIFFICULTIES: Difficulty[] = [1, 2, 3];

function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={font.h3}>{title}</Text>
      {hint && <Text style={font.small}>{hint}</Text>}
      <View style={styles.chips}>{children}</View>
    </View>
  );
}

export function FilterPanel({ hideCategories, color = colors.text }: { hideCategories?: boolean; color?: string }) {
  const { filters, setFilters, resetFilters } = useFilters();
  const [open, setOpen] = useState(false);
  const active = countActiveFilters(filters, { ignoreCategories: hideCategories });

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Pressable
          style={styles.toggle}
          onPress={() => setOpen((o) => !o)}
          accessibilityRole="button"
          accessibilityState={{ expanded: open }}
        >
          <Text style={font.h3}>⚙️ Filter</Text>
          {active > 0 && (
            <View style={[styles.badge, { backgroundColor: color }]}>
              <Text style={styles.badgeText}>{active}</Text>
            </View>
          )}
          <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
        </Pressable>
        {active > 0 && (
          <Pressable onPress={resetFilters} hitSlop={8} accessibilityRole="button">
            <Text style={styles.reset}>Zurücksetzen</Text>
          </Pressable>
        )}
      </View>

      {open && (
        <View style={styles.body}>
          {!hideCategories && (
            <Group title="Rubrik">
              {CATEGORIES.map((c) => (
                <Chip
                  key={c.id}
                  label={`${c.emoji} ${c.short}`}
                  active={filters.categories.includes(c.id)}
                  color={c.color}
                  onPress={() => setFilters((f) => ({ ...f, categories: toggleIn(f.categories, c.id) }))}
                />
              ))}
            </Group>
          )}

          <Group title="Alter">
            <Chip
              label="Alle"
              active={!filters.age}
              color={color}
              onPress={() => setFilters((f) => ({ ...f, age: null }))}
            />
            {AGE_GROUPS.map((age) => (
              <Chip
                key={age}
                label={`${age} J.`}
                active={filters.age === age}
                color={color}
                onPress={() => setFilters((f) => ({ ...f, age: f.age === age ? null : age }))}
              />
            ))}
          </Group>

          <Group title="Dauer">
            {DURATION_BUCKETS.map((b) => (
              <Chip
                key={b.id}
                label={`⏱ ${b.label}`}
                active={filters.durations.includes(b.id)}
                color={color}
                onPress={() => setFilters((f) => ({ ...f, durations: toggleIn(f.durations, b.id) }))}
              />
            ))}
          </Group>

          <Group title="Schwierigkeit">
            {DIFFICULTIES.map((d) => (
              <Chip
                key={d}
                label={`${'●'.repeat(d)}${'○'.repeat(3 - d)} ${DIFFICULTY_LABELS[d]}`}
                active={filters.difficulties.includes(d)}
                color={color}
                onPress={() => setFilters((f) => ({ ...f, difficulties: toggleIn(f.difficulties, d) }))}
              />
            ))}
          </Group>

          <Group title="Material" hint="Wähle, was du dabei hast – es erscheinen nur Übungen, die damit auskommen.">
            <Chip
              label="Egal"
              active={filters.equipment === null}
              color={color}
              onPress={() => setFilters((f) => ({ ...f, equipment: null }))}
            />
            <Chip
              label="🚫 Ohne Material"
              active={filters.equipment?.length === 0}
              color={color}
              onPress={() => setFilters((f) => ({ ...f, equipment: f.equipment?.length === 0 ? null : [] }))}
            />
            {EQUIPMENT.map((item) => (
              <Chip
                key={item.id}
                label={`${item.emoji} ${item.label}`}
                active={!!filters.equipment?.includes(item.id)}
                color={color}
                onPress={() =>
                  setFilters((f) => {
                    const next = toggleIn(f.equipment ?? [], item.id);
                    return { ...f, equipment: next.length ? next : null };
                  })
                }
              />
            ))}
          </Group>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: { flexDirection: 'row', alignItems: 'center', paddingRight: spacing.lg },
  toggle: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.lg },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { color: colors.white, fontWeight: '900', fontSize: 12 },
  chevron: { marginLeft: 'auto', color: colors.textMuted, fontSize: 12 },
  reset: { color: colors.orange, fontWeight: '800', marginLeft: spacing.md },
  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, gap: spacing.lg },
  group: { gap: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
