import { SFIcon } from '@/components/sf-icon';
import { theme } from '@/constants/theme';
import { useTrashCount } from '@/stores/app-store';
import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ThemedText } from './themed-text';

export function SwipeHeader() {
  const trashCount = useTrashCount();
  const router = useRouter();

  return (
    <Animated.View entering={FadeIn.duration(1000)} style={styles.header}>
      <Link href="/trash" asChild>
        <Pressable style={styles.titleCountBadge}>
          <SFIcon name="trash" size={20} color={theme.color.background.light} />
          <ThemedText fontSize={16} fontWeight="semibold" color={theme.color.background}>
            {trashCount}/50
          </ThemedText>
        </Pressable>
      </Link>
      <Pressable onPress={() => router.push('/settings')}>
        <SFIcon name="ellipsis-horizontal" size={24} />
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
  titleCountBadge: {
    backgroundColor: theme.color.reactBlue.light,
    padding: 8,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
