import { LikeActiveIcon, NewIcon, PlayIcon, PlayStackedIcon, StarIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { PostTypeKey } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

interface HeaderDetailProps {
  name: string;
  typeData: 'series' | 'short';
  type: PostTypeKey;
  duration?: number;
  views?: number;
  likes?: number;
  rating?: number;
  poster?: string;

  totalEpisodes?: number;

  onPlay?: () => void;
  onNewChapter?: () => void;
  children?: React.ReactNode;
}

export const PosterDetail = ({
  name,
  type,
  typeData,
  duration = 0,
  views = 0,
  likes = 0,
  rating = 0,
  poster,
  totalEpisodes = 0,
  onNewChapter,
  onPlay,
}: HeaderDetailProps) => {
  const { themeColors } = useTheme();

  const styles = createStyles(themeColors);

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

  const renderNavigation = () => {
    switch (type) {
      case PostTypeKey.MOVIES:
        return <>
          <TouchableOpacity onPress={() => onPlay?.()} style={styles.btnPlay}>
            <PlayIcon />
            <AppText style={styles.txtPlay}>{t('play')}</AppText>
          </TouchableOpacity>
        </>;
      case PostTypeKey.COMIC:
      case PostTypeKey.NOVEL:
        return <View style={styles.viewChapter}>
          <TouchableOpacity onPress={() => onPlay?.()} style={styles.btnPlay}>
            <PlayIcon />
            <AppText style={styles.txtPlay}>{t('chapter.readChapter')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNewChapter?.()} style={[styles.btnPlay, { backgroundColor: themeColors.txtLink }]}>
            <NewIcon />
            <AppText style={styles.txtPlay}>{t('chapter.newChapter')}</AppText>
          </TouchableOpacity>
        </View>;
      case PostTypeKey.GAMES:
        return <></>;
    }

  };

  return (
    <Animated.View style={[styles.container]}>
      <AppImage uri={poster} style={styles.banner} />
      <View style={styles.bottomInfoPost}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', '#010101', '#010101']}
          locations={[0, 0.6, 1]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.body}>
            {/* info movie */}
            <View style={styles.info}>
              <AppText style={styles.txtName}>{name}</AppText>
              <View style={styles.viewOption}>
                {renderItem(<PlayStackedIcon color={themeColors.success} />, `${typeData === 'short' ? duration : `${totalEpisodes} ${t('home.episodes')}`}`)}
                {renderItem(<LikeActiveIcon />, `${getPrettyNumberString(likes || 0, '1.234k')} ${t('home.likes')}`)}
                {renderItem(<StarIcon isActive={true} />, `${getPrettyNumberString(rating || 0, '1.234k')}/10`)}
              </View>
            </View>
          </View>


        </LinearGradient>
      </View>
      <View style={styles.control}>
        {renderNavigation()}
      </View>
    </Animated.View>

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
      height: Spacing.height560,
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
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,

    },
    btnPlay: {
      backgroundColor: themeColors.primary,
      borderRadius: Spacing.width88,

      height: Spacing.width44,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Spacing.width8,
      paddingHorizontal: Spacing.width16,
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
      height: '50%',
      justifyContent: 'flex-end',

    },
    body: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    control: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    //
    bottomInfoPost: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    //
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
    bottom: {
      height: 100,
    },
  });
