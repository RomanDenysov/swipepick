import { Asset } from 'expo-media-library';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SwipeOverlay } from '../swipe-overlay';
import { SwipeableCard } from './swipeable-card';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.65;

interface Props {
  assets: Asset[];
  currentIndex: number;
  onSwipe: (direction: 'left' | 'right' | 'up', asset: Asset) => void;
}

const VISIBLE_CARDS = 3;

export function CardStack({ assets, currentIndex, onSwipe }: Props) {
  const visibleAssets = assets.slice(currentIndex, currentIndex + VISIBLE_CARDS);

  if (visibleAssets.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No more photos to review</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {visibleAssets
        .map((asset, index) => {

             const isFirst = index === 0;
          return (
            <Animated.View key={asset.id} style={[styles.cardContainer, {
                zIndex: visibleAssets.length - index,
                transform: [
                    {scale: 1 - index * 0.05},
                    {translateY: index * 10},
                ],
                opacity: index === 2 ? 0.5 : 1,
            }]}
            pointerEvents={isFirst ? 'auto' : 'none'}
            >

          <SwipeableCard
            asset={asset}
            onSwipe={(direction) => onSwipe(direction, asset)}
            isFirst={isFirst}
            stackIndex={index}
            />
            </Animated.View>
        )
      })}
        <SwipeOverlay type="trash" animatedStyle={{}} />
        <SwipeOverlay type="keep" animatedStyle={{}} />
        <SwipeOverlay type="favorite" animatedStyle={{}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    left: (SCREEN_WIDTH - CARD_WIDTH) / 2,
    top: (SCREEN_HEIGHT - CARD_HEIGHT) / 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});
