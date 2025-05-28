import { ChatIcon, GiftIcon, GlobalIcon, HomeIcon, ProfileIcon } from '@assets';
import { AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors, { ThemeColors } from '../../theme/Colors';

interface CustomTabBarProps {
  state: any,
  descriptors: any,
  navigation: any
}

export function CustomTabBar({ state, navigation }: CustomTabBarProps) {
  const { themeColors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const styles = createStyles(themeColors, bottom);

  const menu: Record<string, { name: string; Icon: any }> = {
    'Home': { name: t('navigation.home') || 'Trang chủ', Icon: HomeIcon },
    'Gift': { name: t('navigation.gift') || 'Quà tặng', Icon: GiftIcon },
    'Domain': { name: t('navigation.domain') || 'Tên miền', Icon: GlobalIcon },
    'Support': { name: t('navigation.support') || 'Hỗ trợ', Icon: ChatIcon },
    'Account': { name: t('navigation.account') || 'Tài khoản', Icon: ProfileIcon },
  };

  const handlePress = (routeName: string) => {
    const index = state.routes.findIndex((r: any) => r.name === routeName);
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      {/* Tabs bên trái */}
      <View style={styles.sideTabs}>
        {['Home', 'Gift'].map((routeName) => {
          const isFocused = state.index === state.routes.findIndex((r: any) => r.name === routeName);
          const { name, Icon } = menu[routeName];
          return (
            <TouchableOpacity
              key={routeName}
              style={styles.btn}
              onPress={() => handlePress(routeName)}
              activeOpacity={1}
            >
              <Icon color={isFocused ? Colors.primary : 'gray'} size={24} />
              <AppText style={isFocused ? styles.txtActive : styles.txtInActive}>{name}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* FAB ở giữa */}
      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fab}
          onPress={() => handlePress('Domain')}
          activeOpacity={0.8}
        >
          <GlobalIcon color={state.index === state.routes.findIndex((r: any) => r.name === 'Domain') ? Colors.primary : 'black'} size={32} />
        </TouchableOpacity>
        {/* <AppText style={styles.fabLabel}>{menu['Domain'].name}</AppText> */}
      </View>
      {/* Tabs bên phải */}
      <View style={styles.sideTabs}>
        {['Support', 'Account'].map((routeName) => {
          const isFocused = state.index === state.routes.findIndex((r: any) => r.name === routeName);
          const { name, Icon } = menu[routeName];
          return (
            <TouchableOpacity
              key={routeName}
              style={styles.btn}
              onPress={() => handlePress(routeName)}
              activeOpacity={1}
            >
              <Icon color={isFocused ? Colors.primary : 'gray'} size={24} />
              <AppText style={isFocused ? styles.txtActive : styles.txtInActive}>{name}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (themeColors: ThemeColors, bottom: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      backgroundColor: themeColors.background,
      borderTopWidth: 1,
      borderTopColor: '#E8E8E8',
      shadowColor: '#E8E8E8',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
      paddingBottom: bottom || Spacing.width16,
      height: Spacing.height50 + (bottom || Spacing.width16),
    },
    sideTabs: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Spacing.width4,
      gap: Spacing.width4,
      zIndex: 1,
    },
    txtInActive: {
      color: themeColors.text,
      fontSize: FontSize.FontSize9,
    },
    txtActive: {
      fontSize: FontSize.FontSize9,
      color: themeColors.primary,
      ...FontWithFamily.FontWithFamily_600,
    },
    fabContainer: {
      position: 'absolute',
      alignItems: 'center',
      left: '50%',
      bottom: (bottom || Spacing.width16) + 20,
      transform: [{ translateX: -35 }],
      zIndex: 2,
    },
    fab: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: themeColors.background,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#E8E8E8',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
      borderWidth: 4,
      borderColor: '#E8E8E8',
    },
    fabLabel: {
      color: themeColors.primary,
      fontSize: FontSize.FontSize10,
      ...FontWithFamily.FontWithFamily_700,
      marginTop: 2,
      textAlign: 'center',
    },
  });

