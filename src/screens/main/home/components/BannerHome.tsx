import { AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import React, { useRef, useState } from 'react';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BannerHomeProps {
  data: { image: string, title: string, description: string }[];
  style?: StyleProp<ViewStyle>
}
export const BannerHome = ({ data, style }: BannerHomeProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.btn}>
            <AppImage uri={item.image} style={styles.image} />
            <LinearGradient
              colors={['#1400AE', 'rgba(115, 115, 115, 0)']}
              style={styles.overlay}
            />
            <LinearGradient
              colors={['#B1062E', 'rgba(0, 0, 0, 0)']}
              locations={[0, 1]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.linear}
            />

            <View style={styles.infoBanner}>
              <AppText style={styles.descriptionBanner} numberOfLines={2}>{item.description}</AppText>
              <AppText style={styles.titleBanner}>{item.title}</AppText>

            </View>

          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(data, index) => (
          { length: WidthScreen, offset: WidthScreen * index, index }
        )}
      // initialNumToRender={3}
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

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

    },

    btn: {
      width: WidthScreen,
      height: Spacing.height315,
    },
    image: {
      width: '100%',
      height: Spacing.height315,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',

      bottom: 10,
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
    overlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 4,
    },
    linear: {
      ...StyleSheet.absoluteFillObject,
    },
    infoBanner: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      padding: Spacing.width16,

      alignItems: 'center',
      justifyContent: 'center',
    },
    titleBanner: {
      fontSize: FontSize.FontSize32,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
      marginTop: Spacing.width24,
    },
    descriptionBanner: {
      fontSize: FontSize.FontSize24,
      color: themeColors.text,
    },
  });
