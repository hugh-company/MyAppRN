import { BackgroundChat, ScrollTopIcon } from '@assets';
import { AppHeader, AppImage, ControlBottomChat } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { HeightScreen, Spacing } from '@theme';
import { MessageItemInterface } from '@types';
import React from 'react';
import { FlatList, ImageBackground, RefreshControl, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useChatScreen } from './ChatScreen.hook';
import { ItemChat } from './components/ItemChat';
// KeyboardController.setInputMode(1);
export const ChatScreen = () => {
  const { messages, handleSwipeToReply, repliedMessage,
    setRepliedMessage, themeColors, flatListRef, thread,
    styles, handleSend, userInfo, scrollToRepliedMessage, loading,
    handleLoadMoreMessages, is_next, isLoadMore, otherUser } = useChatScreen();
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);

  const renderMessage = ({ item }: { item: MessageItemInterface }) => {
    return (
      <ItemChat
        item={item}
        isMe={item.recipient_id !== userInfo?.id}
        userSent={userInfo}
        onGoToRepliedMessage={(vale) => scrollToRepliedMessage(vale)}
        userReceived={otherUser}
        onSwipeToReply={handleSwipeToReply}
      />
    );
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(offsetY > HeightScreen);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={BackgroundChat} style={styles.background} >
        <AppHeader
          style={[styles.header, { backgroundColor: themeColors.primary }]}
          title={otherUser?.fullname || ''}
          titleStyle={styles.title}
          rightComponent={
            <TouchableOpacity
              onPress={() => navigate(SCREEN_ROUTE.DETAIL_USER, {
                user: {
                  ...otherUser,
                },
              })} style={styles.iconProfile}>

              <AppImage uri={otherUser?.avatar} style={styles.avatar} />
              {thread.other_user.online && <View style={styles.status} />}
            </TouchableOpacity>}
        />
        <KeyboardAvoidingView
          behavior={'padding'}
          style={styles.containerList}
        >
          {!loading && <FlatList
            data={messages}
            ref={flatListRef}
            refreshControl={<RefreshControl
              refreshing={isLoadMore || false}
              onRefresh={() => handleLoadMoreMessages()}
              colors={[themeColors.primary]}
            />}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={renderMessage}
            style={styles.list}
            contentContainerStyle={styles.chatContainer}
            inverted
            onEndReached={() => {
              if (loading || !thread?.thread_id || !is_next) { return; }
              handleLoadMoreMessages();
            }}
            ItemSeparatorComponent={() => <View style={{ height: Spacing.width16 }} />} // Add spacing between items
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={100}
            onEndReachedThreshold={0.5}
            onScroll={handleScroll}
          />}
          {showScrollToTop && (
            <TouchableOpacity onPress={scrollToTop} style={styles.btnScrollToTop} >
              <ScrollTopIcon />
            </TouchableOpacity>
          )}
          {!loading && <ControlBottomChat
            onUpdateMessage={handleSend}
            repliedMessage={repliedMessage || undefined}
            userSent={{
              name: userInfo?.fullname || '',
              id: userInfo?.id || '',
              avatar: userInfo?.avatar || '',
            }}
            userReceived={thread.other_user}
            onClearRepliedMessage={() => setRepliedMessage(null)}
          />}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

