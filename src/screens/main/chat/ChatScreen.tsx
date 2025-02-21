import { BackgroundChat, ProfileIcon } from '@assets';
import { AppHeader } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { Spacing } from '@theme';
import { MessageItemInterface } from '@types';
import React from 'react';
import { FlatList, ImageBackground, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useChatScreen } from './ChatScreen.hook';
import { ControlBottomChat } from './components/ControlBottomChat';
import { ItemChat } from './components/ItemChat';
// KeyboardController.setInputMode(1);
const ChatScreen = () => {
  const { messages, handleSwipeToReply, repliedMessage, setRepliedMessage, themeColors, flatListRef, message, styles, handleSend, userInfo, scrollToRepliedMessage } = useChatScreen();
  const { bottom } = useSafeAreaInsets();

  const renderMessage = ({ item }: { item: MessageItemInterface }) => {
    return (
      <ItemChat
        item={item}
        isMe={item.recipient_id !== userInfo?.id}
        userSent={userInfo}
        onGoToRepliedMessage={(vale) => scrollToRepliedMessage(vale)}
        userReceived={message.other_user}
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
          ref={flatListRef}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderMessage}
          style={styles.list}
          contentContainerStyle={styles.chatContainer}
          inverted
          ListFooterComponent={() => <View style={{ height: Spacing.height100 }} />}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.width16 }} />} // Add spacing between items
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={100}
          onEndReachedThreshold={0.5}

        />

        <ControlBottomChat
          onUpdateMessage={handleSend}
          repliedMessage={repliedMessage || undefined}
          userSent={{
            name: userInfo?.fullname || '',
            id: userInfo?.id || '',
            avatar: userInfo?.avatar || '',
          }}
          userReceived={message.other_user}
          onClearRepliedMessage={() => setRepliedMessage(null)}
        />
      </KeyboardAvoidingView>
      <AppHeader
        style={[styles.header, { backgroundColor: themeColors.primary }]}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigate(SCREEN_ROUTE.DETAIL_USER, {
              user: {
                ...message?.other_user,
              },
            })} style={styles.iconProfile}>
            <ProfileIcon />
          </TouchableOpacity>}
      />

    </View>
  );
};

export default ChatScreen;
