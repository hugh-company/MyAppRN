import { BrandIcon, LikeActiveIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { Spacing, useTheme } from '@theme';
import { movieInterface } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { createStyles } from './styles';
export interface AppListMoviesProps {
  data: movieInterface[];
  onScroll?: | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
  | undefined;
  scrollEventThrottle?: number;
}

const AppListMovies = ({ data, scrollEventThrottle, onScroll }: AppListMoviesProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const renderItem = ({ item }: { item: movieInterface }) => (
    <View style={styles.item}>
      <AppImage uri={item.image} style={styles.image} />
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
  return (

    <Animated.FlatList
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      data={data}
      style={styles.list}
      contentContainerStyle={styles.container}
      numColumns={2}
      renderItem={renderItem}
      columnWrapperStyle={styles.columnWrapper}

    />

  );
};

export default AppListMovies;
