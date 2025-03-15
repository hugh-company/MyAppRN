import { LikeActiveIcon, PlayIcon, PlayStackedIcon } from '@assets';
import { AppBanners, AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { ItemListProduct, PostTypeKey } from '@types';
import { getPrettyNumberString, goToDetail } from '@utils';
import { t } from 'i18next';
import React, { useCallback } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BannerMovieProps {
  data: ItemListProduct[];
  style?: StyleProp<ViewStyle>;
  title?: string;
  isGame?: boolean;
}
export const BannerMovie = React.memo(({ data, style, title, isGame = false }: BannerMovieProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const navigateBanner = useCallback((item: ItemListProduct) => {
    goToDetail({
      item,
      type: item?.posttype,
    });
  }, []);


  const renderItemBanner = useCallback(({ item }: { item: ItemListProduct }) => (
    <TouchableOpacity activeOpacity={1} onPress={() => navigateBanner(item)} style={styles.banner}>
      <AppImage uri={item.banner.path} style={styles.image} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'black']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.body}>
          <View style={styles.viewInfo}>
            <AppText style={styles.nameMovie} numberOfLines={2}>{item.title}</AppText>
            <View style={styles.viewOption}>
              {!isGame && <View style={styles.viewRow}>
                <PlayStackedIcon />
                <AppText style={styles.txtView}>
                  {getPrettyNumberString(item.episode_total ?? 0)}/{getPrettyNumberString(item.episode_total ?? 0)} {t('home.episodes')}
                </AppText>
              </View>}
              <View style={styles.viewRow}>
                <LikeActiveIcon size={Spacing.width16} color={themeColors.star} />
                <AppText style={styles.txtLike}>{getPrettyNumberString(item.like_count ?? 0)} {t('home.likes')}</AppText>
              </View>
            </View>
          </View>
          {item?.posttype === PostTypeKey.MOVIES && <View style={styles.btnPlay}>
            <PlayIcon />
          </View>}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  ), [navigateBanner, themeColors, isGame]);


  return (
    <View style={[styles.container, style]}>
      <AppBanners
        width={WidthScreen} label={title}
        data={data}
        labelStyle={styles.title}
        renderItem={renderItemBanner} />
    </View>
  );
});

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
