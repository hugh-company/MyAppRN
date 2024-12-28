import { DotsIcon, LeftIcon } from '@assets';
import { goBack } from '@navigation';
import { Spacing } from '@theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePreviewGame } from './PreviewGame.hook';

const PreviewGame = () => {
  const { data, themeColors, styles, loading, setLoading, link } = usePreviewGame();
  const { top } = useSafeAreaInsets();
  return (
    <View style={styles.container} >
      <Animated.View style={[styles.header, { paddingTop: top || Spacing.width16 }]}>
        <TouchableOpacity style={styles.btnBack} onPress={() => goBack()}>
          <LeftIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBack} onPress={() => { }}>
          <DotsIcon />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default PreviewGame;
