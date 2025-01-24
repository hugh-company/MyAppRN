import { BackgroundChat, ProfileIcon } from '@assets';
import { AppHeader } from '@components';
import { Spacing } from '@theme';
import { ChatInterface } from '@types';
import React from 'react';
import { FlatList, ImageBackground, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useChatScreen } from './ChatScreen.hook';
import { ControlBottomChat } from './components/ControlBottomChat';
import { ItemChat } from './components/ItemChat';
// KeyboardController.setInputMode(1);
const ChatScreen = () => {
  const { messages, handleSwipeToReply, repliedMessage, setRepliedMessage, message, styles, handleSend, userInfo } = useChatScreen();
  const { bottom } = useSafeAreaInsets();

  const renderMessage = ({ item }: { item: ChatInterface }) => {
    return (
      <ItemChat
        item={item}
        userReceived={message.user}
        isMe={item.userid === userInfo?.id}
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
        behavior={'padding'}
        style={styles.containerList}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderMessage}
          style={styles.list}
          contentContainerStyle={styles.chatContainer}
          inverted
          ItemSeparatorComponent={() => <View style={{ height: Spacing.width16 }} />} // Add spacing between items
        />

        <ControlBottomChat
          onUpdateMessage={handleSend}
          repliedMessage={repliedMessage}
          userReceived={message.user}
          onClearRepliedMessage={() => setRepliedMessage(null)}
        />
      </KeyboardAvoidingView>
      <AppHeader style={styles.header} rightComponent={<TouchableOpacity>
        <ProfileIcon />
      </TouchableOpacity>} />

    </View>
  );
};

export default ChatScreen;
