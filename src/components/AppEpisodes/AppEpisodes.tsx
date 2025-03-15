import { AppText } from '@components';
import { getDetailEpisodeApi } from '@services';
import { Spacing, useTheme, WidthScreen } from '@theme';
import { chapterEpisodeInterface, PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { createStyles } from './styles';

export interface AppEpisodesProps {
  chapter_total: number;
  type: PostTypeKey;
  title?: string;
  style?: StyleProp<ViewStyle>;
  onPlayVideo?: () => void;
  onSelectChapter?: (item: chapterEpisodeInterface) => void;
  value?: number;
  loading?: boolean;
  idPost: number;

  episodes?: chapterEpisodeInterface[];
  goToDetail?: (index: number) => void;
}

const AppEpisodes = ({
  style,
  chapter_total,
  type,
  onSelectChapter,
  title, value = 0, onPlayVideo, idPost, episodes, goToDetail,
}: AppEpisodesProps) => {
  console.log({ value });

  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [selectEpisodes, setSelectEpisodes] = useState(value);
  const [isShowMore, setIsShowMore] = useState(false);
  const [displayedChapters, setDisplayedChapters] = useState<number[]>([]);
  const lineHeight = Spacing.height32;
  const widthChapter = (WidthScreen - Spacing.width33 - (Spacing.width8 * 4)) / 5;
  const initialRowsToShow = 2; // Number of rows to show initially
  const expandedRowsToShow = 5; // Number of rows to show when expanded
  const chaptersPerRow = 5; // Number of chapters per row
  const initialChaptersToShow = initialRowsToShow * chaptersPerRow; // Total chapters to show initially
  const expandedChaptersToShow = expandedRowsToShow * chaptersPerRow; // Total chapters to show when expanded

  useEffect(() => {
    const chapters = Array.from({ length: chapter_total }, (_, i) => i + 1);
    setDisplayedChapters(chapters.slice(0, initialChaptersToShow));
  }, [chapter_total]);

  useEffect(() => {
    if (value) {
      setSelectEpisodes(value);
    }
  }, [value]);

  const handleLoadMore = () => {
    setIsShowMore(!isShowMore);
    setDisplayedChapters(isShowMore ? displayedChapters.slice(0, initialChaptersToShow) : Array.from({ length: chapter_total }, (_, i) => i + 1));
  };

  const handleSelectChapter = async (chapter: number) => {
    onPlayVideo?.();


    if (goToDetail) {
      goToDetail(chapter);
      return;
    }
    if (episodes) {
      const response = episodes.find((item) => item.index === chapter);
      if (response) {
        onSelectChapter?.(response);
      }
      return;
    }


    setSelectEpisodes(chapter);
    const response: any = await getDetailEpisodeApi(type, idPost, chapter);
    console.log({ response });

    onSelectChapter?.(response.data);
  };

  if (!chapter_total) { return null; }

  return (

    <View style={[styles.container, style]}>
      <AppText style={styles.title}>{title}</AppText>
      {isShowMore ? (
        <ScrollView style={{ maxHeight: (lineHeight * 5) + Spacing.height8 * 5 }}>
          <View style={styles.listChapter}>
            {displayedChapters.map((item, index) => {
              return (
                <TouchableOpacity key={`list_episodes_${index}`}
                  onPress={() => {
                    setSelectEpisodes(item);
                    handleSelectChapter?.(item);
                  }} style={[styles.btnChapter, { width: widthChapter }, selectEpisodes === item && styles.btnChapterActive]} >
                  <AppText style={[styles.txtChapter, selectEpisodes === item && styles.txtChapterActive]} numberOfLines={1}>{index + 1}</AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={[styles.listChapter, { maxHeight: lineHeight * 2 + Spacing.height16 }]}>
          {displayedChapters.map((item, index) => {
            return (
              <TouchableOpacity key={`list_episodes_${index}`}
                onPress={() => {
                  setSelectEpisodes(item);
                  handleSelectChapter?.(item);
                }} style={[styles.btnChapter, selectEpisodes === item && styles.btnChapterActive, { width: widthChapter }]} >
                <AppText style={[styles.txtChapter, selectEpisodes === item && styles.txtChapterActive]} numberOfLines={1}>{index + 1}</AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {chapter_total > 10 && (
        <TouchableOpacity style={styles.btnMore} onPress={handleLoadMore}>
          <AppText style={styles.txtMore}>{isShowMore ? t('movie.show_less') : t('movie.more')}</AppText>
        </TouchableOpacity>
      )}
    </View>

  );
};

export default AppEpisodes;
