import { ListProductCategory, SliderList } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { KeyHomeData, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface MovieHomeProps {
  style?: StyleProp<ViewStyle>;
  data?: any;
  isReset?: boolean;
}
export const MovieHome = ({ style, data, isReset }: MovieHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={[styles.container, style]}>
      <ListProductCategory title={data?.label} type={KeyHomeData.MOVIES} categories={data?.tabs} reset={isReset} />
      <SliderList title={t('home.libraryMovie')} data={data?.term_favourite || []} type={PostTypeKey.MOVIES} />
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.width48,

    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.width24,
      marginHorizontal: Spacing.width16,

    },
    title: {
      fontSize: FontSize.FontSize24,
      ...FontWithFamily.FontWithFamily_600,
    },
    image: {
      width: Spacing.width92,
      height: Spacing.width92,
    },
    body: {
      borderWidth: 1,
      borderTopColor: themeColors.btnSocial,
      borderBottomWidth: 0,
      // borderBottomWidth: 1,
      // borderBottomColor: themeColors.btnSocial,
      borderTopLeftRadius: Spacing.width12,
      borderTopRightRadius: Spacing.width12,
    },
    viewCategory: {

      marginBottom: Spacing.width24,
      marginTop: Spacing.width16,
    },
    itemCategory: {
      height: Spacing.width40,
      maxWidth: Spacing.width160,
      minWidth: Spacing.width70,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Spacing.width20,

      paddingHorizontal: Spacing.width16,
    },
    btnActiveCategory: {

      backgroundColor: themeColors.whiteColor,


    },
    txtCategory: {
      fontSize: FontSize.FontSize16,
      color: themeColors.subtile,
    },
    txtActiveCategory: {
      fontSize: FontSize.FontSize16,
      color: themeColors.primary,
      ...FontWithFamily.FontWithFamily_600,
    },
    txtSubTitle: {
      fontSize: FontSize.FontSize16,
      color: '#EDEDED',
      ...FontWithFamily.FontWithFamily_600,
    },
    btnViewMore: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtViewMore: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
    },
  });
