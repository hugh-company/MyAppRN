import { CustomVideoPlayer } from '@components';
import { FontSize, FontWithFamily, HeightScreen, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import React, { useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export interface VideoPlayerProps {
  image?: string;
  urlVideo?: string;
  setIsFullScreenVisible: (visible: boolean) => void;
  isFullScreenVisible: boolean;
  autoPlay?: boolean; // Add autoPlay prop
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}
const VideoComponent = ({ urlVideo, isFullScreenVisible, setIsFullScreenVisible, styles }: any) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const videoHeight = useSharedValue((WidthScreen * 9) / 16);
  const videoWidth = useSharedValue(WidthScreen);

  useEffect(() => {
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      const isLandscape = width > height;
      if (isFullScreenVisible) {
        videoHeight.value = withTiming(isLandscape ? height : windowHeight);
        videoWidth.value = withTiming(isLandscape ? width : windowWidth);
      } else {
        videoHeight.value = withTiming((WidthScreen * 9) / 16);
        videoWidth.value = withTiming(WidthScreen);
      }
    };

    Dimensions.addEventListener('change', handleOrientationChange);
    handleOrientationChange();

    return () => {
      // Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, [isFullScreenVisible, videoHeight, videoWidth, windowHeight, windowWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: videoHeight.value,
    width: videoWidth.value,
  }));

  return (
    <Animated.View style={[styles.video, animatedStyle]}>
      <CustomVideoPlayer
        uri={urlVideo || ''}
        style={styles.banner}
        styleVideo={styles.banner}
        isFullScreenVisible={isFullScreenVisible}
        setIsFullScreenVisible={setIsFullScreenVisible}
      />
    </Animated.View>
  );
};

export function VideoPlayer({ urlVideo, setIsFullScreenVisible, isFullScreenVisible }: VideoPlayerProps) {
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), []);

  return (
    <View style={styles.container}>

      <VideoComponent
        urlVideo={urlVideo}
        isFullScreenVisible={isFullScreenVisible}
        setIsFullScreenVisible={setIsFullScreenVisible}
        styles={styles}
      />
    </View>
  );
}

const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {},
  video: {
    width: '100%',
    height: '100%',
  },
  btnPlay: {
    backgroundColor: themeColors.primary,
    borderRadius: Spacing.width88,
    height: Spacing.width44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.width8,
    paddingHorizontal: Spacing.width16,
  },
  txtPlay: {
    fontSize: FontSize.FontSize16,
    color: themeColors.text,
    ...FontWithFamily.FontWithFamily_600,
  },
  btnBack: {
    width: Spacing.width40,
    height: Spacing.width40,
    borderRadius: Spacing.height24,
    // backgroundColor: themeColors.btnSocial,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  imageBanner: {
    width: '100%',
    height: HeightScreen / 10 * 7,
  },
  control: {
    position: 'absolute',
    top: (HeightScreen / 10 * 7) / 3.5,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
