import { LikeActiveIcon, PlayIcon, PlayStackedIcon } from '@assets';
import { AppBanners, AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { movieInterface } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BannerMovieProps {
  data: movieInterface[];
  style?: StyleProp<ViewStyle>
}
export const BannerMovie = ({ data, style }: BannerMovieProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const renderItemBanner = ({ item }: { item: movieInterface }) => (
    <TouchableOpacity style={styles.banner}>
      <AppImage uri={item.image} style={styles.image} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'black']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.body}>
          <View style={styles.viewInfo}>
            <AppText style={styles.nameMovie} numberOfLines={2}>{item.name}</AppText>
            <View style={styles.viewOption}>
              <View style={styles.viewRow}>
                <PlayStackedIcon />
                <AppText style={styles.txtView}>
                  {getPrettyNumberString(item.currentEpisode ?? 0)}/{getPrettyNumberString(item.totalEpisodes ?? 0)} {t('home.episodes')}
                </AppText>
              </View>

              <View style={styles.viewRow}>
                <LikeActiveIcon size={Spacing.width16} color={themeColors.star} />
                <AppText style={styles.txtLike}>{getPrettyNumberString(item.likes ?? 0)} {t('home.likes')}</AppText>
              </View>
            </View>
          </View>
          <View style={styles.btnPlay}>
            <PlayIcon />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
  return (
    <View style={[styles.container, style]}>
      <AppBanners width={WidthScreen} label={t('movies.movieHot')}
        data={data}
        labelStyle={styles.title}
        renderItem={renderItemBanner} />
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

    },
    title: {
      marginBottom: Spacing.width16,
      paddingHorizontal: Spacing.width16,
    },
    btn: {
      width: '100%',
      height: Spacing.height315,
    },
    banner: {
      width: WidthScreen,
      height: Spacing.height240,
      paddingHorizontal: Spacing.width16,



    },
    image: {
      borderWidth: 1,
      borderColor: themeColors.btnSocial,
      borderRadius: Spacing.width16,
      overflow: 'hidden',

    },
    gradient: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '50%',
      left: Spacing.width16,
      right: Spacing.width16,
      paddingTop: Spacing.height12,

    },
    body: {
      paddingHorizontal: Spacing.width16,
      flexDirection: 'row',
      justifyContent: 'space-between',

      gap: Spacing.width16,
    },
    viewInfo: {
      flex: 1,


    },
    btnPlay: {
      backgroundColor: themeColors.primary,
      width: Spacing.width48,
      height: Spacing.width48,
      borderRadius: Spacing.width40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameMovie: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_600,
    },

    viewOption: {
      flexDirection: 'row',
      alignItems: 'center',

      marginTop: Spacing.width16,
      gap: Spacing.width16,

    },
    txtView: {
      fontSize: FontSize.FontSize14,
    },
    txtLike: {
      fontSize: FontSize.FontSize12,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
  });
