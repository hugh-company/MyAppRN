import { AppInputSearchDomain, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { itemDetailInterface } from '@types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface HeaderDetailProps {
  data: itemDetailInterface
}

export function HeaderDetail(props: HeaderDetailProps) {
  const { } = props
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4ABAB9", themeColors.primary]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <AppText style={styles.title} numberOfLines={1}>
        {props.data.title || 'Header Detail'}
      </AppText>
      <AppText style={styles.description} numberOfLines={1}>
        {props.data.description || 'This is a description for the header detail.'}
      </AppText>
      <AppInputSearchDomain
        style={styles.containerInput}
        editable={false}
        placeholder='Nhập tên miền bạn muốn đăng ký'
        onClickSearch={() => navigate(SCREEN_ROUTE.SEARCH_DOMAIN)}

      />

    </View>
  );
};
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

      alignItems: 'center',
      justifyContent: 'space-between',
      padding: Spacing.width16,

      gap: Spacing.width8

    },
    title: {
      fontSize: FontSize.FontSize18,

      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.whiteColor,
      textAlign: 'center',
      flex: 1,

    },
    description: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
      color: themeColors.whiteColor,
      textAlign: 'center',
      flex: 1,
    },
    inputSearch: {
      width: '100%',
      height: Spacing.height40,
      borderRadius: 20,
      backgroundColor: themeColors.whiteColor,
      paddingHorizontal: Spacing.width16,
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
    },
    btnBack: {
      padding: 8,
    },
    containerInput: {
      width: '100%',
      height: Spacing.height40,
      borderRadius: 20,


      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
      marginTop: Spacing.width8,
    }
  });
