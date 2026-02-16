import { SFIcon } from '@/components/sf-icon';
import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  current: number;
  limit: number;
  icon: ComponentProps<typeof Ionicons>['name'];
  color: string;
  onPress: () => void;
};

const SIZE = 56;
const STROKE_WIDTH = 4;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function RadialProgress({ current, limit, icon, color, onPress }: Props) {
  const progress = limit === 0 ? 1 : Math.min(current / limit, 1);
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const isFull = current >= limit;

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(1.15, {}, () => {
      scale.value = withSpring(1);
    });
  }, [current]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={`${color}30`}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={color}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation={-90}
            origin={`${SIZE / 2}, ${SIZE / 2}`}
          />
        </Svg>
      </Animated.View>
      <View style={styles.content}>
        <SFIcon name={icon} size={18} color={isFull ? '#fff' : color} />
        <Text style={[styles.count, { color: isFull ? '#fff' : color }]}>{current}</Text>
      </View>
      {isFull && <View style={[styles.fullOverlay, { backgroundColor: color }]} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 12,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  fullOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: SIZE / 2,
    opacity: 0.9,
  },
});
