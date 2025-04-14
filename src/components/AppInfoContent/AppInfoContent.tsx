import { BASE_IMAGE_URL } from '@api';
import { AddIcon, LikeActiveIcon, LikeIcon, SavedIcon, SendIcon, StarIcon } from '@assets';
import { AppLessMore, AppText } from '@components';
import { addSavedItem, getToken, removeSavedItem, RootState } from '@redux';
import { likePostApi, useSavedPostApi } from '@services';
import { Spacing, useTheme } from '@theme';
import { detailPostInterface, PostTypeKey } from '@types';
import { onShareInfo, showModalRating } from '@utils';
import i18next, { t } from 'i18next';
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
  isPlaying?: boolean;
}
const AppInfoContent = ({
  type,

  typeGame,
  style, onRefresh, detail, isPlaying,
}: AppInfoContentProps) => {
  const { data, isFetching, isLoading, refetch } = useSavedPostApi(type);
  const saved = React.useMemo(
    () => (isFetching ? [] : data?.data?.data),
    [isFetching, data],
  );
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [like, setLike] = useState(false);
  const token = useSelector(getToken);
  const savedLocal = useSelector((state: RootState) => state.dataLocalSlide.savedItems);
  const dispatch = useDispatch();
  const isFavorite = (savedLocal)?.some((item) => item.id === detail?.id);
  console.log({ isFavorite });

  // call api
  const callApiLike = async () => {
    try {
      const response = await likePostApi(detail?.id, type, { like: 1 });
      console.log({ response });
      // onRefresh && onRefresh();
      setLike(true);
    } catch (error) {
      console.log({ error });

      setLike(false);
    }
  };
  const onShare = async () => {
    const language = i18next.language;

    const message = detail?.url?.startsWith('https:') ? detail?.url : `${BASE_IMAGE_URL}${language}/${detail?.url}`;
    onShareInfo(detail?.seo_title || '', message);
  };
  const updateSavedPost = async () => {
    try {
      console.log({ isFavorite }, detail);
      if (isFavorite) {
        dispatch(removeSavedItem(detail?.id));
      } else {
        dispatch(addSavedItem(detail));
      }
      // if (token) {
      //   const res = await savePostApi(type, [detail?.id]);
      //   console.log({ res });

      //   if (res?.status === 'success' && res?.data?.action) {
      //     const action = res.data.action[detail?.id];
      //     refetch();
      //     if (action === 'add') {
      //       dispatch(addSavedItem(detail));
      //     } else if (action === 'remove') {
      //       dispatch(removeSavedItem(detail?.id));
      //     }
      //   }
      // }

    } catch (error) {
      console.log({ errorSave: error });
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
      case PostTypeKey.NOVEL:
      case PostTypeKey.MOVIES:
      case PostTypeKey.GAMES:
        return (
          <View style={[styles.viewOption, !token && { justifyContent: 'center', gap: Spacing.width32 }]} >
            {renderItem(like ? <LikeActiveIcon /> : <LikeIcon />, t(like ? 'liked' : 'like'), () => callApiLike())}
            {token && renderItem(<StarIcon color="#EDEDED" />, t('rating'), () => {
              showModalRating(true, detail?.id, type);
            })}
            {renderItem(isFavorite ? <SavedIcon color="#0AE80D" /> : <AddIcon size={Spacing.width16} />, t(isFavorite ? 'unFollow' : 'follow'), () => {
              updateSavedPost();
            })}
            {renderItem(<SendIcon />, t('share'), () => onShare())}
          </View>
        );
      // case PostTypeKey.GAMES:
      //   return (
      //     <View style={[styles.viewOption, { justifyContent: 'center', gap: Spacing.width32 }]} >
      //       {renderItem(like ? <LikeActiveIcon /> : <LikeIcon />, t(like ? 'liked' : 'like'), () => callApiLike())}
      //       {renderItem(<SendIcon />, t('share'), () => onShare())}

      //     </View>
      //   );
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
      {isPlaying && <View style={styles.viewContent}>
        <AppText style={styles.titleContent}>{t('movie.content')}</AppText>
        <AppLessMore text={detail?.description} />
      </View>}
    </View>
  );
};

export default AppInfoContent;
