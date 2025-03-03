import { LeftIcon } from '@assets';
import { goBack } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../AppText';

interface AppHeaderProps {
  title?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  onBack?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  leftComponent,
  rightComponent,
  onLeftPress,
  onRightPress,
  style,
  titleStyle,
  onBack,
}) => {
  const { themeColors } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);

  return (
    <>
      <Animated.View style={[styles.container, { paddingTop: top + Spacing.height8 || Spacing.width16 }, style]}>
        <View style={styles.flex1}>
          {leftComponent ? leftComponent : <TouchableOpacity onPress={() => onBack ? onBack() : goBack()} style={styles.btnBack}>
            <LeftIcon />
          </TouchableOpacity>}
          {title && <AppText style={[styles.title, titleStyle]} numberOfLines={1}>{title}</AppText>}
        </View>
        {rightComponent}
      </Animated.View>
    </>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      // height: Platform.OS === 'android' ? Spacing.height64 : undefined,
      paddingHorizontal: Spacing.width16,
      backgroundColor: 'transparent',
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: Spacing.width8,
      top: 0,
      left: 0,
      right: 0,

    },

    title: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_500,
      color: themeColors.text,


    },
    btnBack: {
      width: Spacing.width35,
      height: Spacing.width35,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flex1: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: Spacing.width16,
    },
  });
