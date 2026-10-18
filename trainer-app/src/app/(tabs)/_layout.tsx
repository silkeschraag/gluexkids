import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { useSession } from '../../lib/session';
import { colors } from '../../theme';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>;
}

export default function TabsLayout() {
  const { session } = useSession();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { fontWeight: '800', color: colors.text },
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarLabelStyle: { fontWeight: '700' },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Übungen',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏃" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="einheit"
        options={{
          title: 'Einheit',
          headerTitle: 'Meine Einheit',
          tabBarBadge: session.items.length || undefined,
          tabBarBadgeStyle: { backgroundColor: colors.orange },
          tabBarIcon: ({ focused }) => <TabIcon emoji="📋" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Timer',
          headerTitle: 'Intervall-Timer',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⏱️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="favoriten"
        options={{
          title: 'Favoriten',
          tabBarIcon: ({ focused }) => <TabIcon emoji="⭐" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
