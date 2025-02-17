import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';
import { ChapterDetail, ChatScreen, CreateProfileScreen, DetailUser, FavoriteScreen, FilterDating, GameDetailScreen, MessageScreen, MovieDetailScreen, PreviewChapter, PreviewGame, SavedPost, SearchMessages, SearchScreen, SettingFavorite, VideoScreen, ViewListScreen } from '@screens';
import React, { memo } from 'react';
import { DrawerNavigation } from '../navigator/DrawerNavigation';

const MainStack = createStackNavigator();

const MainStackComponent = memo(() => {
  return (
    <>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false, // Ensure gesture is disabled globally
        }}
        initialRouteName={SCREEN_ROUTE.DRAWER_NAVIGATION}>
        <MainStack.Screen name={SCREEN_ROUTE.DRAWER_NAVIGATION} component={DrawerNavigation} />

        <MainStack.Screen name={SCREEN_ROUTE.FAVORITE} component={FavoriteScreen} options={{

        }} />

        {/* Search */}
        <MainStack.Screen name={SCREEN_ROUTE.SEARCH_SCREEN} component={SearchScreen} options={{

        }} />
        {/* Movies */}
        <MainStack.Screen name={SCREEN_ROUTE.VIEW_LIST} component={ViewListScreen} options={{

        }} />
        <MainStack.Screen name={SCREEN_ROUTE.MOVIE_DETAIL} component={MovieDetailScreen} options={{

        }} />
        <MainStack.Screen name={SCREEN_ROUTE.VIDEO} component={VideoScreen} options={{

        }} />
        <MainStack.Screen name={SCREEN_ROUTE.CHAPTER_DETAIL} component={ChapterDetail} options={{

        }} />
        <MainStack.Screen name={SCREEN_ROUTE.PREVIEW_CHAPTER} component={PreviewChapter} options={{

        }} />
        <MainStack.Screen name={SCREEN_ROUTE.PREVIEW_GAME} component={PreviewGame} options={{

        }} />
        <MainStack.Screen name={SCREEN_ROUTE.GAME_DETAIL} component={GameDetailScreen} options={{

        }} />
        {/* Dating */}
        <MainStack.Screen name={SCREEN_ROUTE.CREATE_PROFILE} component={CreateProfileScreen} />
        <MainStack.Screen name={SCREEN_ROUTE.SETTING_FAVORITE} component={SettingFavorite} options={{

        }} />
        <MainStack.Screen name={SCREEN_ROUTE.FILTER_DATING} component={FilterDating} options={{

        }} />
        {/* chat */}
        <MainStack.Screen name={SCREEN_ROUTE.MESSAGES} component={MessageScreen} options={{

        }} />
        <MainStack.Screen name={SCREEN_ROUTE.CHAT} component={ChatScreen} options={{

        }} />

        <MainStack.Screen name={SCREEN_ROUTE.SEARCH_MESSAGE} component={SearchMessages}
          options={{
            animationTypeForReplace: 'push',
            detachPreviousScreen: false,
          }} />
        <MainStack.Screen name={SCREEN_ROUTE.DETAIL_USER} component={DetailUser} options={{

        }} />
        {/* saved */}
        <MainStack.Screen name={SCREEN_ROUTE.SAVED_POST} component={SavedPost} options={{

        }} />
      </MainStack.Navigator>
    </>
  );
});

export { MainStackComponent };
