import { ArrowDropLeft, BackgroundHeader, CartIcon, LogoTextIcon } from '@assets';
import { AppImage } from '@components';
import { goBack, navigate, SCREEN_ROUTE } from '@navigation';
import { RootState } from '@redux';
import { FontSize, FontWithFamily, HeightScreen, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
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
  styleBack?: StyleProp<ViewStyle>;
  isCart?: boolean;
  isBackground?: boolean;
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
  styleBack,
  isCart = true,
  isBackground = false,
}) => {
  const { themeColors } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  const cartItems = useSelector((state: RootState) => state.cartSlice.items);

  return (

    <>
      <Animated.View style={[styles.header,]}>

        {isBackground && <AppImage defaultSource={BackgroundHeader} style={styles.headerBackground} resizeMode="cover" />}
        <View style={[styles.container, { paddingTop: top + Spacing.height8 || Spacing.width16 }, style]}>
          <View style={styles.flex1}>
            {leftComponent ? leftComponent :
              <TouchableOpacity onPress={() => onBack ? onBack() : goBack()} style={[styles.btnBack, styleBack]}>
                <ArrowDropLeft color={isBackground ? 'white' : 'black'} />
              </TouchableOpacity>
            }

          </View>
          {title ? <AppText style={[styles.title, titleStyle, { color: isBackground ? 'white' : 'black' }]} numberOfLines={1}>{title}</AppText> : <AppImage defaultSource={LogoTextIcon} style={styles.images} resizeMode='contain' />}
          {isCart && <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.CART)} style={styles.btnBack}>
            <CartIcon color='black' />
            {cartItems?.length > 0 && (
              <View style={styles.cartBadge}>
                <AppText style={styles.cartBadgeText}>{cartItems?.length}</AppText>
              </View>
            )}
          </TouchableOpacity>}
        </View>

      </Animated.View>

    </>

  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    headerBackground: {
      ...StyleSheet.absoluteFillObject,
      width: WidthScreen,
      height: HeightScreen / 2,
    }, // Added style for background

    container: {
      // height: Platform.OS === 'android' ? Spacing.height64 : undefined,

      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',

      paddingBottom: Spacing.width8,
      top: 0,
      left: 0,
      right: 0,
    },
    header: {

    },
    title: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_500,
      color: themeColors.text,
      textAlign: 'center',
      flex: 1,
    },
    images: {
      width: Spacing.width100,
      height: Spacing.height32,

      flex: 1,

    },
    btnBack: {
      width: Spacing.width35,
      height: Spacing.width35,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flex1: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width16,
    },
    cartBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: 'red',
      borderRadius: 8,
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadgeText: {
      color: 'white',
      fontSize: FontSize.FontSize10,
      fontWeight: 'bold',
    },
  });
