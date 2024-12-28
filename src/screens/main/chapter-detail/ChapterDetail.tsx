import { AppEpisodes, AppInfoContent, HeaderDetail, HorizontalList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { viewListChapter } from '@services';
import { TypeListMovie } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useChapterDetail } from './ChapterDetail.hook';

const ChapterDetail = () => {
  const { data, themeColors, styles } = useChapterDetail();

  if (!data) {
    return null;
  }
  return (
    <View style={styles.container}>
      <HeaderDetail name={data?.name}
        rating={data?.rating}
        typeData={'series'}
        type={TypeListMovie.CHAPTERS}
        duration={data?.duration}
        views={data?.views}
        likes={data?.likes}
        poster={data?.poster}
        totalEpisodes={data?.totalChapters}
        onPlay={() => {
          if (data?.chapters?.length) {
            navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: data?.chapters?.[data?.chapters?.length - 1] });
          }
        }}
        onNewChapter={() => {
          if (data?.chapters?.length) {
            navigate(SCREEN_ROUTE.PREVIEW_CHAPTER, { chapter: data?.chapters?.[0] });

          }
        }}


      >
        {data?.type === 'series' && <AppEpisodes episodes={data.chapters} total={data?.totalChapters} style={styles.episodes} />}
        <AppInfoContent
          type={TypeListMovie.CHAPTERS}
          isLiked={data?.isLiked}
          style={styles.infoRow}
          isSave={false}
          releaseDate={data?.releaseDate}
          tags={data?.tags}
          main_actors={data?.main_actors}
          description={data?.description}
          director={data?.director}
        />
        <HorizontalList
          data={viewListChapter}
          type={TypeListMovie.CHAPTERS}
          title={t('movie.otherMovie')}
          itemStyle={styles.itemImage}

        />
      </HeaderDetail>
    </View>
  );
};

export default ChapterDetail;
