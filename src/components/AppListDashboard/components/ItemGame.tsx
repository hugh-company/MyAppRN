import { LikeActiveIcon, PlayIcon } from '@assets';
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
}
const ItemGame = ({ item }: ItemGameProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => navigate(SCREEN_ROUTE.GAME_DETAIL, { game: item })} style={styles.container}>
      <AppImage uri={item?.feature.square} style={styles.image} />

      {/*  */}
      <View style={styles.viewInfo}>
        <AppText numberOfLines={2} style={styles.name}>{item.title}</AppText>
        <View style={styles.viewOption}>
          <AppText style={styles.txtView}>
            {`${item?.terms?.tags?.map((elm) => elm.name)?.join(', ')}`}
          </AppText>

          <View style={[styles.viewRow, {}]}>
            <LikeActiveIcon color={themeColors.star} size={Spacing.width12} />
            <AppText style={styles.txtLike}>{getPrettyNumberString(item.like_count)} {t('home.likes')}</AppText>
          </View>
        </View>
      </View>
      {/*  */}
      <View style={styles.viewPlay}>
        <View style={styles.btnPlay}  >
          <PlayIcon size={Spacing.width16} />
          <AppText style={styles.txtPlay}>{t('play')}</AppText>
        </View>
        <View style={styles.viewRow}>
          <PlayIcon color={themeColors.primary} size={Spacing.width12} />
          <AppText style={styles.txtLike}>{getPrettyNumberString(item.views)} {t('home.playGame')}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemGame;
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: Spacing.width8,
      marginBottom: Spacing.width16,
      marginHorizontal: Spacing.width16,
    },
    image: {
      width: Spacing.width96,
      height: Spacing.width96,
      borderRadius: Spacing.width4,
    },
    viewInfo: {
      flex: 1,
      alignItems: 'baseline',
      justifyContent: 'space-between',
    },
    name: {
      flex: 1,
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
      gap: 8,
      flex: 1,
      justifyContent: 'flex-end',
    },
    txtView: {
      fontSize: FontSize.FontSize10,
      color: themeColors.subtile,

    },

    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',

      gap: 4,
    },
    viewPlay: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.width4,
    },
    btnPlay: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Spacing.width8,
      paddingVertical: Spacing.width4,
      gap: 4,
      backgroundColor: themeColors.primary,
      borderRadius: 50,
    },
    txtPlay: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
    },

    txtLike: {
      fontSize: FontSize.FontSize10,
      color: themeColors.subtile,
    },

  });
