import { NoSearchImage } from '@assets';
import { useTheme } from '@theme';
import { t } from 'i18next';
import React, { forwardRef } from 'react';
import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, RefreshControlProps, StyleProp, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { AppImage } from '../AppImage';
import { AppText } from '../AppText';
import { createStyles } from './styles';
export interface AppFlatListAnimatedProps {
  data: any[];
  renderItem: ({ item, index }: { item: any, index?: number }) => JSX.Element;

  onScroll?: | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
  | undefined;
  scrollEventThrottle?: number;
  columnWrapperStyle?: StyleProp<ViewStyle>;
  numColumns?: number;
  title?: string;
  ListHeaderComponent?:
  | React.ComponentType<any>
  | React.ReactElement
  | null
  | undefined;
  ListEmptyComponent?:
  | React.ComponentType<any>
  | React.ReactElement
  | null
  | undefined;
  ListFooterComponent?:
  | React.ComponentType<any>
  | React.ReactElement
  | null
  | undefined;
  isLoading?: boolean;
  emptyText?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  isShort?: boolean;
  horizontal?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onEndReachedThreshold?: number;
  pagingEnabled?: boolean;
  initialScrollIndex?: number;
  removeClippedSubviews?: boolean;
  perPage?: number;
  style?: StyleProp<ViewStyle>;
  keyExtractor?: ((item: any, index: number) => string) | undefined;
  refreshControlProps?: Partial<RefreshControlProps>;
  nestedScrollEnabled?: boolean;


}
export const AppFlatListAnimated = forwardRef((props: AppFlatListAnimatedProps, ref: React.ForwardedRef<FlatList<any>> | undefined) => {
  const {
    data, style, onScroll, scrollEventThrottle, renderItem, numColumns = 0, columnWrapperStyle, isLoading, keyExtractor,
    horizontal, ListFooterComponent, ListHeaderComponent,
    contentContainerStyle,
    onLoadMore,
    onRefresh,
    onEndReachedThreshold = 0.1,
    pagingEnabled,
    initialScrollIndex,
    removeClippedSubviews,
    perPage = 14,
    ListEmptyComponent,
    refreshControlProps, refreshing = false,
    nestedScrollEnabled = true,
  } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const MemoizedRenderItem = React.useCallback(
    ({ item, index }: any) => renderItem({ item, index }),
    [renderItem]
  );

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
    <Animated.FlatList
      ref={ref}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      data={data}
      horizontal={horizontal}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      style={style}
      numColumns={numColumns}
      renderItem={renderItem}
      columnWrapperStyle={columnWrapperStyle}
      refreshControl={
        onRefresh && (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themeColors.text}
            {...refreshControlProps}
          />
        )
      }
      getItemLayout={(data, index) => (
        { length: 200, offset: 200 * index, index }
      )}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onLoadMore}
      ListFooterComponent={
        ListFooterComponent ? (
          ListFooterComponent
        ) : data && data?.length > perPage - 1 && isLoading ? (
          <View  >
            <ActivityIndicator size={'small'} color={themeColors.text} />
          </View>
        ) : <View style={styles.bottom} />
      }
      ListEmptyComponent={ListEmptyComponent || ListEmptyComponentBase}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      pagingEnabled={pagingEnabled}
      initialScrollIndex={initialScrollIndex}
      nestedScrollEnabled={nestedScrollEnabled}
      initialNumToRender={5}
      maxToRenderPerBatch={10} // Reduce the number of items to render per batch
      windowSize={10}
      removeClippedSubviews={removeClippedSubviews}

      keyExtractor={keyExtractor || ((item, index) => index.toString())}
    />
  );
});

