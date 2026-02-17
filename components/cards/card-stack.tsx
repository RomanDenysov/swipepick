import { theme } from '@/constants/theme';
import { Asset } from 'expo-media-library';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SwipeableCard } from './swipeable-card';

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
      <Animated.View entering={FadeIn} style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No more photos to review</Text>
      </Animated.View>
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
            <SwipeableCard
              asset={asset}
              onSwipe={(direction) => onSwipe(direction, asset)}
              />

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
    width: '90%',
    aspectRatio: 3 / 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: theme.colorMuted,
  },
});
