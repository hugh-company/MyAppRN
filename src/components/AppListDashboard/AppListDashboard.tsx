import { AppCategoryList, AppFlatListAnimated, HorizontalList, LoadingHome, LoadingMovieScreen, SliderList } from '@components';
import { BannerMovie } from '@screens';
import { sizeWidth, useTheme } from '@theme';
import { ItemListDashboard, ModuleItemInterface, PostTypeKey, TabsInterface, TypeKeyListApi } from '@types';
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
  // categoryId: number;
  categoryId?: number;
  onSelectedCategory?: (item: TabsInterface) => void;
}
const AppListDashboard = ({
  typeScreen = ItemListDashboard.HOME,
  data = [], onScroll,
  loading, onRefresh,
  onSelectedCategory,
  ListHeaderComponent,
  categoryId }: AppListDashboardProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [isReset, setIsReset] = React.useState(false);
  // render loading
  const renderLoading = () => {
    switch (typeScreen) {
      case ItemListDashboard.HOME:
        return <LoadingHome />;
      case ItemListDashboard.MOVIES:
      case ItemListDashboard.COMIC:
      case ItemListDashboard.NOVEL:
        return <LoadingMovieScreen />;
      case ItemListDashboard.GAMES:
        return <></>;

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
      }
        , 1000);
    }
  };

  const renderItem = ({ item }: { item: ModuleItemInterface }) => {
    switch (item?.type) {
      case TypeKeyListApi.BANNER:
        // return typeScreen === ItemListDashboard.HOME ? <BannerHome data={item?.items} /> : <BannerMovie data={item?.items} />;
        return <BannerHome data={item?.items} />;
      case TypeKeyListApi.POST_TYPE:
        return <BannerMovie data={item?.items} isGame={item?.posttype === PostTypeKey.GAMES} />;
      //
      case TypeKeyListApi.TYPE_TABS:
        return <AppCategoryList data={item?.items} categoryId={categoryId} onSelectedCategory={onSelectedCategory} />;
      case TypeKeyListApi.CHAT_HOME:
        return <DatingItem />;
      case TypeKeyListApi.BLOCK_LABEL:

        return <LabelView title={item?.label} type={item?.posttype} uri={item?.images} />;

      case TypeKeyListApi.LIST_ITEM_TAB:
        return <CategoryListItem data={item?.items} type={item?.posttype} />;
      case TypeKeyListApi.LIST_SLIDER:
        return <SliderList title={item?.label} button={item?.button} data={item?.items || []} type={item?.posttype} />;

      case TypeKeyListApi.LIST_HORIZONTAL:
        return <HorizontalList
          title={item?.labels}
          type={item?.posttype}
          data={item?.items || []}
          button={item?.button}
          titleViewMore={item.label} />;
      case TypeKeyListApi.LIST_VERTICAL:
        return <ListVertical data={item?.items} type={item?.posttype} title={item?.label} button={item?.button} />;
      case TypeKeyListApi.SPACE:
        return <View style={{ height: sizeWidth(item?.height) }} />;
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
