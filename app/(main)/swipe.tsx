import { ActionBar } from '@/components/cards/action-bar';
import { CardStack } from '@/components/cards/card-stack';
import { StatsBar } from '@/components/stats-bar';
import { SwipeHeader } from '@/components/swipe-header';
import { usePhotos } from '@/hooks/use-photos';
import { useSwipeActions } from '@/hooks/use-swipe-actions';
import { useFavoriteCount, useTrashCount } from '@/stores/app-store';
import { Asset } from 'expo-media-library';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SwipeScreen() {
  const { assets, isLoading, error, loadMore, refresh, hasMore } = usePhotos();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { onSwipeLeft, onSwipeRight, onSwipeUp, undo, canUndo } = useSwipeActions();
  const { bottom, top } = useSafeAreaInsets();
  const trashCount = useTrashCount();
  const favoriteCount = useFavoriteCount();

  const currentAsset = assets[currentIndex];

  useEffect(() => {
    if (hasMore && assets.length > 0 && currentIndex >= assets.length - 5) {
      loadMore();
    }
  }, [currentIndex, assets.length, hasMore, loadMore]);

  const handleSwipe = (direction: 'left' | 'right' | 'up', asset: Asset) => {
    if (direction === 'left') {
      onSwipeLeft(asset.id);
    } else if (direction === 'right') {
      onSwipeRight(asset.id);
    } else {
      onSwipeUp(asset.id);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleButtonPress = (direction: 'left' | 'right' | 'up') => {
    if (currentAsset) {
      handleSwipe(direction, currentAsset);
    }
  };

  const handleUndo = () => {
    const lastAction = undo();
    if (lastAction) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  if (isLoading && assets.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading photos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}>
      <SwipeHeader />
      <StatsBar
        trashCount={trashCount}
        favoriteCount={favoriteCount}
        isPro={false}
        trashLimit={50}
        favoriteLimit={50}
        onTrashPress={() => router.push('/trash')}
        onFavoritePress={() => router.push('/favorites')}
      />
      <View style={styles.cardArea}>
        <CardStack
          assets={assets}
          currentIndex={currentIndex}
          onSwipe={handleSwipe}
          onPress={(asset) =>
            router.push({ pathname: '/photo-viewer', params: { uri: asset.uri } })
          }
        />
      </View>
      <ActionBar
        isEmpty={!currentAsset}
        onRefresh={refresh}
        onTrash={() => handleButtonPress('left')}
        onKeep={() => handleButtonPress('right')}
        onFavorite={() => handleButtonPress('up')}
        trashCount={trashCount}
        favoriteCount={favoriteCount}
        onLongTrashPress={() => {}}
        onLongFavoritePress={() => router.push('/favorites')}
        onUndo={handleUndo}
        canUndo={canUndo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardArea: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
