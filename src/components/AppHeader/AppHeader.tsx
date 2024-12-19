import { LeftIcon } from '@assets';
import { goBack } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
  title?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  leftComponent,
  rightComponent,
  onLeftPress,
  onRightPress,
  style,
  titleStyle,
}) => {
  const { themeColors } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  return (
    <View style={[styles.container, style, { marginTop: top }]}>
      {leftComponent ? leftComponent : <TouchableOpacity onPress={() => goBack()} style={styles.btnBack}>
        <LeftIcon />
      </TouchableOpacity>}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {rightComponent}
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: Spacing.height56,
      paddingHorizontal: Spacing.width16,
      backgroundColor: 'transparent',
      alignItems: 'center',
      flexDirection: 'row',

    },

    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_500,
      color: themeColors.text,
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
