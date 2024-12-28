import { HomeIcon, SearchIcon } from '@assets';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../AppText';

interface HeaderMainProps {
  title?: string;

  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  isHome?: boolean
}

export const HeaderMain: React.FC<HeaderMainProps> = ({
  title,
  isHome = true,
  style,
  titleStyle,
}) => {
  const { themeColors } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  return (
    <View style={[styles.container, style, { marginTop: top || Spacing.width16 }]}>
      <View style={styles.flex1}>
        {isHome && <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.HOME)} style={styles.btnHome}>
          <HomeIcon />
        </TouchableOpacity>}
        <AppText numberOfLines={1} style={[styles.title, titleStyle]}>{title}</AppText>
      </View>
      <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN)} style={styles.btnSearch}>
        <SearchIcon size={Spacing.width24} />
      </TouchableOpacity>
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
      paddingBottom: Spacing.width16,
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
      backgroundColor: themeColors.btnSocial,
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
