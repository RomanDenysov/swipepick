import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { OnboardingContainer } from "@/components/onboarding/OnboardingContainer";
import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppActions } from "@/stores/app-store";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Platform, StyleSheet, Text, View } from "react-native";

export default function PermissionsScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAppActions();
  const textColor = useThemeColor(theme.color.text);
  const textSecondaryColor = useThemeColor(theme.color.textSecondary);
  const [isRequesting, setIsRequesting] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<
    "undetermined" | "granted" | "denied"
  >("undetermined");

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionStatus(status === "granted" ? "granted" : "denied");

      if (status === "granted") {
        completeOnboarding();
        router.replace("/(tabs)/swipe");
      }
    } catch (error) {
      setPermissionStatus("denied");
    } finally {
      setIsRequesting(false);
    }
  };

  const handleOpenSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace("/(tabs)/swipe");
  };

  return (
    <OnboardingContainer>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.icon, { color: textColor }]}>📷</Text>
          <Text style={[styles.title, { color: textColor }]}>
            Photo Access Required
          </Text>
          <Text style={[styles.subtitle, { color: textSecondaryColor }]}>
            SwipePick needs access to your photo library to help you organize
            your photos.
          </Text>
        </View>

        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoIcon, { color: textColor }]}>🔒</Text>
            <Text style={[styles.infoText, { color: textSecondaryColor }]}>
              Your photos stay on your device
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoIcon, { color: textColor }]}>👁️</Text>
            <Text style={[styles.infoText, { color: textSecondaryColor }]}>
              We only access photos you review
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoIcon, { color: textColor }]}>🚫</Text>
            <Text style={[styles.infoText, { color: textSecondaryColor }]}>
              We never upload or share your photos
            </Text>
          </View>
        </View>

        {permissionStatus === "denied" && (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: textSecondaryColor }]}>
              Permission denied. Please enable photo access in Settings to use
              SwipePick.
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          {permissionStatus === "denied" ? (
            <>
              <OnboardingButton
                label="Open Settings"
                onPress={handleOpenSettings}
              />
              <OnboardingButton
                label="Skip for Now"
                onPress={handleSkip}
                variant="secondary"
              />
            </>
          ) : (
            <>
              <OnboardingButton
                label={isRequesting ? "Requesting..." : "Allow Access"}
                onPress={handleRequestPermission}
                variant="primary"
              />
              <OnboardingButton
                label="Skip for Now"
                onPress={handleSkip}
                variant="secondary"
              />
            </>
          )}
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
  icon: {
    fontSize: theme.fontSize42,
    marginBottom: theme.space16,
  },
  title: {
    fontSize: theme.fontSize34,
    fontFamily: theme.fontFamilyBold,
    textAlign: "center",
    marginBottom: theme.space12,
  },
  subtitle: {
    fontSize: theme.fontSize16,
    fontFamily: theme.fontFamily,
    textAlign: "center",
    paddingHorizontal: theme.space16,
    lineHeight: theme.fontSize16 * 1.5,
  },
  info: {
    gap: theme.space20,
    paddingVertical: theme.space24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space16,
  },
  infoIcon: {
    fontSize: theme.fontSize24,
  },
  infoText: {
    fontSize: theme.fontSize14,
    fontFamily: theme.fontFamily,
    flex: 1,
  },
  errorContainer: {
    paddingVertical: theme.space12,
    paddingHorizontal: theme.space16,
    borderRadius: theme.borderRadius10,
    backgroundColor: `${theme.colorRed}15`,
  },
  errorText: {
    fontSize: theme.fontSize14,
    fontFamily: theme.fontFamily,
    textAlign: "center",
    lineHeight: theme.fontSize14 * 1.4,
  },
  footer: {
    gap: theme.space12,
    paddingBottom: theme.space16,
  },
});