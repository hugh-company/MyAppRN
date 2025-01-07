import { ImageBook, ImageGame, ImageMovie } from '@assets';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { KeyHomeData } from '@types';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppCategoryList } from '../AppCategoryList';
import { AppImage } from '../AppImage';
import { AppText } from '../AppText';
interface HeaderItemHomeProps {
  title?: string;
  categoryIdSelected: number;
  categories: { id: number, name: string }[];
  onSelectedCategory: (category: number) => void;
  type?: KeyHomeData;
  style?: StyleProp<ViewStyle>;
  styleHeader?: StyleProp<ViewStyle>
}

export const HeaderItemHome: React.FC<HeaderItemHomeProps> = ({
  title,
  type = KeyHomeData.MOVIES,
  categoryIdSelected,
  categories,
  onSelectedCategory,
  style, styleHeader,
}) => {
  const { themeColors } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);
  const renderIcon = (typeAp: KeyHomeData) => {
    switch (typeAp) {
      case KeyHomeData.MOVIES:
        return ImageMovie;
      case KeyHomeData.GAMES:
        return ImageGame;
      case KeyHomeData.COMIC:
        return ImageBook;

    }
  };
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.header]}>
        <AppText style={styles.title}>
          {title}
        </AppText>
        <AppImage defaultSource={renderIcon(type)} style={styles.image} />
      </View>

      <View style={[styles.body, styleHeader]} >
        <AppCategoryList data={categories} categoryId={categoryIdSelected} onSelectedCategory={(item) => onSelectedCategory?.(item?.id)} />

      </View>
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      marginTop: -Spacing.width8,
      overflow: 'hidden',
      backgroundColor: themeColors.background,
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
  });
