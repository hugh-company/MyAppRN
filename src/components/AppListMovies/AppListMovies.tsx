import { BrandIcon, LikeActiveIcon, NoSearchImage } from '@assets';
import { AppFlatListAnimated, AppImage, AppText, ItemSearchMovie } from '@components';
import { Spacing, useTheme } from '@theme';
import { PostTypeKey } from '@types';
import { getPrettyNumberString, goToDetail } from '@utils';
import { t } from 'i18next';
import React, { forwardRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface AppListMoviesProps {
  data: any[];
  onScroll?: | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
  | undefined;
  scrollEventThrottle?: number;
  numColumns?: number;
  type?: PostTypeKey;
  onLoadMore?: () => void;
  keyExtractor?: ((item: any, index: number) => string) | undefined;
  isLoadMore?: boolean;
  isLoading?: boolean;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  contentContainerStyle?: StyleProp<ViewStyle>
}

const AppListMovies = forwardRef((props: AppListMoviesProps, ref: React.ForwardedRef<FlatList<any>> | undefined) => {
  const { data, contentContainerStyle, scrollEventThrottle, isLoading, type, keyExtractor, numColumns = 2, onScroll, onLoadMore, ListHeaderComponent } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const renderItem = ({ item }: { item: any }) => {
    if (numColumns !== 1) {
      return (
        <TouchableOpacity onPress={() => goToDetail({ item, type: type || item?.posttype })} style={styles.item}>
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
                <AppText style={styles.txtLike}>{getPrettyNumberString(item.views ?? 0)} {t(type === PostTypeKey.GAMES ? 'home.playGame' : 'home.viewer')}</AppText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <ItemSearchMovie item={item} />;
    }
  };
  const keyExtractorList = (item: any, index: number) => item?.id || index.toString();
  const ListEmptyComponentBase = React.useCallback(() => {
    if (!isLoading) {
      return (
        <View style={styles.viewEmpty}>
          <AppImage defaultSource={NoSearchImage} style={styles.imageNotFound} />
          <AppText style={styles.txtNotFound}>{t('notFound')}</AppText>
        </View>
      );
    }
    return null;
  }, [isLoading]);
  return (
    <AppFlatListAnimated
      ref={ref}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      data={data}
      horizontal={numColumns === 1}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      keyExtractor={keyExtractor || keyExtractorList}
      numColumns={numColumns}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponentBase}
      ListHeaderComponent={ListHeaderComponent}
      onLoadMore={onLoadMore}
      isLoading={props.isLoadMore}
      columnWrapperStyle={numColumns !== 1 ? styles.columnWrapper : undefined}
    />
  );
});

export default AppListMovies;
