import { SFIcon } from '@/components/sf-icon';
import { theme } from '@/constants/theme';
import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
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
    position: { top: 20, left: 20 },
  },
  keep: {
    icon: 'checkmark-circle',
    bgColor: theme.colorKeep,
    position: { top: 20, right: 20 },
  },
  favorite: {
    icon: 'star',
    bgColor: theme.colorFavorite,
    position: { top: 20, left: '50%', marginLeft: -24 },
  },
};

export function SwipeOverlay({ type, animatedStyle }: Props) {
  const config = CONFIG[type];

  return (
    <Animated.View style={[styles.container, config.position, animatedStyle]}>
      <View style={[styles.iconWrapper, { backgroundColor: config.bgColor }]}>
        <SFIcon name={config.icon} size={28} color={theme.colorWhite} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
});
