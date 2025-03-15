import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { HeightScreen, useTheme } from '@theme';
import { t } from 'i18next';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppInputSearch } from '../AppInputSearch';
import { AppText } from '../AppText';
import { createStyles } from './styles';

export interface ModalEpisodesProps {
  refModal: React.RefObject<BottomSheetModal> | null;
  onSelectChapter?: any;
  selectEpisodes?: any;
  setSelectEpisodes?: any;
  height?: number;
  minHeight?: number;

  totalChapter: number; // New prop
}

export function ModalEpisodes(props: ModalEpisodesProps) {
  const {
    selectEpisodes,
    onSelectChapter,
    refModal,
    setSelectEpisodes, height = 0.5, minHeight = 0.5,


    totalChapter, // New prop
  } = props;
  const { themeColors } = useTheme();
  const [search, setSearch] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const itemsPerPage = 10;
  const styles = createStyles(themeColors);

  useEffect(() => {
    const initialEpisodes = Array.from({ length: Math.min(totalChapter, itemsPerPage) }, (_, index) => (index + 1).toString());
    setFilteredEpisodes(initialEpisodes);
  }, [totalChapter]);

  const handleSearch = debounce((text: string) => {
    if (text === '') {
      const initialEpisodes = Array.from({ length: Math.min(totalChapter, itemsPerPage) }, (_, index) => (index + 1).toString());
      setFilteredEpisodes(initialEpisodes);
    } else {
      const filtered = filteredEpisodes.filter((episode) =>
        episode.includes(text)
      );
      setFilteredEpisodes(filtered);
    }
  }, 300); // Debounce with 300ms delay

  const handleLoadMore = () => {
    if (!isFetchingMore && filteredEpisodes.length < totalChapter) {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      const newEpisodes = Array.from(
        { length: Math.min(totalChapter - filteredEpisodes.length, itemsPerPage) },
        (_, index) => (filteredEpisodes.length + index + 1).toString()
      );
      setFilteredEpisodes((prevEpisodes) => [...prevEpisodes, ...newEpisodes]);
      setPage(nextPage);
      setIsFetchingMore(false);
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => {
        refModal?.current?.dismiss();
        setSelectEpisodes?.(item);
        onSelectChapter?.(item);
      }} style={[styles.itemChapter, selectEpisodes === item && styles.btnChapterActive]} >
        <AppText style={[styles.txtChapterItem, selectEpisodes === item && styles.txtChapterActive]}>{`${t('home.episode')} ${item}`}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModal
      ref={refModal}
      backgroundStyle={[styles.modalContainer]}
      snapPoints={[minHeight * HeightScreen, height * HeightScreen]}
    >
      <View style={styles.headerModal}>
        <View style={styles.viewTitle}>
          <AppText style={styles.titleModal}>{t('movie.list_chapters')}</AppText>
          <TouchableOpacity hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }} style={styles.btnBack} onPress={() => refModal?.current?.dismiss()}>
            <AppText style={styles.txtBack}>{t('back')}</AppText>
          </TouchableOpacity>
        </View>
        <AppInputSearch
          style={styles.viewSearch}
          inputStyle={styles.inputSearch}
          value={search}
          onChangeText={
            (text) => {
              setSearch(text);
              handleSearch(text);
            }
          }
        />
      </View>
      <BottomSheetFlatList
        data={filteredEpisodes}
        keyExtractor={(item) => `list_chapter_${item}`}
        renderItem={renderItem}
        removeClippedSubviews
        style={styles.listModal}
        contentContainerStyle={[styles.contentContainerStyle, { minHeight: HeightScreen * minHeight }]}
        ListEmptyComponent={<AppText style={styles.emptyText}>{t('movie.no_chapters')}</AppText>}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </BottomSheetModal>
  );

}
