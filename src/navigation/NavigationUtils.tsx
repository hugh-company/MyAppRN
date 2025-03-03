import {
  CommonActions,
  StackActions,
  StackActionType,
} from '@react-navigation/native';
import { DeviceEventEmitter } from 'react-native';
import Orientation from 'react-native-orientation-locker';

type typeNavigation = {
  dispatch: (arg0: CommonActions.Action | StackActionType) => void;
  canGoBack: () => boolean;
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
export function goBackToScreen(screenName: string) {
  _navigator?.dispatch(
    CommonActions.navigate({
      name: screenName,
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
