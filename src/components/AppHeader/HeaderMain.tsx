import { MenuIcon, SearchIcon } from '@assets';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { PostTypeKey } from '@types';
import React, { useMemo } from 'react';
import { Platform, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../AppText';

interface HeaderMainProps {
  title?: string;

  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  isHome?: boolean
  type?: PostTypeKey
  isSearch?: boolean;
  renderIconRight?: React.ReactNode;
}

export const HeaderMain: React.FC<HeaderMainProps> = ({
  title,
  isHome = true,
  style,
  titleStyle,
  type,
  isSearch = true, renderIconRight,
}) => {
  const { themeColors } = useTheme();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  return (
    <View style={[styles.container, style, { paddingTop: (Platform.OS === 'ios' ? top : top + Spacing.width16) || Spacing.width16 }]}>
      <View style={styles.flex1}>
        {isHome && <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.btnHome}>
          <MenuIcon />
        </TouchableOpacity>}
        <AppText numberOfLines={1} style={[styles.title, isHome && { textAlign: 'center' }, titleStyle]}>{title}</AppText>
      </View>
      {isSearch && <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN, {
        type,
      })} style={styles.btnSearch}>
        <SearchIcon size={Spacing.width24} />
      </TouchableOpacity>}
      {renderIconRight && renderIconRight}
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

      paddingHorizontal: Spacing.width16,
      backgroundColor: 'transparent',
      alignItems: 'center',
      flexDirection: 'row',
      gap: Spacing.width16,
      paddingBottom: Spacing.width8,

    },

    title: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_500,
      color: themeColors.text,
      flex: 1,

    },
    flex1: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: Spacing.width16,
    },
    btnHome: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,

      alignItems: 'center',
      justifyContent: 'center',
    },
    btnSearch: {
      width: Spacing.width40,
      height: Spacing.width40,

      alignItems: 'center',
      justifyContent: 'center',
    },
  });
