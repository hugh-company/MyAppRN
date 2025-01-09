import { AppCategoryList, AppFlatListAnimated, HorizontalList, LoadingDashboardSearch, LoadingGame, LoadingHome, LoadingMovieScreen, SliderList } from '@components';
import { BannerMovie } from '@screens';
import { sizeWidth, useTheme } from '@theme';
import { ItemListDashboard, ItemListProduct, ModuleItemInterface, PostTypeKey, TabInterface, TypeKeyListApi } from '@types';
import React from 'react';
import { View } from 'react-native';
import { BannerHome } from './components/BannerHome';
import { CategoryListItem } from './components/CategoryListItem';
import { DatingItem } from './components/DatingItem';
import { LabelView } from './components/LabelView';
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
}

const AppListDashboard = ({
  typeScreen = ItemListDashboard.HOME,
  data = [], onScroll,
  loading, onRefresh,
  onSelectedCategory = () => { },
  ListHeaderComponent,
  categoryId,
}: AppListDashboardProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [isReset, setIsReset] = React.useState(false);

  const renderLoading = () => {
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
  };

  const onRefreshList = () => {
    if (onRefresh) {
      setIsReset(true);
      onRefresh();
      setTimeout(() => {
        setIsReset(false);
      }, 1000);
    }
  };

  const renderItem = ({ item }: { item: ModuleItemInterface }) => {
    switch (item?.type) {
      case TypeKeyListApi.BANNER:
        return <BannerHome data={item?.items as ItemListProduct[]} />;
      case TypeKeyListApi.POST_TYPE:
        return <BannerMovie data={item?.items as ItemListProduct[]} isGame={item?.posttype === PostTypeKey.GAMES} />;
      case TypeKeyListApi.TYPE_TABS:
        return <AppCategoryList data={item?.items as TabInterface[]} categoryId={categoryId} onSelectedCategory={onSelectedCategory} />;
      case TypeKeyListApi.CHAT_HOME:
        return <DatingItem />;
      case TypeKeyListApi.BLOCK_LABEL:
        return <LabelView title={item?.label} type={item?.posttype} uri={item?.images} />;
      case TypeKeyListApi.LIST_ITEM_TAB:
        return <CategoryListItem data={item?.items as TabInterface[]} type={item?.posttype} />;
      case TypeKeyListApi.LIST_SLIDER:
        return <SliderList title={item?.label} button={item?.button} data={item?.items as TabInterface[]} type={item?.posttype} />;
      case TypeKeyListApi.LIST_HORIZONTAL:
        return <HorizontalList
          title={item?.labels}
          type={item?.posttype}
          data={item?.items as ItemListProduct[]}
          button={item?.button}
          titleViewMore={item.label} />;
      case TypeKeyListApi.LIST_VERTICAL:
        return <ListVertical data={item?.items as ItemListProduct[]} type={item?.posttype} title={item?.label} button={item?.button} />;
      case TypeKeyListApi.SPACE:
        return <View style={{ height: sizeWidth(item?.height || 0) }} />;
      default:
        return <></>;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? renderLoading() :
        <AppFlatListAnimated
          data={data}
          scrollEventThrottle={16}
          ListHeaderComponent={ListHeaderComponent}
          onScroll={onScroll}
          onRefresh={onRefreshList}
          refreshing={isReset}
          renderItem={renderItem} />}
    </View>
  );
};

export default AppListDashboard;
