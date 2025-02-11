import { apiService } from '@api';

import { initI18n } from '@translations';

import { QueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { LogBox, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import { enableFreeze, enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';

enableScreens();
enableFreeze(true);
// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
// Settings.initializeSDK();
// GoogleSignin.configure({
//   scopes: ['email'],
//   webClientId: Platform.OS === 'ios' ?
//     '215589107688-hn52i6mnr89rfo4ov57bsqlibljo5iut.apps.googleusercontent.com' :
//     '215589107688-hn52i6mnr89rfo4ov57bsqlibljo5iut.apps.googleusercontent.com',
// });
// connect apollo client

initI18n();
function App(): React.JSX.Element {
  const queryClient = new QueryClient();

  useEffect(() => {
    // Hide splash screen once app is ready
    SplashScreen.hide();
    Orientation.lockToPortrait(); // Ensure it locks to portrait mode when the component unmounts
    apiService.setBaseURL();
  }, []);

  LogBox.ignoreLogs([
    /Support for defaultProps will be removed/,
    'Open debug',
  ]);
  return (
    <GestureHandlerRootView style={styles.container} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default App;
