import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SnapbackZoom } from 'react-native-zoom-toolkit';

export default function PhotoViewerScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Pressable style={StyleSheet.absoluteFill} onPress={() => router.back()} />
      <SnapbackZoom>
        <Image source={{ uri }} style={styles.image} contentFit="contain" />
      </SnapbackZoom>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
