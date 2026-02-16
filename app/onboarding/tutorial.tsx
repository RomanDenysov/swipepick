import { OnboardingButton } from '@/components/onboarding/onboarding-button';
import { OnboardingContainer } from '@/components/onboarding/onboarding-container';
import { theme } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function TutorialScreen() {
  const router = useRouter();
  const textColor = useThemeColor(theme.color.text);
  const textSecondaryColor = useThemeColor(theme.color.textSecondary);

  const handleContinue = () => {
    router.push('/onboarding/permissions');
  };

  return (
    <OnboardingContainer>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>How to Use SwipePick</Text>
          <Text style={[styles.subtitle, { color: textSecondaryColor }]}>
            Swipe in different directions to organize your photos
          </Text>
        </View>

        <View style={styles.gestures}>
          <View style={styles.gesture}>
            <View style={[styles.gestureIcon, styles.swipeLeft]}>
              <Text style={styles.gestureArrow}>←</Text>
            </View>
            <View style={styles.gestureInfo}>
              <Text style={[styles.gestureTitle, { color: textColor }]}>Swipe Left</Text>
              <Text style={[styles.gestureDescription, { color: textSecondaryColor }]}>
                Delete photo
              </Text>
            </View>
            <Text style={[styles.gestureEmoji, { color: theme.colorRed }]}>🗑️</Text>
          </View>

          <View style={styles.gesture}>
            <View style={[styles.gestureIcon, styles.swipeRight]}>
              <Text style={styles.gestureArrow}>→</Text>
            </View>
            <View style={styles.gestureInfo}>
              <Text style={[styles.gestureTitle, { color: textColor }]}>Swipe Right</Text>
              <Text style={[styles.gestureDescription, { color: textSecondaryColor }]}>
                Keep photo
              </Text>
            </View>
            <Text style={[styles.gestureEmoji, { color: theme.colorDarkGreen }]}>✅</Text>
          </View>

          <View style={styles.gesture}>
            <View style={[styles.gestureIcon, styles.swipeUp]}>
              <Text style={styles.gestureArrow}>↑</Text>
            </View>
            <View style={styles.gestureInfo}>
              <Text style={[styles.gestureTitle, { color: textColor }]}>Swipe Up</Text>
              <Text style={[styles.gestureDescription, { color: textSecondaryColor }]}>
                Add to favorites
              </Text>
            </View>
            <Text style={[styles.gestureEmoji, { color: theme.colorDarkGreen }]}>❤️</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <OnboardingButton label="Continue" onPress={handleContinue} />
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
  title: {
    fontSize: theme.fontSize34,
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
    marginBottom: theme.space12,
  },
  subtitle: {
    fontSize: theme.fontSize18,
    fontFamily: theme.fontFamily,
    textAlign: 'center',
    paddingHorizontal: theme.space16,
  },
  gestures: {
    gap: theme.space24,
    paddingVertical: theme.space32,
  },
  gesture: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space16,
    paddingVertical: theme.space12,
  },
  gestureIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeLeft: {
    backgroundColor: `${theme.colorRed}20`,
  },
  swipeRight: {
    backgroundColor: `${theme.colorDarkGreen}20`,
  },
  swipeUp: {
    backgroundColor: `${theme.colorGrey}20`,
  },
  gestureArrow: {
    fontSize: theme.fontSize24,
    fontFamily: theme.fontFamilyBold,
  },
  gestureInfo: {
    flex: 1,
  },
  gestureTitle: {
    fontSize: theme.fontSize18,
    fontFamily: theme.fontFamilySemiBold,
    marginBottom: theme.space4,
  },
  gestureDescription: {
    fontSize: theme.fontSize14,
    fontFamily: theme.fontFamily,
  },
  gestureEmoji: {
    fontSize: theme.fontSize28,
  },
  footer: {
    paddingBottom: theme.space16,
  },
});
