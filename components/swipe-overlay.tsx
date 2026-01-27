import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

type OverlayType = 'trash' | 'keep' | 'favorite';

interface Props {
  type: OverlayType;
  animatedStyle: ReturnType<typeof import('react-native-reanimated').useAnimatedStyle>;
}

const CONFIG: Record<
  OverlayType,
  { icon: keyof typeof Ionicons.glyphMap; color: string; bgColor: string; position: object }
> = {
  trash: {
    icon: 'trash',
    color: '#fff',
    bgColor: '#ff4757',
    position: { top: 20, left: 20 },
  },
  keep: {
    icon: 'checkmark-circle',
    color: '#fff',
    bgColor: '#2ed573',
    position: { top: 20, right: 20 },
  },
  favorite: {
    icon: 'star',
    color: '#fff',
    bgColor: '#ffa502',
    position: { top: 20, left: '50%', marginLeft: -24 },
  },
};

export function SwipeOverlay({ type, animatedStyle }: Props) {
  const config = CONFIG[type];

  return (
    <Animated.View style={[styles.container, config.position, animatedStyle]}>
      <View style={[styles.iconWrapper, { backgroundColor: config.bgColor }]}>
        <Ionicons name={config.icon} size={28} color={config.color} />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
