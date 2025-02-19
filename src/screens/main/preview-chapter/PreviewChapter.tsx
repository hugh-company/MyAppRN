import { AppFlatListAnimated, AppText } from '@components';
import { normalize, Spacing } from '@theme';
import { PostTypeKey } from '@types';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
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
    showModalEpisodes, setShowModalEpisodes, onApplyFilter,
    filterText, onClickScreen, showModalFilter,
    setShowModalFilter, onSelectChapter } = usePreviewChapter();
  const { top, bottom } = useSafeAreaInsets();

  const currentIndex = chapters?.findIndex((item) => item.id === chapter.id) || 0;
  const canGoToNextChapter = currentIndex < chapters.length - 1;
  const canGoToPrevChapter = currentIndex > 0;

  const renderItem = useCallback(({ item }) => {
    if (type === PostTypeKey.COMIC) {
      return <ImageChapter uri={item.url} onPress={onClickScreen} />;
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
  }, [filterText]);



  return (
    <View style={styles.container}>
      <AppFlatListAnimated
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={<View style={[styles.headerTitle, { height: Spacing.height50 + top, paddingTop: top }]} >
          <AppText style={styles.titleChapter}>{chapter.title}</AppText>
        </View>}
        style={[type === PostTypeKey.NOVEL && styles.containerList]}
        keyExtractor={(item, index) => index.toString()}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        removeClippedSubviews
        onStartShouldSetResponder={(event) => {
          console.log('Click vào danh sách', event.nativeEvent);

          return false; // Trả về `false` để vẫn có thể vuốt
        }}
        ListFooterComponent={<View style={[styles.bottom, { height: bottom + Spacing.height50 }]} />}
      />

      <Animated.View style={[styles.bottomStep, bottomStyle]}>
        <ControlBottom
          onNextStep={canGoToNextChapter ? goToNextChapter : undefined}
          onPrevStep={canGoToPrevChapter ? goToPrevChapter : undefined}
          isNext={canGoToNextChapter}
          isPrev={canGoToPrevChapter}
          isFilter={type === PostTypeKey.NOVEL}
          onShowModal={() => setShowModalEpisodes(true)}
          onFilter={() => setShowModalFilter(true)}
        />
      </Animated.View>
      <Animated.View style={[styles.header, styles.positionHeader, { paddingTop: top || Spacing.width16 }, { ...headerStyle }]}>
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
        showModal={showModalEpisodes}
        episodes={chapters}
        height={0.7}
        setShowModal={setShowModalEpisodes}
        onSelectChapter={onSelectChapter}
        selectEpisodes={chapter.id} />
    </View>
  );
};

export default PreviewChapter;
