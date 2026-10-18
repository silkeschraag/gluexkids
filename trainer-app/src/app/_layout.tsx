import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { FavoritesProvider } from '../lib/favorites';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '800' },
          headerShadowVisible: false,
          headerBackTitle: 'Zurück',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="kategorie/[id]" options={{ title: '' }} />
        <Stack.Screen name="uebung/[id]" options={{ title: '' }} />
      </Stack>
    </FavoritesProvider>
  );
}
