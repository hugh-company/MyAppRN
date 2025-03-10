import { AppText } from '@components';
import { normalize, Spacing } from '@theme';
import { PostTypeKey } from '@types';
import React, { useCallback } from 'react';
import { Animated, InteractionManager, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalEpisodes } from '../../../components/AppEpisodes/ModalEpisodes';
import { usePreviewChapter } from './PreviewChapter.hook';
import { ControlBottom } from './components/ControlBottom';
import { ControlHeader } from './components/ControlHeader';
import ImageChapter from './components/ImageChapter';
import { ModalFilterChapter } from './components/ModalFilterChapter';

const PreviewChapter = () => {
  const { data, chapter, chapters, styles, type, headerStyle,
    scrollHandler, bottomStyle, goToNextChapter, goToPrevChapter,
    refModal, onApplyFilter,
    filterText, onClickScreen, showModalFilter,
    setShowModalFilter, onSelectChapter, scrollRef } = usePreviewChapter();
  const { top, bottom } = useSafeAreaInsets();
  const currentIndex = chapters?.findIndex((item) => item.id === chapter.id) || 0;
  const canGoToNextChapter = currentIndex < chapters.length - 1;
  const canGoToPrevChapter = currentIndex > 0;

  const renderItem = useCallback(({ item }: { item: any }) => {

    if (type === PostTypeKey.COMIC) {
      return (
        <ImageChapter uri={item} onPress={onClickScreen} />
      );
    } else {
      return (
        <AppText style={[styles.txtChapter, {
          fontSize: normalize(filterText.size[0]),
          color: filterText.color,
          backgroundColor: filterText.background,
          fontFamily: filterText.styleText || 'Roboto',
        }]}>{item.text}</AppText>
      );
    }
  }, [filterText, type, data]);
  const [shouldRenderList, setShouldRenderList] = React.useState(false);

  React.useEffect(() => {
    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      setShouldRenderList(true);
    });

    return () => interactionHandle.cancel();
  }, []);
  return (

    <View style={styles.container}>
      {shouldRenderList && <Animated.FlatList
        data={data}
        renderItem={renderItem}
        ref={scrollRef}
        ListHeaderComponent={<View style={[styles.headerTitle, { height: Spacing.height70 + top, paddingTop: top }]} >
          <AppText style={styles.titleChapter}>{chapter.title}</AppText>
        </View>}
        style={[type === PostTypeKey.NOVEL && styles.containerList]}
        keyExtractor={(item, index) => index.toString()}
        onScroll={scrollHandler}
        scrollEventThrottle={16}

        initialNumToRender={10}
        maxToRenderPerBatch={100}
        windowSize={100}
        ListFooterComponent={<View style={[styles.bottom, { height: bottom + Spacing.height50 }]} />}
      />}

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
          name={chapter.name || ''}
          nameChapter={chapter.title || ''}
        />
      </Animated.View>

      <ModalFilterChapter
        visible={showModalFilter}
        onClose={() => setShowModalFilter(false)}
        onFilter={onApplyFilter}
      />
      <ModalEpisodes
        refModal={refModal}
        episodes={chapters}
        height={0.7}
        minHeight={0.7}
        onSelectChapter={onSelectChapter}
        selectEpisodes={chapter.id} />
    </View>
  );
};

export default PreviewChapter;
