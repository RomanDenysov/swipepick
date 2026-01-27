import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { SwipeOverlay } from './swipe-overlay';

interface Props {
  trashOpacity: ReturnType<typeof useAnimatedStyle>;
  keepOpacity: ReturnType<typeof useAnimatedStyle>;
  favoriteOpacity: ReturnType<typeof useAnimatedStyle>;
}

export function SwipeOverlayCard({ trashOpacity, keepOpacity, favoriteOpacity }: Props) {
  return (
    <Animated.View style={styles.container}>
      <SwipeOverlay type="trash" animatedStyle={trashOpacity} />
      <SwipeOverlay type="keep" animatedStyle={keepOpacity} />
      <SwipeOverlay type="favorite" animatedStyle={favoriteOpacity} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
