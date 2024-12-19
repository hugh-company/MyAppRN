import { ImageBackgroundDating } from '@assets';
import { AppButton, AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface DatingHomeProps {
  style?: StyleProp<ViewStyle>
}
export const DatingHome = ({ style }: DatingHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);


  return (
    <View style={styles.container}>
      <AppImage defaultSource={ImageBackgroundDating} style={styles.image} />

      <AppText style={styles.title}>
        {t('home.datingTitle')}
      </AppText>
      <AppText style={styles.des}>
        {t('home.datingDescription')}
      </AppText>
      <AppButton labelStyle={styles.txtBtn} label={t('home.goDating')} style={styles.btn} />
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.width48,
      marginBottom: Spacing.width24,
    },
    list: {
      flexDirection: 'row',
      // flexWrap: 'wrap',
      width: '100%',
      height: Spacing.width76 * 3 + Spacing.width16,
      // justifyContent: 'center',
      // alignItems: 'center',

    },
    btn: {
      alignSelf: 'center',
      paddingHorizontal: Spacing.width24,
    },
    txtBtn: {
      flex: 0,
    },
    image: {
      width: '100%',
      height: Spacing.height262,
    },
    title: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
      textAlign: 'center',
    },
    des: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_300,
      color: themeColors.grey,
      textAlign: 'center',
      width: '80%',
      alignSelf: 'center',
      marginVertical: Spacing.width12,
    },

  });
