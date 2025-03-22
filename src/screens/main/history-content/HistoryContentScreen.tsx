import { CheckIcon } from '@assets';
import { AppCategoryList, AppControlPost, AppHeader, AppSearchInput, AppText } from '@components';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHistoryContentScreen } from './HistoryContentScreen.hook';
import { styles } from './styles';
export const HistoryContentScreen = () => {
  const { history, filteredHistory, onSearch, search,
    onSelectOption,
    isSelect,
    idsSelect,
    handleSelectId, setIdsSelect,
    keyPost, setKeyPost, params,
    handleClearHistory, handleRemoveHistoryItem } = useHistoryContentScreen();
  const { bottom } = useSafeAreaInsets();
  console.log({ history }, { filteredHistory });
  const listPostType = [
    {
      id: PostTypeKey.MOVIES,
      name: t('navigation.movies'),
    },

    {
      id: PostTypeKey.COMIC,
      name: t('navigation.comic'),
    },
    {
      id: PostTypeKey.GAMES,
      name: t('navigation.games'),
    },
  ];


  const renderBottomView = () => {
    const isSelectAll = idsSelect?.length === filteredHistory?.length;
    const disabled = idsSelect?.length === 0;
    return (
      <View style={[styles.viewBottom, { paddingBottom: bottom }]}>
        <TouchableOpacity onPress={() => {
          if (isSelectAll) {
            setIdsSelect([]);
          } else {
            setIdsSelect(filteredHistory.map(item => item.id));
          }
        }} style={styles.viewSelect}>
          <View style={[styles.btnSelect, isSelectAll && styles.btnSelectActive]} >
            {isSelectAll && <CheckIcon />}
          </View>
          <AppText> {idsSelect.length} {t('select').toLocaleLowerCase()}</AppText>
        </TouchableOpacity>
        <View style={styles.viewOption}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => handleClearHistory()}
            style={[styles.btnDelete, disabled && styles.btnDeleteDisable]}>
            <AppText style={[styles.txtDelete, disabled && styles.txtDeleteDisable]}>{t('delete')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIdsSelect([])}
            style={[styles.btnUnSelect]}>
            <AppText style={[styles.txtUnSelect]}>{t('unSelect')}</AppText>
          </TouchableOpacity>
        </View>
      </View>
    );

  };
  return (
    <View style={styles.container}>
      <AppHeader

        rightComponent={history?.length > 0 && <TouchableOpacity onPress={onSelectOption}>
          <AppText style={styles.select}>{t(isSelect ? 'unSelect' : 'select')}</AppText>
        </TouchableOpacity>}
        title={params?.title || ''} />

      <AppCategoryList
        categoryId={keyPost}
        listStyle={styles.category}
        data={listPostType} onSelectedCategory={(item) => {
          setKeyPost(item.id);
        }} />

      <AppControlPost
        ListHeaderComponent={<>
          {history?.length > 0 && <AppSearchInput
            placeholder="Search"
            searchText={search}
            onSearch={onSearch}
            style={styles.search}
          />}
          {/* <GigabytePost maxGigabyte={100} currentGigabyte={history?.length || 0} style={styles.gigabyte} /> */}
        </>}
        data={filteredHistory}
        contentContainerStyle={[styles.contentContainerStyle]}
        ListFooterComponent={isSelect && <View style={styles.bottom} /> || null}
        type={keyPost}
        style={[styles.list]}
        ids={idsSelect}
        onSelectId={handleSelectId}
        isSelect={isSelect}
        onDelete={handleRemoveHistoryItem}
      />
      {isSelect && renderBottomView()}
    </View>
  );
};
