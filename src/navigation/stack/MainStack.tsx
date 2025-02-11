import { SCREEN_ROUTE } from '@navigation';

import { createStackNavigator } from '@react-navigation/stack';
import { ChapterDetail, ChatScreen, CreateProfileScreen, DetailUser, FavoriteScreen, FilterDating, GameDetailScreen, MessageScreen, MovieDetailScreen, PreviewChapter, PreviewGame, SearchMessages, SearchScreen, SettingFavorite, VideoScreen, ViewListScreen } from '@screens';
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

        <MainStack.Screen name={SCREEN_ROUTE.FAVORITE} component={FavoriteScreen} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />

        {/* Search */}
        <MainStack.Screen name={SCREEN_ROUTE.SEARCH_SCREEN} component={SearchScreen} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        {/* Movies */}
        <MainStack.Screen name={SCREEN_ROUTE.VIEW_LIST} component={ViewListScreen} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        <MainStack.Screen name={SCREEN_ROUTE.MOVIE_DETAIL} component={MovieDetailScreen} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        <MainStack.Screen name={SCREEN_ROUTE.VIDEO} component={VideoScreen} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        <MainStack.Screen name={SCREEN_ROUTE.CHAPTER_DETAIL} component={ChapterDetail} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        <MainStack.Screen name={SCREEN_ROUTE.PREVIEW_CHAPTER} component={PreviewChapter} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        <MainStack.Screen name={SCREEN_ROUTE.PREVIEW_GAME} component={PreviewGame} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        <MainStack.Screen name={SCREEN_ROUTE.GAME_DETAIL} component={GameDetailScreen} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        {/* Dating */}
        <MainStack.Screen name={SCREEN_ROUTE.CREATE_PROFILE} component={CreateProfileScreen} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        <MainStack.Screen name={SCREEN_ROUTE.SETTING_FAVORITE} component={SettingFavorite} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        <MainStack.Screen name={SCREEN_ROUTE.FILTER_DATING} component={FilterDating} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        {/* chat */}
        <MainStack.Screen name={SCREEN_ROUTE.MESSAGES} component={MessageScreen} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
        <MainStack.Screen name={SCREEN_ROUTE.CHAT} component={ChatScreen} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />

        <MainStack.Screen name={SCREEN_ROUTE.SEARCH_MESSAGE} component={SearchMessages}
          options={{
            animationTypeForReplace: 'push',
            gestureEnabled: true,
            detachPreviousScreen: false,
          }} />
        <MainStack.Screen name={SCREEN_ROUTE.DETAIL_USER} component={DetailUser} options={{
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          detachPreviousScreen: false,
        }} />
      </MainStack.Navigator>
    </>
  );
});

export { MainStackComponent };
