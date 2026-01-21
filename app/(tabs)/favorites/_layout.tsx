import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function FavoritesLayout() {
const tabBarBackgroundColor = useThemeColor(theme.color.background);
    const isIOS = Platform.OS === 'ios'
    return (
        <Stack screenOptions={{
            headerLargeTitleEnabled: true,
            headerLargeTitleShadowVisible: false
        }}>
            <Stack.Screen name="index" options={{ title: 'Favorites', headerStyle: {
                backgroundColor: isLiquidGlassAvailable() ? 'transparent' : tabBarBackgroundColor
            } }} />
        </Stack>
    )
}