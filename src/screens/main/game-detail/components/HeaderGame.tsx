import { DotsIcon, LikeActiveIcon } from '@assets';
import { AppHeader, AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, HeightScreen, Spacing, ThemeColors, useTheme } from '@theme';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface HeaderGameProps {
  name: string;
  logo?: string;
  likes?: number;
  poster?: string;
  children?: React.ReactNode;
}

export const HeaderGame = ({
  name,
  likes = 0,
  poster = '',
  logo = '',
  children }: HeaderGameProps) => {
  console.log({ logo });

  const { themeColors } = useTheme();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const styles = createStyles(themeColors);

  // const animatedStyle = useAnimatedStyle(() => {
  //   const height = interpolate(
  //     scrollY.value,
  //     [0, 200],
  //     [HeightScreen / 2, HeightScreen / 3],
  //     Extrapolate.CLAMP
  //   );
  //   return { height };
  // });
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: scrollY.value > HeightScreen / 2.5 ? themeColors.primary : 'transparent',
    };
  }
  );


  const renderItem = (icon: any, title: string) => {
    return (
      <View style={styles.viewRow}>
        {icon}
        <AppText style={styles.txtLike}>
          {title}
        </AppText>
      </View>
    );
  };



  return (
    <>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ backgroundColor: themeColors.background }}
      >
        <Animated.View style={[styles.container]}>
          <AppImage resizeMode={'contain'} uri={poster} style={styles.banner} />

          <View style={styles.viewInfo}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', '#010101']}
              locations={[0, 0.6]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <View style={styles.body}>
                {/* info game */}
                <View style={styles.info}>
                  <View style={styles.viewLogo}>
                    <AppImage uri={logo} style={styles.logo} />
                  </View>
                  <View style={styles.viewName}>
                    <AppText numberOfLines={3} style={styles.txtName}>{name}</AppText>
                    {renderItem(<LikeActiveIcon color={themeColors.star} />, `${getPrettyNumberString(likes || 0, '1.234k')} ${t('home.likes')}`)}
                  </View>

                </View>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
        {children}
        <View style={styles.bottom} />
      </Animated.ScrollView>
      <AppHeader style={[styles.header, backgroundStyle]} rightComponent={<TouchableOpacity style={styles.btnDots}><DotsIcon /></TouchableOpacity>} />
    </>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    logo: {
      width: Spacing.width96,
      height: Spacing.width96,

    },
    viewLogo: {
      borderRadius: Spacing.width8,
      borderWidth: 3,
      borderColor: themeColors.text,
    },
    banner: {
      width: '100%',
      height: HeightScreen / 1.8,
    },

    gradient: {
      flex: 1,

    },
    btnPlay: {
      backgroundColor: themeColors.primary,
      borderRadius: Spacing.width88,

      height: Spacing.width44,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
      gap: Spacing.width8,
      paddingHorizontal: Spacing.width32,
    },
    txtPlay: {
      fontSize: FontSize.FontSize16,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
    },
    viewChapter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      gap: Spacing.width16,

    },
    viewInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '30%',
      justifyContent: 'flex-end',
    },
    body: {

      paddingHorizontal: Spacing.width16,
    },
    txtName: {
      fontSize: FontSize.FontSize24,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,

    },
    viewOption: {

      marginHorizontal: Spacing.width16,
      paddingBottom: Spacing.width16,
      gap: Spacing.width16,
      marginTop: Spacing.height32,
    },
    txtLike: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_600,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',

      gap: 4,
    },
    info: {
      flexDirection: 'row',
      gap: Spacing.width12,


    },
    viewName: {
      flex: 1,
      justifyContent: 'center',
      gap: Spacing.width8,
    },
    btnDots: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottom: {
      height: Spacing.height40,
    },
  });
