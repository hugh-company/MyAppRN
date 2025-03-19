import { ImageBook, ImageGame, ImageMovie, RatingIcon } from '@assets';
import { AppBottomModal, AppButton, AppImage, AppInput, AppText } from '@components';
import { ratingPostApi } from '@services';
import { Spacing, useTheme } from '@theme';
import { KeyHomeData, PostTypeKey } from '@types';
import { showNotificationError, showNotificationSuccess } from '@utils';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { Animated, DeviceEventEmitter, TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
export interface AppRatingMovieProps {
  // type?: PostTypeKey;
  // visible: boolean;
  // onClose: () => void;
  // id: number;
}

const AppRatingMovie = ({ }: AppRatingMovieProps) => {
  const [visible, setVisible] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [type, setType] = React.useState<PostTypeKey | KeyHomeData>(KeyHomeData.MOVIES);
  const { themeColors } = useTheme();
  const [txt, setTxt] = React.useState<string>('');
  const styles = createStyles(themeColors);
  const [rating, setRating] = React.useState(0);
  const [scaleAnim] = React.useState(new Animated.Value(1));
  useEffect(() => {
    DeviceEventEmitter.addListener('showRatingMovie', (data) => {
      const { id, type } = data;
      setId(id);
      setType(type);
      setVisible(true);
    }
    );
    return () => {
      DeviceEventEmitter.removeAllListeners('showRatingMovie');
    };
  }, []);
  const onSendRating = async () => {
    try {
      await ratingPostApi(id, type, { rating, content: txt });

      showNotificationSuccess(t('ratings.ratings'), t('ratings.successMessage'));
      setVisible(false);
      setTxt('');
      setRating(0);
    } catch (error) {
      console.log({ error });

      showNotificationError(t('ratings.ratingFail'), t('ratings.failMessage'));
    }

  };


  const animateStar = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderIcon = (typeAp: KeyHomeData) => {
    switch (typeAp) {
      case KeyHomeData.MOVIES:
        return ImageMovie;
      case KeyHomeData.GAMES:
        return ImageGame;
      case KeyHomeData.COMIC:
        return ImageBook;

    }
  };
  return (
    <AppBottomModal
      height={0.90}
      visible={visible}
      onClose={() => setVisible(false)} >
      <View style={styles.modalContainer}>
        <AppImage defaultSource={renderIcon(type)} style={styles.image} />
        <AppText style={styles.title}>{t('ratings.title')}</AppText>
        <AppText style={styles.description}>
          {t('ratings.description').replace('POST', t(`navigation.${type.toLocaleLowerCase()}`))}
        </AppText>
        <View style={styles.viewStar}>
          {Array(10).fill(0).map((_, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setRating(index + 1);
                  animateStar();
                }}
                key={index}
              >
                {/* <Animated.View style={{ transform: [{ scale: rating > index ? scaleAnim : 1 }] }}> */}
                <RatingIcon size={Spacing.width28} active={rating > index} />
                {/* </Animated.View> */}
              </TouchableOpacity>
            );
          })}
        </View>
        <AppInput
          value={txt}
          onChangeText={(text) => setTxt(text)}
          containerStyle={styles.input} placeholder={t('ratings.content')} />
        <AppButton disabled={!txt.length && rating < 1} label={t('ratings.sendRating')} onPress={() => {
          onSendRating();
        }} />
      </View>
    </AppBottomModal>
  );
};

export default AppRatingMovie;
