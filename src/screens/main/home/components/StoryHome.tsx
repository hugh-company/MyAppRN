import { HorizontalList, ListProductCategory } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { KeyHomeData, Module } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface StoryHomeProps {
  style?: StyleProp<ViewStyle>;
  data?: Module;
}
export const StoryHome = ({ style, data }: StoryHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  return (
    <View style={styles.container}>
      <ListProductCategory
        title={data?.label}
        data={data?.latest}
        type={KeyHomeData.COMIC}
        categories={data?.tabs} />
      <HorizontalList
        title={t('home.multiplayer')}
        type={KeyHomeData.COMIC} data={data?.trending || []}
        titleViewMore={t('home.rank')} />
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

      marginTop: Spacing.width24,
    },
    header: {
      marginTop: -Spacing.height24,

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
