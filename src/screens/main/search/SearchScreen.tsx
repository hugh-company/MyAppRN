import { FilterIcon, SortIcon } from '@assets';
import { AppInputSearch, AppText, ModalFilter } from '@components';
import { goBack } from '@navigation';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSearchScreen } from './SearchScreen.hook';
import { DashboardSearch } from './components/DashboardSearch';
import { SearchList } from './components/SearchList';

const SearchScreen = () => {
  const { data, themeColors, styles, typeScreen, isFilterSort, menuSort, dataDashboard,
    setIsFilterSort, isFilterType, setIsFilterType, top, search, onSearch, sort, menuType, refSearch, filterByType, filterBySort } = useSearchScreen();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: top }]}>
        <TouchableOpacity style={styles.btnCancel} onPress={goBack}>
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
          <AppText style={styles.txtType}>{sort || t('search.sort')}</AppText>
        </TouchableOpacity>
      </View>

      {search || sort || typeScreen ? <SearchList data={[]} valueSearch={search} /> : <DashboardSearch />}
      <ModalFilter
        visible={isFilterType}
        onClose={() => setIsFilterType(false)}
        label={`${t('search.type')}:`}
        onSelect={filterByType}
        data={menuType}
      />
      <ModalFilter
        visible={isFilterSort}
        onClose={() => setIsFilterSort(false)}
        label={`${t('search.sort')}:`}
        onSelect={filterBySort}
        data={menuSort}
      />
    </View>
  );
};

export default SearchScreen;
