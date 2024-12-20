import { BrandIcon, LikeActiveIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { useTheme } from '@theme';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { createStyles } from './styles';
export interface ItemGameProps {
  item: any;
}
const ItemGame = ({ item }: ItemGameProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppImage uri={item?.image} style={styles.image} />
      <AppText numberOfLines={2} style={styles.name}>{item.name}</AppText>
      <View style={styles.viewOption}>
        <View style={styles.viewRow}>
          <LikeActiveIcon color={themeColors.star} />
          <AppText style={styles.txtView}>
            {getPrettyNumberString(item.views)}
          </AppText>
        </View>

        <View style={styles.viewRow}>
          <BrandIcon />
          <AppText style={styles.txtLike}>{getPrettyNumberString(item.likes)} {t('home.playGame')}</AppText>
        </View>
      </View>
    </View>
  );
};

export default ItemGame;
