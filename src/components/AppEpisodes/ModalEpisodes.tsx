import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { HeightScreen, useTheme } from '@theme';
import { chapterEpisodeInterface } from '@types';
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
  episodes?: chapterEpisodeInterface[];
  height?: number;
  minHeight?: number;
}

export function ModalEpisodes(props: ModalEpisodesProps) {
  const {
    selectEpisodes,

    onSelectChapter,
    refModal,
    setSelectEpisodes, episodes, height = 0.5, minHeight = 0.5,
  } = props;
  const { themeColors } = useTheme();
  const [search, setSearch] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodes);
  const styles = createStyles(themeColors);
  useEffect(() => {
    setFilteredEpisodes(episodes);
  }, [episodes]);
  const handleSearch = debounce((text: string) => {
    if (text === '') {
      setFilteredEpisodes(episodes);
    } else {
      const filtered = episodes?.filter((episode) =>
        `${t('home.episode')} ${episode.index}`.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    }
  }, 300); // Debounce with 300ms delay

  const renderItem = ({ item }: { item: chapterEpisodeInterface }) => {
    return (
      <TouchableOpacity onPress={() => {
        refModal?.current?.dismiss();
        setSelectEpisodes?.(item.id);
        onSelectChapter?.(item);
      }} style={[styles.itemChapter, selectEpisodes === item.id && styles.btnChapterActive]} >
        <AppText style={[styles.txtChapterItem, selectEpisodes === item.id && styles.txtChapterActive]}>{`${t('home.episode')} ${item?.index}`}</AppText>
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        removeClippedSubviews
        style={styles.listModal}
        contentContainerStyle={[styles.contentContainerStyle, { minHeight: HeightScreen * minHeight }]}
        ListEmptyComponent={<AppText style={styles.emptyText}>{t('movie.no_chapters')}</AppText>}
      />
    </BottomSheetModal>
  );

}
