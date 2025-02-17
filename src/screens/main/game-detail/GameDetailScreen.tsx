import { AppInfoContent, HorizontalList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { PostTypeKey } from '@types';
import React from 'react';
import { View } from 'react-native';
import { useGameDetailScreen } from './GameDetailScreen.hook';
import { HeaderGame } from './components/HeaderGame';

const GameDetailScreen = () => {
  const { data, themeColors, styles, loading } = useGameDetailScreen();
  // if (loading) {
  //   return <LoadingDetailMovie />;
  // }
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
        onPlay={() => { navigate(SCREEN_ROUTE.PREVIEW_GAME, { link: data?.iframe_game }); }}
      >

        <AppInfoContent
          type={PostTypeKey.GAMES}
          style={styles.infoRow}
          typeGame={data?.categories?.map(elm => elm.name).join(', ')}
          detail={data}
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
