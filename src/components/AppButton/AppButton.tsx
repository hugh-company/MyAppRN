import { Box, Spacing, useTheme } from '@theme';
import { debounce } from 'lodash';
import React, { JSX } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '../AppText';
import { styles } from './styles';

export interface ButtonProps extends TouchableOpacityProps {
  label: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  Icon?: any;
  onPress?: () => void;
  onPressIn?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle | TextStyle[];
  numberOfLines?: number;
  isWrap?: boolean;
  hideDelay?: boolean;
  backgroundColor?: string;
  marginTop?: number;
  loading?: boolean; // New prop for loading state
}

interface WrapContentProps {
  isWrap?: boolean;
  children: JSX.Element[] | JSX.Element;
}

const WrapContent = ({ isWrap, children }: WrapContentProps) => {
  if (isWrap) {
    return (
      <Box flexWrap="wrap" flexDirection="row">
        {children}
      </Box>
    );
  }
  return <>{children}</>;
};

export function AppButton(props: ButtonProps) {
  const {
    label,
    onPress = () => { },
    style,
    Icon,
    labelStyle,
    disabled,
    numberOfLines,
    isWrap,
    hideDelay = false,
    backgroundColor,
    onPressIn = () => { },
    loading = false, // Default value for loading
  } = props;

  const { themeColors } = useTheme();

  const handler = debounce(onPress, 300, {
    leading: true,
    trailing: false,
  });
  const handlerOnPressIn = debounce(onPressIn, 300, {
    leading: true,
    trailing: false,
  });

  return (
    <WrapContent isWrap={isWrap}>
      <TouchableOpacity
        disabled={disabled || loading} // Disable button when loading
        activeOpacity={1}
        style={[
          styles.button,
          {
            backgroundColor:
              backgroundColor || disabled || loading // Adjust background for loading state
                ? themeColors.colorDisable
                : themeColors.primary,
          },
          style,
        ]}
        onPress={() => {
          if (!loading) { // Prevent onPress when loading
            if (hideDelay) {
              onPress?.();
            } else {
              handler();
            }
          }
        }}
        onPressIn={() => {
          if (!loading) { // Prevent onPressIn when loading
            if (hideDelay) {
              onPressIn?.();
            } else {
              handlerOnPressIn();
            }
          }
        }}
      >
        <LinearGradient
          colors={
            disabled || loading // Adjust gradient for loading state
              ? [themeColors.colorDisable, themeColors.colorDisable]
              : ['#4ABAB9', '#5761E6']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFillObject, {
            borderRadius: Spacing.width8
          }]}
        />
        {loading ? ( // Show loading indicator when loading
          <ActivityIndicator color={themeColors.primary} />
        ) : (
          <>
            {!!Icon && <Icon style={styles.icon} />}
            <AppText
              style={[
                styles.label,
                {
                  color: themeColors.whiteColor,
                },
                isWrap && styles.txtWrap,
                labelStyle,
              ]}
              numberOfLines={numberOfLines}
            >
              {label}
            </AppText>
          </>
        )}
      </TouchableOpacity>
    </WrapContent>
  );
}
