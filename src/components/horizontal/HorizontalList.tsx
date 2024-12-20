import { BrandIcon, LikeActiveIcon, RightIcon } from '@assets';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { getPrettyNumberString } from '@utils';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { FlatList, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppImage } from '../AppImage';
import { AppText } from '../AppText';
interface HorizontalListProps {
  title?: string;
  titleViewMore?: string;
  onViewMore?: () => void;
  data?: { image: string, id: number }[];
  style?: StyleProp<ViewStyle>;
  type?: 'games' | 'chapters';
}

export const HorizontalList: React.FC<HorizontalListProps> = ({
  title,
  data,
  style, titleViewMore = t('home.viewMore'), onViewMore, type = 'games',
}) => {
  const { themeColors } = useTheme();
  const { top } = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(themeColors), [themeColors]);

  const renderItem = ({ item }) => {
    switch (type) {
      case 'games':
        return (
          <TouchableOpacity style={styles.btnGame}>
            <AppImage uri={item.image} style={styles.image} />
          </TouchableOpacity>
        );
      case 'chapters':
        return (
          <TouchableOpacity style={styles.btnGame}>
            <AppImage uri={item.image} style={styles.image} />
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
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <AppText style={styles.title}>
          {title}
        </AppText>
        <TouchableOpacity onPress={() => onViewMore?.()} style={styles.btnViewMore}>
          <AppText style={styles.txtViewMore}>
            {titleViewMore}
          </AppText>
          <RightIcon />
        </TouchableOpacity>
      </View>
      <FlatList data={data} horizontal keyExtractor={(item) => item.id.toString()} renderItem={renderItem} />

    </View>
  );
};

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: Spacing.width48,
      marginBottom: Spacing.width24,

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
      width: Spacing.width106,
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
