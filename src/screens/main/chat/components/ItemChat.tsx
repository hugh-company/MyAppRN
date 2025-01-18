import { Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { MessageReceived } from './MessageReceived';
import { MessageSent } from './MessageSent';
export interface ItemChatProps {
  item: any;
  userSent: {
    id: string | number;
    name: string;
    avatar: string;
  },
  userReceived: {
    id: string | number;

    name: string;
    avatar: string;
  };
  onSwipeToReply: (item: any) => void;
}

export function ItemChat(props: ItemChatProps) {
  const { item, onSwipeToReply } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const userSent = props.userSent;
  const userReceived = props.userReceived;
  console.log({ userReceived });

  if (item.isSentByMe) {
    return <MessageSent user={userSent} item={item} handleReply={onSwipeToReply} />;
  } else {
    return <MessageReceived user={userReceived} item={item} handleReply={onSwipeToReply} />;
  }

  // return (
  //   <View style={[styles.container, item.isSentByMe ? styles.messageSent : styles.messageReceived]}>
  //     <View>
  //       <AppImage style={styles.avatar} uri={item.isSentByMe ? userSent?.avatar : userReceived?.avatar} />
  //       <View style={styles.status} />
  //     </View>
  //     <View
  //       style={[
  //         styles.animatedMessageContainer,
  //       ]}
  //     >
  //       {!item.isSentByMe && (
  //         <AppText style={styles.senderName}>{item.sender}</AppText>
  //       )}
  //       <AppText style={styles.messageText}>{item.text}</AppText>
  //       <View style={styles.timestampContainer}>
  //         <AppText style={styles.timestamp}>{item.timestamp}</AppText>
  //         {item.isSentByMe && item.read && (
  //           <AppText style={styles.readStatus}> · Read</AppText>
  //         )}
  //       </View>
  //     </View>
  //   </View>
  // );
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
