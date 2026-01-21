import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, Text } from "react-native";

interface OnboardingButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export function OnboardingButton({
  label,
  onPress,
  variant = "primary",
}: OnboardingButtonProps) {
  const backgroundColor = useThemeColor(
    variant === "primary"
      ? { light: theme.colorBlack, dark: theme.colorWhite }
      : { light: theme.colorGrey, dark: theme.colorGrey }
  );
  const textColor = useThemeColor(
    variant === "primary"
      ? { light: theme.colorWhite, dark: theme.colorBlack }
      : { light: theme.colorWhite, dark: theme.colorWhite }
  );

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.space16,
    paddingHorizontal: theme.space24,
    borderRadius: theme.borderRadius12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: theme.fontSize16,
    fontFamily: theme.fontFamilySemiBold,
  },
});
