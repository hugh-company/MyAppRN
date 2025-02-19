import { FilterIcon, SortIcon } from '@assets';
import { AppSearchInput, AppText, ModalFilter } from '@components';
import { t } from 'i18next';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSearchScreen } from './SearchScreen.hook';
import DashboardSearch from './components/DashboardSearch';
import SearchList from './components/SearchList';

const MemoizedModalFilter = memo(ModalFilter);
const MemoizedDashboardSearch = memo(DashboardSearch);


const SearchScreen = () => {

  const { styles, typeScreen, isFilterSort, menuSort,
    setIsFilterSort, isFilterType, setIsFilterType, search,
    onSearch, sort, menuType, filterByType, filterBySort,

    //new
    onClear,
  } = useSearchScreen();

  const renderBody = () => {
    if (search?.length > 0 || sort !== '' || typeScreen !== undefined) {
      return (
        <SearchList
          typeScreen={typeScreen}
          sort={sort}
          valueSearch={search} />
      );
    }
    return <MemoizedDashboardSearch />;
  };
  return (
    <View style={styles.container}>
      <AppSearchInput
        placeholder={t('message.searchMessage')}
        onSearch={onSearch}
        searchText={search}
        onClear={() => {
          onClear();
        }} />

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
      {isFilterType && <MemoizedModalFilter
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
      />}
    </View>
  );
};

export default SearchScreen;
