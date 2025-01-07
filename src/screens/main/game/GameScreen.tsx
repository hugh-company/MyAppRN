import { AppListDashboard, HeaderMain } from '@components';
import { ItemListDashboard } from '@types';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { useGameScreen } from './GameScreen.hook';
import ItemGame from './components/ItemGame';

const GameScreen = () => {
  const { data,
    themeColors,
    styles,
    loading,
    onRefresh,
    tabSelect,
    handleCategorySelect } = useGameScreen();
  const renderItem = ({ item }) => {
    return <ItemGame item={item} />;
  };
  const renderListHeader = () => {
    return (
      <View style={styles.header}>
        {/* <BannerMovie data={data} isGame={true} title={'Game nổi bật'} style={styles.banner} /> */}
        {/* <GirdContainer data={gameCategories} /> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderMain title={t('games.title')} isHome={false} />
      <AppListDashboard
        data={data}
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
