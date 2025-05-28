import { AppText } from '@components';
import { FontSize, FontWithFamily, ThemeColors, useTheme } from '@theme';
import { itemDetailInterface } from '@types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
export interface HeaderDetailProps {
  data: itemDetailInterface
}

export function HeaderDetail(props: HeaderDetailProps) {
  const { } = props
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppText style={styles.title} numberOfLines={1}>
        {props.data.title || 'Header Detail'}
      </AppText>
    </View>
  );
};
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: themeColors.primary,

    },
    title: {
      fontSize: FontSize.FontSize18,

      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.whiteColor,
      textAlign: 'center',
      flex: 1,

    },
    btnBack: {
      padding: 8,
    },
  });
