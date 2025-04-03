import { EyeIcon, RightIcon } from '@assets';
import { useTheme } from '@theme';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppText } from '../AppText';
import { createStyles } from './styles';
export interface AppButtonViewMoreProps {
  onPress?: () => void;
  type?: PostTypeKey;
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'large';
}
const AppButtonViewMore = ({ onPress, type = PostTypeKey.MOVIES, style, size = 'large' }: AppButtonViewMoreProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[size === 'small' ? styles.containerSizeSmall : styles.containerSizeLarge]} onPress={onPress}>
        <View style={size === 'small' ? styles.viewIconSizeSmall : styles.viewIconSizeLarge}>
          <EyeIcon color={'white'} />
        </View>
        {size === 'large' && <AppText style={styles.titleSizeLarge}>{t('titleViewMore').replace('POST', t(`navigation.${type.toLocaleLowerCase()}`).toLocaleLowerCase())} </AppText>}
        <View style={styles.viewMore}>
          <AppText style={styles.txt}>{t('home.viewMore')} </AppText>
          <RightIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppButtonViewMore;
