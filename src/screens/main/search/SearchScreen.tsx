import { FilterIcon, SortIcon } from '@assets';
import { AppInputSearch, AppText, LoadingSearch, ModalFilter } from '@components';
import { goBack } from '@navigation';
import { t } from 'i18next';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSearchScreen } from './SearchScreen.hook';
import DashboardSearch from './components/DashboardSearch';
import SearchList from './components/SearchList';

const MemoizedModalFilter = memo(ModalFilter);
const MemoizedDashboardSearch = memo(DashboardSearch);
const MemoizedSearchList = memo(SearchList);

const SearchScreen = () => {
  const { data, loading, styles, typeScreen, isFilterSort, menuSort,
    setIsFilterSort, isFilterType, setIsFilterType, top, search,
    onSearch, sort, menuType, refSearch, filterByType, filterBySort,
    onLoadMore } = useSearchScreen();

  const renderBody = () => {
    if (loading) {
      return <LoadingSearch />;
    }
    if (search?.length > 0 || sort !== '' || typeScreen !== undefined) {

      return <MemoizedSearchList
        onLoadMore={onLoadMore}
        data={data} valueSearch={search} />;
    }
    return <DashboardSearch />;
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: top }]}>
        <TouchableOpacity style={styles.btnCancel} onPress={() => goBack()}>
          <AppText style={styles.txtCancel}>{t('cancel')}</AppText>
        </TouchableOpacity>
        <AppInputSearch
          value={search}
          ref={refSearch}
          style={styles.containerInput}
          placeholder={t('search.search')}
          onChangeText={onSearch}
        />
      </View>
      <View style={styles.filter}>
        <TouchableOpacity onPress={() => setIsFilterType(true)} style={[styles.btnType, typeScreen && styles.btnActive]}>
          <FilterIcon />
          <AppText style={styles.txtType}>{typeScreen ? `${t('search.type')}: ${menuType.find((elm) => elm.key === typeScreen)?.value}` : t('search.type')}</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFilterSort(true)} style={[styles.btnType, sort && styles.btnActive]}>
          <SortIcon />
          <AppText style={styles.txtType}>{sort ? `${menuSort?.find((elm) => elm.key === sort)?.value}` : t('search.sort')}</AppText>
        </TouchableOpacity>
      </View>

      {renderBody()}
      {/* {isFilterType && <MemoizedModalFilter
        visible={isFilterType}
        onClose={() => setIsFilterType(false)}
        label={`${t('search.type')}:`}
        onSelect={filterByType}
        data={menuType}
      />}
      {isFilterSort && <MemoizedModalFilter
        visible={isFilterSort}
        onClose={() => setIsFilterSort(false)}
        label={`${t('search.sort')}:`}
        onSelect={filterBySort}
        data={menuSort}
      />} */}
    </View>
  );
};

export default SearchScreen;
