import { DotsIcon, LikeActiveIcon, PlayIcon, PlayStackedIcon, StarIcon } from '@assets';
import { AppHeader, AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, HeightScreen, Spacing, ThemeColors, useTheme } from '@theme';
import { movieDetailInterface } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface HeaderDetailProps {
  movie: movieDetailInterface | undefined;
  children?: React.ReactNode;
}

export const HeaderDetail = ({ movie, children }: HeaderDetailProps) => {
  const { themeColors } = useTheme();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const styles = createStyles(themeColors);

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 200],
      [HeightScreen / 1.8, HeightScreen / 3],
      Extrapolate.CLAMP
    );
    return { height };
  });

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

      <Animated.View style={[styles.container, animatedStyle]}>
        <AppImage resizeMode={'contain'} uri={movie?.poster} style={styles.banner} />
        <AppHeader style={styles.header} rightComponent={<TouchableOpacity style={styles.btnDots}><DotsIcon /></TouchableOpacity>} />
        <View style={styles.viewInfo}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', '#010101', '#010101']}
            locations={[0, 0.6, 1]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.body}>
              <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.VIDEO,)} style={styles.btnPlay}>
                <PlayIcon />
                <AppText style={styles.txtPlay}>{t('play')}</AppText>
              </TouchableOpacity>

              {/* info movie */}
              <View style={styles.info}>
                <AppText style={styles.txtName}>{movie?.name}</AppText>
                <View style={styles.viewOption}>
                  {renderItem(<PlayStackedIcon color={themeColors.success} />, `${movie?.type === 'movie' ? movie?.duration : `${movie?.currentEpisode}/${movie?.totalEpisodes} ${t('home.episodes')}`}`)}
                  {renderItem(<LikeActiveIcon />, `${getPrettyNumberString(movie?.views || 0)} ${t('home.likes')}`)}
                  {renderItem(<StarIcon isActive={true} />, `${getPrettyNumberString(movie?.rating || 0)}/10`)}
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ backgroundColor: themeColors.background }}
      >
        {children}
      </Animated.ScrollView>
    </>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

    },
    header: {
      position: 'absolute',
    },
    banner: {
      width: '100%',
      height: HeightScreen / 1.8,
    },
    btnDots: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.height24,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradient: {
      // width: '100%',
      // height: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,

    },
    btnPlay: {
      backgroundColor: themeColors.primary,
      borderRadius: Spacing.width88,
      width: Spacing.width120,
      height: Spacing.width44,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.width8,
    },
    txtPlay: {
      fontSize: FontSize.FontSize16,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
    },
    viewInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '50%',
      justifyContent: 'flex-end',
    },
    body: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',

    },
    txtName: {
      fontSize: FontSize.FontSize24,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
      textAlign: 'center',
    },
    viewOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: Spacing.width16,
      paddingBottom: Spacing.width16,
      gap: Spacing.width16,
      marginTop: Spacing.height24,
    },
    txtLike: {
      fontSize: FontSize.FontSize14,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',

      gap: 4,
    },
    info: {
      marginHorizontal: Spacing.width16,
    },
  });
