import { theme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import * as Device from 'expo-device';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import React from 'react';

const isIOS = process.env.EXPO_OS === 'ios';
const isIPad = Device.osName === 'iPadOS';
const hasLiquidGlass = isLiquidGlassAvailable();

export default function MainLayout() {
  const { isDark } = useAppTheme();
  const backgroundColor = useThemeColor(theme.color.background);

  const blurEffect = hasLiquidGlass ? undefined : isDark ? 'dark' : 'light';
  const transparentBg = hasLiquidGlass ? 'transparent' : backgroundColor;

  return (
    <Stack>
      <Stack.Screen name="swipe" options={{  headerTransparent: isIOS, headerBlurEffect: blurEffect, headerShown: false }} />
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
      >
        <Stack.Screen.BackButton displayMode="minimal">Back</Stack.Screen.BackButton>
      </Stack.Screen>
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
        name="photo"
        options={{
          title: '',
 headerTransparent: isIOS,
          headerBlurEffect: blurEffect,
        }}
      >
        <Stack.Screen.BackButton displayMode='minimal'>Back</Stack.Screen.BackButton>
      </Stack.Screen>
    </Stack>
  );
}
