import { FontSize, FontWithFamily, ThemeColors, useTheme } from '@theme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  variant?: 'default' | 'title' | 'subtitle' | 'caption';
}

const AppText: React.FC<AppTextProps> = ({ children, style, variant = 'default', ...props }) => {
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  const variantStyles = {
    default: styles.default,
    title: styles.title,
    subtitle: styles.subtitle,
    caption: styles.caption,
  };


  return (
    <Text style={[variantStyles[variant], { color: themeColors.text }, style]} {...props}>
      {children}
    </Text>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    default: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
      color: themeColors.text,
    },
    title: {
      fontSize: FontSize.FontSize20,
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.text,
    },
    subtitle: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_500,
      color: themeColors.text,
    },
    caption: {
      fontSize: FontSize.FontSize12,
      ...FontWithFamily.FontWithFamily_400,
      color: themeColors.text,
    },
  });

export default AppText;
