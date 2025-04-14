import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { HeightScreen, useTheme } from '@theme';
import { t } from 'i18next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    setSelectEpisodes,
    totalChapter, // New prop
  } = props;
  const { themeColors } = useTheme();
  const [search, setSearch] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState<string[]>([]);
  const [allEpisodes, setAllEpisodes] = useState<string[]>([]); // Store all episodes
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const itemsPerPage = 10;
  const styles = createStyles(themeColors);
  const debounceRef = useRef<NodeJS.Timeout | null>(null); // Ref to track debounce timeout

  useEffect(() => {
    const initialEpisodes = Array.from({ length: totalChapter }, (_, index) => (index + 1).toString());
    setAllEpisodes(initialEpisodes);
    setFilteredEpisodes(initialEpisodes.slice(0, itemsPerPage));
  }, [totalChapter]);

  const handleSearch = useCallback((text: string) => {


    if (debounceRef.current) {
      clearTimeout(debounceRef.current); // Clear previous debounce timeout
    }
    debounceRef.current = setTimeout(() => {
      console.log({ text });
      if (text === '') {
        const initialEpisodes = allEpisodes.slice(0, itemsPerPage);
        if (JSON.stringify(filteredEpisodes) !== JSON.stringify(initialEpisodes)) {
          setFilteredEpisodes(initialEpisodes);
          setPage(1); // Reset pagination
        }
      } else {
        const filtered = allEpisodes.filter((episode) => episode.includes(text));
        const slicedFiltered = filtered.slice(0, itemsPerPage);
        if (JSON.stringify(filteredEpisodes) !== JSON.stringify(slicedFiltered)) {
          setFilteredEpisodes(slicedFiltered);
          setPage(1); // Reset pagination
        }
      }
    }, 300); // Debounce with 300ms delay
  }, [allEpisodes, filteredEpisodes, itemsPerPage]);

  const handleLoadMore = useCallback(() => {
    if (!isFetchingMore && filteredEpisodes.length < allEpisodes.length) {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      const newEpisodes = allEpisodes.slice(
        filteredEpisodes.length,
        filteredEpisodes.length + itemsPerPage
      );
      setFilteredEpisodes((prevEpisodes) => [...prevEpisodes, ...newEpisodes]);
      setPage(nextPage);
      setIsFetchingMore(false);
    }
  }, [isFetchingMore, filteredEpisodes, allEpisodes, page, itemsPerPage]);

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
      snapPoints={[HeightScreen / 2, HeightScreen]}
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
          onChangeText={(text) => {
            setSearch(text);
            handleSearch(text);
          }}
        />
      </View>
      <BottomSheetFlatList
        data={filteredEpisodes}

        keyExtractor={(item) => `list_chapter_${item}`}
        renderItem={renderItem}
        removeClippedSubviews
        style={[styles.listModal, { height: HeightScreen }]} // Fixed height
        contentContainerStyle={[
          styles.contentContainerStyle,
          { minHeight: HeightScreen }, // Ensure consistent height
        ]}
        ListEmptyComponent={
          <View style={{ height: HeightScreen, justifyContent: 'center', alignItems: 'center' }}>
            <AppText style={styles.emptyText}>{t('movie.no_chapters')}</AppText>
          </View>
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </BottomSheetModal>
  );
}
