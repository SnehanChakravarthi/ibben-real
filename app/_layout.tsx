import { SplashScreen, Stack } from 'expo-router';

import { useFonts } from 'expo-font';

import './global.css';
import { useEffect } from 'react';
import GlobalProvider from '@/lib/global-provider';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Rubik-Bold': require('@/assets/fonts/Rubik-Bold.ttf'),
    'Rubik-ExtraBold': require('@/assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Medium': require('@/assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Regular': require('@/assets/fonts/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('@/assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Light': require('@/assets/fonts/Rubik-Light.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen
          name="(auth)/sign-in"
          options={{ animation: 'fade', animationDuration: 300 }}
        />
        <Stack.Screen
          name="(auth)/sign-up"
          options={{ animation: 'fade', animationDuration: 300 }}
        />
      </Stack>
    </GlobalProvider>
  );
}
