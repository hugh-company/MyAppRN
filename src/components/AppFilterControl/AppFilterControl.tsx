import { AppBottomModal, AppText } from '@components';
import { useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
export interface AppFilterControlProps {
  visible: boolean;
  onClose?: () => void;

}
const AppFilterControl = ({
  visible,
  onClose,
}: AppFilterControlProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);


  const onReset = () => {

  };
  return (
    <AppBottomModal
      width={1}
      height={0.7}
      visible={visible}
      onClose={() => {
        onClose?.();
      }}
      modalStyle={{ backgroundColor: themeColors.background }} >
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText style={styles.txtFilter}>{t('filter')}</AppText>
          <TouchableOpacity style={styles.btnReset} onPress={onReset}>
            <AppText style={styles.txtReset}>{t('reset')}</AppText>
          </TouchableOpacity>
        </View>


      </View>
    </AppBottomModal>
  );
};

export default AppFilterControl;
