import { NotificationIcon, PromotionIcon, RightIcon, TopUpIcon, TransactionIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { RootState } from '@redux';
import { FontSize, Shadow, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

export interface NavigationControlProps { }

const listNavigation = [
  { key: 'TOP_UP', name: 'Nạp tiền', icon: TopUpIcon },
  { key: 'PROMOTION', name: 'Ưu đãi', icon: PromotionIcon },
  { key: 'TRANSACTION', name: 'Giao dịch', icon: TransactionIcon },
  { key: 'NOTIFICATION', name: 'Thông báo', icon: NotificationIcon },
];

export function NavigationControl(props: NavigationControlProps) {
  const token = useSelector((state: RootState) => state.accountSlice.token);
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  // Giả lập số dư và điểm thưởng, bạn có thể lấy từ props hoặc redux nếu cần
  const balance = '0 đ';
  const points = '0 điểm';

  return (
    <View style={styles.container}>
      {/* Nền nửa trên */}
      <View style={styles.halfBackground} pointerEvents="none" />
      {/* Nội dung */}
      <View style={styles.contentWrapper}>
        {/* User Top */}
        {token && <View style={styles.userTop}>
          <View style={styles.row}>
            <View style={styles.col}>
              <LinearGradient
                colors={["#4ABAB9", themeColors.primary]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.accountBox}
                pointerEvents="none"
              >
                <View style={styles.viewBox}>
                  <View style={styles.titleRow}>
                    <AppText style={styles.titleText}>Tài khoản chính</AppText>
                    <View>
                      <View style={styles.arrowIcon} >
                        <RightIcon color='black' size={12} />
                      </View>
                    </View>
                  </View>
                  <AppText style={styles.priceText}>{balance}</AppText>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.col}>
              <LinearGradient
                colors={["#4ABAB9", themeColors.primary]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.accountBox}
                pointerEvents="none"
              >
                <View style={styles.viewBox}>
                  <View style={styles.titleRow}>
                    <AppText style={styles.titleText}>Điểm thưởng</AppText>
                    <View>
                      <View style={styles.arrowIcon} >
                        <RightIcon color='black' size={12} />
                      </View>
                    </View>
                  </View>
                  <AppText style={styles.priceText}>{points}</AppText>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>}
        {/* User Bottom */}
        <View style={styles.userBottom}>
          {listNavigation.map((item) => (
            <View key={item.key} style={styles.navigationItem}>
              <AppImage
                defaultSource={item.icon}
                isBase={false}
                style={[styles.navigationIcon]}
                resizeMode="contain"
              />
              <AppText style={styles.navigationText}>{item.name}</AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
      overflow: 'hidden',
      backgroundColor: themeColors.whiteColor,
      // Đã bỏ marginTop và zIndex để không đè lên header
    },
    halfBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '70%',
      backgroundColor: themeColors.primary,
      zIndex: 0,
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 1,
      padding: Spacing.width8,
      marginHorizontal: Spacing.width16,
      borderRadius: 8,
      ...Shadow.normal,
      backgroundColor: themeColors.whiteColor,
      marginBottom: Spacing.height6,
    },
    userTop: {
      marginBottom: Spacing.height12,

    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: Spacing.width8,
    },
    col: {
      flex: 1,

    },
    accountBox: {
      borderRadius: 8,
      // padding: 12,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    viewBox: {
      padding: Spacing.width12,
      borderRadius: 8,
    },
    titleText: {
      fontSize: 13,
      color: '#fff',
      fontWeight: '400',
    },
    arrowIcon: {
      width: 18,
      height: 18,
      backgroundColor: '#E5E5E5',
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    priceText: {
      fontSize: FontSize.FontSize16,
      fontWeight: 'bold',
    },
    userBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    navigationItem: {
      flex: 1,
      alignItems: 'center',
      padding: 8,
    },
    navigationIcon: {
      width: 32,
      height: 32,
      marginBottom: 4,
      // tintColor will be overridden inline
      tintColor: themeColors.primary
    },
    navigationText: {
      fontSize: 12,
      color: '#333',
      textAlign: 'center',
    },
  })
