import images from '@/constants/images';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect, router } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

const Index = () => {
  const { loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return (
    <SafeAreaView className="h-full flex flex-col justify-end w-full bg-white">
      <Animated.View
        entering={FadeInUp.duration(500).delay(100)}
        className="flex flex-row absolute top-0 left-0 right-0 items-center justify-center h-2/3 mx-0"
      >
        <Image
          source={images.ibbenOnboarding}
          className="w-full h-full rounded-t-3xl"
          resizeMode="cover"
        />
        <LinearGradient
          colors={[
            'transparent',
            'rgba(255, 255, 255, 0.4)',
            'rgba(255, 255, 255, 1)',
          ]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </Animated.View>
      <ScrollView contentContainerClassName="h-full flex flex-col justify-end">
        <Animated.View
          entering={FadeInUp.duration(500).delay(100)}
          className="px-10 mb-16"
        >
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Ibben
          </Text>
          <Text className="text-3xl mt-2 text-center font-rubik text-black-300">
            AI powered{'\n'}
            <Text className="text-primary-300 text-4xl font-rubik-bold">
              {' '}
              Smart Assistant
            </Text>
          </Text>
          <Text className="text-lg mt-12 text-center font-rubik text-black-200">
            Login to Ibben with Google
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/sign-up')}
            className="bg-primary-300 shadow-md shadow-zinc-300 rounded-2xl w-full py-4 mt-5"
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-lg font-rubik-medium ml-2 text-white">
                Get Started
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/sign-in')}
            className="bg-white shadow-md shadow-zinc-300 rounded-2xl w-full py-4 mt-5"
          >
            <Text className="text-lg font-rubik-medium text-center text-black-300">
              I already have an account
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '45%',
  },
});
