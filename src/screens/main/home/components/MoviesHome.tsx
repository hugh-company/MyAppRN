import { ImageMovie } from '@assets';
import { AppImage, AppText, ItemMovie, MovieWithSlider } from '@components';
import { categoryMovies, movies } from '@services';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { FlatList, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface MovieHomeProps {
  style?: StyleProp<ViewStyle>;

}
export const MovieHome = ({ style }: MovieHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [activeCategory, setActiveCategory] = React.useState(1);

  const renderItem = ({ item }) => {
    return (
      <ItemMovie item={item} />
    );
  };
  return (
    <View style={styles.container}>


      <View style={styles.header}>
        <AppText style={styles.title}>
          {t('home.libraryMovie')}
        </AppText>
        <AppImage defaultSource={ImageMovie} style={styles.image} />
      </View>
      <View style={styles.body} >
        <FlatList style={styles.viewCategory}
          data={categoryMovies}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {
                setActiveCategory(item.id);
              }} style={[styles.itemCategory, activeCategory === item.id && styles.btnActiveCategory]} >
                <AppText style={[styles.txtCategory, activeCategory === item.id && styles.txtActiveCategory]}>
                  {item.title}
                </AppText>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList data={movies} horizontal keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />
      </View>

      {/*  */}
      <MovieWithSlider title={t('home.typeFavorite')} />
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.width48,
      marginBottom: Spacing.width24,

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
