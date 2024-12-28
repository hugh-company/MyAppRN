import { AppFlatListAnimated, GirdContainer, HeaderMain } from '@components';
import { gameCategories } from '@services';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { BannerMovie } from '../movies';
import { useGameScreen } from './GameScreen.hook';
import ItemGame from './components/ItemGame';

const GameScreen = () => {
  const { data, themeColors, styles } = useGameScreen();
  const renderItem = ({ item }) => {
    return <ItemGame item={item} />;
  };
  const renderListHeader = () => {
    return (
      <View style={styles.header}>
        <BannerMovie data={data} isGame={true} title={'Game nổi bật'} style={styles.banner} />
        <GirdContainer data={gameCategories} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderMain title={t('games.title')} isHome={false} />
      <AppFlatListAnimated

        ListHeaderComponent={renderListHeader}
        data={data}

        renderItem={renderItem} />
    </View>
  );
};

export default GameScreen;
