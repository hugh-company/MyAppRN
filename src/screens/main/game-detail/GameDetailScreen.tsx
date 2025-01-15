import { AppInfoContent, AppText, HorizontalList, LoadingDetailMovie } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useGameDetailScreen } from './GameDetailScreen.hook';
import { HeaderGame } from './components/HeaderGame';

const GameDetailScreen = () => {
  const { data, themeColors, styles, loading } = useGameDetailScreen();
  if (loading) {
    return <LoadingDetailMovie />;
  }
  if (!data) {
    return null;
  }
  return (
    <View style={styles.container}>
      <HeaderGame
        name={data?.title}
        logo={data?.feature?.path}
        likes={data?.like_count}
        poster={data?.banner?.path}
      >
        <TouchableOpacity onPress={() => {
          navigate(SCREEN_ROUTE.PREVIEW_GAME, { link: data?.iframe_game });
        }} style={styles.btnPlay}>
          <AppText style={styles.txtPlay}>{t('games.playGame')}</AppText>
        </TouchableOpacity>
        <AppInfoContent
          id={data?.id}
          type={PostTypeKey.GAMES}
          name={data?.seo_title}
          style={styles.infoRow}
          isSave={false}

          tags={data?.tags}
          typeGame={data?.categories?.map(elm => elm.name).join(', ')}
          description={data?.description}

        />
        <HorizontalList
          data={data.related_post?.items}
          type={PostTypeKey.GAMES}
          button={data.related_post?.button}
          title={data.related_post?.label}
          itemStyle={styles.itemImage}

        />
      </HeaderGame>
    </View>
  );
};

export default GameDetailScreen;
