import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import icons from '@/constants/icons';
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { logout } from '@/lib/appwrite';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity
    className="flex-row flex justify-between items-center py-3"
    onPress={onPress}
  >
    <View className="flex-row flex items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result) {
        Alert.alert('Success', 'Logout successful');
        refetch();
      } else {
        Alert.alert('Error', 'Logout failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during logout');
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        contentContainerClassName=" pb-32 px-7"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex justify-between items-center">
          <Text className="text-xl font-rubik-bold ">Profile</Text>
          <Image source={icons.bell} className="size-5" resizeMode="contain" />
        </View>
        <View className="flex-row flex justify-center mt-5">
          <View className="flex-col flex relative mt-5 items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>
        <View className="flex-col flex mt-10">
          <SettingsItem
            icon={icons.calendar}
            title="My Bookings"
            onPress={() => {}}
          />
          <SettingsItem
            icon={icons.wallet}
            title="My Wallet"
            onPress={() => {}}
          />
        </View>
        <View className="flex-col flex mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>
        <View className="flex-col flex mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            onPress={handleLogout}
            textStyle="text-danger"
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
