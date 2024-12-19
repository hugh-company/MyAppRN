import { RightIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { favoriteMovies } from '@services';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { t } from 'i18next';
import React, { useRef, useState } from 'react';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface MovieHomeProps {
  style?: StyleProp<ViewStyle>;
  title: string
}
const MovieWithSlider = ({ style, title }: MovieHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });
  const data = favoriteMovies;
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemType}>
        <FlatList style={styles.listMovie} scrollEnabled={false} numColumns={2} data={item.data} keyExtractor={(item) => item.id.toString()} renderItem={({ item, index }) => {
          return (
            <View style={[styles.btnMovie, index % 2 === 0 && { marginRight: Spacing.width16 }]}>
              <AppImage uri={item.image} style={styles.image} />
            </View>
          );
        }} />
        <View style={styles.viewType}>
          <AppText style={styles.txtType}>
            {item.title}
          </AppText>
          <RightIcon />
        </View>

      </View>
    );
  };
  return (
    <View style={styles.container}>


      <View style={styles.header}>
        <AppText style={styles.title}>
          {title}
        </AppText>
        <View style={styles.btnViewMore}>
          <AppText style={styles.txtViewMore}>
            {t('home.viewMore')}
          </AppText>
          <RightIcon />
        </View>
      </View>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(data, index) => (
          { length: Spacing.width240, offset: Spacing.width240 * index, index }
        )}
        initialNumToRender={3}
      />
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>



    </View>
  );
};
export default MovieWithSlider;
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
      fontSize: FontSize.FontSize16,
      color: '#EDEDED',
      ...FontWithFamily.FontWithFamily_600,
    },
    image: {
      width: Spacing.width92,
      height: Spacing.width92,
      borderRadius: Spacing.width4,
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
    btnViewMore: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtViewMore: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',

      marginTop: Spacing.width16,

      alignSelf: 'center',
      backgroundColor: themeColors.btnSocial,
      padding: 4,
      borderRadius: Spacing.width8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: themeColors.primary,
    },
    inactiveDot: {
      backgroundColor: themeColors.disable,
    },

    itemType: {
      borderRadius: Spacing.width12,
      borderWidth: 1,
      borderColor: themeColors.btnSocial,
      width: Spacing.width240,
      marginLeft: Spacing.width16,
      padding: Spacing.width16,
    },
    viewType: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Spacing.width12,
    },
    txtType: {
      fontSize: FontSize.FontSize14,
      color: themeColors.subtile,
      ...FontWithFamily.FontWithFamily_600,
    },

    btnMovie: {
      marginBottom: Spacing.width16,

    },
    listMovie: {


    },
  });
