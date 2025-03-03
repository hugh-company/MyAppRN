import { AppImage, AppText } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme, WidthScreen } from '@theme';
import { StatusAccount, UserItemInterface } from '@types';
import { getAge } from '@utils';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
export interface ItemUserDatingProps {
  item: UserItemInterface;
  onPress?: () => void
}

export function ItemUserDating(props: ItemUserDatingProps) {
  const { item, onPress } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return <TouchableOpacity style={[styles.container, { borderColor: '#6D0101' }]} onPress={onPress}>
    <AppImage style={styles.item} uri={item.avatar} />

    <View style={styles.viewInfo}>
      {item?.distance && <View style={styles.viewLocation}>
        <AppText style={styles.txtLocation}>{item?.distance}</AppText>
      </View>}
      <View style={[styles.viewRow, { gap: 8 }]}>
        <AppText numberOfLines={3} style={styles.txtName}>{[item?.fullname?.trim(), getAge(item?.birthday)].join(', ')}</AppText>
        {item?.online === StatusAccount.ONLINE && <View style={styles.viewActive} />}
      </View>
      {/* <AppText style={styles.address}>{item?.place}</AppText> */}
    </View>
    <View style={[styles.viewMatch, { backgroundColor: '#6D0101' }]}>
      <AppText style={styles.txtMatch}>{item?.frameLabel}</AppText>
    </View>

  </TouchableOpacity>;
}
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: (WidthScreen - Spacing.width44) / 2,
      height: (WidthScreen - Spacing.width44) / 2,
      borderWidth: 4,
      borderColor: themeColors.primary,
      borderRadius: Spacing.width8,
      overflow: 'hidden',
    },
    viewMatch: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width8,
      position: 'absolute',
      top: 0,
      backgroundColor: themeColors.primary,
      borderBottomLeftRadius: Spacing.width16,
      borderBottomRightRadius: Spacing.width16,
      paddingHorizontal: Spacing.width16,
      paddingVertical: Spacing.width4,
      alignSelf: 'center',
    },
    txtMatch: {
      fontSize: FontSize.FontSize12,
      ...FontWithFamily.FontWithFamily_600,
    },
    item: {
      width: (WidthScreen - Spacing.width44) / 2,
      height: (WidthScreen - Spacing.width44) / 2,
    },
    title: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
      alignItems: 'center',

    },
    total: {
      color: themeColors.primary,
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_600,
    },
    label: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    viewInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingVertical: Spacing.width4,
      gap: Spacing.width16,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    viewLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
      alignSelf: 'center',
      borderRadius: Spacing.width30,
      paddingVertical: Spacing.width4,
      paddingHorizontal: Spacing.width8,
    },
    txtLocation: {
      fontSize: FontSize.FontSize12,
    },
    txtName: {
      fontSize: FontSize.FontSize13,
      ...FontWithFamily.FontWithFamily_600,
      maxWidth: '80%',
      flex: 1,
      textAlign: 'center',

    },
    viewActive: {
      backgroundColor: themeColors.active,
      borderRadius: Spacing.width6,
      width: Spacing.width6,
      height: Spacing.width6,
    },
    viewRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

    },
    address: {
      fontSize: FontSize.FontSize12,
    },
  });
