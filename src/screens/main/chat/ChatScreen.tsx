import { BASE_IMAGE_URL } from '@api';
import { BackgroundChat } from '@assets';
import { AppHeader, AppImage, ControlBottomChat } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { Spacing } from '@theme';
import { MessageItemInterface } from '@types';
import React from 'react';
import { FlatList, ImageBackground, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useChatScreen } from './ChatScreen.hook';
import { ItemChat } from './components/ItemChat';
// KeyboardController.setInputMode(1);
export const ChatScreen = () => {
  const { messages, handleSwipeToReply, repliedMessage, setRepliedMessage, themeColors, flatListRef, message, styles, handleSend, userInfo, scrollToRepliedMessage, loading } = useChatScreen();
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
  console.log({ message }, `${BASE_IMAGE_URL}${message?.other_user?.avatar}`);

  return (
    <View style={styles.container}>
      <ImageBackground source={BackgroundChat} style={styles.background} />
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.containerList}
      >
        {!loading && <FlatList
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

        />}

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
        title={message?.other_user?.fullname || ''}
        titleStyle={styles.title}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigate(SCREEN_ROUTE.DETAIL_USER, {
              user: {
                ...message?.other_user,
              },
            })} style={styles.iconProfile}>

            <AppImage uri={message?.other_user?.avatar} style={styles.avatar} />
            <View style={styles.status} />
          </TouchableOpacity>}
      />

    </View>
  );
};

