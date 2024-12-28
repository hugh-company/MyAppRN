import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';
import { ChapterDetail, GameDetailScreen, MovieDetailScreen, PreviewChapter, PreviewGame, SearchScreen, VideoScreen, ViewListScreen } from '@screens';
import React, { memo } from 'react';
import { DrawerNavigation } from '../navigator/DrawerNavigation';

const MainStack = createStackNavigator();

const MainStackComponent = memo(() => {
  return (
    <>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={SCREEN_ROUTE.DRAWER_NAVIGATION}>
        <MainStack.Screen name={SCREEN_ROUTE.DRAWER_NAVIGATION} component={DrawerNavigation} />

        {/* Search */}
        <MainStack.Screen name={SCREEN_ROUTE.SEARCH_SCREEN} component={SearchScreen} />
        {/* Movies */}
        <MainStack.Screen name={SCREEN_ROUTE.VIEW_LIST} component={ViewListScreen} />
        <MainStack.Screen name={SCREEN_ROUTE.MOVIE_DETAIL} component={MovieDetailScreen} />
        <MainStack.Screen name={SCREEN_ROUTE.VIDEO} component={VideoScreen} />
        <MainStack.Screen name={SCREEN_ROUTE.CHAPTER_DETAIL} component={ChapterDetail} />
        <MainStack.Screen name={SCREEN_ROUTE.PREVIEW_CHAPTER} component={PreviewChapter} />
        <MainStack.Screen name={SCREEN_ROUTE.PREVIEW_GAME} component={PreviewGame} />
        <MainStack.Screen name={SCREEN_ROUTE.GAME_DETAIL} component={GameDetailScreen} />
      </MainStack.Navigator>
    </>
  );
});

export { MainStackComponent };
