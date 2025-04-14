import { LeftIcon } from '@assets';
import { goBack } from '@navigation';
import { Spacing } from '@theme';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { usePreviewGame } from './PreviewGame.hook';

// You may need to create this icon or import from a library
const RotationIcon = () => {
  return (
    <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ transform: [{ rotate: '90deg' }], borderWidth: 1, borderColor: 'white', width: 16, height: 12, borderRadius: 2 }} />
      <View style={{ position: 'absolute', borderWidth: 1, borderColor: 'white', width: 8, height: 8, borderRadius: 4, borderStyle: 'dashed' }} />
    </View>
  );
};

const PreviewGame = () => {
  const { data, themeColors, styles, loading, setLoading, link } = usePreviewGame();
  const { top } = useSafeAreaInsets();
  const [isLandscape, setIsLandscape] = useState(false);

  const toggleOrientation = () => {
    if (isLandscape) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setIsLandscape(!isLandscape);
  };

  // Reset to portrait when component unmounts
  useEffect(() => {
    return () => {
      // Reset to portrait on cleanup
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <View style={styles.container} >
      <Animated.View style={[styles.header, { paddingTop: top || Spacing.width16 }]}>
        <TouchableOpacity style={styles.btnBack} onPress={() => goBack()}>
          <LeftIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBack} onPress={toggleOrientation}>
          <RotationIcon />
        </TouchableOpacity>
      </Animated.View>
      <WebView
        source={{ uri: link }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
        onMessage={(event) => {
          console.log('onMessage', event.nativeEvent.data);
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default PreviewGame;
