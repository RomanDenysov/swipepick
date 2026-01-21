import { theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.setOptions({
  duration: 200,
  fade: true,
});

export default function RootLayout() {
const router = useRouter()
const pathname = usePathname()
const { isDark } = useAppTheme()

  const tabBarBackgroundColor = useThemeColor(theme.color.background);

const isIOS = Platform.OS === 'ios'
  return (
    <GestureHandlerRootView style={styles.container}>
      
    
    <ThemeProvider
          value={isDark ? DarkTheme : DefaultTheme}>
    <StatusBar style={isDark ? "light" : "dark"} />
  <Stack>
    <Stack.Screen name="onboarding" options={{ headerTransparent: isIOS ? true : false,
      headerLargeTitleEnabled: false,
      title: '',
      headerBlurEffect: isLiquidGlassAvailable()
                  ? undefined
                  : isDark
                    ? "dark"
                    : "light",
    }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>
    </ThemeProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});