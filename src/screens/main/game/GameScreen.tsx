import { AppListDashboard, HeaderMain } from '@components';
import { ItemListDashboard } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useGameScreen } from './GameScreen.hook';

const GameScreen = () => {
  const { games,
    themeColors,
    styles,
    loading,
    onRefresh,
    tabSelect,
    handleCategorySelect } = useGameScreen();

  return (
    <View style={styles.container}>
      <HeaderMain title={t('games.title')} isHome={false} />

      <AppListDashboard
        data={games}
        loading={loading}
        onRefresh={onRefresh}
        categoryId={tabSelect?.id}
        onSelectedCategory={handleCategorySelect}
        typeScreen={ItemListDashboard.GAMES}
      />
    </View>
  );
};

export default GameScreen;
