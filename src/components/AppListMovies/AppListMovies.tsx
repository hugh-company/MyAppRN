import { BrandIcon, LikeActiveIcon } from '@assets';
import { AppFlatListAnimated, AppImage, AppText, ItemSearchMovie } from '@components';
import { Spacing, useTheme } from '@theme';
import { movieInterface } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { createStyles } from './styles';
export interface AppListMoviesProps {
  data: any[];
  onScroll?: | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
  | undefined;
  scrollEventThrottle?: number;
  numColumns?: number;
}

const AppListMovies = ({ data, scrollEventThrottle, numColumns = 2, onScroll }: AppListMoviesProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const renderItem = ({ item }: { item: movieInterface }) => {
    if (numColumns === 2) {
      return (
        <View style={styles.item}>
          <AppImage uri={item.poster} style={styles.image} />
          <View style={styles.viewInfo}>
            <AppText numberOfLines={2} style={styles.name}>{item.name}</AppText>
            <View style={styles.viewOption}>
              <View style={styles.viewRow}>
                <LikeActiveIcon size={Spacing.width10} color={themeColors.star} />
                <AppText style={styles.txtView}>
                  {getPrettyNumberString(item.views ?? 0)}
                </AppText>
              </View>

              <View style={styles.viewRow}>
                <BrandIcon />
                <AppText style={styles.txtLike}>{getPrettyNumberString(item.likes ?? 0)} {t('home.viewer')}</AppText>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return <ItemSearchMovie item={item} />;
    }
  };
  return (

    <AppFlatListAnimated
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      data={data}
      horizontal={numColumns === 1}
      contentContainerStyle={styles.container}
      numColumns={numColumns}
      renderItem={renderItem}
      columnWrapperStyle={numColumns === 2 ? styles.columnWrapper : undefined}


    />

  );
};

export default AppListMovies;
