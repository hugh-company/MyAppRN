import { AppInfoContent, HorizontalList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { PostTypeKey } from '@types';
import React from 'react';
import { View } from 'react-native';
import { useGameDetailScreen } from './GameDetailScreen.hook';
import { HeaderGame } from './components/HeaderGame';

export const GameDetailScreen = () => {
  const { dataGame, isSuccess, styles, refetch,
    isRefetching } = useGameDetailScreen();

  if (!dataGame) {
    return null;
  }
  return (
    <View style={styles.container}>
      <HeaderGame
        name={dataGame?.title}
        logo={dataGame?.feature?.path}
        likes={dataGame?.like_count}
        poster={dataGame?.banner?.path}
        onRefresh={refetch}
        refreshing={isRefetching}
        onPlay={() => { navigate(SCREEN_ROUTE.PREVIEW_GAME, { link: dataGame?.iframe_game }); }}
      >

        <AppInfoContent
          type={PostTypeKey.GAMES}
          style={styles.infoRow}
          typeGame={dataGame?.categories?.map(elm => elm.name).join(', ')}
          detail={dataGame}
          isPlaying={true}
        />
        <HorizontalList
          data={dataGame.related_post?.items}
          type={PostTypeKey.GAMES}
          button={dataGame.related_post?.button}
          title={dataGame.related_post?.label}
          itemStyle={styles.itemImage}

        />
      </HeaderGame>
    </View>
  );
};
