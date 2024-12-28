import { BrandIcon, LikeActiveIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export interface ItemMovieProps {
  item: any;
}
const ItemMovie = ({ item }: ItemMovieProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <TouchableOpacity onPress={() => navigate(SCREEN_ROUTE.MOVIE_DETAIL, { movie: item })} style={styles.container}>
      <AppImage uri={item?.image} style={styles.image} />
      <AppText numberOfLines={2} style={styles.name}>{item.name}</AppText>
      <View style={styles.viewOption}>
        <View style={styles.viewRow}>
          <LikeActiveIcon size={Spacing.width16} color={themeColors.star} />
          <AppText style={styles.txtView}>
            {getPrettyNumberString(item.views)}
          </AppText>
        </View>

        <View style={styles.viewRow}>
          <BrandIcon />
          <AppText style={styles.txtLike}>{getPrettyNumberString(item.likes)} {t('home.viewer')}</AppText>
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
      marginLeft: Spacing.width16,
      width: Spacing.width240,
      gap: Spacing.width8,
    },
    image: {
      width: Spacing.width240,
      height: Spacing.width320,
      borderRadius: Spacing.width4,
    },
    name: {
      marginVertical: Spacing.width8,
      fontSize: FontSize.FontSize24,
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
