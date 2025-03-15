import { AppCategoryList, AppFlatListAnimated, HorizontalList, LoadingDashboardSearch, LoadingGame, LoadingHome, LoadingMovieScreen, SliderList } from '@components';
import { BannerMovie } from '@screens';
import { sizeWidth, useTheme } from '@theme';
import { ItemListDashboard, ItemListProduct, ModuleItemInterface, PostTypeKey, TabInterface, TypeKeyListApi } from '@types';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import BannerHome from './components/BannerHome';
import { CategoryListItem } from './components/CategoryListItem';
import { DatingItem } from './components/DatingItem';
import { LabelView } from './components/LabelView';
import { ListPostGird } from './components/ListPostGird';
import { ListVertical } from './components/ListVertical';
import { createStyles } from './styles';


export interface AppListDashboardProps {
  ListHeaderComponent?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ComponentType<any> | null | undefined
  typeScreen: ItemListDashboard;
  data?: ModuleItemInterface[];
  loading?: boolean;
  onRefresh?: () => void;
  onScroll?: (event: any) => void;
  categoryId?: number;
  onSelectedCategory?: (item: TabInterface) => void;
  keyExtractor?: (item: ModuleItemInterface, index: number) => string;
  isRefetching?: boolean;
}

const AppListDashboard = React.memo(({
  typeScreen = ItemListDashboard.HOME,
  data = [], onScroll,
  loading, onRefresh,
  onSelectedCategory = () => { },
  ListHeaderComponent,
  categoryId,
  keyExtractor, isRefetching,
}: AppListDashboardProps) => {


  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const MemoizedBannerHome = useMemo(() => React.memo(BannerHome), [data]);
  const MemoizedBannerMovie = useMemo(() => React.memo(BannerMovie), [data]);
  const MemoizedAppCategoryList = useMemo(() => React.memo(AppCategoryList), [data]);
  const MemoizedDatingItem = useMemo(() => React.memo(DatingItem), [data]);
  const MemoizedLabelView = useMemo(() => React.memo(LabelView), [data]);
  const MemoizedCategoryListItem = useMemo(() => React.memo(CategoryListItem), [data]);
  const MemoizedSliderList = useMemo(() => React.memo(SliderList), [data]);
  const MemoizedHorizontalList = useMemo(() => React.memo(HorizontalList), [data]);
  const MemoizedListVertical = useMemo(() => React.memo(ListVertical), [data]);
  const MemoizedListGrid = useMemo(() => React.memo(ListPostGird), [data]);

  const renderLoading = useCallback(() => {

    switch (typeScreen) {
      case ItemListDashboard.HOME:
        return <LoadingHome />;
      case ItemListDashboard.MOVIES:
      case ItemListDashboard.COMIC:
      case ItemListDashboard.NOVEL:
        return <LoadingMovieScreen />;
      case ItemListDashboard.GAMES:
        return <LoadingGame />;
      case ItemListDashboard.SEARCH:
        return <LoadingDashboardSearch />;
      default:
        return <></>;
    }
  }, [typeScreen]);




  const renderItem = useCallback(({ item }: { item: ModuleItemInterface }) => {

    switch (item?.type) {
      case TypeKeyListApi.BANNER:
        return <MemoizedBannerHome data={item?.items as ItemListProduct[]} />;
      case TypeKeyListApi.POST_TYPE:
        return <BannerMovie data={item?.items as ItemListProduct[]} isGame={item?.posttype === PostTypeKey.GAMES} />;
      case TypeKeyListApi.TYPE_TABS:
        return <MemoizedAppCategoryList data={item?.items as TabInterface[]} categoryId={categoryId} onSelectedCategory={onSelectedCategory} />;
      case TypeKeyListApi.CHAT_HOME:
        return <MemoizedDatingItem />;
      case TypeKeyListApi.BLOCK_LABEL:
        return <MemoizedLabelView title={item?.label} type={item?.posttype} uri={item?.images} />;
      case TypeKeyListApi.LIST_ITEM_TAB:
        return <MemoizedCategoryListItem
          data={item?.items as TabInterface[]}
          itemModule={item}
          type={item?.posttype} />;
      case TypeKeyListApi.LIST_SLIDER:
        return <MemoizedSliderList
          title={item?.label}
          button={item?.button}
          data={item?.items as TabInterface[]}
          type={item?.posttype} />;
      case TypeKeyListApi.LIST_HORIZONTAL:
        return <MemoizedHorizontalList
          title={item?.label}
          type={item?.posttype}
          data={item?.items as ItemListProduct[]}
          button={item?.button} />;
      case TypeKeyListApi.LIST_VERTICAL:
        return <MemoizedListVertical data={item?.items as ItemListProduct[]} type={item?.posttype} title={item?.label} button={item?.button} />;
      case TypeKeyListApi.SPACE:
        return <View style={{ height: sizeWidth(item?.height || 0) }} />;
      case TypeKeyListApi.ITEM_GRID:
        return <MemoizedListGrid data={item?.items as ItemListProduct[]} type={item?.posttype} title={item?.label} button={item?.button} />;
      default:
        return <></>;
    }
  }, [categoryId, onSelectedCategory]);

  const memoizedData = useMemo(() => data, [data]);
  const memoizedKeyExtractor = useCallback((item: ModuleItemInterface, index: number) => {
    return keyExtractor ? keyExtractor(item, index) : `${index}`;
  }, [keyExtractor]);

  return (
    <View style={styles.container}>
      {loading ? renderLoading() :
        <AppFlatListAnimated
          data={memoizedData}
          scrollEventThrottle={16}
          ListHeaderComponent={ListHeaderComponent}
          onScroll={onScroll}
          onRefresh={onRefresh}
          refreshing={isRefetching}
          key={typeScreen}
          keyExtractor={memoizedKeyExtractor}
          renderItem={renderItem}
          removeClippedSubviews={true}

        />

      }
    </View>
  );
});

export default AppListDashboard;
