import { AppText } from '@components';
import { normalize, Spacing } from '@theme';
import { PostTypeKey } from '@types';
import React, { useCallback } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalEpisodes } from '../../../components/AppEpisodes/ModalEpisodes';
import { usePreviewChapter } from './PreviewChapter.hook';
import { ControlBottom } from './components/ControlBottom';
import { ControlHeader } from './components/ControlHeader';
import ImageChapter from './components/ImageChapter';
import { ModalFilterChapter } from './components/ModalFilterChapter';

const PreviewChapter = () => {
  const { data, chapter, styles, type, headerStyle,
    scrollHandler, bottomStyle, goToNextChapter, goToPrevChapter,
    refModal, onApplyFilter,
    filterText, onClickScreen, showModalFilter,
    setShowModalFilter, onSelectChapter, scrollRef,
    detailPost, indexChapter } = usePreviewChapter();
  const { top, bottom } = useSafeAreaInsets();
  const currentChapter = (indexChapter || 1) - 1;
  const canGoToNextChapter = currentChapter < detailPost.chapter_total - 1;
  const canGoToPrevChapter = currentChapter > 0;

  const renderItem = useCallback(({ item }: { item: any }) => {
    if (type === PostTypeKey.COMIC) {
      return <ImageChapter uri={item} onPress={onClickScreen} />;
    } else {
      return (
        <AppText
          style={[
            styles.txtChapter,
            {
              fontSize: normalize(filterText.size[0]),
              color: filterText.color,
              backgroundColor: filterText.background,
              fontFamily: filterText.styleText || 'Roboto',
            },
          ]}
        >
          {item.text}
        </AppText>
      );
    }
  }, [filterText, type, data]);

  return (
    <View style={styles.container}>

      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        ref={scrollRef}
        numColumns={1}

        ListHeaderComponent={
          <View style={[styles.headerTitle, { height: Spacing.height70 + top, paddingTop: top }]}>
            <AppText style={styles.titleChapter}>{chapter?.title}</AppText>
          </View>
        }
        style={[type === PostTypeKey.NOVEL && styles.containerList]}
        keyExtractor={(item, index) => index.toString()}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        initialNumToRender={type === PostTypeKey.COMIC ? 2 : 10}
        maxToRenderPerBatch={10}
        windowSize={100}
        removeClippedSubviews={true}
        ListFooterComponent={<View style={[styles.bottom, { height: bottom + Spacing.height70 }]} />}
      />

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
        refModal={refModal}
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
