import { GameHandleIcon, GlobalIcon, UploadImageIcon } from '@assets';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export interface ControlBottomChatProps {
  onUpdateMessage: (message: string) => void;
  repliedMessage?: any;
}

export function ControlBottomChat(props: ControlBottomChatProps) {
  const { onUpdateMessage, repliedMessage } = props;
  const [message, setMessage] = React.useState('');
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { bottom } = useSafeAreaInsets();
  const handleSend = () => {
    onUpdateMessage(message);
    setMessage('');
  };
  return (

    <View style={[styles.container, { paddingBottom: bottom || Spacing.width16 }]}>
      <TouchableOpacity style={styles.iconButton}>
        <GlobalIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <UploadImageIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <GameHandleIcon width={Spacing.width32} height={Spacing.width32} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Viết tin nhắn ở đây..."
        placeholderTextColor={themeColors.disable}
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={handleSend}
      />
    </View>
  );
}
export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingVertical: Spacing.width10,
      paddingHorizontal: Spacing.width16,
      borderTopWidth: 1,
      borderTopColor: 'rgba(41,41,41,1)',
      position: 'absolute',
      bottom: 0,
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
      borderRadius: Spacing.height48,
      height: Spacing.height48,
      paddingHorizontal: Spacing.width12,
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_400,
      marginLeft: Spacing.width16,
      color: themeColors.whiteColor,
    },
  });
