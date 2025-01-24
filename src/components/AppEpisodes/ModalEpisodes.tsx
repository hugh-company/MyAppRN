import { useTheme } from '@theme';
import { chapterEpisodeInterface } from '@types';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { AppBottomModal } from '../AppBottomModal';
import { AppFlatListAnimated } from '../AppFlatListAnimated';
import { AppInputSearch } from '../AppInputSearch';
import { AppText } from '../AppText';
import { createStyles } from './styles';
export interface ModalEpisodesProps {
  setShowModal?: any;
  onSelectChapter?: any;
  selectEpisodes?: any;
  showModal: boolean;
  setSelectEpisodes?: any;
  episodes?: chapterEpisodeInterface[];
}

export function ModalEpisodes(props: ModalEpisodesProps) {
  const {
    selectEpisodes,
    setShowModal,
    onSelectChapter,
    showModal,
    setSelectEpisodes, episodes,
  } = props;
  const { themeColors } = useTheme();
  const [search, setSearch] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodes);
  const styles = createStyles(themeColors);
  useEffect(() => {
    setFilteredEpisodes(episodes);
  }, [episodes]);
  const list = filteredEpisodes?.slice(0, 50);
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text === '') {
      setFilteredEpisodes(episodes);
    } else {
      const filtered = episodes?.filter((episode) =>
        episode.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    }
  };
  const renderItem = ({ item }: { item: chapterEpisodeInterface }) => {
    return (
      <TouchableOpacity onPress={() => {
        setShowModal(false);

        setSelectEpisodes?.(item.id);
        onSelectChapter?.(item);
      }} style={[styles.itemChapter, selectEpisodes === item.id && styles.btnChapterActive]} >
        <AppText style={[styles.txtChapterItem, selectEpisodes === item.id && styles.txtChapterActive]}>{item?.title}</AppText>
      </TouchableOpacity>
    );
  };
  return <AppBottomModal
    width={1}
    height={Platform.OS === 'ios' ? 0.93 : 1}
    visible={showModal}
    onClose={() => setShowModal(false)}>
    <View style={styles.modalContainer}>
      <View style={styles.headerModal}>
        <View style={styles.viewTitle}>
          <AppText style={styles.titleModal}>{t('movie.list_chapters')}</AppText>
          <TouchableOpacity hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }} style={styles.btnBack} onPress={() => setShowModal(false)}>
            <AppText style={styles.txtBack}>{t('back')}</AppText>
          </TouchableOpacity>
        </View>
        <AppInputSearch
          style={styles.viewSearch}
          inputStyle={styles.inputSearch}
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <AppFlatListAnimated
        data={filteredEpisodes}
        renderItem={renderItem}
      />

    </View>
  </AppBottomModal>;
}
