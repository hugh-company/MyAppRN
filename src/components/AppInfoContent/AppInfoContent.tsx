import { AddIcon, LikeActiveIcon, LikeIcon, SavedIcon, SendIcon, StarIcon } from '@assets';
import { AppLessMore, AppRatingMovie, AppText } from '@components';
import { likePostApi, savedPostApi } from '@services';
import { Spacing, useTheme } from '@theme';
import { PersonInterface, PostTypeKey, TabInterface } from '@types';
import { onShareInfo } from '@utils';
import { t } from 'i18next';
import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface AppInfoContentProps {
  type: PostTypeKey;
  isLiked?: boolean;
  isSave?: boolean;
  releaseDate?: string;
  tags?: TabInterface[];
  main_actors?: PersonInterface[];
  description?: any;
  director?: PersonInterface[];
  style?: StyleProp<ViewStyle>;
  typeGame?: string;
  id: number;
  name?: string;


}
const AppInfoContent = ({
  type,
  isLiked,
  id,
  releaseDate,
  typeGame,
  tags,
  main_actors,
  description,
  director, style, name,
}: AppInfoContentProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [showRating, setShowRating] = useState(false);
  const [like, setLike] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // call api
  const callApiLike = async () => {
    try {
      const response = await likePostApi(id, type, { like: 1 });
      console.log({ response });
      setLike(true);
    } catch (error) {
      setLike(false);
    }
  };
  const onShare = async () => {
    console.log('share', name);

    onShareInfo(name || '', name);
  };
  const callApiFavorite = async () => {
    try {

      const response = await savedPostApi(id, type);
      console.log({ response });
      setIsFavorite(true);
    } catch (error) {
      console.log({ error });
    }
  };
  //
  const renderItem = (icon: any, title: string, onPress?: () => void) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.viewRow}>
        <View style={styles.btnIcon}>
          {icon}
        </View>
        <AppText style={styles.txtLike}>
          {title}
        </AppText>
      </TouchableOpacity>
    );
  };
  const renderOption = () => {
    switch (type) {
      case PostTypeKey.COMIC:
      case PostTypeKey.MOVIES:
        return (
          <View style={styles.viewOption} >
            {renderItem(like ? <LikeActiveIcon /> : <LikeIcon />, t(like ? 'liked' : 'like'), () => callApiLike())}
            {renderItem(<StarIcon color="#EDEDED" />, t('rating'), () => setShowRating(true))}
            {renderItem(isFavorite ? <SavedIcon color="#0AE80D" /> : <AddIcon size={Spacing.width16} />, t('saveMovie'), () => {
              if (!isFavorite) {
                callApiFavorite();
              }
            })}
            {renderItem(<SendIcon />, t('share'), () => onShare())}
          </View>
        );
      case PostTypeKey.GAMES:
        return (
          <View style={[styles.viewOption, { justifyContent: 'center', gap: Spacing.width32 }]} >
            {renderItem(<SendIcon />, t('share'), () => onShare())}
            {renderItem(<LikeIcon />, t(isLiked ? 'liked' : 'like'))}
          </View>
        );
    }
  };
  const renderInfo = () => {
    const infoTags = tags?.map((elm) => elm.name)?.join(', ');
    switch (type) {
      case PostTypeKey.COMIC:
      case PostTypeKey.MOVIES:
        return (
          <>

            <View style={styles.infoRow} >
              <View style={styles.info1}>
                <AppText style={styles.titleInfo}>{t('movie.release_date')}</AppText>
                <AppText style={styles.valueInfo}>{releaseDate}</AppText>
              </View>
              <View style={styles.info2}>
                <AppText style={styles.titleInfo}>{t('movie.tags')}</AppText>
                <AppText style={styles.valueInfo}>{infoTags}</AppText>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.info1}>
                <AppText style={styles.titleInfo}>{t('movie.director')}</AppText>
                <AppText style={styles.valueInfo}>{director?.map((elm) => elm.title)?.join(', ')}</AppText>
              </View>
              {
                main_actors && (
                  <View style={styles.info2}>
                    <AppText style={styles.titleInfo}>{t('movie.main_actors')}</AppText>
                    <AppText style={styles.valueInfo}>{main_actors?.map((elm) => elm.title)?.join(', ')}</AppText>
                  </View>
                )
              }
            </View>
          </>
        );
      case PostTypeKey.GAMES:
        return (

          <View style={styles.infoRow}>
            <View style={styles.info1}>
              <AppText style={styles.titleInfo}>{t('type')}</AppText>
              <AppText style={styles.valueInfo}>{typeGame}</AppText>
            </View>
            <View style={styles.info2}>
              <AppText style={styles.titleInfo}>{t('movie.tags')}</AppText>
              <AppText style={styles.valueInfo}>{infoTags}</AppText>
            </View>
          </View>
        );
    }
  };
  return (
    <View style={[styles.container, style]}>
      {renderOption()}
      {renderInfo()}

      <View style={styles.viewContent}>
        <AppText style={styles.titleContent}>{t('movie.content')}</AppText>
        <AppLessMore text={description} />
      </View>

      <AppRatingMovie
        id={id}
        visible={showRating}
        onClose={() => setShowRating(false)} />
    </View>
  );
};

export default AppInfoContent;
