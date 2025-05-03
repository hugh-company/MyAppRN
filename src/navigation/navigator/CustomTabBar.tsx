import { ChapterIcon, GameIcon, HomeIcon, ProfileIcon } from '@assets';
import { AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeColors } from '../../theme/Colors';
import { SCREEN_ROUTE } from '../router';

interface CustomTabBarProps {
  state: any,
  descriptors: any,
  navigation: any
}

interface ButtonTabProps {
  name: string,
  Icon: any,
  onPress: () => void,
  styles: any,
  isFocused: boolean
}

const ButtonTab = ({ onPress, name, Icon, styles, isFocused }: ButtonTabProps) => {
  const { themeColors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btn}
      activeOpacity={0.8}
    >
      {isFocused ? (
        <View style={styles.activeTabContainer}>
          {Icon && <Icon color={themeColors.whiteColor} />}
          <AppText style={[styles.txtActive]}>{name}</AppText>
        </View>
      ) : (
        <View style={styles.inactiveTabContainer}>
          {Icon && <Icon color="#BDBDBD" />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const ButtonBottomTab = ({ keyTab, onPress, styles, isFocused }: { keyTab: string, onPress: () => void, styles: any, isFocused: boolean }) => {
  const menu = {
    'Home': { name: t('navigation.home'), key: SCREEN_ROUTE.HOME, Icon: HomeIcon },
    'Games': { name: t('navigation.games'), key: SCREEN_ROUTE.GAMES, Icon: GameIcon },
    'Comic': { name: t('navigation.chapters'), key: SCREEN_ROUTE.COMIC, Icon: ChapterIcon },
    'Profile': { name: t('navigation.account'), key: SCREEN_ROUTE.PROFILE, Icon: ProfileIcon },
  };

  // Map route names to menu keys
  const routeToMenuMap: Record<string, string> = {
    'Home': 'Home',
    'Games': 'Games',
    'Comic': 'Comic',
    'Profile': 'Profile',
  };

  // Get the correct menu key from the mapping or use the keyTab directly
  const menuKey = routeToMenuMap[keyTab] || keyTab;

  // Provide fallback values if the menu item doesn't exist
  const menuItem = menu[menuKey as keyof typeof menu] || {
    name: keyTab,
    key: keyTab,
    Icon: HomeIcon, // Default icon as fallback
  };

  return (
    <ButtonTab
      name={menuItem.name}
      Icon={menuItem.Icon}
      onPress={onPress}
      styles={styles}
      isFocused={isFocused}
    />
  );
};

export function CustomTabBar({ state, navigation }: CustomTabBarProps) {
  const { themeColors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const styles = createStyles(themeColors);

  // Get screen width for calculations
  const { width } = Dimensions.get('window');
  // Calculate tab width (approximate - will need adjustment based on padding)
  const tabWidth = width / state.routes.length;

  // Shared value for the animation
  const translateX = useSharedValue(0);

  // Update position when active tab changes
  useEffect(() => {
    // Calculate the position based on active index
    // Adding small adjustments for padding/margins
    translateX.value = withSpring(state.index * tabWidth, {
      damping: 15,
      stiffness: 120,
    });
  }, [state.index]);

  // Create animated style for the sliding indicator
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={[styles.container, { paddingBottom: bottom || Spacing.width16 }]}>
      {/* Sliding indicator - fixed positioning */}
      <Animated.View
        style={[
          styles.slidingIndicator,
          { width: tabWidth - 16 },
          animatedStyle,
        ]}
      />

      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <ButtonBottomTab
            keyTab={route.name}
            onPress={onPress}
            styles={styles}
            isFocused={isFocused}
            key={index.toString()}
          />
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
      borderTopColor: '#F0F0F0',
      borderTopWidth: 1,
      paddingTop: Spacing.width12,
      paddingBottom: Spacing.width12,
      paddingHorizontal: Spacing.width8,
    },
    btn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    slidingIndicator: {
      position: 'absolute',
      height: Spacing.width40,
      // backgroundColor: '#FFFFFF', // Changed to white
      borderRadius: Spacing.width20,
      bottom: Spacing.width16,
      marginHorizontal: Spacing.width8,
      zIndex: 0,
      // Add shadow to make white stand out
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    activeTabContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.width8,
      paddingHorizontal: Spacing.width12,
      borderRadius: Spacing.width20,
      gap: Spacing.width6,
      backgroundColor: themeColors.primary, // Changed to white
      zIndex: 1,
      // Add shadow to make white stand out
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    inactiveTabContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing.width8,
    },
    txtActive: {
      fontSize: FontSize.FontSize12,
      color: themeColors.whiteColor, // Changed text color to primary for contrast on white
      ...FontWithFamily.FontWithFamily_600,
    },
    txtInActive: {
      display: 'none', // Not showing text for inactive tabs
    },
  });

