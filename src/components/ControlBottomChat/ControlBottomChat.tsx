import { CloseIcon, SendMessageIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { getGameTrendingLocal } from '@redux';
import { Spacing, useTheme } from '@theme';
import { ItemListProduct, MessageItemInterface } from '@types';
import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { ListStickers } from './blocks/ListStickers';
import { RepliedMessage } from './blocks/RepliedMessage';
import { SelectOption } from './blocks/SelectOption';
import { createStyles } from './styles';

interface paramSendMessage {
  images?: string[];
  message?: string;
  games?: any[];
  sticker?: string;

}
export interface ControlBottomChatProps {
  onUpdateMessage: (data: paramSendMessage) => void;
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
  const [gameSelected, setGameSelected] = useState<ItemListProduct | null>(null);
  const [showIcons, setShowIcons] = useState(true);
  const [isShowStickers, setIsShowStickers] = useState(false);
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (isShowGame) { setGameSelected(null); }
  }, [isShowGame]);

  const handleSend = (
    params?: paramSendMessage
  ) => {
    onUpdateMessage({ images: [], message, games: gameSelected ? [gameSelected] : [], sticker: params?.sticker });
    setMessage('');
    setIsInputFocused(false);
    setShowIcons(true);
    setGameSelected(null); // Clear selected game
    setIsShowGame(false);  // Hide game selection
    onClearRepliedMessage && onClearRepliedMessage();
  };

  const handleSelectGame = (game: any) => {
    setMessage(t('message.template_message_chat_game').replace('GAME', `"${game.title}"`));
    setGameSelected(game);
    setShowIcons(false);
  };

  const handleShowIcons = () => {
    setShowIcons(true);
    setIsInputFocused(false);
  };


  const handleInputFocus = () => {
    if (!isInputFocused) {
      setIsInputFocused(true);
      setShowIcons(false);
      setIsShowStickers(false); // Hide sticker list
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    setShowIcons(true);
  };

  const handleShowStickers = () => {
    Keyboard.dismiss();
    setIsShowStickers(!isShowStickers);
    setIsInputFocused(false);
  };



  const handleSelectImage = async () => {
    const options: ImageLibraryOptions = { mediaType: 'photo', selectionLimit: 1 };
    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        const listImage = response.assets.map((item) => item.uri);
        if (onUpdateMessage && listImage.length > 0) {
          onUpdateMessage({ images: listImage.filter((uri): uri is string => !!uri) });
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
    <View style={[styles.container, !isShowStickers && { paddingBottom: Spacing.width16 }]}>
      {repliedMessage && renderRepliedMessage()}
      {isShowGame && renderGame()}
      <View style={[styles.viewInput]}>
        <SelectOption
          onSticker={() => {
            handleShowStickers();
          }}
          onGame={() => { setIsShowGame(!isShowGame); }}
          onImage={() => { handleSelectImage(); }}
          isShowGame={isShowGame}
          isAll={showIcons}
          handleShowIconsAll={handleShowIcons} />
        <TextInput
          ref={inputRef}
          style={[styles.input, isInputFocused && styles.inputFocused]}
          placeholder="Viết tin nhắn ở đây..."
          placeholderTextColor={themeColors.disable}
          value={message}
          onChangeText={setMessage}
          onPressIn={handleInputFocus}
          onSubmitEditing={() => handleSend()}
          onBlur={handleInputBlur}
          textAlignVertical="center" // Vertically center text
          multiline // Enable multiple lines
        />
        {(message?.length > 0 || gameSelected) && <TouchableOpacity style={styles.iconButton} onPress={() => handleSend()}>
          <SendMessageIcon />
        </TouchableOpacity>}

      </View>
      {isShowStickers && <ListStickers isVisible={isShowStickers} onSelectSticker={(sticker) => { handleSend({ sticker: sticker }); }} />}

    </View>
  );
}

