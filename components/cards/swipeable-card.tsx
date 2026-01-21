import { Image } from 'expo-image';
import { Asset } from 'expo-media-library';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { SwipeOverlay } from '../swipe-overlay';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;
const SWIPE_UP_THRESHOLD = SCREEN_HEIGHT * 0.15;
const VELOCITY_THRESHOLD = 500;

type SwipeDirection = 'left' | 'right' | 'up';

interface Props {
  asset: Asset;
  onSwipe: (direction: SwipeDirection) => void;
  isFirst?: boolean;
  stackIndex?: number;
}

export function SwipeableCard({ asset, onSwipe, isFirst = false, stackIndex = 0 }: Props) {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isGestureActive = useSharedValue(false);

  const handleSwipeComplete = (direction: SwipeDirection) => {
    onSwipe(direction);
  };

const panGesture = Gesture.Pan().onStart(() => {
    isGestureActive.value = true;
}).onUpdate((e) => {
    translateX.value = e.translationX
    translateY.value = Math.max(0, e.translationY)
}).onEnd((e) => {
    isGestureActive.value = false;

    const swipedRight = translateX.value > SWIPE_THRESHOLD || e.velocityX > VELOCITY_THRESHOLD
    const swipedLeft = translateX.value < -SWIPE_THRESHOLD || e.velocityX < -VELOCITY_THRESHOLD
    const swipedUp = translateY.value < -SWIPE_UP_THRESHOLD || e.velocityY < -VELOCITY_THRESHOLD

    if(swipedUp) {
        translateY.value = withTiming(-SCREEN_HEIGHT, {duration: 300})
        runOnJS(handleSwipeComplete)('up');
    } else if(swipedRight) {
        translateX.value = withTiming(SCREEN_WIDTH, {duration: 300})
        runOnJS(handleSwipeComplete)('right');
    } else if(swipedLeft) {
        translateX.value = withTiming(-SCREEN_WIDTH, {duration: 300})
        runOnJS(handleSwipeComplete)('left');
    }
    else {
        translateX.value = withSpring(0, { damping: 15 })
        translateY.value = withSpring(0, { damping: 15 })
    }
})

const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2], [-15, 0, 15], Extrapolation.CLAMP)
   
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const trashOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
        translateX.value,
        [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD / 2, 0],
        [1, 0.5, 0],
        Extrapolation.CLAMP
    )
  }))

  const keepOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD / 2, SWIPE_THRESHOLD],
      [0, 0.5, 1],
      Extrapolation.CLAMP
    ),
  }));

  const favoriteOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
        translateY.value,
        [0, -SWIPE_UP_THRESHOLD / 2, -SWIPE_UP_THRESHOLD],
        [0, 0.5, 1],
        Extrapolation.CLAMP

    )
  }))

    return (
<GestureDetector gesture={panGesture}>
    <Animated.View style={[styles.card, cardStyle]}>
        <Image
          source={{ uri: asset.uri }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
    <SwipeOverlay type="trash" animatedStyle={trashOpacity} />
    <SwipeOverlay type="keep" animatedStyle={keepOpacity} />
    <SwipeOverlay type="favorite" animatedStyle={favoriteOpacity} />
    </Animated.View>
</GestureDetector>
    )

}

const styles = StyleSheet.create({
     card: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH - 32,
    height: SCREEN_HEIGHT * 0.65,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
  },
  image: {
    flex: 1,
  },
})