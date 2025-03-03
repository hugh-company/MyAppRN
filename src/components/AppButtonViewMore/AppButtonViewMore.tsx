import { DoubleArrowIcon } from '@assets';
import { Spacing, useTheme } from '@theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
export interface AppButtonViewMoreProps {
  onPress?: () => void;
}
const AppButtonViewMore = ({ onPress }: AppButtonViewMoreProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerSizeSmall} onPress={onPress}>
        <DoubleArrowIcon size={Spacing.width30} />
        {/* <AppText style={styles.txt}>{t('home.viewMore')}</AppText> */}
      </TouchableOpacity>
    </View>
  );
};

export default AppButtonViewMore;
