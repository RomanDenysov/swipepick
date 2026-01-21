import { Icon } from "expo-router/unstable-native-tabs";
import { SFSymbol } from "expo-symbols";
import Animated from "react-native-reanimated";

type OverlayType = 'trash' | 'keep' | 'favorite';

interface Props {
    type: OverlayType;
  animatedStyle: ReturnType<typeof import('react-native-reanimated').useAnimatedStyle>;

}

const CONFIG: Record<OverlayType, { iconIOS: SFSymbol; iconAndroid: string; color: string; position: object }>  = {
trash: {
    iconIOS: 'trash.fill',
    iconAndroid: 'delete',
    color: '#ff4757',
    position: { top: 40, left: 20 },
  },
  keep: {
    iconIOS: 'checkmark.circle.fill',
    iconAndroid: 'check-circle',
    color: '#2ed573',
    position: { top: 40, right: 20 },
  },
  favorite: {
    iconIOS: 'star.fill',
    iconAndroid: 'star',
    color: '#ffa502',
    position: { top: 40, alignSelf: 'center' },
  },
}

export function SwipeOverlay({ type, animatedStyle }: Props) {
    const config = CONFIG[type];

    return (
        <Animated.View style={[animatedStyle, config.position, {
          zIndex: 1000,
        }]}>
            <Icon sf={config.iconIOS} selectedColor={config.color} />
        </Animated.View>
    )
}