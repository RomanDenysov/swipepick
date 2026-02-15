import { theme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { osName } from "expo-device";
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabsLayout() {
  const { isDark } = useAppTheme();
  const isIOS = Platform.OS === 'ios';

  const tabBarBackgroundColor = useThemeColor(theme.color.background);

  return (
    <Stack>
      <Stack.Screen name="swipe" options={{ headerShown: false }} />
      <Stack.Screen
        name="favorites"
        options={{
          presentation: 'card',
          headerTitle: 'Favorites',
          headerBackButtonDisplayMode: 'minimal',
          headerLargeTitleEnabled: true,
          headerTransparent: isIOS ? true : false,
          headerBlurEffect: isLiquidGlassAvailable() ? undefined : isDark ? 'dark' : 'light',
        }}
      />
      <Stack.Screen
        name="trash"
        options={{
          headerTitle: '',
          headerBackButtonDisplayMode: 'minimal',
          headerLargeTitle: false,
          headerTransparent: isIOS ? true : false,
          headerBlurEffect: isLiquidGlassAvailable() ? undefined : isDark ? 'dark' : 'light',
           presentation: isIOS ? isLiquidGlassAvailable() && osName === 'iPadOS' ? 'formSheet' : 'modal' : 'modal', 
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          presentation: isIOS ? isLiquidGlassAvailable() && osName === 'iPadOS' ? 'formSheet' : 'modal' : 'modal',
          headerTitle: '',
          sheetGrabberVisible: true,
                sheetAllowedDetents: [0.8],
                sheetInitialDetentIndex: 0,
          headerLargeTitle: false,
         contentStyle: {
                  backgroundColor: isLiquidGlassAvailable()
                    ? "transparent"
                    : tabBarBackgroundColor,
                },
                headerStyle: {
                  backgroundColor:
                    Platform.OS === "ios"
                      ? "transparent"
                      : tabBarBackgroundColor,
                },
          headerTransparent: isIOS ? true : false,
          headerBlurEffect: isLiquidGlassAvailable() ? undefined : isDark ? 'dark' : 'light',
        }}
      />
    </Stack>
  );
}