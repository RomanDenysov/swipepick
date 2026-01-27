import { OnboardingButton } from '@/components/onboarding/onboarding-button';
import { OnboardingContainer } from '@/components/onboarding/onboarding-container';
import { ThemedText } from '@/components/themed-text';
import { theme } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const textColor = useThemeColor(theme.color.text);
  const textSecondaryColor = useThemeColor(theme.color.textSecondary);

  const handleGetStarted = () => {
    router.push('/onboarding/tutorial');
  };

  return (
    <OnboardingContainer>
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText
            fontSize={theme.fontSize34}
            fontWeight="bold"
            marginBottom={theme.space12}
            animated
          >
            Welcome to SwipePick
          </ThemedText>
          <ThemedText
            fontSize={theme.fontSize16}
            fontWeight="medium"
            marginBottom={theme.space12}
            animated
          >
            Clean up your photo library by swiping
          </ThemedText>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <ThemedText
              fontSize={theme.fontSize32}
              fontWeight="bold"
              marginBottom={theme.space12}
              animated
            >
              📸
            </ThemedText>
            <ThemedText
              fontSize={theme.fontSize16}
              fontWeight="medium"
              marginBottom={theme.space12}
              animated
            >
              Review your photos quickly
            </ThemedText>
          </View>
          <View style={styles.feature}>
            <ThemedText
              fontSize={theme.fontSize32}
              fontWeight="bold"
              marginBottom={theme.space12}
              animated
            >
              ❤️
            </ThemedText>
            <ThemedText
              fontSize={theme.fontSize16}
              fontWeight="medium"
              marginBottom={theme.space12}
              animated
            >
              Save your favorites
            </ThemedText>
          </View>
          <View style={styles.feature}>
            <ThemedText
              fontSize={theme.fontSize32}
              fontWeight="bold"
              marginBottom={theme.space12}
              animated
            >
              🗑️
            </ThemedText>
            <ThemedText
              fontSize={theme.fontSize16}
              fontWeight="medium"
              marginBottom={theme.space12}
              animated
            >
              Delete unwanted photos
            </ThemedText>
          </View>
        </View>

        <View style={styles.footer}>
          <OnboardingButton label="Get Started" onPress={handleGetStarted} />
        </View>
      </View>
    </OnboardingContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: theme.space32,
  },
  header: {
    alignItems: 'center',
    marginTop: theme.space32,
  },
  features: {
    gap: theme.space24,
    paddingVertical: theme.space32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space16,
  },
  footer: {
    paddingBottom: theme.space16,
  },
});
