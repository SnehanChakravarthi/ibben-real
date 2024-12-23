import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { router, Tabs, useNavigation } from 'expo-router';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const Header = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();

  return (
    <SafeAreaView className="w-full  absolute top-2 z-50 px-3">
      <View className="flex-row justify-between items-center px-2">
        <Pressable
          className="size-11 bg-white border border-accent-200 rounded-full items-center justify-center shadow-sm"
          onPress={() => {}}
        >
          <Image source={icons.bell} className="size-5 opacity-70" />
        </Pressable>
        <Pressable
          onPress={() => navigation.openDrawer()}
          className="flex-row items-center bg-white border border-accent-300 rounded-full w-auto shadow-sm"
        >
          <Image source={images.avatar} className="size-14 rounded-full" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const TabIcon = ({
  focused,
  icon,
  color,
}: {
  focused: boolean;
  icon: any;
  color: string;
}) => {
  return (
    <View className="items-center justify-center mt-4">
      <Image
        source={icon}
        tintColor={color}
        resizeMode="contain"
        className="size-10"
      />
    </View>
  );
};

const NewChatButton = ({
  focused,
  onPress,
}: {
  focused: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress} className="flex-1 w-full">
      <View
        className={`bg-primary-300 flex-row items-center w-full flex flex-1 justify-center px-1 py-3 gap-3 rounded-full 
        ${focused ? 'opacity-90' : 'opacity-100'}`}
      >
        <Image
          source={icons.chat}
          resizeMode="contain"
          className="size-8"
          tintColor="#FBF8F0"
        />
      </View>
    </Pressable>
  );
};

const TabsLayout = () => {
  return (
    <View className="flex-1">
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#F2E1C9',
            height: 90,
            paddingHorizontal: 8,
            paddingTop: 10,
            position: 'absolute',
            bottom: 0,
            elevation: 5,
            shadowOpacity: 0.05,
            shadowRadius: 4,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          tabBarItemStyle: {
            padding: 0,
          },
          tabBarActiveTintColor: '#2B5C18',
          tabBarInactiveTintColor: '#8C8E98',
          tabBarButton: (props) => (
            <Pressable
              {...props}
              className={`flex-1 items-center justify-center ${
                props.accessibilityState?.selected
                  ? 'opacity-100'
                  : 'opacity-70'
              }`}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} icon={icons.home} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat/[chat_id]"
          options={({ navigation }) => ({
            title: 'New Chat',
            tabBarButton: (props) => (
              <NewChatButton
                focused={props.accessibilityState?.selected ?? false}
                onPress={() => router.push('/chat/new')}
              />
            ),
          })}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} icon={icons.person} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
