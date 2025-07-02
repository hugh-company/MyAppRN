import { BackgroundHeader, LogoTextIcon } from '@assets';
import { AppImage } from '@components';
import { useTheme } from '@theme';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyles } from './styles';

export interface ContainerAuthProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>
}
const ContainerAuth = ({ children, style }: ContainerAuthProps) => {
  const { themeColors } = useTheme();

  const styles = createStyles(themeColors);
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
      <AppImage defaultSource={BackgroundHeader} style={styles.headerBackground} resizeMode="cover" />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

        <View style={[styles.header, { paddingTop: top }]}>
          <View style={styles.logoContainer}>
            <AppImage defaultSource={LogoTextIcon} style={styles.images} resizeMode='contain' />
          </View>
        </View>



        <View style={style}>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ContainerAuth;
