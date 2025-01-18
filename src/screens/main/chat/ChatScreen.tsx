import { BackgroundChat, ProfileIcon } from '@assets';
import { AppHeader } from '@components';
import { Spacing } from '@theme';
import React, { useState } from 'react';
import { FlatList, ImageBackground, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useChatScreen } from './ChatScreen.hook';
import { ControlBottomChat } from './components/ControlBottomChat';
import { ItemChat } from './components/ItemChat';

const ChatScreen = () => {
  const { messages, message, styles, handleSend: originalHandleSend, userInfo } = useChatScreen();
  const { bottom } = useSafeAreaInsets();
  const [repliedMessage, setRepliedMessage] = useState(null);

  const handleSwipeToReply = (item) => {
    console.log({ item });
    setRepliedMessage(item);
  };

  const handleSend = (newMessage) => {
    if (repliedMessage) {
      newMessage.repliedTo = repliedMessage;
      setRepliedMessage(null);
    }
    originalHandleSend(newMessage);
  };

  const renderMessage = ({ item }) => {
    return (
      <ItemChat
        item={item}
        userReceived={message.user}
        userSent={{
          name: userInfo?.fullname || '',
          id: userInfo?.id || '',
          avatar: userInfo?.avatar || '',
        }}
        onSwipeToReply={handleSwipeToReply}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={BackgroundChat} style={styles.background} />

      <KeyboardAvoidingView
        style={styles.containerList}
      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          style={styles.list}
          contentContainerStyle={styles.chatContainer}
          inverted
          ItemSeparatorComponent={() => <View style={{ height: Spacing.width16 }} />} // Add spacing between items
        />
        <ControlBottomChat onUpdateMessage={handleSend} repliedMessage={repliedMessage} />
      </KeyboardAvoidingView>
      <AppHeader style={styles.header} rightComponent={<TouchableOpacity>
        <ProfileIcon />
      </TouchableOpacity>} />
    </View>
  );
};

export default ChatScreen;
