import { ExitFullScreenIcon, FullScreenIcon, MuteIcon, SpeedIcon, UnmuteIcon } from '@assets';
import { AppText } from '@components';
import Slider from '@react-native-community/slider';
import { FontWithFamily, Spacing, useTheme } from '@theme';
import { formatTimeSeconds } from '@utils';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

interface AppControlBottomProps {
  isMuted?: boolean;
  toggleMute?: () => void;
  currentTime?: number;
  duration: number;
  setCurrentTime: (time: number) => void; // Add this prop
  videoRef: any; // Add this prop
  loading: boolean; // Add this prop
  isSpeedVisible?: boolean; // Add this prop
  setSpeedVisible: (visible: boolean) => void; // Add this prop
  toggleFullScreen: () => void; // Add this prop
  isFullScreenVisible: boolean; // Add this prop
  isError?: boolean; // Add this prop
}

export const AppControlBottom = ({ isMuted, isError, duration, setSpeedVisible, toggleMute, videoRef, currentTime = 0, loading, setCurrentTime, toggleFullScreen, isFullScreenVisible }: AppControlBottomProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [seeking, setSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(currentTime);
  const [sliderWidth, setSliderWidth] = useState(0); // Add this line

  const handleSlidingComplete = (value) => {
    setCurrentTime(value);
    videoRef.current.seek(value);
    setSeeking(false);
  };

  const handleValueChange = (value) => {
    setSeekTime(value);
    setSeeking(true);
  };

  const handleSliderLayout = (event) => { // Add this function
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  const handleTouchEnd = (event) => { // Add this function
    const { locationX } = event.nativeEvent;
    const value = (locationX / sliderWidth) * duration;
    handleSlidingComplete(value);
  };
  if (isError) {
    return null;
  }

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="small" color={themeColors.primary} />}
      <View style={styles.viewTime}>
        <AppText style={styles.txtTime}>{formatTimeSeconds(seeking ? seekTime : currentTime)}</AppText>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
        minimumTrackTintColor={themeColors.primary}
        maximumTrackTintColor="#444"
        thumbTintColor="transparent"
        onLayout={handleSliderLayout} // Add this line
        onTouchEnd={handleTouchEnd} // Add this line
      />
      <View style={styles.viewTime}>
        <AppText style={styles.txtTime}>{formatTimeSeconds(duration)}</AppText>
      </View>
      <TouchableOpacity onPress={toggleFullScreen}>

        {isFullScreenVisible ? <ExitFullScreenIcon /> : <FullScreenIcon />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSpeedVisible(true)}>
        <SpeedIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleMute}>
        {isMuted ? <MuteIcon /> : <UnmuteIcon />}
      </TouchableOpacity>



    </View>
  );
};

const createStyles = (themeColors: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Spacing.width16,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      gap: Spacing.width8,
    },
    video: {
      width: '100%',
      height: '100%',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Spacing.width16,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    viewTime: {
      width: 50,
      alignItems: 'center',
    },
    txtTime: {
      fontSize: 10,
      ...FontWithFamily.FontWithFamily_500,
    },
    slider: {
      flex: 1,
      height: 40,
    },
  });

