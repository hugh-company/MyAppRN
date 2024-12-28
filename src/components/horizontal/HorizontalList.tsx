import { BrandIcon, LikeActiveIcon, RightIcon } from '@assets';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { TypeListMovie } from '@types';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { FlatList, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppImage } from '../AppImage';
import { AppText } from '../AppText';
interface HorizontalListProps {
  title?: string;
  titleViewMore?: string;
  onViewMore?: () => void;
  data?: { poster: string, id: number }[];
  style?: StyleProp<ViewStyle>;
  type?: TypeListMovie;
  itemStyle?: StyleProp<ViewStyle>;
}

export const HorizontalList: React.FC<HorizontalListProps> = ({
  title,
  data,
  style, titleViewMore = t('home.viewMore'), onViewMore, type = 'games', itemStyle,
}) => {
  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);

  const renderItem = ({ item }: any) => {
    switch (type) {
      case TypeListMovie.GAMES:
        return (
          <TouchableOpacity style={[styles.btnGame, itemStyle]}>
            <AppImage uri={item.poster} style={styles.image} />
          </TouchableOpacity>
        );
      case TypeListMovie.MOVIES:
      case TypeListMovie.CHAPTERS:
        return (
          <TouchableOpacity style={[styles.btnGame, itemStyle]} onPress={() => {
            if (type === TypeListMovie.MOVIES) {
              navigate(SCREEN_ROUTE.MOVIE_DETAIL, { movie: item });
            } else {
              navigate(SCREEN_ROUTE.CHAPTER_DETAIL, { chapter: item });
            }
          }}>
            <AppImage uri={item.poster} style={styles.image} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <AppText numberOfLines={2} style={styles.name}>{item.name}</AppText>
              <View style={styles.viewOption}>
                <View style={styles.viewRow}>
                  <LikeActiveIcon size={Spacing.width10} color={themeColors.star} />
                  <AppText style={styles.txtView}>
                    {getPrettyNumberString(item.views)}
                  </AppText>
                </View>

                <View style={styles.viewRow}>
                  <BrandIcon />
                  <AppText style={styles.txtLike}>{getPrettyNumberString(item.likes)} {t('home.viewer')}</AppText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <AppText style={styles.title}>
          {title}
        </AppText>
        <TouchableOpacity onPress={() => {
          onViewMore ? onViewMore?.() : navigate(SCREEN_ROUTE.VIEW_LIST,
            {
              name: title,
              type: type,
              typeList: 'list',

              list: data, // Flatten the list array
            }
          );
        }} style={styles.btnViewMore}>
          <AppText style={styles.txtViewMore}>
            {titleViewMore}
          </AppText>
          <RightIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => `child_${title}${item?.id?.toString()}`}
        renderItem={renderItem} />

    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

      marginTop: Spacing.width24,

    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.width16,
      marginHorizontal: Spacing.width16,

    },
    title: {
      fontSize: FontSize.FontSize16,
      color: '#EDEDED',
      ...FontWithFamily.FontWithFamily_600,
    },
    image: {
      width: '100%',
      height: Spacing.width152,
    },
    body: {
      borderWidth: 1,
      borderTopColor: themeColors.btnSocial,
      borderBottomWidth: 0,
      // borderBottomWidth: 1,
      // borderBottomColor: themeColors.btnSocial,
      borderTopLeftRadius: Spacing.width12,
      borderTopRightRadius: Spacing.width12,
    },
    btnViewMore: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtViewMore: {
      fontSize: FontSize.FontSize14,
      ...FontWithFamily.FontWithFamily_400,
    },
    btnGame: {
      width: Spacing.width106,

      borderRadius: Spacing.width4,
      overflow: 'hidden',
      marginLeft: Spacing.width16,
      justifyContent: 'space-between',
    },
    viewOption: {
      flexDirection: 'row',
      alignItems: 'center',

      marginBottom: Spacing.width16,
      gap: Spacing.width8,
    },
    txtView: {
      fontSize: FontSize.FontSize10,
    },
    txtLike: {
      fontSize: FontSize.FontSize10,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    name: {
      ...FontWithFamily.FontWithFamily_600,
      marginVertical: Spacing.width8,
    },
  });
