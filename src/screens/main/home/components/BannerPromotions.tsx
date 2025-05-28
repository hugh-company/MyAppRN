import { AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

interface BannerPromotionsProps {
  title?: string;
  data: { id: number; img: string; onPress?: () => void }[];
}

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.6;
const IMAGE_HEIGHT = Spacing.width125;

export const BannerPromotions: React.FC<BannerPromotionsProps> = ({ title, data }) => {
  const { themeColors: ThemeColors } = useTheme();
  const styles = createStyles(ThemeColors);
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
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={item.onPress}
            activeOpacity={0.8}
          >
            <AppImage
              uri={item.img}
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
