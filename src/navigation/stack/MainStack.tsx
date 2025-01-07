import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';
import { ChapterDetail, CreateProfileScreen, FilterDating, GameDetailScreen, MovieDetailScreen, PreviewChapter, PreviewGame, SearchScreen, SettingFavorite, VideoScreen, ViewListScreen } from '@screens';
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
        {/* Dating */}

        <MainStack.Screen name={SCREEN_ROUTE.CREATE_PROFILE} component={CreateProfileScreen} />
        <MainStack.Screen name={SCREEN_ROUTE.SETTING_FAVORITE} component={SettingFavorite} />
        <MainStack.Screen name={SCREEN_ROUTE.FILTER_DATING} component={FilterDating} />

      </MainStack.Navigator>
    </>
  );
});

export { MainStackComponent };
