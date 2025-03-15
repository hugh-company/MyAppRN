import { PlayIcon } from '@assets';
import { AppImage, AppLessMore, AppText } from '@components';
import { ColorsApp, FontSize, FontWithFamily, HeightScreen, Spacing } from '@theme';
import { detailPostInterface } from '@types';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, InteractionManager, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export interface BannerInfoMovieProps {
  movie: detailPostInterface | undefined;
  onPlay: () => void;
  isPlaying: boolean;
  disabledVideo?: boolean;
  loading?: boolean;
}
const heightBanner = HeightScreen / 10 * 7;

export function BannerInfoMovie(props: BannerInfoMovieProps) {
  const { movie, disabledVideo, loading, onPlay, isPlaying } = props;
  const [shouldRenderList, setShouldRenderList] = useState(false);

  useEffect(() => {
    const interactionHandle = InteractionManager.runAfterInteractions(() => {
      setShouldRenderList(true);
    });

    return () => interactionHandle.cancel();
  }, []);

  const renderDescription = () => {
    return (
      <View style={styles.info}>
        <AppLessMore maxHeight={heightBanner / 3} value={movie?.description} style={{}} />
      </View>
    );
  };
  const renderButtonPlay = () => {
    if (!shouldRenderList) {
      return <ActivityIndicator color={ColorsApp.text} />;
    }
    if (disabledVideo) {
      return (
        <TouchableOpacity
          disabled={disabledVideo}
          activeOpacity={1}

          style={[styles.btnPlay, styles.disPlay]}
        >
          <AppText style={[styles.txtPlay, styles.txtDisPlay]}>{t('noVideo')}</AppText>
        </TouchableOpacity>
      );

    }
    return (
      <TouchableOpacity
        disabled={loading}
        activeOpacity={1}
        onPress={() => onPlay()}
        style={[styles.btnPlay]}
      >
        <PlayIcon />
        <AppText style={styles.txtPlay}>{t('play')}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <AppImage uri={movie?.feature?.path || ''} style={[styles.banner, { height: heightBanner }]} checkNetworking={false} />

      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      />
      <View style={styles.control}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientHeader}
        >
          <AppText style={styles.txtName}>{movie?.title}</AppText>
        </LinearGradient>

        {renderButtonPlay()}


        {!isPlaying && renderDescription()}
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HeightScreen / 10 * 7,
  },
  btnPlay: {
    backgroundColor: ColorsApp.primary,
    borderRadius: Spacing.width88,
    height: Spacing.width44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.width8,
    paddingHorizontal: Spacing.width16,
  },
  disPlay: {
    backgroundColor: ColorsApp.colorDisable,
  },
  txtDisPlay: {
    color: ColorsApp.textTertiary,
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientHeader: {
    width: '100%',
    minHeight: Spacing.height100,
    alignItems: 'center',
  },
  txtPlay: {
    fontSize: FontSize.FontSize16,
    color: ColorsApp.text,
    ...FontWithFamily.FontWithFamily_600,
  },
  txtName: {
    fontSize: FontSize.FontSize24,
    color: ColorsApp.text,
    ...FontWithFamily.FontWithFamily_600,

    textAlign: 'center',
    width: '90%',

    paddingTop: Spacing.height50,

  },
  info: {
    marginHorizontal: Spacing.width16,


    maxHeight: heightBanner / 3,
  },
});
