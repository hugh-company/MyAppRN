import { LeftIcon } from '@assets';
import { Spacing, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderControlProps {

  goBackScreen: () => void;
  onMenuPress: () => void;
}

export const HeaderControl = ({ goBackScreen, onMenuPress }: HeaderControlProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <TouchableOpacity style={styles.btnBack} onPress={goBackScreen}>
        <LeftIcon />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.btnBack} onPress={onMenuPress}>
        <DotsIcon />
      </TouchableOpacity> */}
    </View>
  );
};

const createStyles = (themeColors: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: Spacing.width16,
      left: Spacing.width16,
      right: Spacing.width16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnBack: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

