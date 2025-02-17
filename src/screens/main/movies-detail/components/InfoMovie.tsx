import { LikeActiveIcon, PlayStackedIcon, StarIcon } from '@assets';
import { AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { detailPostInterface } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface InfoMovieProps {
  movie: detailPostInterface | undefined;
}
export const InfoMovie = ({ movie }: InfoMovieProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const renderItem = (icon: any, title: string) => {
    return (
      <View style={styles.viewRow}>
        {icon}
        <AppText style={styles.txtLike}>
          {title}
        </AppText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.txtName}>{movie?.title}</AppText>
      <View style={styles.viewOption}>
        {renderItem(<PlayStackedIcon color={themeColors.success} />, `${`${movie?.chapter_total || 0} ${t('home.episodes')}`}`)}
        {renderItem(<LikeActiveIcon />, `${getPrettyNumberString(movie?.like_count || 0, '1.234k')} ${t('home.likes')}`)}
        {renderItem(<StarIcon isActive={true} />, `${getPrettyNumberString(movie?.rating_count || 0, '1.234k')}/10`)}
      </View>
    </View>
  );
};
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.width16,
      paddingHorizontal: Spacing.width16,
    },
    txtName: {
      fontSize: FontSize.FontSize24,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_600,
      textAlign: 'center',
    },
    viewOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: Spacing.width16,
      paddingBottom: Spacing.width16,
      gap: Spacing.width16,
      marginTop: Spacing.height24,
    },
    txtLike: {
      fontSize: FontSize.FontSize14,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',

      gap: 4,
    },
    info: {
      marginHorizontal: Spacing.width16,
    },
  });
