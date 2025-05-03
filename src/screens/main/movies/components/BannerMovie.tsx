import { LikeActiveIcon, PlayStackedIcon } from '@assets';
import { AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { ItemListProduct } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React, { useCallback } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { StackedImageSwiper } from '../../../../components/StackedImageSwiper';

interface BannerMovieProps {
  data: ItemListProduct[];
  style?: StyleProp<ViewStyle>;
  title?: string;
  isGame?: boolean;
}

export const BannerMovie = ({ data, style, title, isGame = false }: BannerMovieProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  // Shared Animated.Value for syncing scroll
  const sharedScrollX = React.useRef(new Animated.Value(0)).current;
  const imageUrl = title?.startsWith('https') ? title : data[0]?.feature?.path;
  const renderDots = useCallback(() => (
    <View style={styles.dotsContainer}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * WidthScreen,
          index * WidthScreen,
          (index + 1) * WidthScreen,
        ];
        const dotScale = sharedScrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { transform: [{ scale: dotScale }] },
            ]}
          />
        );
      })}
    </View>
  ), [data, sharedScrollX]);

  const renderItemInfo = useCallback(() => (
    <>
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: sharedScrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.infoCard}>
            <AppText style={styles.nameMovie}>{item?.title}</AppText>
            <View style={styles.viewOption}>
              {!isGame && (
                <View style={styles.viewRow}>
                  <PlayStackedIcon />
                  <AppText style={styles.txtView}>
                    {getPrettyNumberString(item?.episode_total ?? 0)}/{getPrettyNumberString(item?.episode_total ?? 0)} {t('home.episodes')}
                  </AppText>
                </View>
              )}
              <View style={styles.viewRow}>
                <LikeActiveIcon size={Spacing.width16} color={themeColors.star} />
                <AppText style={styles.txtLike}>
                  {getPrettyNumberString(item?.like_count ?? 0)} {t('home.likes')}
                </AppText>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.infoDotsContainer}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * WidthScreen,
            index * WidthScreen,
            (index + 1) * WidthScreen,
          ];
          const dotScale = sharedScrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { transform: [{ scale: dotScale }] },
              ]}
            />
          );
        })}
      </View>
    </>
  ), [data, sharedScrollX, isGame, themeColors]);

  return (
    <View style={[styles.container, style]}>
      {/* Part 1: Stacked images – pass the sharedScrollX to sync scroll */}
      <StackedImageSwiper
        data={data.map(item => ({ uri: item?.feature?.path }))}
        scrollX={sharedScrollX}
      />
      {/* Part 2: Info list with horizontal scroll and dots */}
      {renderItemInfo()}
      {renderDots()}
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    bannerContainer: {
      height: Spacing.height315, // Tăng chiều cao container để phù hợp với ảnh
      marginBottom: Spacing.width16,
    },
    bannerItem: {
      width: WidthScreen, // Đảm bảo chiều rộng bằng màn hình
      height: '100%', // Chiều cao bằng container
      justifyContent: 'center',
      alignItems: 'center',
    },
    bannerImage: {
      width: 300, // fixed width in pixels
      height: 200, // fixed height in pixels
      borderRadius: Spacing.width16,
      overflow: 'hidden',
      backgroundColor: themeColors.background, // Thêm màu nền để kiểm tra
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: Spacing.width8,
    },
    dot: {
      width: Spacing.width8,
      height: Spacing.width8,
      borderRadius: Spacing.width4,
      backgroundColor: themeColors.btnSocial,
      marginHorizontal: Spacing.width4,
    },
    infoContainer: {
      paddingHorizontal: Spacing.width16,
    },
    nameMovie: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_600,
      marginBottom: Spacing.width8,
    },
    viewOption: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width16,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width4,
    },
    txtView: {
      fontSize: FontSize.FontSize14,
    },
    txtLike: {
      fontSize: FontSize.FontSize12,
    },
    infoCard: {
      width: WidthScreen, // Adjust as needed
      paddingHorizontal: Spacing.width16,
      paddingVertical: Spacing.width16,
    },
    infoDotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: Spacing.width8,
    },
  });
