import { AppText } from '@components';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Spacing, useTheme } from '@theme';
import { chapterEpisodeInterface, PostTypeKey } from '@types';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ModalEpisodes } from './ModalEpisodes';
import { createStyles } from './styles';
export interface AppEpisodesProps {
  episodes?: chapterEpisodeInterface[];
  type?: PostTypeKey
  title?: string;
  style?: StyleProp<ViewStyle>;
  onSelectChapter?: (item: chapterEpisodeInterface) => void;
  value?: number;

}
const AppEpisodes = ({
  style,
  episodes = [],
  onSelectChapter,
  title, value = 0,
}: AppEpisodesProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [selectEpisodes, setSelectEpisodes] = useState(value);

  const lineHeight = Spacing.height32;
  const bottomModal = React.useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (value) {
      setSelectEpisodes(value);
    }
  }, [value]);
  const handleLoadMore = () => {
    bottomModal.current?.present();
  };
  if (!episodes?.length) { return null; }
  return (
    <>
      <View style={[styles.container, style]}>
        <AppText style={styles.title}>{title}</AppText>
        <View style={styles.listChapter}>
          {episodes?.slice(0, 50).map((item, index) => {
            return (
              <TouchableOpacity key={`list_episodes_${index}`}
                onPress={() => {
                  setSelectEpisodes(item.id);
                  onSelectChapter?.(item);
                }} style={[styles.btnChapter, selectEpisodes === item.id && styles.btnChapterActive]} >
                <AppText style={[styles.txtChapter, selectEpisodes === item.id && styles.txtChapterActive]} numberOfLines={1}>{index + 1}</AppText>
              </TouchableOpacity>
            );
          })}
        </View>
        {(((episodes?.length / 5) * lineHeight) > (lineHeight * 2 + Spacing.height16)) && (
          <TouchableOpacity style={styles.btnMore} onPress={handleLoadMore}>
            <AppText style={styles.txtMore}>{t('movie.more')}</AppText>
          </TouchableOpacity>
        )}
      </View>

      <ModalEpisodes
        refModal={bottomModal as any}
        episodes={episodes}
        minHeight={1}
        height={1}
        onSelectChapter={onSelectChapter}
        selectEpisodes={selectEpisodes} />
    </>
  );
};


export default AppEpisodes;
