import { theme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';
const isIPad = Platform.OS === 'ios' && Platform.isPad;
const hasLiquidGlass = isLiquidGlassAvailable();

export default function MainLayout() {
  const { isDark } = useAppTheme();
  const backgroundColor = useThemeColor(theme.color.background);

  const blurEffect = hasLiquidGlass ? undefined : isDark ? 'dark' : 'light';
  const transparentBg = hasLiquidGlass ? 'transparent' : backgroundColor;

  return (
    <Stack>
      <Stack.Screen name="swipe" options={{ headerShown: false }} />
      <Stack.Screen
        name="favorites"
        options={{
          presentation: 'modal',
          headerTitle: 'Favorites',
          headerLargeTitleEnabled: true,
          headerTransparent: isIOS,
          headerBlurEffect: blurEffect,
          contentStyle: { backgroundColor: transparentBg },
        }}
      />
      <Stack.Screen
        name="trash"
        options={{
          presentation: 'modal',
          headerTitle: 'Deleted Photos',
          headerLargeTitleEnabled: true,
          headerTransparent: isIOS,
          headerBlurEffect: blurEffect,
          contentStyle: { backgroundColor: transparentBg },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          presentation: isIPad ? 'formSheet' : 'modal',
          headerTitle: 'Settings',
          headerTransparent: isIOS,
          headerBlurEffect: blurEffect,
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.8],
          sheetInitialDetentIndex: 0,
          contentStyle: { backgroundColor: transparentBg },
          headerStyle: {
            backgroundColor: isIOS ? 'transparent' : backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name="photo-viewer"
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack>
  );
}
