import { AppLessMore, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { detailPostInterface } from '@types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface InfoMovieProps {
  movie: detailPostInterface | undefined;
  isPlaying: boolean;
}
export const InfoMovie = ({ movie, isPlaying }: InfoMovieProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const renderDescription = () => {
    return (
      <View style={styles.info}>
        <AppLessMore text={movie?.description} style={{}} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <AppText style={styles.txtName}>{movie?.title}</AppText>
      {!isPlaying && renderDescription()}

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
