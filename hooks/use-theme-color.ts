import { useColorScheme } from 'react-native';

export function useThemeColor<T, U>(props: { light: T; dark: U }) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? 'light' : 'dark';

  return props[theme];
}
