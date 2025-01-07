import { AppImage } from '@components';
import { HeightScreen, ThemeColors, useTheme, WidthScreen } from '@theme';
import { t } from 'i18next';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
interface AppControlAdsProps {
  ad: {
    type: 'video' | 'image';
    uri: string;
    startTime: number;

  } | null;
  onSkipAd: () => void;
}
const AppControlAds = ({ ad, onSkipAd }: AppControlAdsProps) => {
  console.log({ ad });
  const { themeColors } = useTheme();
  const styles = createStyle(themeColors);

  const [showSkipButton, setShowSkipButton] = useState(false);

  // useEffect(() => {
  //   const skipButtonTimer = setTimeout(() => {
  //     setShowSkipButton(true);
  //   }, 5000);

  //   const autoSkipTimer = setTimeout(() => {
  //     onSkipAd();
  //   }, ad.startTime);

  //   return () => {
  //     clearTimeout(skipButtonTimer);
  //     clearTimeout(autoSkipTimer);
  //   };
  // }, [ad, onSkipAd]);

  return (
    <View style={styles.adsContainer}>
      {ad?.type === 'video' ? (
        <Video
          source={{ uri: ad?.uri }}
          style={styles.adsVideo}
          controls={false}
          onEnd={onSkipAd}
          resizeMode={'cover'}
        />
      ) : (
        <AppImage uri={ad.uri} style={styles.adsImage} />
      )}
      {showSkipButton && (
        <TouchableOpacity onPress={onSkipAd} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>{t('movie.skipsAd')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyle = (themeColors: ThemeColors) => StyleSheet.create({
  adsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.background,
  },
  adsVideo: {
    width: '100%',
    height: '100%',
  },
  adsImage: {
    width: WidthScreen,
    height: HeightScreen,
    resizeMode: 'contain',
  },
  skipButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AppControlAds;
