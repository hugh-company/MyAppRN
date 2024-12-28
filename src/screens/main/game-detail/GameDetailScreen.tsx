import { AppInfoContent, AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { TypeListMovie } from '@types';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useGameDetailScreen } from './GameDetailScreen.hook';
import { HeaderGame } from './components/HeaderGame';

const GameDetailScreen = () => {
  const { data, themeColors, styles } = useGameDetailScreen();

  return (
    <View style={styles.container}>
      <HeaderGame
        name={data?.name}
        logo={data?.images?.[0]}

        duration={data?.duration}
        views={data?.views}
        likes={data?.likes}
        poster={data?.poster}

      >
        <TouchableOpacity onPress={() => {
          navigate(SCREEN_ROUTE.PREVIEW_GAME, { link: data?.link });
        }} style={styles.btnPlay}>
          <AppText style={styles.txtPlay}>{t('games.playGame')}</AppText>
        </TouchableOpacity>
        <AppInfoContent
          type={TypeListMovie.GAMES}
          isLiked={data?.isLiked}
          style={styles.infoRow}
          isSave={false}
          releaseDate={data?.releaseDate}
          tags={data?.tags}
          typeGame={data?.type}
          description={data?.description}

        />

      </HeaderGame>
    </View>
  );
};

export default GameDetailScreen;
