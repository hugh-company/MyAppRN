import { AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import { BannerInterface } from '@types';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useBannerData } from '../../../../hooks/useBanner';

interface BannerPromotionsProps {
  title?: string;
}

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.9;
const IMAGE_HEIGHT = Spacing.width100;

export const BannerPromotions: React.FC<BannerPromotionsProps> = ({ title }) => {
  const { themeColors: ThemeColors } = useTheme();
  const styles = createStyles(ThemeColors);
  const { data } = useBannerData();
  return (
    <View style={styles.container}>
      {(title) ? (
        <View style={styles.headerRow}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.seeAll}>Tất cả</AppText>
        </View>
      ) : null}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }: { item: BannerInterface }) => (
          <TouchableOpacity
            style={styles.imageContainer}
            // onPress={item.onPress}
            activeOpacity={0.8}
          >
            <AppImage
              uri={item.thumbnail?.url}
              style={styles.image}
              resizeMode="contain"
              isBase={false}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColors.whiteColor,
      paddingTop: Spacing.width32,
      paddingBottom: Spacing.width8,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.width16,
      flex: 1,
      marginBottom: Spacing.height12,
    },
    title: {
      fontSize: FontSize.FontSize16,
      fontWeight: 'bold',
      flex: 1,
      color: themeColors.text,
    },
    seeAll: {
      fontSize: FontSize.FontSize12,
      color: themeColors.placeholder,
    },
    listContent: {
      paddingHorizontal: 16,
    },
    imageContainer: {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      marginRight: 16,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#f0f0f0',
    },
    image: {
      width: '100%',
      height: '100%',
      // borderRadius: 8,
    },
  });
