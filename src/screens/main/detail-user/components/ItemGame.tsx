import { BrandIcon, LikeActiveIcon, PlayIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ItemListProduct } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export interface ItemGameProps {
  item: ItemListProduct;
  onPress?: () => void;
}
const ItemGame = ({ item, onPress }: ItemGameProps) => {
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
      <View>
        <View>
          <AppImage uri={image} style={styles.image} />
          <View style={styles.btnPlay}>

            <AppText style={styles.txtLike}>{t('playGame')}</AppText>
            <PlayIcon size={Spacing.width24} />
          </View>
        </View>
        <AppText numberOfLines={2} style={styles.name}>{item.title}</AppText>
      </View>
      <View style={styles.viewOption}>
        <View style={styles.viewRow}>
          <LikeActiveIcon size={Spacing.width16} color={themeColors.star} />
          <AppText style={styles.txtView}>
            {getPrettyNumberString(item.like_count)}
          </AppText>
        </View>

        <View style={styles.viewRow}>
          <BrandIcon />
          <AppText style={styles.txtLike}>{getPrettyNumberString(item.views)} {t('home.viewer')}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemGame;
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderRadius: Spacing.width4,
      marginLeft: Spacing.width16,
      width: Spacing.width240,
      gap: Spacing.width8,
      justifyContent: 'space-between',
    },
    image: {
      width: Spacing.width240,
      height: Spacing.width320,
      borderRadius: Spacing.width8,
      overflow: 'hidden',
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
    btnPlay: {
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      bottom: Spacing.width8,
      // right: Spacing.width8,
      // left: Spacing.width8,
      backgroundColor: themeColors.primary,
      borderRadius: Spacing.width16,
      paddingVertical: Spacing.width4,
      paddingHorizontal: Spacing.width12,
    },
  });
