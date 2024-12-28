import { AddIcon, LikeIcon, SendIcon, StarIcon } from '@assets';
import { AppLessMore, AppText } from '@components';
import { Spacing, useTheme } from '@theme';
import { TypeListMovie } from '@types';
import { t } from 'i18next';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface AppInfoContentProps {
  type: TypeListMovie;
  isLiked?: boolean;
  isSave?: boolean;
  releaseDate?: string;
  tags?: string[];
  main_actors?: string[];
  description?: any;
  director?: string;
  style?: StyleProp<ViewStyle>;
  typeGame?: string;

}
const AppInfoContent = ({
  type,
  isLiked,
  isSave,
  releaseDate,
  typeGame,
  tags,
  main_actors,
  description,
  director, style,
}: AppInfoContentProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const renderItem = (icon: any, title: string) => {
    return (
      <View style={styles.viewRow}>
        <View style={styles.btnIcon}>
          {icon}
        </View>
        <AppText style={styles.txtLike}>
          {title}
        </AppText>
      </View>
    );
  };
  const renderOption = () => {
    switch (type) {
      case TypeListMovie.CHAPTERS:
      case TypeListMovie.MOVIES:
        return (
          <View style={styles.viewOption} >
            {renderItem(<LikeIcon />, t(isLiked ? 'liked' : 'like'))}
            {renderItem(<StarIcon color="#EDEDED" />, t('rating'))}
            {renderItem(<AddIcon size={Spacing.width16} />, t('saveMovie'))}
            {renderItem(<SendIcon />, t('share'))}
          </View>
        );
      case TypeListMovie.GAMES:
        return (
          <View style={[styles.viewOption, { justifyContent: 'center', gap: Spacing.width32 }]} >
            {renderItem(<SendIcon />, t('share'))}
            {renderItem(<LikeIcon />, t(isLiked ? 'liked' : 'like'))}
          </View>
        );
    }
  };
  const renderInfo = () => {
    switch (type) {
      case TypeListMovie.CHAPTERS:
      case TypeListMovie.MOVIES:
        return (
          <>

            <View style={styles.infoRow} >
              <View style={styles.info1}>
                <AppText style={styles.titleInfo}>{t('movie.release_date')}</AppText>
                <AppText style={styles.valueInfo}>{releaseDate}</AppText>
              </View>
              <View style={styles.info2}>
                <AppText style={styles.titleInfo}>{t('movie.tags')}</AppText>
                <AppText style={styles.valueInfo}>{tags?.join(', ')}</AppText>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.info1}>
                <AppText style={styles.titleInfo}>{t('movie.director')}</AppText>
                <AppText style={styles.valueInfo}>{director}</AppText>
              </View>
              <View style={styles.info2}>
                <AppText style={styles.titleInfo}>{t('movie.actor')}</AppText>
                <AppText style={styles.valueInfo}>{main_actors?.join(', ')}</AppText>
              </View>
            </View>
          </>
        );
      case TypeListMovie.GAMES:
        return (

          <View style={styles.infoRow}>
            <View style={styles.info1}>
              <AppText style={styles.titleInfo}>{t('type')}</AppText>
              <AppText style={styles.valueInfo}>{typeGame}</AppText>
            </View>
            <View style={styles.info2}>
              <AppText style={styles.titleInfo}>{t('movie.tags')}</AppText>
              <AppText style={styles.valueInfo}>{tags?.join(', ')}</AppText>
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
        <AppLessMore html={description} />
      </View>


    </View>
  );
};

export default AppInfoContent;
