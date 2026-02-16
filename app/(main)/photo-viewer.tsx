import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SnapbackZoom } from 'react-native-zoom-toolkit';

export default function PhotoViewerScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <SnapbackZoom onTap={() => router.back()}>
        <Image source={{ uri }} style={{ width, height }} contentFit="contain" />
      </SnapbackZoom>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
