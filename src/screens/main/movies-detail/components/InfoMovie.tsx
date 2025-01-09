import { AddIcon, LikeIcon, SendIcon, StarIcon } from '@assets';
import { AppLessMore, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { chapterEpisodeInterface, movieDetailInterface } from '@types';
import { t } from 'i18next';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface InfoMovieProps {
  movie: movieDetailInterface | undefined;
  onSelectChapter?: (item: chapterEpisodeInterface) => void;
  chapter?: number
}
export const InfoMovie = ({ movie, onSelectChapter, chapter }: InfoMovieProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const [showAll, setShowAll] = useState(false);
  const [showAllDescription, setShowAllDescription] = useState(false);

  const handleLoadMore = () => {
    setShowAll(!showAll);
  };

  const handleToggleDescription = () => {
    setShowAllDescription(!showAllDescription);
  };

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
  const episodesToShow = showAll ? movie?.chapters : movie?.chapters?.slice(0, 8);
  const showLoadMoreButton = movie?.chapters && movie.chapters.length > 8;
  const descriptionToShow = showAllDescription ? movie?.description : movie?.description?.slice(0, 100);

  return (
    <View style={styles.container}>
      {movie?.type === 'series' && <View>
        <AppText style={styles.txtList}>{t('movie.list_chapters')}</AppText>
        <View style={styles.listChapter}>
          {episodesToShow?.map((item) => {
            return (
              <TouchableOpacity onPress={() => { onSelectChapter?.(item); }} style={[styles.btnChapter, chapter === item.id && styles.btnChapterActive]} key={item.id}>
                <AppText style={[styles.txtChapter, chapter === item.id && styles.txtChapterActive]}>{item?.name}</AppText>
              </TouchableOpacity>
            );
          })}
        </View>
        {showLoadMoreButton && (
          <TouchableOpacity style={styles.btnMore} onPress={handleLoadMore}>
            <AppText style={styles.txtMore}>{showAll ? t('movie.show_less') : t('movie.more')}</AppText>
          </TouchableOpacity>
        )}
      </View>}

      <View style={styles.viewOption} >
        {renderItem(<LikeIcon />, t(movie?.isLiked ? 'liked' : 'like'))}
        {renderItem(<StarIcon color="#EDEDED" />, t('rating'))}
        {renderItem(<AddIcon size={Spacing.width16} />, t('saveMovie'))}
        {renderItem(<SendIcon />, t('share'))}
      </View>
      {/*  */}
      <View style={styles.infoRow} >
        <View style={styles.info1}>
          <AppText style={styles.titleInfo}>{t('movie.release_date')}</AppText>
          <AppText style={styles.valueInfo}>{t('movie.release_date')}</AppText>
        </View>
        <View style={styles.info2}>
          <AppText style={styles.titleInfo}>{t('movie.tags')}</AppText>
          <AppText style={styles.valueInfo}>{movie?.tags?.join(', ')}</AppText>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.info1}>
          <AppText style={styles.titleInfo}>{t('movie.director')}</AppText>
          <AppText style={styles.valueInfo}>{t('movie.release_date')}</AppText>
        </View>
        <View style={styles.info2}>
          <AppText style={styles.titleInfo}>{t('movie.actor')}</AppText>
          <AppText style={styles.valueInfo}>{movie?.main_actors?.join(', ')}</AppText>
        </View>
      </View>
      {/* description */}
      <View style={styles.viewContent}>
        <AppText style={styles.titleContent}>{t('movie.content')}</AppText>
        <AppLessMore html={movie?.description} />

        {/* {movie?.description && movie.description.length > 100 && (
          <TouchableOpacity style={styles.btnMore} onPress={handleToggleDescription}>
            <AppText style={styles.txtMore}>{showAllDescription ? t('movie.show_less') : t('movie.more')}</AppText>
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.height48,
      paddingHorizontal: Spacing.width16,
    },
    listChapter: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: Spacing.height8,
    },
    btnChapter: {
      borderRadius: Spacing.height6,
      backgroundColor: themeColors.btnSocial,
      padding: 4,

    },
    txtChapter: {
      color: themeColors.subtile,
      fontSize: FontSize.FontSize16,
    },
    txtList: {
      color: themeColors.subtile,
      fontSize: FontSize.FontSize12,
      marginBottom: Spacing.height8,
    },
    btnMore: {
      alignItems: 'center',
      paddingVertical: Spacing.height8,
    },
    txtMore: {
      ...FontWithFamily.FontWithFamily_600,
      color: themeColors.txtLink,
    },
    btnChapterActive: {
      backgroundColor: themeColors.primary,
    },
    txtChapterActive: {
      color: themeColors.text,
    },
    viewOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Spacing.width24,
      borderBottomWidth: 0.5,
      borderBlockColor: themeColors.btnSocial,
      paddingBottom: Spacing.width16,
    },
    txtLike: {
      fontSize: FontSize.FontSize14,
      color: themeColors.onSurface,
    },
    viewRow: {
      alignItems: 'center',

      gap: 4,
    },
    btnIcon: {
      width: Spacing.width40,
      height: Spacing.width40,
      borderRadius: Spacing.width40,
      backgroundColor: themeColors.btnSocial,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoRow: {
      flexDirection: 'row',
      marginTop: Spacing.width24,
    },
    info1: {
      flex: 1,
      gap: Spacing.width8,
    },
    info2: {
      flex: 1.5,
      gap: Spacing.width8,
    },
    titleInfo: {
      fontSize: FontSize.FontSize12,
      color: themeColors.subtile,
      ...FontWithFamily.FontWithFamily_600,
    },
    valueInfo: {
      color: themeColors.onSurface,
    },
    viewContent: {
      marginTop: Spacing.width24,
    },
    titleContent: {
      fontSize: FontSize.FontSize16,
      color: themeColors.subtile,
      ...FontWithFamily.FontWithFamily_600,
      marginBottom: Spacing.width8,
    },
    txtDescription: {
      color: themeColors.onSurface,
    },
  });
