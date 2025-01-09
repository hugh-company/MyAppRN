import { BrandIcon, LikeActiveIcon } from '@assets';
import { AppFlatListAnimated, AppImage, AppText, ItemSearchMovie } from '@components';
import { Spacing, useTheme } from '@theme';
import { PostTypeKey } from '@types';
import { getPrettyNumberString, goToDetail } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
export interface AppListMoviesProps {
  data: any[];
  onScroll?: | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
  | undefined;
  scrollEventThrottle?: number;
  numColumns?: number;
  type?: PostTypeKey;
  onLoadMore?: () => void;
}

const AppListMovies = ({ data, scrollEventThrottle, type, numColumns = 2, onScroll, onLoadMore }: AppListMoviesProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const renderItem = ({ item }: { item: any }) => {
    if (numColumns === 2) {
      return (
        <TouchableOpacity onPress={() => goToDetail({ item, type })} style={styles.item}>
          <AppImage uri={item.feature?.path} style={styles.image} />
          <View style={styles.viewInfo}>
            <AppText numberOfLines={2} style={styles.name}>{item.title}</AppText>
            <View style={styles.viewOption}>
              <View style={styles.viewRow}>
                <LikeActiveIcon size={Spacing.width10} color={themeColors.star} />
                <AppText style={styles.txtView}>
                  {getPrettyNumberString(item.like_count ?? 0)}
                </AppText>
              </View>

              <View style={styles.viewRow}>
                <BrandIcon />
                <AppText style={styles.txtLike}>{getPrettyNumberString(item.views ?? 0)} {t('home.viewer')}</AppText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <ItemSearchMovie item={item} />;
    }
  };
  return (
    <AppFlatListAnimated
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      data={data}
      horizontal={numColumns === 1}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      renderItem={renderItem}
      onLoadMore={onLoadMore}
      columnWrapperStyle={numColumns === 2 ? styles.columnWrapper : undefined}
    />

  );
};

export default AppListMovies;
