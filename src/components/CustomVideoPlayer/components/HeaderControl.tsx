import { CloseIcon, LeftIcon, MuteIcon, SpeedIcon, UnmuteIcon } from '@assets';
import { Spacing, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ButtonAction } from './ButtonAction';

interface HeaderControlProps {
  isFullScreenVisible: boolean;
  goBackScreen: () => void;
  isMuted: boolean;
  toggleMute?: () => void;
  setSpeedVisible: (visible: boolean) => void;

}

export const HeaderControl = ({ goBackScreen, isFullScreenVisible, isMuted, toggleMute, setSpeedVisible }: HeaderControlProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { top, bottom } = useSafeAreaInsets();
  return (
    <>
      <View style={[styles.container, isFullScreenVisible && { paddingTop: top }]}>
        <TouchableOpacity style={styles.btnBack} onPress={goBackScreen}>
          {isFullScreenVisible ? <CloseIcon color="white" /> : <LeftIcon />}
        </TouchableOpacity>

        <View style={styles.viewOption}>
          <ButtonAction Icon={isMuted ? UnmuteIcon : MuteIcon} onPress={() => toggleMute?.()} style={styles.btnBack} />
          <ButtonAction Icon={SpeedIcon} onPress={() => setSpeedVisible(true)} style={styles.btnBack} />
        </View>
      </View>
    </>
  );
};

const createStyles = (themeColors: any) =>
  StyleSheet.create({
    container: {

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

    },
    btnBack: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      // backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

