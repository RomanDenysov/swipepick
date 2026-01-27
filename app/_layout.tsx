import { theme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync } from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.setOptions({
  duration: 200,
  fade: true,
});

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { isDark, colorScheme } = useAppTheme();

  const tabBarBackgroundColor = useThemeColor(theme.color.background);

  const isIOS = Platform.OS === 'ios';

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(colorScheme === 'light' ? 'dark' : 'light');
    }
  }, [isDark]);

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
              headerTransparent: isIOS ? true : false,
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
