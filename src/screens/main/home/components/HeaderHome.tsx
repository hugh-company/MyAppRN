import { MenuIcon, SearchIcon } from '@assets';
import { useNavigation } from '@react-navigation/native';
import { Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BannerHome } from './BannerHome';

interface HeaderHomeProps {
  children?: React.ReactNode;
}

export const HeaderHome = ({ children }: HeaderHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const navigation = useNavigation();
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const bannerHeightStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, Spacing.height315], [Spacing.height315, 100], Extrapolate.CLAMP),
  }));

  const bannerOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, Spacing.height315], [1, 0], Extrapolate.CLAMP),
  }));

  const borderRadiusStyle = useAnimatedStyle(() => ({
    borderBottomRightRadius: interpolate(scrollY.value, [0, Spacing.height315], [0, Spacing.width32], Extrapolate.CLAMP),
    borderBottomLeftRadius: interpolate(scrollY.value, [0, Spacing.height315], [0, Spacing.width32], Extrapolate.CLAMP),
  }));
  const headerBackgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(scrollY.value, [0, Spacing.height315], ['transparent', '#B1062E']),
  }));

  return (
    <>
      <Animated.View style={[styles.container]}>
        <Animated.View style={[styles.banner, bannerHeightStyle]}>

          <BannerHome data={[{
            title: 'All In One',
            description: 'App Hẹn Hò, Xem Phim, Đọc Truyện, Chơi Game ',
            image: 'https://i.ytimg.com/vi/uYPbbksJxIg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLACA9IK0xYW9AGiLGNH4sIRPbLeLA',
          }, {
            title: 'All In One',
            description: 'App Hẹn Hò, Xem Phim, Đọc Truyện, Chơi Game App Hẹn Hò, Xem Phim, Đọc Truyện, Chơi Game App Hẹn Hò, Xem Phim, Đọc Truyện, Chơi Game ',
            image: 'https://i.ytimg.com/vi/uYPbbksJxIg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLACA9IK0xYW9AGiLGNH4sIRPbLeLA',
          }, {
            title: 'All In One',
            description: 'The best of the best',
            image: 'https://i.ytimg.com/vi/uYPbbksJxIg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLACA9IK0xYW9AGiLGNH4sIRPbLeLA',
          }]} />

          <Animated.View style={[styles.header, { paddingTop: top }, headerBackgroundColorStyle]}>
            {/* open drawer */}
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.btnMenu}>
              <MenuIcon color={themeColors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnMenu}>
              <SearchIcon />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {children}
      </Animated.ScrollView>
    </>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderBottomRightRadius: Spacing.width32,
      borderBottomLeftRadius: Spacing.width32,
      overflow: 'hidden',
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
    },
    btnMenu: {
      width: Spacing.width32,
      height: Spacing.width32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    banner: {
      position: 'relative',
    },
  });
