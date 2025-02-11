import { Spacing, ThemeColors } from '@theme';
import { MessageItemInterface, OtherUser } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { MessageReceived } from './MessageReceived';
import { MessageSent } from './MessageSent';
export interface ItemChatProps {
  item: MessageItemInterface;
  userSent: OtherUser,
  userReceived: OtherUser
  onSwipeToReply: (item: MessageItemInterface) => void;
  isMe?: boolean;
  onGoToRepliedMessage?: (item: MessageItemInterface) => void;
}

export function ItemChat(props: ItemChatProps) {
  const { item, onSwipeToReply, isMe } = props;
  const userSent = props.userSent;
  const userReceived = props.userReceived;

  if (isMe) {
    return <MessageSent
      onGoToRepliedMessage={props.onGoToRepliedMessage}
      userSent={userSent}
      userReceived={userReceived}
      item={item}
      handleReply={onSwipeToReply} />;
  } else {
    return <MessageReceived
      onGoToRepliedMessage={props.onGoToRepliedMessage}
      userSent={userSent} userReceived={userReceived} item={item} handleReply={onSwipeToReply} />;
  }
}
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  animatedMessageContainer: {
    maxWidth: '80%',


    alignSelf: 'flex-start',


  },
  messageSent: {
    alignSelf: 'flex-end',

  },
  avatar: {
    width: Spacing.width48,
    height: Spacing.width48,
    borderRadius: Spacing.width16,
  },
  status: {
    width: Spacing.width15,
    height: Spacing.width15,
    borderRadius: Spacing.width15,
    backgroundColor: themeColors.active,
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 2,
    borderColor: themeColors.whiteColor,
  },
  messageReceived: {
    alignSelf: 'flex-start',

  },
  senderName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  timestampContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#ccc',
  },
  readStatus: {
    fontSize: 12,
    color: '#ccc',
  },
});
