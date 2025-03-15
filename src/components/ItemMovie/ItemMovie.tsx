import { BrandIcon, LikeActiveIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ItemListProduct, PostTypeKey } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export interface ItemMovieProps {
  item: ItemListProduct;
  onPress?: () => void;
  type?: PostTypeKey;
}
const ItemMovie = ({ item, onPress, type }: ItemMovieProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const image = item?.feature?.path;


  return (
    <TouchableOpacity onPress={() => {
      if (onPress) {
        onPress();
      } else {
        navigate(SCREEN_ROUTE.MOVIE_DETAIL, { movie: item });
      }
    }} style={styles.container}>
      <AppImage uri={image} style={styles.image} />
      <View style={styles.viewName}>
        <AppText numberOfLines={2} style={styles.name}>{item.title}</AppText>
      </View>
      <View style={styles.viewOption}>
        <View style={styles.viewRow}>
          <LikeActiveIcon size={Spacing.width16} color={themeColors.star} />
          <AppText style={styles.txtView} >
            {getPrettyNumberString(item.like_count)}
          </AppText>
        </View>

        <View style={styles.viewRow}>
          <BrandIcon />
          <AppText style={styles.txtLike}>{getPrettyNumberString(item.views)} {t(type === PostTypeKey.GAMES ? 'home.playGame' : 'home.viewer')}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemMovie;
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: Spacing.width4,
      width: Spacing.width200,
      gap: Spacing.width8,
      justifyContent: 'space-between',
    },
    image: {
      width: Spacing.width200,
      height: Spacing.width280,
      borderRadius: Spacing.width4,
    },
    viewName: {

      height: Spacing.height50,
      justifyContent: 'center',
      marginVertical: Spacing.width8,
    },
    name: {

      fontSize: FontSize.FontSize20,
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
      flexDirection: 'row',

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
