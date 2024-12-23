import { useGlobalContext } from '@/lib/global-provider';
import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';

export default function AppLayout() {
  const { isLoggedIn, loading } = useGlobalContext();

  if (loading)
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );

  if (!isLoggedIn) return <Redirect href="/" />;

  return <Slot />;
}
