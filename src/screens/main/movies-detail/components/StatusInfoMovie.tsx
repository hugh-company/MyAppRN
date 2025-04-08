import { LikeActiveIcon, PlayStackedIcon, StarIcon } from '@assets';
import { AppText } from '@components';
import { ColorsApp, FontSize, FontWithFamily, Spacing } from '@theme';
import { detailPostInterface } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
export interface StatusInfoMovieProps {
  movie: detailPostInterface | undefined;
  isPlaying: boolean;
}

export function StatusInfoMovie(props: StatusInfoMovieProps) {
  const { movie, isPlaying } = props;
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
      {isPlaying && <AppText style={styles.title}>{movie?.title}</AppText>}
      <View style={styles.viewOption}>
        {renderItem(<PlayStackedIcon color={ColorsApp.success} />, `${`${movie?.chapter_total || 0} ${t('home.episodes')}`}`)}
        {renderItem(<LikeActiveIcon />, `${getPrettyNumberString(movie?.like_count || 0, '1.234k')} ${t('home.likes')}`)}
        {renderItem(<StarIcon isActive={true} />, `${getPrettyNumberString((movie?.rating_avg || 0) / 10 || (movie?.rating_total || 0) / (movie?.rating_count || 1), '1.234k')}/10`)}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.width16,
    marginHorizontal: Spacing.width16,
    gap: Spacing.width16,
  },
  viewOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: Spacing.width16,
    gap: Spacing.width16,

  },
  title: {
    fontSize: FontSize.FontSize24,
    color: ColorsApp.text,
    ...FontWithFamily.FontWithFamily_600,

  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 4,
  },
  info: {
    marginHorizontal: Spacing.width16,
  },
  txtLike: {
    fontSize: FontSize.FontSize14,
  },
});
