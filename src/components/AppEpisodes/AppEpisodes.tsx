import { AppBottomModal, AppFlatListAnimated, AppInputSearch, AppText } from '@components';
import { Spacing, useTheme } from '@theme';
import { t } from 'i18next';
import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface AppEpisodesProps {
  episodes?: {
    id: number;
    name: string;
    duration?: string;
    releaseDate?: string;
    link?: string;
  }[];
  total?: number;
  title?: string;
  style?: StyleProp<ViewStyle>;
  onSelectChapter?: (item: {
    id: number;
    name: string;
    duration?: string;
    releaseDate?: string;
    link?: string;
  }) => void;
}
const AppEpisodes = ({

  style,

  episodes = [],
  total,
  onSelectChapter,
  title,
}: AppEpisodesProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [showAll, setShowAll] = useState(false);
  const [selectEpisodes, setSelectEpisodes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodes);
  const maxLines = 2; // Tối đa 2 dòng
  const lineHeight = Spacing.height32;
  const maxHeightList = maxLines * lineHeight + Spacing.height8;
  const handleLoadMore = () => {
    setShowModal(true);
    // setShowAll(!showAll);
  };

  const list = episodes?.slice(0, 50);
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text === '') {
      setFilteredEpisodes(episodes);
    } else {
      const filtered = episodes.filter((episode) =>
        episode.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        setSelectEpisodes(item.id);
        onSelectChapter?.(item);
      }} style={[styles.itemChapter, selectEpisodes === item.id && styles.btnChapterActive]} >
        <AppText style={[styles.txtChapterItem, selectEpisodes === item.id && styles.txtChapterActive]}>{item?.name}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[styles.container, style]}>
        <AppText style={styles.title}>{title}</AppText>
        <View style={styles.listChapter}>
          {filteredEpisodes?.slice(0, 50).map((item, index) => {
            return (
              <TouchableOpacity key={`list_episodes_${index}`} onPress={() => {
                setSelectEpisodes(item.id);

                onSelectChapter?.(item);
              }} style={[styles.btnChapter, selectEpisodes === item.id && styles.btnChapterActive]} >
                <AppText style={[styles.txtChapter, selectEpisodes === item.id && styles.txtChapterActive]}>{item?.name}</AppText>
              </TouchableOpacity>
            );
          })}
        </View>
        {(lineHeight * filteredEpisodes?.length) > maxHeightList && (
          <TouchableOpacity style={styles.btnMore} onPress={handleLoadMore}>
            <AppText style={styles.txtMore}>{showAll ? t('movie.show_less') : t('movie.more')}</AppText>
          </TouchableOpacity>
        )}
      </View>
      <AppBottomModal
        height={0.94}
        modalStyle={{ backgroundColor: themeColors.background }}
        visible={showModal}
        onClose={() => setShowModal(false)} >

        <View style={styles.modalContainer}>

          <View style={styles.headerModal}>
            <View style={styles.viewTitle}>
              <AppText style={styles.titleModal}>{t('movie.list_chapters')}</AppText>
              <TouchableOpacity style={styles.btnBack} onPress={() => setShowModal(false)}>
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
      </AppBottomModal>
    </>
  );
};


export default AppEpisodes;
