import { DotsIcon, LeftIcon } from '@assets';
import { AppFlatListAnimated, AppText } from '@components';
import { goBack } from '@navigation';
import { normalize, Spacing } from '@theme';
import { PostTypeKey } from '@types';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePreviewChapter } from './PreviewChapter.hook';
import { ControlNextStep } from './components/ControlNextStep';
import ImageChapter from './components/ImageChapter';
import { ModalFilterChapter } from './components/ModalFilterChapter';

const PreviewChapter = () => {
  const { data, chapter, chapters, styles, type, headerStyle, scrollHandler, bottomStyle, goToNextChapter, goToPrevChapter, showModal, setShowModal, onApplyFilter, filterText } = usePreviewChapter();
  const { top, bottom } = useSafeAreaInsets();


  const renderItem = useCallback(({ item }) => {
    if (type === PostTypeKey.COMIC) {
      return <ImageChapter uri={item.url} />;
    } else {
      return <AppText style={[styles.txtChapter, {
        fontSize: normalize(filterText.size[0]),
        color: filterText.color,
        backgroundColor: filterText.background,
        fontFamily: filterText.styleText || 'Roboto',
      }]}>{item.text}</AppText>;
    }
  }, [filterText]);


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, type === PostTypeKey.COMIC && styles.positionHeader, { paddingTop: top || Spacing.width16 }, type === PostTypeKey.COMIC && { ...headerStyle }]}>
        <TouchableOpacity style={styles.btnBack} onPress={() => goBack()}>
          <LeftIcon />
        </TouchableOpacity>
        {type !== PostTypeKey.COMIC && <TouchableOpacity style={styles.btnBack} onPress={() => {
          setShowModal(true);
        }}>
          <DotsIcon />
        </TouchableOpacity>}
      </Animated.View>
      <AppFlatListAnimated
        data={data}
        renderItem={renderItem}
        style={[type === PostTypeKey.NOVEL && styles.containerList]}
        keyExtractor={(item, index) => index.toString()}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        removeClippedSubviews
        ListFooterComponent={<View style={[styles.bottom, { height: bottom + Spacing.height50 }]} />}

      />
      <Animated.View style={[styles.bottomStep, bottomStyle]}>
        <ControlNextStep
          name={chapter.title || ''}
          onNextStep={goToNextChapter}
          onPrevStep={goToPrevChapter}
          data={chapters}
          currentIndex={chapters?.findIndex((item) => item.id === chapter.id) || 0}
        />
      </Animated.View>

      <ModalFilterChapter
        visible={showModal}
        onClose={() => setShowModal(false)}
        onFilter={onApplyFilter}
      />
    </View>
  );
};

export default PreviewChapter;
