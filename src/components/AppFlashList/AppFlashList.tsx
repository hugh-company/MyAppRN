import React, { forwardRef, useEffect } from 'react';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { ContentStyle, FlashList as FlatList, ListRenderItem } from '@shopify/flash-list';
import { Spacing, useTheme } from '@theme';
import { AppText } from '../AppText';

interface AppFlashListProps {
  renderItem: ListRenderItem<any> | null | undefined;
  onRefresh?: () => void;
  style?: StyleProp<ViewStyle>;
  data: Array<any>;
  onLoadMore?: () => void;
  isLoading?: boolean;
  emptyText?: string;
  numColumns?: number | undefined;
  scrollEnabled?: boolean;
  horizontal?: boolean;
  contentContainerStyle?: ContentStyle;
  estimatedItemSize?: number;
  onMomentumScrollEnd?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isShort?: boolean;
  onPress?: () => void;
  title?: string;
  ListHeaderComponent?:
  | React.ComponentType<any>
  | React.ReactElement
  | null
  | undefined;
  rootStyle?: StyleProp<ViewStyle>;
  customViewMore?: StyleProp<ViewStyle>;
  perPage?: number;
  pagingEnabled?: boolean;
  initialScrollIndex?: number;
  onEndReachedThreshold?: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
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
  isOnlyList?: boolean;
  nestedScrollEnabled?: boolean;
}

const RenderContent = ({
  isOnlyList,
  rootStyle,
  isFirst,
  isLoading,
  data,
  children,
}: any) => {
  const { themeColors } = useTheme();

  if (!isOnlyList) {
    return (
      <View style={[styles.contain, rootStyle]}>
        {isFirst && isLoading && data.length < 1 && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color={themeColors.primary} />
          </View>
        )}
        {children}
      </View>
    );
  }
  return children;
};

const AppFlashList = React.memo(
  forwardRef((props: AppFlashListProps, ref: any) => {
    const {
      rootStyle,
      renderItem,
      onRefresh,
      data = [],
      onLoadMore,
      isLoading,
      isShort,
      perPage = 14,
      pagingEnabled,
      initialScrollIndex,
      onEndReachedThreshold = 0.5,
      emptyText,
      isOnlyList,
      nestedScrollEnabled,
      contentContainerStyle,
      estimatedItemSize,
    } = props;
    const [isFirst, setFirst] = React.useState(true);
    const { themeColors } = useTheme();

    useEffect(() => {
      if (isFirst && !isLoading) {
        setFirst(false);
      }
    }, [isFirst, isLoading]);

    const ListHeaderComponent = React.useCallback(() => {
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
      <RenderContent
        isOnlyList={isOnlyList}
        rootStyle={rootStyle}
        isFirst={isFirst}
        isLoading={isLoading}
        data={data}
      >
        <FlatList
          ListHeaderComponent={props.ListHeaderComponent || ListHeaderComponent}
          style={[styles.flashList, props.style]}
          horizontal={props.horizontal}
          numColumns={props.numColumns}
          scrollEnabled={props.scrollEnabled}
          onMomentumScrollEnd={props.onMomentumScrollEnd}
          data={isShort ? data.slice(0, 5) : data}
          renderItem={renderItem}
          refreshing={isLoading && data.length > 1}
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
          // keyExtractor={(item: any) => {
          //   if (typeof item === 'string') {
          //     return item;
          //   }
          //   return item.id;
          // }}
          ListFooterComponent={
            props.ListFooterComponent ? (
              props.ListFooterComponent
            ) : isShort ? (
              data?.length >= 4 ? null : null // <ViewMore onPress={onPress} customViewMore={customViewMore} />
            ) : data && data?.length > perPage - 1 && isLoading ? (
              <View>
                <ActivityIndicator size={'small'} color={themeColors.primary} />
              </View>
            ) : null
          }
          extraData={props}
          ref={ref}
          // removeClippedSubviews={!isShort}
          contentContainerStyle={contentContainerStyle}
          decelerationRate={isShort ? 'normal' : 0.6}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled={pagingEnabled}
          initialScrollIndex={initialScrollIndex}
          onScroll={props.onScroll}
          ListEmptyComponent={props.ListEmptyComponent}
          nestedScrollEnabled={nestedScrollEnabled}
          estimatedItemSize={estimatedItemSize}
        />
      </RenderContent>
    );
  }),
);

const styles = StyleSheet.create({
  contain: { flex: 1, paddingBottom: 20 },
  viewHeader: {
    flex: 1,
    paddingTop: Spacing.height15,
  },
  loading: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flashList: {
    flex: 1,
    minHeight: 2,
    minWidth: 2,
  },
});

export { AppFlashList };
