import { FontSize, FontWithFamily, Spacing } from '@theme';
import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../AppText';

interface AppButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'delete' | 'cancel';
  size?: 'small' | 'medium' | 'large';
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  onPress,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSequence(
            withSpring(0.95, { damping: 10, stiffness: 100 }),
            withSpring(1, { damping: 10, stiffness: 100 })
          ),
        },
      ],
    };
  });

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;

      case 'outline':
        return 'transparent';

      case 'delete':
        return colors.buttonDelete;

      case 'cancel':
        return colors.buttonCancel;

      default:
        return colors.primary;
    }
  };
  const getTextColor = () => {
    switch (variant) {
      case 'delete':
        return colors.txtDelete;

      case 'cancel':
        return colors.txtCancel;

      default:
        return colors.white;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return Spacing.width8;
      case 'medium':
        return Spacing.width12;
      case 'large':
        return Spacing.width16;
      default:
        return Spacing.width12;
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: getBackgroundColor(),
      borderRadius: Spacing.width24,
      minHeight: Spacing.height44,
      padding: getPadding(),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: colors.primary,
      flexDirection: 'row',
      gap: Spacing.width8,
    },
    text: {
      color: getTextColor(),
      fontSize: size === 'small' ? FontSize.FontSize14 : size === 'medium' ? FontSize.FontSize16 : FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_400,
    },
  });

  return (
    <AnimatedTouchable

      onPress={onPress}
      {...props}
      style={[styles.button, animatedStyle, style]}
    >
      {leftIcon && leftIcon}
      {title && <AppText style={[styles.text, textStyle]} >{title}</AppText>}
      {rightIcon && rightIcon}
    </AnimatedTouchable>
  );
};
