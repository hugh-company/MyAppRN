import { RightIcon } from '@assets';
import { AppFlatListAnimated, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ButtonNavigationInterface, ItemListProduct, PostTypeKey } from '@types';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import ItemGame from './ItemGame';
export interface ListVerticalProps {
  data: ItemListProduct[];
  style?: StyleProp<ViewStyle>;
  onViewMore?: () => void;
  type?: PostTypeKey;
  button?: ButtonNavigationInterface;
  title?: string;
}

export function ListVertical(props: ListVerticalProps) {
  const { style, title, data, onViewMore, type, button } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);



  const renderItem = ({ item }: { item: ItemListProduct }) => {
    return <ItemGame item={item} />;
  };

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
      width: Spacing.width92,
      height: Spacing.width92,
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
      // Add any necessary styles here
    },
  });
