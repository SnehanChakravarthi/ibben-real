import icons from '@/constants/icons';
import images from '@/constants/images';
import { signUpSchema } from '@/constants/schema';
import { loginWithGoogle, signUpWithEmail } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Link, Redirect, router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { z } from 'zod';

const SignUp = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();
  const [isFocused, setIsFocused] = useState({
    fullName: false,
    email: false,
    password: false,
  });
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!loading && isLoggedIn) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  const handleSignUp = async () => {
    try {
      setIsSubmitting(true);
      const validatedData = signUpSchema.parse({
        fullName,
        email,
        password,
      });

      const result = await signUpWithEmail(
        validatedData.email,
        validatedData.password,
        validatedData.fullName
      );

      if (result) {
        refetch();
      } else {
        Alert.alert('Error', 'Failed to sign up. Please try again.');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((e) => e.message).join('\n');
        Alert.alert('Validation Error', errorMessages);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    const result = await loginWithGoogle();
    if (result) {
      console.log(result);
      refetch();
    } else {
      Alert.alert('Error', 'Failed to login');
    }
  };

  return (
    <SafeAreaView className="h-full flex flex-col w-full bg-accent-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 gap-8 justify-center px-6">
            <Image
              source={images.ibbenLogoFull}
              className="w-40 h-16 mx-auto"
              resizeMode="contain"
            />
            <Animated.View
              entering={FadeInUp.duration(500).delay(100)}
              className="mb-8 flex flex-col gap-8"
            >
              <View className="w-full text-center flex flex-col gap-2 items-center">
                <Text className="font-rubik text-black/80 text-2xl">
                  <Text className="font-rubik-bold text-primary-300">
                    Sign Up{' '}
                  </Text>
                  to your account
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInUp.duration(500).delay(200)}
              className="flex flex-col gap-4"
            >
              <View className="w-full">
                <Text className="font-rubik text-black/50 mb-2 text-xl">
                  Full Name
                </Text>
                <TextInput
                  className={`w-full h-14 border px-4 transition-all duration-100 rounded-2xl text-xl bg-white border-black/20 font-rubik text-black-300 ${
                    isFocused.fullName && 'border-2'
                  }`}
                  placeholder="Enter your full name"
                  placeholderTextColor="#8C8E98"
                  value={fullName}
                  onChangeText={setFullName}
                  keyboardType="default"
                  autoCapitalize="words"
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, fullName: true }))
                  }
                  onBlur={() =>
                    setIsFocused((prev) => ({ ...prev, fullName: false }))
                  }
                />
              </View>
              <View className="w-full">
                <Text className="font-rubik text-black/50 mb-2 text-xl">
                  Email
                </Text>
                <TextInput
                  className={`w-full h-14 border px-4 transition-all duration-100 rounded-2xl text-xl bg-white border-black/20 font-rubik text-black-300 ${
                    isFocused.email && 'border-2'
                  }`}
                  placeholder="Enter your email"
                  placeholderTextColor="#8C8E98"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, email: true }))
                  }
                  onBlur={() =>
                    setIsFocused((prev) => ({ ...prev, email: false }))
                  }
                />
              </View>
              <View className="w-full">
                <Text className="font-rubik text-black/50 mb-2 text-xl">
                  Password
                </Text>
                <TextInput
                  className={`w-full h-14 border px-4 transition-all duration-100 rounded-2xl text-xl bg-white border-black/20 font-rubik text-black-300 ${
                    isFocused.password && 'border-2'
                  }`}
                  placeholder="Enter your password"
                  placeholderTextColor="#8C8E98"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, password: true }))
                  }
                  onBlur={() =>
                    setIsFocused((prev) => ({ ...prev, password: false }))
                  }
                />
              </View>

              <Pressable
                className="self-end"
                onPress={() => {
                  /* Handle forgot password */
                }}
              >
                {({ pressed }) => (
                  <Text
                    className={`font-rubik-medium ${
                      pressed ? 'text-primary-400' : 'text-primary-300'
                    }`}
                  >
                    Forgot Password?
                  </Text>
                )}
              </Pressable>
            </Animated.View>

            <Animated.View
              entering={FadeInUp.duration(500).delay(300)}
              className="flex flex-col items-center justify-center"
            >
              <Pressable
                className="w-full"
                onPress={handleSignUp}
                disabled={isSubmitting}
              >
                {({ pressed }) => (
                  <View
                    className={`bg-primary-300 shadow-md shadow-zinc-300 rounded-2xl w-full py-4 ${
                      pressed ? 'opacity-90 transform scale-98' : ''
                    } ${isSubmitting ? 'opacity-50' : ''}`}
                  >
                    <Text className="font-rubik-medium text-center text-xl text-white">
                      {isSubmitting ? 'Signing up...' : 'Sign Up'}
                    </Text>
                  </View>
                )}
              </Pressable>

              <View className="w-full flex flex-row items-center justify-center gap-2 my-4 overflow-hidden px-6">
                <View className="w-full h-px bg-black/20"></View>
                <Text className="text-center text-black/40 text-lg px-2">
                  or
                </Text>
                <View className="w-full h-px bg-black/20"></View>
              </View>

              <Pressable onPress={handleLogin} className="w-full">
                {({ pressed }) => (
                  <View
                    className={`bg-white shadow-md shadow-zinc-300 border border-black/20 rounded-2xl w-full py-4 ${
                      pressed ? 'opacity-90 transform scale-98' : ''
                    }`}
                  >
                    <View className="flex-row items-center justify-center">
                      <Image source={icons.google} className="w-5 h-5" />
                      <Text className="text-xl font-rubik-medium ml-2 text-black-300">
                        Sign up with Google
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>
            </Animated.View>

            <Animated.View
              entering={FadeInUp.duration(500).delay(400)}
              className="flex-row justify-center items-center gap-6 mt-6"
            >
              <Pressable
                onPress={() => router.dismissAll()}
                className="flex flex-row items-center justify-center text-black-100 gap-2"
              >
                {({ pressed }) => (
                  <View
                    className={`flex-row items-center ${
                      pressed ? 'opacity-70' : ''
                    }`}
                  >
                    <Image source={icons.backArrow} className="w-6 h-6" />
                    <Text className="font-rubik text-black/40 text-xl">
                      Back
                    </Text>
                  </View>
                )}
              </Pressable>
              <View className="flex flex-row items-center justify-center">
                <Text className="font-rubik text-black/40 text-xl">
                  Already have an account?{' '}
                </Text>
                <Link href="/sign-in" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Text
                        className={`font-rubik-medium text-xl ${
                          pressed ? 'text-primary-400' : 'text-primary-300'
                        }`}
                      >
                        Sign In
                      </Text>
                    )}
                  </Pressable>
                </Link>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
