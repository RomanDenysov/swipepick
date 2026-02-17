import { SwipeScreen } from '@/components/screens/swipe-screen';
import { theme } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { GlassView } from 'expo-glass-effect';

import { Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';


export default function Swipe() {
  const backgroundColor = useThemeColor({ light: theme.colorTrash, dark: theme.colorTrash });
  return (<>
  <Stack.Screen.Title asChild>


   <GlassView style={{  paddingHorizontal: 16, paddingVertical: 8, borderRadius: theme.borderRadius32 }} 
   glassEffectStyle={{
    style: 'regular',
    animate: true,
    animationDuration: 0.5
   }}>


    <Text style={{fontSize: theme.fontSize16, fontWeight: 'semibold'}}>13/1312</Text>
   </GlassView>

  </Stack.Screen.Title>
  <Stack.Toolbar placement='right'>
     <Stack.Toolbar.Menu iconRenderingMode='original'  accessibilityLabel='Tap to delete' icon='ellipsis' tintColor={backgroundColor} >
        <Stack.Toolbar.MenuAction iconRenderingMode='original' >Delete</Stack.Toolbar.MenuAction>
        <Stack.Toolbar.MenuAction iconRenderingMode='original' >Favorite</Stack.Toolbar.MenuAction>
        <Stack.Toolbar.MenuAction iconRenderingMode='original' >Keep</Stack.Toolbar.MenuAction>
      </Stack.Toolbar.Menu>
  </Stack.Toolbar>

  {/* <Stack.Toolbar placement='bottom'>
    <Stack.Toolbar.Button iconRenderingMode='original' accessibilityLabel='Tap to delete' icon='trash.fill' tintColor={backgroundColor} onPress={() => {}}/>
    <Stack.Toolbar.Spacer />
    <Stack.Toolbar.Button iconRenderingMode='original' accessibilityLabel='Tap to favorite' icon='star.fill' onPress={() => {}}>Favorite</Stack.Toolbar.Button>
    <Stack.Toolbar.Spacer />
    <Stack.Toolbar.Button iconRenderingMode='original' accessibilityLabel='Tap to keep' icon='checkmark' onPress={() => {}}>Keep</Stack.Toolbar.Button>
  </Stack.Toolbar> */}
  <SwipeScreen />
  </>


  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  button: {
    height: 44,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.space8,
  },
  buttonText: {
    fontSize: theme.fontSize16,
    fontFamily: theme.fontFamilySemiBold,
  },
});