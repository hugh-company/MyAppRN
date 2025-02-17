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

let lastNavigateTime = 0;
const DEBOUNCE_TIME = 0; // Reduced debounce time

function debounceNavigation(action: () => void) {
  const currentTime = Date.now();
  if (currentTime - lastNavigateTime > DEBOUNCE_TIME) {
    action();
    lastNavigateTime = currentTime;
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

export const NavigationUtils = {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
  reset,
  navigateToStack,
};
