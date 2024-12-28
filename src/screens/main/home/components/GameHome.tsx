import { HeaderItemHome, HorizontalList, ItemGame } from '@components';
import { categoryMovies, movies } from '@services';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { TypeListMovie } from '@types';
import { t } from 'i18next';
import React from 'react';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface GameHomeProps {
  style?: StyleProp<ViewStyle>;

}
export const GameHome = ({ style }: GameHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [activeCategory, setActiveCategory] = React.useState(1);

  const renderItem = ({ item }) => {
    return (
      <ItemGame item={item} />
    );
  };
  return (
    <View style={styles.container}>
      <HeaderItemHome title={t('home.gameOnline')} categoryIdSelected={activeCategory} type="games" categories={categoryMovies} onSelectedCategory={setActiveCategory} styleHeader={styles.header} />

      <FlatList showsHorizontalScrollIndicator={false} data={movies} horizontal keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />

      {/*  */}
      <HorizontalList title={t('home.typeFavorite')} type={TypeListMovie.GAMES} data={movies} titleViewMore={t('home.rank')} />
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
