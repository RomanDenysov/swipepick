import { theme } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { TextProps as RNTextProps, Text, TextStyle } from 'react-native';

import Animated from 'react-native-reanimated';

type FontWeight = 'light' | 'medium' | 'semibold' | 'bold';

type TextProps = {
  color?: { light: string; dark: string };
  marginBottom?: number;
  fontSize?: TextStyle['fontSize'];
  fontWeight?: FontWeight;
  italic?: boolean;
  animated?: boolean;
} & RNTextProps;

export function ThemedText(props: TextProps) {
  const {
    style,
    marginBottom = 0,
    fontSize = theme.fontSize16,
    fontWeight,
    italic,
    animated,
    color: themeColor,
    ...otherProps
  } = props;

  const color = useThemeColor(themeColor ?? theme.color.text);

  const fontFamily = (() => {
    switch (fontWeight) {
      case 'light':
        return italic ? theme.fontFamilyLightItalic : theme.fontFamilyLight;
      case 'semibold':
        return italic ? theme.fontFamilySemiBoldItalic : theme.fontFamilySemiBold;
      case 'bold':
        return italic ? theme.fontFamilyBoldItalic : theme.fontFamilyBold;
      case 'medium':
      default:
        return italic ? theme.fontFamilyItalic : theme.fontFamily;
    }
  })();

  if (animated) {
    return (
      <Animated.Text
        style={[{ color, fontFamily, marginBottom, fontSize }, style]}
        {...otherProps}
      />
    );
  }

  return <Text style={[{ color, fontFamily, marginBottom, fontSize }, style]} {...otherProps} />;
}
