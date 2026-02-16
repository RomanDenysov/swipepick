import { SFIcon } from '@/components/sf-icon';
import { theme } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTrashPhotos } from '@/hooks/use-trash-photos';
import { useAppActions } from '@/stores/app-store';
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-media-library';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const NUM_COLUMNS = 3;
const GAP = theme.space4;

export default function TrashScreen() {
  const { assets, isLoading } = useTrashPhotos();
  const { markPhoto, removePhoto } = useAppActions();
  const [deselected, setDeselected] = useState<Set<string>>(new Set());
  const { width: screenWidth } = useWindowDimensions();

  const textSecondaryColor = useThemeColor(theme.color.textSecondary);
  const backgroundColor = useThemeColor(theme.color.background);

  const selectedCount = assets.length - deselected.size;
  const itemSize = (screenWidth - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  const toggleSelection = useCallback((id: string) => {
    setDeselected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    const selectedIds = assets.filter((a) => !deselected.has(a.id)).map((a) => a.id);
    if (selectedIds.length === 0) return;

    Alert.alert(
      'Delete Photos',
      `Permanently delete ${selectedIds.length} photo${selectedIds.length > 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await MediaLibrary.deleteAssetsAsync(selectedIds);
              for (const id of selectedIds) {
                removePhoto(id);
              }
            } catch {
              Alert.alert('Error', 'Failed to delete some photos. Please try again.');
              return;
            }

            for (const id of deselected) {
              markPhoto(id, 'keep');
            }

            if (router.canGoBack()) {
              router.back();
            }
          },
        },
      ]
    );
  }, [assets, deselected, markPhoto, removePhoto]);

  const renderItem = useCallback(
    ({ item }: { item: Asset }) => {
      const isSelected = !deselected.has(item.id);

      return (
        <Pressable
          style={[styles.itemContainer, { width: itemSize, height: itemSize }]}
          onPress={() => toggleSelection(item.id)}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.thumbnail}
            contentFit="cover"
            recyclingKey={item.id}
          />
          {isSelected && (
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.selectedOverlay}>
              <View style={styles.checkBadge}>
                <SFIcon name="checkmark" size={14} color={theme.colorWhite} />
              </View>
            </Animated.View>
          )}
        </Pressable>
      );
    },
    [deselected, toggleSelection, itemSize]
  );

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (assets.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor }]}>
        <SFIcon name="trash-outline" size={48} color={textSecondaryColor} />
        <Text style={[styles.emptyText, { color: textSecondaryColor }]}>No trashed photos</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <FlatList
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={
          <Text style={[styles.hint, { color: textSecondaryColor }]}>
            Tap a photo to deselect it and keep it
          </Text>
        }
      />

      <View style={styles.footer}>
        <Pressable
          style={[styles.deleteButton, selectedCount === 0 && styles.deleteButtonDisabled]}
          onPress={handleConfirmDelete}
          disabled={selectedCount === 0}
        >
          <SFIcon name="trash" size={20} color={theme.colorWhite} />
          <Text style={styles.deleteButtonText}>
            Delete{selectedCount > 0 ? ` (${selectedCount})` : ''}
          </Text>
        </Pressable>
      </View>
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
    gap: theme.space12,
  },
  hint: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize14,
    textAlign: 'center',
    paddingVertical: theme.space8,
  },
  grid: {
    padding: GAP,
  },
  row: {
    gap: GAP,
    marginBottom: GAP,
  },
  itemContainer: {
    borderRadius: theme.borderRadius6,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 3,
    borderColor: theme.colorRed,
    borderRadius: theme.borderRadius6,
    borderCurve: 'continuous',
  },
  checkBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colorRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize16,
  },
  footer: {
    padding: theme.space16,
    paddingBottom: theme.space32,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.space8,
    backgroundColor: theme.colorRed,
    paddingVertical: theme.space12,
    borderRadius: theme.borderRadius12,
    borderCurve: 'continuous',
  },
  deleteButtonDisabled: {
    opacity: 0.4,
  },
  deleteButtonText: {
    fontFamily: theme.fontFamilySemiBold,
    fontSize: theme.fontSize16,
    fontVariant: ['tabular-nums'],
    color: theme.colorWhite,
  },
});
