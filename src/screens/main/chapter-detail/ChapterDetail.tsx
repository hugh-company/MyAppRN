import { AppEpisodes, AppHeader, AppInfoContent, HorizontalList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { PostTypeKey } from '@types';
import React from 'react';
import { RefreshControl, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PosterDetail } from '../movies-detail/components/PosterDetail';
import { useChapterDetail } from './ChapterDetail.hook';

const ChapterDetail = () => {
  const { styles, detail, loading, scrollHandler, headerBackgroundColorStyle, onRefresh, themeColors, type } = useChapterDetail();

  // if (loading) {
  //   return <LoadingDetailMovie />;
  // }
  console.log({ detail });

  if (!detail) {
    return null;
  }
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
          poster={detail?.feature?.path}
          totalEpisodes={detail?.chapters?.length || 0}
          onPlay={() => {
            console.log('aaa:', detail?.chapters?.length - 1);

            if (detail?.chapters?.length) {
              navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: detail?.chapters?.[0], chapters: detail?.chapters, type });
            }
          }}
          onNewChapter={() => {
            if (detail?.chapters?.length) {
              navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: detail?.chapters?.[detail?.chapters?.length - 1], chapters: detail?.chapters, type });

            }
          }}
        />
        <AppEpisodes
          episodes={detail?.chapters}
          style={styles.episodes}
          onSelectChapter={(item) => {
            console.log({ item });
            navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: item, type, chapters: detail?.chapters });

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
          data={detail.related_post?.items}
          button={detail.related_post?.button}
          type={type}
          title={detail.related_post?.label}
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
