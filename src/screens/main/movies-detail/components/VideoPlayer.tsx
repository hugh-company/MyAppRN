import { LeftIcon, PlayIcon } from '@assets';
import { AppImage, AppText, CustomVideoPlayer } from '@components';
import { goBack } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { SourceVideoInterface } from '@types';
import { t } from 'i18next';
import React, { useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export interface VideoPlayerProps {
  image?: string;
  urlVideos?: SourceVideoInterface[];
  setIsFullScreenVisible: (visible: boolean) => void;
  isFullScreenVisible: boolean;
  autoPlay?: boolean; // Add autoPlay prop
}

export const BannerDetail = React.memo(({ imageUri, setIsPlaying, styles }: any) => {
  return (
    <View style={styles.imageBanner}>
      <AppImage uri={imageUri} style={styles.banner} checkNetworking={false} />
      {/* <FastImage source={{ uri: `https://oninapp.com${imageUri}` }} style={styles.banner} /> */}
      <View style={styles.control}>
        <TouchableOpacity onPress={() => setIsPlaying(true)} style={styles.btnPlay}>
          <PlayIcon />
          <AppText style={styles.txtPlay}>{t('play')}</AppText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnBack} onPress={() => goBack()}>
        <LeftIcon />
      </TouchableOpacity>
    </View>
  );
}, (prevProps, nextProps) => prevProps.imageUri === nextProps.imageUri);

const VideoComponent = ({ urlVideos, isFullScreenVisible, setIsFullScreenVisible, styles }: any) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const videoHeight = useSharedValue((WidthScreen * 9) / 16);

  useEffect(() => {
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      const isLandscape = width > height;
      console.log({ isLandscape }, { width }, { height }, { windowHeight }, { windowWidth });
      if (isLandscape) {
        videoHeight.value = withTiming(windowWidth);
      } else {
        videoHeight.value = withTiming(isFullScreenVisible ? windowWidth : (WidthScreen * 9) / 16);
      }
    };

    Dimensions.addEventListener('change', handleOrientationChange);
    handleOrientationChange();

  }, [isFullScreenVisible, videoHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: videoHeight.value,
  }));
  return (
    <Animated.View style={[styles.video, animatedStyle]}>
      <CustomVideoPlayer
        uri={urlVideos?.[0]?.link || ''}
        style={styles.banner}
        styleVideo={styles.banner}
        isFullScreenVisible={isFullScreenVisible}
        setIsFullScreenVisible={setIsFullScreenVisible}
      />
    </Animated.View>
  );
};

export function VideoPlayer({ image, urlVideos, setIsFullScreenVisible, isFullScreenVisible, autoPlay }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(autoPlay || false); // Use autoPlay prop
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), []);

  return (
    <View style={styles.container}>
      {isPlaying ? (
        <VideoComponent
          urlVideos={urlVideos}
          isFullScreenVisible={isFullScreenVisible}
          setIsFullScreenVisible={setIsFullScreenVisible}
          styles={styles}
        />

      ) : (
        <BannerDetail imageUri={image} setIsPlaying={setIsPlaying} styles={styles} />
      )}

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
    height: (WidthScreen * 9) / 16,
  },
  control: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
