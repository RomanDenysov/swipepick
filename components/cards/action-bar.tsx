import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  onTrash: () => void;
  onKeep: () => void;
  onFavorite: () => void;
  trashCount: number;
  favoriteCount: number;
  onLongTrashPress: () => void;
  onLongFavoritePress: () => void;
}

export function ActionBar({
  onTrash,
  onKeep,
  onFavorite,
  trashCount,
  favoriteCount,
  onLongTrashPress,
  onLongFavoritePress,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, styles.trashButton, pressed && styles.pressed]}
        onPress={onTrash}
        onLongPress={onLongTrashPress}
      >
        <Ionicons name="trash" size={28} color="#fff" />
        {trashCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{trashCount}</Text>
          </View>
        )}
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, styles.favoriteButton, pressed && styles.pressed]}
        onPress={onFavorite}
        onLongPress={onLongFavoritePress}
      >
        <Ionicons name="star" size={32} color="#fff" />
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, styles.keepButton, pressed && styles.pressed]}
        onPress={onKeep}
      >
        <Ionicons name="checkmark" size={32} color="#fff" />
        {favoriteCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{favoriteCount}</Text>
          </View>
        )}
      </Pressable>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  trashButton: {
    backgroundColor: '#ff4757',
  },
  favoriteButton: {
    backgroundColor: '#ffa502',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  keepButton: {
    backgroundColor: '#2ed573',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});
