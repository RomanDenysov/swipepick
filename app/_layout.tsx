import { theme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync } from 'expo-system-ui';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.setOptions({
  duration: 200,
  fade: true,
});

const isIOS = process.env.EXPO_OS === 'ios';

export default function RootLayout() {
  const { isDark, colorScheme } = useAppTheme();

  useEffect(() => {
    if (process.env.EXPO_OS === 'android') {
      NavigationBar.setButtonStyleAsync(colorScheme === 'light' ? 'dark' : 'light');
    }
  }, [colorScheme]);

  useEffect(() => {
    setBackgroundColorAsync(
      colorScheme === 'dark' ? theme.color.background.dark : theme.color.background.light
    );
  }, [colorScheme]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} animated />
        <Stack>
          <Stack.Screen
            name="onboarding"
            options={{
              headerTransparent: isIOS,
              headerLargeTitleEnabled: false,
              title: '',
              headerBlurEffect: isLiquidGlassAvailable() ? undefined : isDark ? 'dark' : 'light',
            }}
          />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
