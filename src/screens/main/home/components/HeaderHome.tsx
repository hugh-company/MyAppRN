import { MenuIcon, SearchIcon } from '@assets';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderHomeProps {

  styleHeader?: StyleProp<ViewStyle>;
}

export const HeaderHome = ({ styleHeader }: HeaderHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { top } = useSafeAreaInsets();

  const navigation = useNavigation();


  return (
    <Animated.View style={[styles.header, { paddingTop: top || Spacing.width16 }, { height: top ? Spacing.height100 : Spacing.height50 }, styleHeader]}>
      {/* open drawer */}
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.btnMenu}>
        <MenuIcon color={themeColors.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.SEARCH_SCREEN)} style={styles.btnMenu}>
        <SearchIcon />
      </TouchableOpacity>

    </Animated.View>

  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      // overflow: 'hidden',
    },
    linear: {
      ...StyleSheet.absoluteFillObject,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.width16,
      paddingBottom: Spacing.width8,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      height: Spacing.height50,
    },
    btnMenu: {
      width: Spacing.width32,
      height: Spacing.width32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    banner: {

    },
  });
