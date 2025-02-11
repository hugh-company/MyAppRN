import { CheckIcon, FlagEnglish, FlagVietNam } from '@assets';
import { AppBottomModal, AppText } from '@components'; // Update import
import { FontSize, FontWithFamily, Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ModalMenuVideoProps {
  visible: boolean;
  onClose: () => void;
  currentLanguage?: string;
}
export const ModalMenuVideo = ({ visible, onClose, currentLanguage }: ModalMenuVideoProps) => {

  const { bottom } = useSafeAreaInsets();

  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);


  const menu = [
    {
      name: t('movie.speed'),
      icon: <FlagEnglish />,
      code: 'speed',
    },
    {
      name: t('movie.mute'),
      icon: <FlagVietNam />,
      code: 'vi',
    },
  ];
  return (
    <AppBottomModal
      visible={!!visible} // Ensure isVisible is a boolean
      onClose={onClose}
      onSwipeOut={onClose}
    >
      <View style={[styles.container, { paddingBottom: bottom || Spacing.width16 }]}>
        <View style={styles.viewLine} />
        <View style={styles.body}>
          <AppText style={styles.title}>{t('drawer.selectLanguage')}</AppText>
          <AppText style={styles.subtitle}>{t('drawer.choosePreferredLanguage')}</AppText> {/* New subtitle */}
          <View style={styles.list}>
            {
              menu.map((item, index) => (
                <View key={index} style={[styles.item, currentLanguage === item.code ? styles.btnActive : null]}  >
                  <View style={styles.flag}>
                    {item.icon}
                    <AppText style={styles.textItem}>{item.name}</AppText>
                  </View>
                  {currentLanguage === item.code && <CheckIcon />}
                </View>
              ))
            }

          </View>
        </View>
      </View>
    </AppBottomModal>
  );
};
const createStyles = (themeColors: any) => StyleSheet.create({
  container: {
    backgroundColor: themeColors.background,
    // height: Spacing.height200,
  },
  title: {
    fontSize: FontSize.FontSize18,
    ...FontWithFamily.FontWithFamily_600,
  },
  subtitle: {  // New subtitle style
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_400,
    color: themeColors.textSecondary,
    marginTop: Spacing.width8,
  },
  description: {},
  viewLine: {
    width: Spacing.width32,
    height: 4,
    backgroundColor: themeColors.whiteColor,
    borderRadius: 4,
    alignSelf: 'center',
  },
  body: {
    padding: Spacing.width16,
  },
  list: {
    marginTop: Spacing.width16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.width16,
    paddingHorizontal: Spacing.width8,
  },

  flag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.width8,
  },
  btnActive: {
    backgroundColor: themeColors.btnSocial,
    borderRadius: Spacing.width8,
  },
  textItem: {
    fontSize: FontSize.FontSize18,
    ...FontWithFamily.FontWithFamily_400,
  },
});
