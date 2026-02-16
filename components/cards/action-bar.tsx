import { theme } from '@/constants/theme';
import { SFIcon } from '@/components/sf-icon';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface Props {
  onTrash: () => void;
  onKeep: () => void;
  onFavorite: () => void;
  trashCount: number;
  favoriteCount: number;
  onLongTrashPress: () => void;
  onLongFavoritePress: () => void;
  isEmpty: boolean;
  onRefresh: () => void;
  onUndo?: () => void;
  canUndo?: boolean;
}

export function ActionBar({
  onTrash,
  onKeep,
  onFavorite,
  trashCount,
  favoriteCount,
  onLongTrashPress,
  onLongFavoritePress,
  isEmpty,
  onRefresh,
  onUndo,
  canUndo,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, styles.trashButton, pressed && styles.pressed]}
        onPress={onTrash}
        disabled={isEmpty}
        onLongPress={onLongTrashPress}
      >
        <SFIcon name="trash" size={28} color={theme.colorWhite} />
        {trashCount > 0 && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.badge}>
            <Text style={styles.badgeText}>{trashCount}</Text>
          </Animated.View>
        )}
      </Pressable>

      {isEmpty ? (
        <Pressable style={[styles.button, styles.refreshButton]} onPress={onRefresh}>
          <SFIcon name="refresh" size={32} color={theme.colorWhite} />
        </Pressable>
      ) : (
        <Pressable
          style={[styles.button, styles.favoriteButton]}
          onPress={onFavorite}
          disabled={isEmpty}
        >
          <SFIcon name="star" size={32} color={theme.colorWhite} />
        </Pressable>
      )}

      <Pressable
        style={({ pressed }) => [styles.button, styles.keepButton, pressed && styles.pressed]}
        onPress={onKeep}
        disabled={isEmpty}
      >
        <SFIcon name="checkmark" size={32} color={theme.colorWhite} />
      </Pressable>

      {canUndo && onUndo && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Pressable
            style={({ pressed }) => [styles.button, styles.undoButton, pressed && styles.pressed]}
            onPress={onUndo}
          >
            <SFIcon name="arrow-undo" size={24} color={theme.colorWhite} />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
  },
  trashButton: {
    backgroundColor: theme.colorTrash,
  },
  favoriteButton: {
    backgroundColor: theme.colorFavorite,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  keepButton: {
    backgroundColor: theme.colorKeep,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colorWhite,
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
    color: theme.colorBlack,
  },
  undoButton: {
    backgroundColor: theme.colorUndo,
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  refreshButton: {
    backgroundColor: theme.colorRefresh,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
