import { useTheme } from '@theme';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import ChatInput from './components/ChatInput';
import { createStyles } from './styles';
export interface AppListChatProps { }
const AppListChat = ({ }: AppListChatProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = (message: any) => {
    setMessages((prev) => [...prev, message]);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => <View>{/* Hiển thị tin nhắn */}</View>}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        inverted
      />
      <ChatInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
};

export default AppListChat;
