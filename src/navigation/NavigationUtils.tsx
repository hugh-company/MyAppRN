import {
  CommonActions,
  StackActions,
  StackActionType,
} from '@react-navigation/native';
import { DeviceEventEmitter } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { SCREEN_ROUTE } from './router';

type typeNavigation = {
  dispatch: (arg0: CommonActions.Action | StackActionType) => void;
  canGoBack: () => boolean;
  getCurrentRoute?: () => { name: string } | undefined;
} | null;

let _navigator: typeNavigation;

export function setTopLevelNavigator(navigatorRef: typeNavigation) {
  _navigator = navigatorRef;
}

const DEBOUNCE_TIME = 500; // Increased debounce time to 500ms

let navigationPromise: Promise<void> | null = null;

function debounceNavigation(action: () => void) {
  if (!navigationPromise) {
    navigationPromise = new Promise((resolve) => {
      action();
      setTimeout(() => {
        navigationPromise = null;
        resolve();
      }, DEBOUNCE_TIME);
    });
  }
}

export function navigate(routeName: string, params?: object | undefined) {
  debounceNavigation(() => {

    _navigator?.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    );
  });
}

// thêm màn hình vào stack nếu có rồi
export function push(routeName: string, params?: object | undefined) {
  debounceNavigation(() => {
    _navigator?.dispatch(StackActions.push(routeName, params));
  });
}

export function resetApp() {
  DeviceEventEmitter.emit('eventLoadingApp');
}

export function navigateToStack(
  stackName: string,
  screenName: string,
  params?: object | undefined
) {
  debounceNavigation(() => {
    _navigator?.dispatch(
      CommonActions.navigate({
        name: stackName,
        params: {
          screen: screenName,
          params,
        },
      }),
    );
  });
}
export function navigateAuth(routeName: string, params?: object | undefined) {
  debounceNavigation(() => {
    const isAuthStack =
      _navigator &&
      typeof _navigator.getCurrentRoute === 'function' &&
      (
        _navigator.getCurrentRoute()?.name === SCREEN_ROUTE.LOGIN ||
        _navigator.getCurrentRoute()?.name === SCREEN_ROUTE.REGISTER ||
        _navigator.getCurrentRoute()?.name === SCREEN_ROUTE.FORGOT_PASSWORD
      );

    if (isAuthStack) {
      _navigator?.dispatch(
        CommonActions.navigate({
          name: routeName,
          params,
        }),
      );
    } else {
      navigateToStack(SCREEN_ROUTE.AUTH_STACK, routeName, params);
    }
  });
}

export function goBack() {

  if (_navigator?.canGoBack()) {
    Orientation.lockToPortrait();
    _navigator.dispatch(CommonActions.goBack());
  }
}

function pop(value: number) {
  _navigator?.dispatch(StackActions.pop(value));
}

export function reset(routeName: string) {
  _navigator?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    }),
  );
}
// go back with specific screen
export function goBackToScreen(screenName: string, params?: object | undefined) {
  _navigator?.dispatch(
    CommonActions.navigate({
      name: screenName,
      params,
    }),
  );
}

export const NavigationUtils = {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
  reset,
  navigateToStack,
};
