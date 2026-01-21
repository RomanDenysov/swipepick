import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { OnboardingContainer } from "@/components/onboarding/OnboardingContainer";
import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const textColor = useThemeColor(theme.color.text);
  const textSecondaryColor = useThemeColor(theme.color.textSecondary);

  const handleGetStarted = () => {
    router.push("/onboarding/tutorial");
  };

  return (
    <OnboardingContainer>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            Welcome to SwipePick
          </Text>
          <Text style={[styles.subtitle, { color: textSecondaryColor }]}>
            Clean up your photo library by swiping
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: textColor }]}>📸</Text>
            <Text style={[styles.featureText, { color: textSecondaryColor }]}>
              Review your photos quickly
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: textColor }]}>❤️</Text>
            <Text style={[styles.featureText, { color: textSecondaryColor }]}>
              Save your favorites
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={[styles.featureIcon, { color: textColor }]}>🗑️</Text>
            <Text style={[styles.featureText, { color: textSecondaryColor }]}>
              Delete unwanted photos
            </Text>
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
    justifyContent: "space-between",
    paddingVertical: theme.space32,
  },
  header: {
    alignItems: "center",
    marginTop: theme.space32,
  },
  title: {
    fontSize: theme.fontSize34,
    fontFamily: theme.fontFamilyBold,
    textAlign: "center",
    marginBottom: theme.space12,
  },
  subtitle: {
    fontSize: theme.fontSize18,
    fontFamily: theme.fontFamily,
    textAlign: "center",
    paddingHorizontal: theme.space16,
  },
  features: {
    gap: theme.space24,
    paddingVertical: theme.space32,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space16,
  },
  featureIcon: {
    fontSize: theme.fontSize32,
  },
  featureText: {
    fontSize: theme.fontSize16,
    fontFamily: theme.fontFamily,
    flex: 1,
  },
  footer: {
    paddingBottom: theme.space16,
  },
});