import { AppInputSearch, HeaderMain, HorizontalList, SliderList } from '@components';
import { TypeListMovie } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { BannerMovie } from '../movies';
import { useChapterScreen } from './ChapterScreen.hook';

const ChapterScreen = () => {
  const { data, themeColors, styles, search, onSearch, scrollHandler, heightStyle, opacityStyle } = useChapterScreen();
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'banner':
        return <BannerMovie title={item?.name} data={item.data} />;
      case 'slider':
        return (
          <SliderList
            title={t('home.typeFavorite')}
            data={item.data}
          />
        );
      case 'horizontal':
        return (
          <HorizontalList
            title={item.name}
            type={TypeListMovie.CHAPTERS}
            data={item.data}
            titleViewMore={t('home.viewAll')}
            itemStyle={styles.itemStyle}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <HeaderMain title={t('chapter.title')} />
      <Animated.View style={[styles.inputSearch]}>
        <AppInputSearch
          value={search}
          onChangeText={onSearch}
        />
      </Animated.View>

      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        style={styles.list}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ChapterScreen;
