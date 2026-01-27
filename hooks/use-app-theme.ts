import { useThemeMode } from '@/stores/app-store';
import { useColorScheme } from 'react-native';

export function useAppTheme() {
  const systemTheme = useColorScheme() ?? 'dark';
  const themeMode = useThemeMode() ?? 'system';

  const colorScheme = themeMode === 'system' ? systemTheme : themeMode;

  return {
    colorScheme,
    isDark: colorScheme === 'dark',
    themeMode,
  };
}
