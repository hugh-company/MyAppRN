import {SCREEN_ROUTE} from '@navigation';

import {createStackNavigator} from '@react-navigation/stack';
import {
  clearPasscode,
  getPasscodeSelector,
  getPasscodeTimeSelector,
} from '@redux';
import {
  AllGuestScreen,
  ChangePasswordScreen,
  ChangeTableScreen,
  CheckoutScreen,
  CheckoutSuccess,
  DeviceScreen,
  HomeScreen,
  MenuCategoryScreen,
  PassCode,
  PopupSettingPrinter,
  ProfileScreen,
  SearchTableScreen,
  SettingPasswordScreen,
  SettingScreen,
  TableScreen,
} from '@screens';
import React, {memo, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const MainStack = createStackNavigator();
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const MainStackComponent = memo(() => {
  return (
    <>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={SCREEN_ROUTE.HOME}>
        <MainStack.Screen name={SCREEN_ROUTE.HOME} component={HomeScreen} />
      </MainStack.Navigator>
      <PopupSettingPrinter />
    </>
  );
});

export {MainStackComponent};
