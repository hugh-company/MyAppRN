import { useTheme } from '@theme';
import React from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, StyleProp, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { AppText } from '../AppText';
import { createStyles } from './styles';
export interface AppFlatListAnimatedProps {
  data: any[];
  renderItem: ({ item, index }: { item: any, index: number }) => JSX.Element;

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
  ListFooterComponent?:
  | React.ComponentType<any>
  | React.ReactElement
  | null
  | undefined;
  isLoading?: boolean;
  emptyText?: string;
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

}
const AppFlatListAnimated = ({ data, onScroll, scrollEventThrottle, renderItem, numColumns = 0, columnWrapperStyle, isLoading,
  horizontal, ListFooterComponent, ListHeaderComponent,
  emptyText,
  onLoadMore,
  onRefresh, onEndReachedThreshold,
  pagingEnabled,
  initialScrollIndex,
  removeClippedSubviews, perPage = 14,

}: AppFlatListAnimatedProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const ListHeaderComponentBase = React.useCallback(() => {
    if (!isLoading && data?.length < 1) {
      return (
        <View style={styles.viewHeader}>

          <AppText>{emptyText}</AppText>
        </View>
      );
    }
    return null;
  }, [isLoading, data?.length, emptyText]);
  return (
    <Animated.FlatList
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      data={data}
      horizontal={horizontal}
      ListHeaderComponent={ListHeaderComponent || ListHeaderComponentBase}
      contentContainerStyle={styles.container}
      numColumns={numColumns}

      renderItem={renderItem}
      columnWrapperStyle={columnWrapperStyle}
      refreshControl={
        onRefresh && (
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            tintColor={themeColors.text}
          />
        )
      }
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onLoadMore}
      ListFooterComponent={
        ListFooterComponent ? (
          ListFooterComponent
        ) : data && data?.length > perPage - 1 && isLoading ? (
          <View>
            <ActivityIndicator size={'small'} color={themeColors.primary} />
          </View>
        ) : null
      }
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      pagingEnabled={pagingEnabled}
      initialScrollIndex={initialScrollIndex}
      removeClippedSubviews={removeClippedSubviews}
    />
  );
};

export default AppFlatListAnimated;
