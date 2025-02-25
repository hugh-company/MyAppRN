import { AppListDashboard, HeaderMain } from '@components';
import { ItemListDashboard, PostTypeKey } from '@types';
import { t } from 'i18next';
import React from 'react';
import { InteractionManager, View } from 'react-native';
import { useGameScreen } from './GameScreen.hook';

const MemoizedAppListDashboard = React.memo(AppListDashboard);

const GameScreen = () => {
  const { games,
    styles,
    loading,
    onRefresh,
    tabSelect,
    handleCategorySelect } = useGameScreen();

  const [shouldRenderList, setShouldRenderList] = React.useState(false);

  React.useEffect(() => {
    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      setShouldRenderList(true);
    });

    return () => interactionHandle.cancel();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderMain title={t('games.title')} type={PostTypeKey.GAMES} isHome={false} />

      {shouldRenderList && (
        <MemoizedAppListDashboard
          data={games}
          loading={loading}
          onRefresh={onRefresh}
          categoryId={tabSelect?.id}
          onSelectedCategory={handleCategorySelect}
          typeScreen={ItemListDashboard.GAMES}
        />
      )}
    </View>
  );
};

export default GameScreen;
