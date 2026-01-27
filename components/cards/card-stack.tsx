import { Asset } from 'expo-media-library';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SwipeableCard } from './swipeable-card';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

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
      {visibleAssets.map((asset, index) => {
        const isFirst = index === 0;
        return (
          <Animated.View
            key={asset.id}
            style={[
              styles.cardWrapper,
              {
                zIndex: VISIBLE_CARDS - index,
                transform: [{ scale: 1 - index * 0.05 }, { translateY: index * 8 }],
                opacity: index === VISIBLE_CARDS - 1 ? 0.5 : 1,
              },
            ]}
            pointerEvents={isFirst ? 'auto' : 'none'}
          >
            <SwipeableCard asset={asset} onSwipe={(direction) => onSwipe(direction, asset)} />
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    // Размеры задаём здесь, не в SwipeableCard
    width: '90%',
    aspectRatio: 3 / 4, // или height: '75%'
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
