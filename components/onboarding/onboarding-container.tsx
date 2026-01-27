import { theme } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingContainerProps {
  children: ReactNode;
}

export function OnboardingContainer({ children }: OnboardingContainerProps) {
  const backgroundColor = useThemeColor(theme.color.background);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.space24,
  },
});
