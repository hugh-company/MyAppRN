import { CheckIcon, FlagEnglish, FlagVietNam } from '@assets';
import { useLanguage } from '@hooks';
import { Spacing, useTheme } from '@theme';
import i18next, { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, View } from 'react-native';
import { BottomModal } from 'react-native-modals';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../AppText';
import { createStyles } from './styles';

export interface ModalChangeLanguageProps { }
const ModalChangeLanguage = ({ }: ModalChangeLanguageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);
  const { changeLanguage } = useLanguage();
  const { bottom } = useSafeAreaInsets();
  useEffect(() => {
    DeviceEventEmitter.addListener('showModalChangeLanguage', (status) => {
      console.log({ status });

      setIsVisible(status);
    });

    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18next.on('languageChanged', handleLanguageChanged);

    return () => {
      DeviceEventEmitter.removeAllListeners('showModalChangeLanguage');
      i18next.off('languageChanged', handleLanguageChanged);
    };
  }, []);
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const onCancel = () => {
    setIsVisible(false);
  };

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    setIsVisible(false);

  };

  const dataLanguage = [
    {
      name: t('drawer.english'),
      icon: <FlagEnglish />,
      code: 'en',
    },
    {
      name: t('drawer.vietnamese'),
      icon: <FlagVietNam />,
      code: 'vi',
    },
  ];
  return (
    <BottomModal
      visible={!!isVisible} // Ensure isVisible is a boolean
      onTouchOutside={onCancel}
      onSwipeOut={onCancel}
    >
      <View style={[styles.container, { paddingBottom: bottom || Spacing.width16 }]}>
        <View style={styles.viewLine} />
        <View style={styles.body}>
          <AppText style={styles.title}>{t('drawer.selectLanguage')}</AppText>
          <View style={styles.list}>
            {
              dataLanguage.map((item, index) => (
                <View key={index} style={[styles.item, currentLanguage === item.code ? styles.btnActive : null]} onTouchEnd={() => handleLanguageChange(item.code)}>
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
    </BottomModal>
  );
};

export default ModalChangeLanguage;
