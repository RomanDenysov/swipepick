import { CardStack } from '@/components/cards/card-stack';
import { SwipeOverlayCard } from '@/components/swipe-overlay-card';
import { usePhotos } from '@/hooks/use-photos';
import { useSwipeActions } from '@/hooks/use-swipe-actions';
import { Asset } from 'expo-media-library';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SwipeScreen() {
  const { assets, isLoading, error, remainingCount } = usePhotos();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { onSwipeLeft, onSwipeRight, onSwipeUp } = useSwipeActions();

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
    <View style={styles.container}>
      <CardStack assets={assets} currentIndex={currentIndex} onSwipe={handleSwipe} />
      <SwipeOverlayCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
