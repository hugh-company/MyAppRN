import { AppEpisodes, AppHeader, AppInfoContent, HorizontalList, LoadingDetailMovie } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { RefreshControl, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PosterDetail } from '../movies-detail/components/PosterDetail';
import { useChapterDetail } from './ChapterDetail.hook';

const ChapterDetail = () => {
  const { styles, detail, loading, scrollHandler, headerBackgroundColorStyle, onRefresh, themeColors, type } = useChapterDetail();

  if (loading) {
    return <LoadingDetailMovie />;
  }
  if (!detail) {
    return null;
  }
  const posterMovie = detail?.feature?.path;

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        // refetch data
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} tintColor={themeColors.text} />}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        <PosterDetail
          name={detail?.title}
          rating={detail?.rating_count}
          typeData={'series'}
          type={PostTypeKey.COMIC}

          views={detail?.views}
          likes={detail?.like_count}
          poster={posterMovie}
          totalEpisodes={detail?.chapters?.length}
          onPlay={() => {
            if (detail?.chapters?.length) {
              navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: detail?.chapters?.[detail?.chapter?.length - 1], type });
            }
          }}
          onNewChapter={() => {
            if (detail?.chapters?.length) {
              navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: detail?.chapters?.[0], type });
            }
          }}
        />
        <AppEpisodes
          episodes={detail?.chapters}
          style={styles.episodes}
          onSelectChapter={(item) => {
            console.log({ item });
            navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: item, type });

          }} />

        <AppInfoContent
          type={type}
          // isLiked={data?.isLiked}
          id={detail?.id}
          name={detail?.seo_title}
          style={styles.infoRow}
          isSave={false}
          releaseDate={detail?.release_date}
          tags={detail?.categories}
          main_actors={detail?.actors}
          description={detail?.description}
          director={detail?.creators}
        />
        <HorizontalList
          data={detail.related_post}
          type={type}
          title={t('view_list.otherChapter')}
          itemStyle={styles.itemImage}

        />
        <View style={styles.paddingBottom} />
      </Animated.ScrollView>
      <AppHeader
        style={[styles.header, headerBackgroundColorStyle]}
      // rightComponent={<TouchableOpacity
      //   // onPress={() => setShowRating(true)}
      //   style={styles.btnDots}><DotsIcon /></TouchableOpacity>}
      />

    </View>
  );
};

export default ChapterDetail;
