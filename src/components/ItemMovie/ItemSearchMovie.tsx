import { LikeActiveIcon, PlayIcon, PlayStackedIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export interface ItemSearchMovieProps {
  item: any;
}

const ItemSearchMovie = ({ item }: ItemSearchMovieProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  return (
    <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.MOVIE_DETAIL, { movie: item })} style={[styles.container]}>
      <AppImage uri={item?.poster} style={styles.image} />
      <View style={styles.viewInfo}>
        <View>
          <AppText numberOfLines={2} style={styles.name}>{item.name}</AppText>
          <AppText numberOfLines={1} style={styles.director}>{item.director}</AppText>
        </View>
        <View style={styles.viewOption}>
          <View style={styles.viewRow}>
            <PlayStackedIcon width={Spacing.width16} height={Spacing.width15} />
            <AppText style={styles.duration}>{`${t('search.duration')} ${item.duration}`}</AppText>
          </View>
          <View style={styles.viewRow}>
            <PlayIcon size={Spacing.width12} color={themeColors.primary} />
            <AppText style={styles.duration}>{`${t('search.viewer')} ${getPrettyNumberString(item.views)}`}</AppText>
          </View>
          <View style={styles.viewRow}>
            <LikeActiveIcon size={Spacing.width12} color={themeColors.warning} />
            <AppText style={styles.duration}>{`${t('search.likes')} ${getPrettyNumberString(item.likes)}`}</AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSearchMovie;

const createStyles = (themeColors: any) => StyleSheet.create({
  container: {
    borderRadius: Spacing.width4,
    gap: Spacing.width8,
    flexDirection: 'row',
    marginBottom: Spacing.width16,
  },
  image: {
    width: Spacing.width92,
    height: Spacing.width132,
    borderRadius: Spacing.width4,
  },
  name: {

    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_600,
  },
  director: {
    fontSize: FontSize.FontSize10,
    color: themeColors.subtile,
    marginTop: 4,
  },
  duration: {
    fontSize: FontSize.FontSize10,
    color: themeColors.subtile,
  },
  viewOption: {
    gap: 4,

  },
  txtView: {
    fontSize: FontSize.FontSize14,
  },
  txtLike: {
    fontSize: FontSize.FontSize14,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 4,
  },
  viewInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
