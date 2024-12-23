import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // 75% of screen width

export default function Index() {
  return (
    <SafeAreaView className="bg-accent-100 h-full">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8"
      >
        {/* Top Decorative Elements */}
        <View className="absolute top-0 right-0 w-80 h-80 bg-primary-100 rounded-full -translate-y-32 translate-x-20 opacity-40" />
        <View className="absolute top-0 left-0 w-40 h-40 bg-accent-200 rounded-full -translate-y-20 -translate-x-20 opacity-30" />

        {/* Main Content */}
        <View className="px-5">
          {/* AI Assistant Section */}
          <View className="mt-10">
            <Text className="text-[42px] font-rubik-bold text-black-300 leading-tight">
              Hello, I'm{'\n'}
              <Text className="text-primary-300">Lena</Text>
            </Text>
            <Text className="text-base font-rubik text-black-100 mt-3 leading-relaxed max-w-[85%]">
              Your personal AI guardian, here to assist and guide you through
              your guardianship journey.
            </Text>
          </View>

          {/* Quick Actions */}
          <View className="mt-12 flex-row w-full justify-between gap-4">
            <TouchableOpacity
              className="w-auto flex-1 bg-white border border-accent-200 p-5 rounded-3xl shadow-sm"
              activeOpacity={0.7}
            >
              <View className="bg-accent-100 size-14 rounded-2xl items-center justify-center mb-4">
                <Text className="text-3xl">💭</Text>
              </View>
              <Text className="font-rubik-medium text-black-300 text-base leading-tight">
                Start{'\n'}Chat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-auto flex-1 bg-primary-100 border border-primary-200 p-5 rounded-3xl shadow-sm"
              activeOpacity={0.7}
            >
              <View className="bg-white size-14 rounded-2xl items-center justify-center mb-4">
                <Text className="text-3xl">📚</Text>
              </View>
              <Text className="font-rubik-medium text-black-300 text-base leading-tight">
                Learn{'\n'}Basics
              </Text>
            </TouchableOpacity>
          </View>

          {/* Featured Topics */}
          <View className="mt-12">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-rubik-bold text-black-300">
                Featured Topics
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-primary-300 font-rubik-medium">
                  Browse All
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-4 pb-2"
              className="-mx-5 px-5"
              snapToInterval={CARD_WIDTH + 16} // card width + gap
              decelerationRate="fast"
            >
              <TouchableOpacity
                className="bg-white border border-accent-200 p-5 rounded-3xl shadow-sm"
                style={{ width: CARD_WIDTH }}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center mb-4">
                  <View className="bg-primary-100 p-3 rounded-xl">
                    <Text className="text-2xl">👥</Text>
                  </View>
                  <Text className="font-rubik-medium text-black-300 text-lg ml-4">
                    Guardianship
                  </Text>
                </View>
                <Text className="text-black-100 font-rubik text-base leading-relaxed">
                  Learn about the fundamentals of guardianship and its
                  importance
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white border border-accent-200 p-5 rounded-3xl shadow-sm"
                style={{ width: CARD_WIDTH }}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center mb-4">
                  <View className="bg-accent-100 p-3 rounded-xl">
                    <Text className="text-2xl">📋</Text>
                  </View>
                  <Text className="font-rubik-medium text-black-300 text-lg ml-4">
                    Application
                  </Text>
                </View>
                <Text className="text-black-100 font-rubik text-base leading-relaxed">
                  Step-by-step guide to applying for guardianship
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Recent Activity */}
          <View className="mt-12">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-rubik-bold text-black-300">
                Recent Activity
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-primary-300 font-rubik-medium">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="bg-white border border-accent-200 rounded-3xl p-4 shadow-sm">
              <TouchableOpacity
                className="flex-row items-center py-3.5"
                activeOpacity={0.7}
              >
                <View className="size-12 bg-primary-100 rounded-full items-center justify-center">
                  <Text className="text-2xl">💬</Text>
                </View>
                <View className="ml-4 flex-1">
                  <Text className="font-rubik-medium text-black-300 text-base">
                    Understanding Rights
                  </Text>
                  <Text className="text-xs font-rubik text-black-100 mt-1">
                    Last chat • 2 hours ago
                  </Text>
                </View>
                <View className="bg-accent-100 p-2.5 rounded-full">
                  <Text className="font-rubik-bold text-primary-300 text-lg">
                    →
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="h-[1px] bg-accent-200 my-1.5" />

              <TouchableOpacity
                className="flex-row items-center py-3.5"
                activeOpacity={0.7}
              >
                <View className="size-12 bg-accent-100 rounded-full items-center justify-center">
                  <Text className="text-2xl">📝</Text>
                </View>
                <View className="ml-4 flex-1">
                  <Text className="font-rubik-medium text-black-300 text-base">
                    Documentation Guide
                  </Text>
                  <Text className="text-xs font-rubik text-black-100 mt-1">
                    Last read • Yesterday
                  </Text>
                </View>
                <View className="bg-accent-100 p-2.5 rounded-full">
                  <Text className="font-rubik-bold text-primary-300 text-lg">
                    →
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
