import { AppEpisodes, AppHeader, AppInfoContent, HorizontalList } from '@components';
import { PostTypeKey } from '@types';
import React from 'react';
import { RefreshControl, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PosterDetail } from '../movies-detail/components/PosterDetail';
import { useChapterDetail } from './ChapterDetail.hook';

const ChapterDetail = () => {
  const { styles, detail, readChapter, scrollHandler, onNavigateDetail, isRefetching, headerBackgroundColorStyle, onRefresh, themeColors, type, refList, listChapter } = useChapterDetail();
  console.log({ detail }, listChapter);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={refList}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor={themeColors.text} />}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        <PosterDetail
          name={detail?.title}
          rating={detail?.rating_count}
          typeData={'series'}
          type={PostTypeKey.COMIC}
          views={detail?.views}
          noChapter={!detail?.chapter_total || detail?.chapter_total === 0 && type === PostTypeKey.COMIC}
          likes={detail?.like_count}
          poster={detail?.feature?.path}
          totalEpisodes={detail?.chapter_total || 0}
          onPlay={() => {
            if (detail?.chapter_total) {
              readChapter(1);
            }
          }}
          onNewChapter={() => {
            readChapter(detail?.chapter_total);
          }}
        />
        {detail?.chapter_current > 0 &&
          <AppEpisodes
            chapter_current={detail?.chapter_current}
            type={type}
            idPost={detail?.id}
            style={styles.episodes}

            goToDetail={(item) => {
              console.log({ item });
              readChapter(item);
            }} />}

        <AppInfoContent
          type={type}
          isPlaying={true}
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
      />

    </View>
  );
};

export default ChapterDetail;
