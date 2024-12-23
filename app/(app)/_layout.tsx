import { useGlobalContext } from '@/lib/global-provider';
import { Redirect, Slot } from 'expo-router';
import Drawer from 'expo-router/build/layouts/Drawer';
import React from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
  const { isLoggedIn, loading } = useGlobalContext();

  if (loading)
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );

  if (!isLoggedIn) return <Redirect href="/" />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerPosition: 'right',
          drawerType: 'slide',
          drawerStyle: {
            width: '85%',
            backgroundColor: 'white',
          },
          overlayColor: 'rgba(0,0,0,0.5)',
          swipeEnabled: true,
          swipeEdgeWidth: 50,
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="(app)/(tabs)/" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'overview',
          }}
        />
        <Drawer.Screen
          name="(app)/profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'User',
            title: 'overview',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
