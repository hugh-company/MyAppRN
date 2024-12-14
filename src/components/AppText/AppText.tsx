import { FontSize, FontWithFamily, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  variant?: 'default' | 'title' | 'subtitle' | 'caption';
}

const AppText: React.FC<AppTextProps> = ({ children, style, variant = 'default', ...props }) => {
  const { colors } = useTheme();
  const variantStyles = {
    default: styles.default,
    title: styles.title,
    subtitle: styles.subtitle,
    caption: styles.caption,
  };


  return (
    <Text style={[variantStyles[variant], { color: colors.text }, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,
  },
  title: {
    fontSize: FontSize.FontSize20,
    ...FontWithFamily.FontWithFamily_600,
  },
  subtitle: {
    fontSize: FontSize.FontSize16,
    ...FontWithFamily.FontWithFamily_500,
  },
  caption: {
    fontSize: FontSize.FontSize12,
    ...FontWithFamily.FontWithFamily_400,
  },
});

export default AppText;
