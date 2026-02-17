import { usePhotos } from '@/hooks/use-photos';
import { useSwipeActions } from '@/hooks/use-swipe-actions';
import { useFavoriteCount, useTrashCount } from '@/stores/app-store';

import * as Haptics from 'expo-haptics';
import { Asset } from 'expo-media-library';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-screens/experimental';
import { CardStack } from '../cards/card-stack';


export function SwipeScreen() {
  const { assets, isLoading, error, loadMore, refresh, hasMore } = usePhotos();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { onSwipeLeft, onSwipeRight, onSwipeUp, undo, canUndo } = useSwipeActions();
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
      if (process.env.EXPO_OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      handleSwipe(direction, currentAsset);
    }
  };

  const handleUndo = () => {
    const lastAction = undo();
    if (lastAction) {
      if (process.env.EXPO_OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  return (

    
    <SafeAreaView edges={{bottom: true}} style={[styles.container]}>
      {/* <SwipeHeader /> */}
      {/* <StatsBar
        trashCount={trashCount}
        favoriteCount={favoriteCount}
        isPro={false}
        trashLimit={50}
        favoriteLimit={50}
        onTrashPress={() => router.push('/trash')}
        onFavoritePress={() => router.push('/favorites')}
      /> */}
      <View style={styles.cardArea}>
        <CardStack
          assets={assets}
          currentIndex={currentIndex}
          onSwipe={handleSwipe}
        />
      </View>
      <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

      </View>
      {/* <ActionBar
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
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  cardArea: {
    flex: 1,
  },
});
