import { Box } from '@theme';
import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
export interface AppLoadingProps {
  style?: StyleProp<ViewStyle>
}

function AppLoading(props: AppLoadingProps) {

  const { style } = props;
  return <Box style={[styles.container, style]}>
    <View style={[styles.background]}>
      <ActivityIndicator />
    </View>
  </Box>;
}
export default AppLoading;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    // height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
  background: {
    height: 60,
    width: 60,
    borderRadius: 3,
    // backgroundColor: 'rgba(214, 214, 229, 0.87)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  transparentBgr: { backgroundColor: 'transparent' },
});
