import { BrandIcon, LikeActiveIcon, RightIcon } from '@assets';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ButtonNavigationInterface, ItemListProduct, PostTypeKey } from '@types';
import { getPrettyNumberString, goToDetail, goToListView } from '@utils';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppFlatListAnimated } from '../AppFlatListAnimated';
import { AppImage } from '../AppImage';
import { AppText } from '../AppText';
interface HorizontalListProps {
  title?: string;
  titleViewMore?: string;
  onViewMore?: () => void;
  data?: ItemListProduct[];
  style?: StyleProp<ViewStyle>;
  type?: PostTypeKey;
  itemStyle?: StyleProp<ViewStyle>;
  button?: ButtonNavigationInterface
}

export const HorizontalList: React.FC<HorizontalListProps> = ({
  title,
  data,
  style,
  titleViewMore = t('home.viewMore'),
  onViewMore, type = PostTypeKey.GAMES,
  itemStyle,
  button,
}) => {

  const { themeColors } = useTheme();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);


  const renderItem = ({ item }: any) => {
    const image = item?.feature?.path;
    switch (type) {
      case PostTypeKey.GAMES:
        return (
          <TouchableOpacity onPress={() => { goToDetail({ item, type: PostTypeKey.GAMES }); }} style={[styles.btnGame, itemStyle]}>
            <AppImage uri={image} style={styles.image} />
          </TouchableOpacity>
        );
      case PostTypeKey.COMIC:
      case PostTypeKey.MOVIES:
      case PostTypeKey.NOVEL:
        return (
          <TouchableOpacity style={[styles.btnGame, itemStyle]} onPress={() => {
            goToDetail({ item, type });
          }}>
            <AppImage uri={image} style={styles.image} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <AppText numberOfLines={2} style={styles.name}>{item.title}</AppText>
              <View style={styles.viewOption}>
                <View style={styles.viewRow}>
                  <LikeActiveIcon size={Spacing.width10} color={themeColors.star} />
                  <AppText style={styles.txtView}>
                    {getPrettyNumberString(item.like_count)}
                  </AppText>
                </View>

                <View style={styles.viewRow}>
                  <BrandIcon />
                  <AppText style={styles.txtLike}>{getPrettyNumberString(item.views)} {t('home.viewer')}</AppText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      default:
        return <></>;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <AppText style={styles.title}>
          {title}
        </AppText>
        <TouchableOpacity hitSlop={{
          top: 30, bottom: 30, right: 20, left: 20,
        }} onPress={() => {
          console.log({ button });

          onViewMore ? onViewMore?.() : goToListView({
            ...button,
            label: title,
          });
        }} style={styles.btnViewMore}>
          <AppText style={styles.txtViewMore}>
            {titleViewMore}
          </AppText>
          <RightIcon />
        </TouchableOpacity>
      </View>
      <AppFlatListAnimated
        data={data || []}
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
