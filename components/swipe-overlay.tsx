import { SFIcon } from '@/components/sf-icon';
import { theme } from '@/constants/theme';
import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

type OverlayType = 'trash' | 'keep' | 'favorite';

interface Props {
  type: OverlayType;
  animatedStyle: ReturnType<typeof import('react-native-reanimated').useAnimatedStyle>;
}

const CONFIG: Record<
  OverlayType,
  { icon: ComponentProps<typeof Ionicons>['name']; bgColor: string; position: object }
> = {
  trash: {
    icon: 'trash',
    bgColor: theme.colorTrash,
    position: { top: 0, right: 0, bottom: 0 },
  },
  keep: {
    icon: 'checkmark-circle',
    bgColor: theme.colorKeep,
    position: { top: 0, right: 0, bottom: 0 },
  },
  favorite: {
    icon: 'star',
    bgColor: theme.colorFavorite,
    position: { top: 0, left: 0, bottom: 0 },
  },
};

export function SwipeOverlay({ type, animatedStyle }: Props) {
  const config = CONFIG[type];

  return (
    <Animated.View style={[styles.container, config.position,  { backgroundColor: config.bgColor }, animatedStyle]}>
        <SFIcon name={config.icon} size={60} color={theme.colorWhite} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
