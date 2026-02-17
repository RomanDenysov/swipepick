import { Image } from 'expo-image';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function PhotoViewerScreen() {
  const [showInfo, setShowInfo] = useState(false)
  const router = useRouter()
  const { uri, width: rawWidth, height: rawHeight } = useLocalSearchParams<{
    uri: string;
    width: string;
    height: string;
  }>();

  const imageWidth = parseInt(rawWidth, 10);
  const imageHeight = parseInt(rawHeight, 10);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const computedSize = useMemo(() => {
    if (!imageWidth || !imageHeight) {
      return { width: screenWidth, height: screenHeight };
    }
    const widthRatio = screenWidth / imageWidth;
    const heightRatio = screenHeight / imageHeight;
    const minRatio = Math.min(widthRatio, heightRatio);
    return {
      width: imageWidth * minRatio,
      height: imageHeight * minRatio,
    };
  }, [imageWidth, imageHeight, screenWidth, screenHeight]);

  return (
    <>
      <Stack.Toolbar placement='bottom'>
        <Stack.Toolbar.Button iconRenderingMode='original' accessibilityLabel='Tap to share photo' icon='square.and.arrow.up' onPress={() => {}}>Share</Stack.Toolbar.Button>
        <Stack.Toolbar.Button hidden={showInfo} iconRenderingMode='original' accessibilityLabel='Tap to get photo info' icon='info.circle' onPress={() => setShowInfo(!showInfo)}>Share</Stack.Toolbar.Button>
        <Stack.Toolbar.Spacer />

<Stack.Toolbar.View hidden={!showInfo}>
  <Pressable onPress={() => setShowInfo(!showInfo)} style={{
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 40,
            }}>
    <Text style={{ color: 'white' }}>Hide info</Text>
  </Pressable>
</Stack.Toolbar.View>
        <Stack.Toolbar.Spacer />

        <Stack.Toolbar.Button iconRenderingMode='template' accessibilityLabel='Tap to delete photo' icon='trash' onPress={() => router.back()}>Close</Stack.Toolbar.Button>
      </Stack.Toolbar>
      
      
      <View style={styles.container}>
        <Link.AppleZoomTarget>
          <View style={computedSize}>
            <Image source={{ uri }} style={styles.image} contentFit="contain" />
          </View>
        </Link.AppleZoomTarget>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
