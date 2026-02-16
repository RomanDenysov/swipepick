import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

interface Props {
  name: ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
}

export function SFIcon({ name, size = 24, color }: Props) {
  return <Ionicons name={name} size={size} color={color} />;
}
