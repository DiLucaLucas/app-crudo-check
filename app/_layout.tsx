import { useColorScheme } from '@/hooks/use-color-scheme';
import { useNetworkAlert } from '@/hooks/useNetworkAlert';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useNetworkAlert();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="observaciones"
          options={{ headerShown: true, title: 'Crudo-App' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
