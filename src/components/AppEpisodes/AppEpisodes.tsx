import { AppBottomModal, AppFlatListAnimated, AppInputSearch, AppText } from '@components';
import { Spacing, useTheme } from '@theme';
import { chapterEpisodeInterface, PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Platform, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface AppEpisodesProps {
  episodes?: chapterEpisodeInterface[];
  type?: PostTypeKey
  title?: string;
  style?: StyleProp<ViewStyle>;
  onSelectChapter?: (item: chapterEpisodeInterface) => void;
}
const AppEpisodes = ({
  style,
  episodes = [],
  onSelectChapter,
  title,
}: AppEpisodesProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [selectEpisodes, setSelectEpisodes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodes);
  const maxLines = 2; // Tối đa 2 dòng
  const lineHeight = Spacing.height32;

  useEffect(() => {
    setFilteredEpisodes(episodes);
  }, [episodes]);

  const handleLoadMore = () => {
    console.log('handleLoadMore');
    setTimeout(() => {
      setShowModal(true);
    }, 300);
    // setShowAll(!showAll);
  };

  const list = filteredEpisodes?.slice(0, 50);
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text === '') {
      setFilteredEpisodes(episodes);
    } else {
      const filtered = episodes.filter((episode) =>
        episode.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    }
  };

  const renderItem = ({ item }: { item: chapterEpisodeInterface }) => {
    return (
      <TouchableOpacity onPress={() => {
        setShowModal(false);
        setTimeout(() => {
          setSelectEpisodes(item.id);
          onSelectChapter?.(item);
        }
          , 300);

      }} style={[styles.itemChapter, selectEpisodes === item.id && styles.btnChapterActive]} >
        <AppText style={[styles.txtChapterItem, selectEpisodes === item.id && styles.txtChapterActive]}>{item?.title}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[styles.container, style]}>
        <AppText style={styles.title}>{title}</AppText>
        <View style={styles.listChapter}>
          {list?.slice(0, 50).map((item, index) => {
            return (
              <TouchableOpacity key={`list_episodes_${index}`} onPress={() => {
                setSelectEpisodes(item.id);

                onSelectChapter?.(item);
              }} style={[styles.btnChapter, selectEpisodes === item.id && styles.btnChapterActive]} >
                <AppText style={[styles.txtChapter, selectEpisodes === item.id && styles.txtChapterActive]}>{item?.title}</AppText>
              </TouchableOpacity>
            );
          })}
        </View>
        {((list?.length * lineHeight) > (lineHeight * 2 + Spacing.height16)) && (
          <TouchableOpacity style={styles.btnMore} onPress={handleLoadMore}>
            <AppText style={styles.txtMore}>{t('movie.more')}</AppText>
          </TouchableOpacity>
        )}
      </View>
      <AppBottomModal
        width={1}
        height={Platform.OS === 'ios' ? 0.93 : 1}
        visible={showModal} onClose={() => setShowModal(false)}>
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
