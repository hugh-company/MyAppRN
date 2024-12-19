import { ChapterIcon, DatingIcon, GameIcon, HomeIcon, MovieIcon } from '@assets';
import { AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors, { ThemeColors } from '../../theme/Colors';
import { SCREEN_ROUTE } from '../router';

interface CustomTabBarProps {
  state: any,
  descriptors: any,
  navigation: any
}

interface ButtonTabProps {
  tabKey: string, // Renamed from key to tabKey
  name: string,
  Icon: any,
  onPress: () => void,
  styles: any,
  isFocused: boolean
}
const ButtonTab = ({ tabKey, onPress, name, Icon, styles, isFocused }: ButtonTabProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isFocused ? 1.1 : 1) }],
    };
  });

  return (
    <Animated.View style={[styles.btn, animatedStyle]}>
      <TouchableOpacity

        onPress={onPress}
        style={styles.btn}
        activeOpacity={0.7} // Added activeOpacity for click effect
      >
        {Icon && <Icon color={isFocused ? Colors.primary : '#EDEDED'} />}
        <AppText
          style={[isFocused ? styles.txtActive : styles.txtInActive]}
        >{name}</AppText>
      </TouchableOpacity>
    </Animated.View>
  );
};
const ButtonTabGame = ({ tabKey, onPress, styles, isFocused, name, Icon }: ButtonTabProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isFocused ? 1.1 : 1) }],
    };
  });

  return (
    <Animated.View style={[styles.btnGame, animatedStyle]}>
      <TouchableOpacity

        onPress={onPress}
        style={styles.btnGame}
        activeOpacity={1} // Added activeOpacity for click effect
      >
        {Icon && <Icon />}
        <AppText
          style={styles.txtGame}
        >{name.toLocaleUpperCase()}</AppText>
      </TouchableOpacity>
    </Animated.View>
  );
};
const ButtonBottomTab = (keyTab: 'Home' | 'Movies' | 'Games' | 'Chapters' | 'Dating', onPress: () => void, styles: any, isFocused: boolean) => {
  const menu = {
    'Home': { name: t('navigation.home'), key: SCREEN_ROUTE.HOME, Icon: HomeIcon },
    'Movies': { name: t('navigation.movies'), key: SCREEN_ROUTE.MOVIES, Icon: MovieIcon },
    'Games': { name: t('navigation.games'), key: SCREEN_ROUTE.GAMES, Icon: GameIcon },
    'Chapters': { name: t('navigation.chapters'), key: SCREEN_ROUTE.CHAPTERS, Icon: ChapterIcon },
    'Dating': { name: t('navigation.dating'), key: SCREEN_ROUTE.DATING, Icon: DatingIcon },
  };
  const { key, name, Icon } = menu[keyTab];
  switch (key) {
    case SCREEN_ROUTE.MOVIES:
    case SCREEN_ROUTE.CHAPTERS:
    case SCREEN_ROUTE.DATING:
    case SCREEN_ROUTE.HOME:
      return (
        <ButtonTab tabKey={key} name={name} Icon={Icon} onPress={onPress} styles={styles} isFocused={isFocused} />
      );


    case SCREEN_ROUTE.GAMES:
      return <ButtonTabGame tabKey={key} name={name} Icon={Icon} onPress={onPress} styles={styles} isFocused={isFocused} />;

    default:
      return null;
  }
};

export function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  const { themeColors } = useTheme(); // Moved inside the function component
  const { bottom } = useSafeAreaInsets();

  const styles = createStyles(themeColors);
  return (
    <View style={[styles.container, { paddingBottom: bottom || Spacing.width16 }]}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;



        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <View key={route.key}>
            {ButtonBottomTab(route.name, onPress, styles, isFocused)}
          </View>
        );
      })}
    </View>
  );
}
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: themeColors.background,
      borderTopColor: themeColors.btnSocial,
      borderTopWidth: 1,
      paddingHorizontal: Spacing.width16,

    },
    btn: {
      flex: 1,
      alignItems: 'center',
      paddingTop: Spacing.width4,
      gap: Spacing.width4,
    },
    txtInActive: {
      fontSize: FontSize.FontSize9,

    },
    txtActive: {
      fontSize: FontSize.FontSize9,
      color: themeColors.primary,
      ...FontWithFamily.FontWithFamily_600,
    },
    btnGame: {
      width: Spacing.width106,
      height: Spacing.width50,
      backgroundColor: themeColors.primary,
      borderRadius: Spacing.width12,
      flexDirection: 'row',
      marginTop: -Spacing.width8,
      // shadowColor: '#FF3737',
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // shadowOpacity: 0.5,
      // shadowRadius: 2,
      // elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.width8,
    },
    txtGame: {
      color: themeColors.text,
      fontSize: FontSize.FontSize15,
      ...FontWithFamily.FontWithFamily_700,
      width: '50%',

    },
  });

