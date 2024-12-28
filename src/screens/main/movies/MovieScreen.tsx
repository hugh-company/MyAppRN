import { AppCategoryList, AppInputSearch, HeaderMain, HorizontalList, SliderList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { TypeListMovie } from '@types';
import { t } from 'i18next';
import React, { memo, useCallback } from 'react';
import { Animated, View } from 'react-native';
import { useMovieScreen } from './MovieScreen.hook';
import { BannerMovie } from './components/BannerMovie';

const MovieScreen = () => {
  const { data, dataCategory, styles, search, onSearch, activeCategory, onSelectedCategory,
    inputSearchStyle,
    scrollHandler,
  } = useMovieScreen();

  const handleSearchChange = useCallback((text) => {
    onSearch(text);
  }, [onSearch]);

  const handleCategorySelect = useCallback((id) => {
    onSelectedCategory(id);
  }, [onSelectedCategory]);

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'banner':
        return <BannerMovie data={item.data} style={styles.banner} title={item?.name} />;
      case 'slider':
        return (
          <SliderList
            title={t('home.typeFavorite')}
            data={item.data}
            onViewMore={() => navigate(SCREEN_ROUTE.VIEW_LIST, { type: '', name: t('home.typeFavorite') })}
          />
        );
      case 'horizontal':
        return (
          <HorizontalList
            title={item.name}
            type={TypeListMovie.MOVIES}
            data={item.data}
            titleViewMore={t('home.viewAll')}
            onViewMore={() => { }}
            itemStyle={styles.itemStyle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <HeaderMain title={t('movies.movieGood')} />
      <Animated.View style={[styles.inputSearch, inputSearchStyle]}>
        <AppInputSearch
          value={search}
          onChangeText={handleSearchChange}
        />
      </Animated.View>
      <AppCategoryList data={dataCategory} categoryId={activeCategory} onSelectedCategory={handleCategorySelect} style={styles.category} listStyle={styles.listCategory} />
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        style={styles.list}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

export default memo(MovieScreen);
