import { theme } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS, Platform } from 'react-native';


export default function TabsLayout() {

const tintColor = useThemeColor(theme.color.reactBlue);
const inactiveTintColor = useThemeColor({
    light: "#00000090",
    dark: "#FFFFFF90",
  });

  const isIOS = Platform.OS === 'ios'

  const labelSelectedStyle = isIOS ? { color: tintColor} : undefined;

  return (
    <NativeTabs minimizeBehavior='automatic' labelStyle={{
        color:
          isIOS && isLiquidGlassAvailable()
            ? DynamicColorIOS({
                light: theme.colorBlack,
                dark: theme.colorWhite,
              })
            : inactiveTintColor,
      }}
      iconColor={
        isIOS && isLiquidGlassAvailable()
            ? DynamicColorIOS({
                light: theme.colorBlack,
                dark: theme.colorWhite,
              })
            : inactiveTintColor
            }
      disableTransparentOnScrollEdge={true}
       labelVisibilityMode='unlabeled'
       
      indicatorColor={tintColor + "25"}
      >
<NativeTabs.Trigger name='swipe'>
    <Label selectedStyle={labelSelectedStyle}>Home</Label>
    <Icon sf='appwindow.swipe.rectangle' selectedColor={tintColor} drawable='square.and.arrow.up.right.on.square' />
</NativeTabs.Trigger>
<NativeTabs.Trigger name='favorites'>
    <Label selectedStyle={labelSelectedStyle}>Favorites</Label>
    <Icon sf='star' selectedColor={tintColor} drawable='star' />
</NativeTabs.Trigger>
<NativeTabs.Trigger name='trash'>
    <Label selectedStyle={labelSelectedStyle}>Trash</Label>
    <Icon sf='trash' selectedColor={tintColor} drawable='trash' />
</NativeTabs.Trigger>
<NativeTabs.Trigger name='settings'>
    <Label selectedStyle={labelSelectedStyle}>Settings</Label>
    <Icon sf='gear' selectedColor={tintColor} drawable='gear' />
</NativeTabs.Trigger>
    </NativeTabs>
  );
}