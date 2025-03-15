import { BrandIcon, LikeActiveIcon, RightIcon } from '@assets';
import { AppFlatListAnimated, AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { ButtonNavigationInterface, detailPostInterface, ItemListProduct, PostTypeKey } from '@types';
import { getPrettyNumberString, goToDetail } from '@utils';
import { t } from 'i18next';
import React, { useCallback } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
export interface ListVerticalProps {
  data: ItemListProduct[];
  style?: StyleProp<ViewStyle>;
  onViewMore?: () => void;
  type?: PostTypeKey;
  button?: ButtonNavigationInterface;
  title?: string;
}

export function ListPostGird(props: ListVerticalProps) {
  const { style, title, data, onViewMore, type, button } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);



  const renderItem = useCallback(({ item }: { item: ItemListProduct | detailPostInterface }) => {
    return (
      <TouchableOpacity activeOpacity={1} style={[styles.btnGame]} onPress={() => {
        goToDetail({ item, type });
      }}>
        <AppImage uri={item?.feature?.path} style={styles.image} />
        {type !== PostTypeKey.GAMES && <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <AppText numberOfLines={2} style={styles.name}>{item.title}</AppText>
          <View style={styles.viewOption}>
            <View style={styles.viewRow}>
              <LikeActiveIcon size={Spacing.width10} color={themeColors.star} />
              <AppText style={styles.txtView}>{getPrettyNumberString(item.like_count)}</AppText>
            </View>
            <View style={styles.viewRow}>
              <BrandIcon />
              <AppText style={styles.txtLike}>{getPrettyNumberString(item.views)} {t('home.viewer')}</AppText>
            </View>
          </View>
        </View>}
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <AppText style={styles.title}>{title}</AppText>
        <TouchableOpacity onPress={() => onViewMore?.()} style={styles.btnViewMore}>
          <AppText style={styles.txtViewMore}>{button?.label}</AppText>
          <RightIcon />
        </TouchableOpacity>
      </View>
      <AppFlatListAnimated
        data={data}
        numColumns={3}
        style={styles.listMovie}

        columnWrapperStyle={styles.columnWrapperStyle}
        renderItem={renderItem}
        removeClippedSubviews={true}
      />
    </View>
  );
}
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.width24,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.width24,
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
      borderRadius: Spacing.width4,
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
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: Spacing.width8,
      alignSelf: 'center',
      backgroundColor: themeColors.btnSocial,
      padding: 4,
      borderRadius: Spacing.width8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: themeColors.primary,
    },
    inactiveDot: {
      backgroundColor: themeColors.disable,
    },
    itemType: {
      borderRadius: Spacing.width12,
      borderWidth: 1,
      borderColor: themeColors.btnSocial,
      marginLeft: Spacing.width16,
      padding: Spacing.width16,

    },
    viewType: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Spacing.width12,

    },
    txtType: {
      fontSize: FontSize.FontSize14,
      color: themeColors.subtile,
      ...FontWithFamily.FontWithFamily_600,
    },
    btnMovie: {
      marginBottom: Spacing.width16,
    },
    listMovie: {
      marginHorizontal: Spacing.width16,

      gap: Spacing.width8,
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
    columnWrapperStyle: {
      // marginBottom: Spacing.width16,
      gap: Spacing.width8,
    },
    btnGame: {
      width: (WidthScreen - Spacing.width32 - (Spacing.width8 * 2)) / 3,

      borderRadius: Spacing.width4,
      overflow: 'hidden',

      justifyContent: 'space-between',

    },
  });
