import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Chat = () => {
  const { chat_id } = useLocalSearchParams();
  return (
    <View>
      <Text>chat ID: {chat_id}</Text>
    </View>
  );
};

export default Chat;
