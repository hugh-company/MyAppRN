import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { PostTypeKey } from '@types';
import React from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalEpisodes } from '../../../components/AppEpisodes/ModalEpisodes';
import { usePreviewChapter } from './PreviewChapter.hook';
import ComicChapterRenderer from './components/ComicChapterRenderer';
import { ControlBottom } from './components/ControlBottom';
import { ControlHeader } from './components/ControlHeader';
import { ModalFilterChapter } from './components/ModalFilterChapter';
import NovelChapterRenderer from './components/NovelChapterRenderer';

const PreviewChapter = () => {
  const {
    data, chapter, styles, type, headerStyle,
    scrollHandler, bottomStyle, goToNextChapter, goToPrevChapter,
    refModal, onApplyFilter,
    filterText, onClickScreen, showModalFilter,
    setShowModalFilter, onSelectChapter, scrollRef,
    detailPost, indexChapter
  } = usePreviewChapter();
  const { top, bottom } = useSafeAreaInsets();
  const currentChapter = (indexChapter || 1) - 1;
  const canGoToNextChapter = currentChapter < detailPost.chapter_total - 1;
  const canGoToPrevChapter = currentChapter > 0;

  return (
    <View style={styles.container}>
      {type === PostTypeKey.COMIC ? (
        <ComicChapterRenderer
          data={data}
          chapter={chapter}
          scrollRef={scrollRef}
          scrollHandler={scrollHandler}
          onClickScreen={onClickScreen}
        />
      ) : (
        <NovelChapterRenderer
          data={data}
          chapter={chapter}
          scrollRef={scrollRef}
          scrollHandler={scrollHandler}
          filterText={filterText}
        />
      )}

      <Animated.View style={[styles.bottomStep, bottomStyle]}>
        <ControlBottom
          onNextStep={canGoToNextChapter ? goToNextChapter : undefined}
          onPrevStep={canGoToPrevChapter ? goToPrevChapter : undefined}
          isNext={canGoToNextChapter}
          isPrev={canGoToPrevChapter}
          isFilter={type === PostTypeKey.NOVEL}
          onShowModal={() => refModal.current?.present()}
          onFilter={() => setShowModalFilter(true)}
        />
      </Animated.View>

      <Animated.View style={[styles.header, styles.positionHeader, headerStyle]}>
        <ControlHeader
          name={detailPost?.title || ''}
          nameChapter={chapter?.title || ''}
        />
      </Animated.View>

      <ModalFilterChapter
        visible={showModalFilter}
        onClose={() => setShowModalFilter(false)}
        onFilter={onApplyFilter}
      />
      <ModalEpisodes
        refModal={refModal as React.RefObject<BottomSheetModal>}
        height={0.7}
        minHeight={0.7}
        onSelectChapter={onSelectChapter}
        selectEpisodes={chapter?.id}
        totalChapter={detailPost?.chapter_current || 0}
      />
    </View>
  );
};

export default PreviewChapter;
