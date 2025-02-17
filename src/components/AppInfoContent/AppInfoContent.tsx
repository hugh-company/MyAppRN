import { AddIcon, LikeActiveIcon, LikeIcon, SavedIcon, SendIcon, StarIcon } from '@assets';
import { AppLessMore, AppText } from '@components';
import { getToken, isComicSaved, isMovieSaved, isNovelSaved, RootState, toggleItemSaved } from '@redux';
import { likePostApi } from '@services';
import { Spacing, useTheme } from '@theme';
import { detailPostInterface, PostTypeKey } from '@types';
import { onShareInfo, showModalRating } from '@utils';
import { t } from 'i18next';
import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles } from './styles';


export interface AppInfoContentProps {
  type: PostTypeKey;
  isLiked?: boolean;
  style?: StyleProp<ViewStyle>;
  typeGame?: string;
  onRefresh?: () => void;
  detail: detailPostInterface

}
const AppInfoContent = ({
  type,
  isLiked,
  typeGame,
  style, onRefresh, detail,
}: AppInfoContentProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [like, setLike] = useState(false);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    type === PostTypeKey.MOVIES ? isMovieSaved(state, detail?.id) : type === PostTypeKey.COMIC ? isComicSaved(state, detail?.id) : isNovelSaved(state, detail?.id)
  );
  // call api
  const callApiLike = async () => {
    try {
      const response = await likePostApi(detail?.id, type, { like: 1 });
      console.log({ response });
      onRefresh && onRefresh();
      setLike(true);
    } catch (error) {
      setLike(false);
    }
  };
  const onShare = async () => {
    onShareInfo(detail?.seo_title || '', detail?.seo_title);
  };
  const updateSavedPost = async () => {
    dispatch(toggleItemSaved({ type: type === PostTypeKey.MOVIES ? 'movie' : type === PostTypeKey.COMIC ? 'comic' : 'novel', item: detail }));
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
      case PostTypeKey.NOVEL:
      case PostTypeKey.MOVIES:
        return (
          <View style={[styles.viewOption, !token && { justifyContent: 'center', gap: Spacing.width32 }]} >
            {renderItem(like ? <LikeActiveIcon /> : <LikeIcon />, t(like ? 'liked' : 'like'), () => callApiLike())}
            {token && renderItem(<StarIcon color="#EDEDED" />, t('rating'), () => {
              showModalRating(true, detail?.id, type);
            })}
            {token && renderItem(isFavorite ? <SavedIcon color="#0AE80D" /> : <AddIcon size={Spacing.width16} />, t(isFavorite ? 'saved' : 'saveMovie'), () => {
              updateSavedPost();
            })}
            {renderItem(<SendIcon />, t('share'), () => onShare())}
          </View>
        );
      case PostTypeKey.GAMES:
        return (
          <View style={[styles.viewOption, { justifyContent: 'center', gap: Spacing.width32 }]} >
            {renderItem(<SendIcon />, t('share'), () => onShare())}
            {renderItem(<LikeIcon />, t(isLiked ? 'liked' : 'like'), () => callApiLike())}
          </View>
        );
    }
  };
  const renderInfo = () => {
    const infoTags = detail?.tags?.map((elm) => elm.name)?.join(', ');
    switch (type) {
      case PostTypeKey.COMIC:
      case PostTypeKey.MOVIES:
        return (
          <>
            <View style={styles.infoRow} >
              <View style={styles.info1}>
                <AppText style={styles.titleInfo}>{t('movie.release_date')}</AppText>
                <AppText style={styles.valueInfo}>{detail?.release_date}</AppText>
              </View>
              <View style={styles.info2}>
                <AppText style={styles.titleInfo}>{t('movie.tags')}</AppText>
                <AppText style={styles.valueInfo}>{infoTags}</AppText>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.info1}>
                <AppText style={styles.titleInfo}>{t('movie.director')}</AppText>
                <AppText style={styles.valueInfo}>{detail?.directors?.map((elm) => elm.title)?.join(', ')}</AppText>
              </View>
              {
                detail?.actors && (
                  <View style={styles.info2}>
                    <AppText style={styles.titleInfo}>{t('movie.main_actors')}</AppText>
                    <AppText style={styles.valueInfo}>{detail?.actors?.map((elm) => elm.title)?.join(', ')}</AppText>
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
        <AppLessMore text={detail?.description} />
      </View>
    </View>
  );
};

export default AppInfoContent;
