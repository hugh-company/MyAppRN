import { AppEpisodes, AppHeader, AppInfoContent, HorizontalList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { PostTypeKey } from '@types';
import React from 'react';
import { RefreshControl, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PosterDetail } from '../movies-detail/components/PosterDetail';
import { useChapterDetail } from './ChapterDetail.hook';

const ChapterDetail = () => {
  const { styles, detail, readChapter, scrollHandler, onSelectChapter, onNavigateDetail, headerBackgroundColorStyle, onRefresh, themeColors, type, refList } = useChapterDetail();

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
        ref={refList}
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
            if (detail?.chapters?.length) {
              readChapter();
            }
          }}
          onNewChapter={() => {
            if (detail?.chapters?.length) {
              navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, {
                chapter: {
                  ...detail?.chapters?.[detail?.chapters?.length - 1],
                  name: detail.title,
                }, chapters: detail?.chapters, type,
              });

            }
          }}
        />
        <AppEpisodes
          episodes={detail?.chapters}
          style={styles.episodes}
          onSelectChapter={(item) => {
            console.log({ item });
            onSelectChapter(item);
            //
          }} />

        <AppInfoContent
          type={type}
          // isLiked={data?.isLiked

          style={styles.infoRow}
          detail={detail}
        />
        <HorizontalList
          onDetail={(post) => onNavigateDetail(post)}
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
