import { theme } from '@/constants/theme';
import { useSessionActions, useTrashQueueCount, useUndoStack } from '@/stores/session-store';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ThemedText } from './themed-text';

export function SwipeHeader() {
  const trashQueueCount = useTrashQueueCount();
  const undoStack = useUndoStack();
  const router = useRouter()
  const { popUndo, resetTrashQueue } = useSessionActions();
  const canUndo = undoStack.length > 0;

  return (
    <Animated.View entering={FadeIn.duration(1000)} style={styles.header}>
      {canUndo && <Pressable
        onPress={() => popUndo()}
        disabled={!canUndo}
        style={[styles.button, !canUndo && styles.disabled]}
      >
        <Ionicons name="arrow-undo" size={24} />
      </Pressable>}

<Link href="/trash" asChild>
<Pressable style={styles.titleCountBadge}>
<Ionicons name="trash" size={20} style={{color: theme.color.background.light}} />
      <ThemedText fontSize={16} fontWeight='semibold' color={theme.color.background}>{trashQueueCount}/50</ThemedText>
</Pressable>
</Link>
      <Pressable onPress={resetTrashQueue} style={styles.button}>
        <Ionicons name="refresh" size={24} />
      </Pressable>
      <Pressable onPress={() => router.push('/settings')}>
        <Ionicons name="ellipsis-horizontal" size={24} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    padding: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  titleCountBadge: {
    backgroundColor: theme.color.reactBlue.light,
    padding: 8,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
