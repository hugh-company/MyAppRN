import { LeftIcon } from '@assets';
import { AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { chapterEpisodeInterface } from '@types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export interface ControlNextStepProps {
  onNextStep: () => void;
  onPrevStep: () => void;
  name: string;
  data?: chapterEpisodeInterface[];
  currentIndex: number; // Add currentIndex prop
}

export function ControlNextStep(props: ControlNextStepProps) {
  const { name, onNextStep, onPrevStep, data, currentIndex } = props; // Destructure currentIndex
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginBottom: bottom || Spacing.width16 }]}>
      <TouchableOpacity
        style={[styles.btn, currentIndex === 0 && styles.btnDisabled]}
        onPress={onPrevStep}
        disabled={currentIndex === 0}
      >
        <LeftIcon />
      </TouchableOpacity>
      <AppText style={styles.txtName}>{name}</AppText>
      <TouchableOpacity
        style={[styles.btn, data && currentIndex === data.length - 1 && styles.btnDisabled]}
        onPress={onNextStep}
        disabled={data && currentIndex === data.length - 1}
      >
        <LeftIcon style={{ transform: [{ scaleX: -1 }] }} />
      </TouchableOpacity>
    </View>
  );
}
export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '90%',
      alignSelf: 'center',
      backgroundColor: themeColors.background,
      borderRadius: Spacing.width100,
      paddingHorizontal: Spacing.width16,
      paddingVertical: Spacing.width8,
      gap: Spacing.width16,
      minHeight: Spacing.width56,
    },
    btn: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnDisabled: {
      opacity: 0.5,
    },
    txtName: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_500,

      alignItems: 'center',
      maxWidth: '70%',
    },
  });
