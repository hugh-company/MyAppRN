import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface AppHeaderProps {
  title: string;
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
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  return (
    <View style={[styles.container, style]}>
      {leftComponent}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {rightComponent}
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: 56,
      backgroundColor: themeColors.background,
      justifyContent: 'center',
      paddingHorizontal: Spacing.width16,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_500,
      color: themeColors.text,
    },
  });
