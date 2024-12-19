import { Background } from '@assets';
import { AppText, LoginSocial } from '@components';
import { useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createStyles } from './styles';

export interface ContainerAuthProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>
}
const ContainerAuth = ({ children, style }: ContainerAuthProps) => {
  const { themeColors } = useTheme();

  const styles = createStyles(themeColors);


  return (
    <View style={[styles.container]}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.viewBackground]} >
          <Animated.Image
            source={Background}  // Your image URL here
            style={[styles.image]}
          />
          <AppText style={styles.txtTitle}>{t('login.title')}</AppText>
        </View>

        <LoginSocial />

        <View style={style}>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ContainerAuth;
