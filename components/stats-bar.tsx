import { theme } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';
import { RadialProgress } from './radial-progress';

type Props = {
  trashCount: number;
  favoriteCount: number;
  isPro: boolean;
  trashLimit: number;
  favoriteLimit: number;
  onTrashPress: () => void;
  onFavoritePress: () => void;
};

export function StatsBar({
  trashCount,
  favoriteCount,
  isPro,
  trashLimit,
  favoriteLimit,
  onTrashPress,
  onFavoritePress,
}: Props) {
  return (
    <View style={styles.container}>
      <RadialProgress
        current={trashCount}
        limit={isPro ? Infinity : trashLimit}
        icon="trash"
        color={theme.colorTrash}
        onPress={onTrashPress}
      />

      <RadialProgress
        current={favoriteCount}
        limit={isPro ? Infinity : favoriteLimit}
        icon="star"
        color={theme.colorFavorite}
        onPress={onFavoritePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },
});
