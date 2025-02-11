import { CloseIcon, GameHandleIcon, GlobalIcon, RightIcon, SendMessageIcon, UploadImageIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { getGameTrendingLocal } from '@redux';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { MessageItemInterface } from '@types';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RepliedMessage } from './RepliedMessage';

export interface ControlBottomChatProps {
  onUpdateMessage: (data: { images?: string[]; message?: string; games?: any[] }) => void;
  repliedMessage?: MessageItemInterface;
  onClearRepliedMessage?: () => void;
  userReceived?: any;
  userSent?: any;
}

export function ControlBottomChat(props: ControlBottomChatProps) {
  const { onUpdateMessage, repliedMessage, userReceived, userSent, onClearRepliedMessage } = props;
  const [message, setMessage] = useState('');
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const games = useSelector(getGameTrendingLocal);
  const [isShowGame, setIsShowGame] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [gameSelected, setGameSelected] = useState(null);
  const [showIcons, setShowIcons] = useState(true);
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (isShowGame) { setGameSelected(null); }
  }, [isShowGame]);

  const handleSend = () => {
    onUpdateMessage({ images: [], message, games: gameSelected ? [gameSelected] : [] });
    setMessage('');
    setIsInputFocused(false);
    setShowIcons(true);
    setGameSelected(null); // Clear selected game
    setIsShowGame(false);  // Hide game selection
    onClearRepliedMessage && onClearRepliedMessage();
  };

  const handleSelectGame = (game: any) => setGameSelected(game);

  const handleShowIcons = () => {
    setShowIcons(true);
    setIsInputFocused(false);
  };

  const handleInputFocus = () => {
    if (!isInputFocused) {
      setIsInputFocused(true);
      setShowIcons(false);
      // inputRef.current?.focus();

    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    setShowIcons(true);

  };

  const animatedSendStyle = useAnimatedStyle(() => ({
    transform: [{ scale: message.length > 0 || gameSelected ? withSpring(1, { damping: 15 }) : withSpring(0, { damping: 15 }) }],
    opacity: message.length > 0 || gameSelected ? withTiming(1, { duration: 200 }) : withTiming(0, { duration: 200 }),
    display: message.length > 0 || gameSelected ? 'flex' : 'none',
  }));

  const iconsAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: isInputFocused ? withTiming(-100, { duration: 0 }) : withTiming(0, { duration: 0 }) }],
    width: isInputFocused ? withTiming(0, { duration: 0 }) : withTiming(Spacing.width120, { duration: 0 }),
    opacity: isInputFocused ? withTiming(0, { duration: 0 }) : withTiming(1, { duration: 0 }),
  }));

  const handleSelectImage = async () => {
    const options: ImageLibraryOptions = { mediaType: 'photo', selectionLimit: 1 };
    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        const listImage = response.assets.map((item) => item.uri);
        if (onUpdateMessage && listImage.length > 0) {
          onUpdateMessage({ images: listImage });
          setMessage(''); // Clear message
          setGameSelected(null); // Clear selected game
          setIsShowGame(false);  // Hide game selection
        }
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectGame(item)} style={{ marginLeft: Spacing.width16 }}>
      <AppImage uri={item.feature?.path} style={styles.itemImageGame} />
      <View style={styles.viewName}>
        <AppText style={styles.txtNameGame}>{item?.title}</AppText>
      </View>
    </TouchableOpacity>
  );

  const renderGame = () => (
    gameSelected ? (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: Spacing.width16 }}>
          <AppImage uri={gameSelected.feature?.path} style={styles.imageGameSelect} />
          <TouchableOpacity onPress={() => setGameSelected(null)} style={styles.btnClose}>
            <CloseIcon size={Spacing.width16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <FlatList
        style={styles.listGame}
        data={games}
        keyboardShouldPersistTaps={'handled'}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem} horizontal />
    )
  );

  const renderRepliedMessage = () => (
    <RepliedMessage
      message={repliedMessage || null}
      userReceived={userReceived}
      isMe={repliedMessage?.recipient_id !== userSent.id}
      onClose={onClearRepliedMessage} />
  );

  return (
    <View style={[styles.container, { paddingBottom: Spacing.width16 }]}>
      {repliedMessage && renderRepliedMessage()}
      {isShowGame && renderGame()}
      <View style={[styles.viewInput]}>
        <Animated.View style={[styles.iconsContainer, iconsAnimationStyle]}>
          <TouchableOpacity
            disabled={isShowGame}
            style={styles.iconButton}>
            <GlobalIcon color={isShowGame ? themeColors.disable : themeColors.colorMain4} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isShowGame}
            onPress={handleSelectImage} style={styles.iconButton}>
            <UploadImageIcon color={isShowGame ? themeColors.disable : themeColors.colorMain4} />
          </TouchableOpacity>
          {/* {!gameSelected && ( */}
          <TouchableOpacity
            disabled={!!gameSelected}
            hitSlop={
              { top: 10, bottom: 10, left: 10, right: 10 }
            } onPress={() => setIsShowGame(!isShowGame)} style={[styles.iconButton]}>
            <GameHandleIcon width={Spacing.width32} height={Spacing.width32} color={gameSelected ? themeColors.disable : themeColors.colorMain4} />
          </TouchableOpacity>
          {/* )} */}
        </Animated.View>
        {!showIcons && (
          <TouchableOpacity onPress={handleShowIcons} style={[styles.iconButton, { width: Spacing.width30 }]}>
            <RightIcon />
          </TouchableOpacity>
        )}
        <TextInput
          ref={inputRef}
          style={[styles.input, isInputFocused && styles.inputFocused]}
          placeholder="Viết tin nhắn ở đây..."
          placeholderTextColor={themeColors.disable}
          value={message}
          onChangeText={setMessage}
          onPressIn={handleInputFocus}
          onSubmitEditing={handleSend}
          onBlur={handleInputBlur}
          textAlignVertical="center" // Vertically center text
          multiline // Enable multiple lines
        />
        <Animated.View style={[styles.iconButton, animatedSendStyle]}>
          <TouchableOpacity onPress={handleSend}>
            <SendMessageIcon />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingTop: Spacing.width16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(41,41,41,1)',
      gap: Spacing.width16,
      minHeight: Spacing.height86,

    },
    viewInput: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.width16,
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: Spacing.width30,
    },
    iconButton: {
      width: Spacing.width40,
      height: Spacing.width30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      backgroundColor: 'rgba(41,41,41,1)',
      borderRadius: Spacing.height24,
      minHeight: Spacing.height48,
      paddingHorizontal: Spacing.width12,
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_400,
      marginLeft: Spacing.width16,
      color: themeColors.whiteColor,
      maxHeight: Spacing.height48 * 3,
      paddingTop: Platform.OS === 'android' ? undefined : Spacing.width16,
      paddingVertical: Spacing.width8,
    },
    inputFocused: {
      marginLeft: 0,
    },
    listGame: {
      height: Spacing.width112,
    },
    itemImageGame: {
      width: Spacing.width112,
      height: Spacing.width112,
      borderRadius: Spacing.width8,
    },
    imageGameSelect: {
      width: Spacing.width64,
      height: Spacing.width64,
      borderRadius: Spacing.width8,
    },
    viewName: {
      position: 'absolute',
      bottom: Spacing.width8,
      left: Spacing.width8,
      right: Spacing.width8,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: Spacing.width4,
    },
    txtNameGame: {
      color: themeColors.whiteColor,
      ...FontWithFamily.FontWithFamily_400,
      fontSize: FontSize.FontSize12,
      textAlign: 'center',
    },
    btnClose: {
      position: 'absolute',
      top: -Spacing.width8,
      right: -Spacing.width8,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: Spacing.width24,
      height: Spacing.width24,
      borderRadius: Spacing.width12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
