import { CheckIcon } from '@assets';
import { AppText } from '@components';
import { FontSize, FontWithFamily, Shadow, Spacing, ThemeColors, useTheme } from '@theme';
import { DomainAvailability } from '@types';
import { calculateDisplayedPrice, formatPriceVND } from '@utils';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface SearchDomainItemProps {
  item: DomainAvailability;
  onSelect: () => void;
  isActive?: boolean;
}

const SearchDomainItem: React.FC<SearchDomainItemProps> = ({ item, onSelect, isActive }) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  // Extra domain tails available for the searched domain
  return (
    <View style={[styles.container, isActive && styles.containerActive]}>
      {isActive && (
        <LinearGradient
          colors={["#4ABAB9", themeColors.primary]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
      )}
      <View style={styles.viewRow}>
        <View style={styles.viewInfo}>
          <View style={styles.nameRow}>
            <AppText style={[styles.name, isActive && styles.nameActive]}>
              {item.domain}
            </AppText>
            {item.isAvailable && (
              <View style={styles.viewButtonSelect}>
                <TouchableOpacity style={styles.button} onPress={onSelect}>
                  <AppText style={styles.buttonText}>{isActive ? 'Bỏ chọn' : 'Chọn'}</AppText>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* New fee information section added below name */}
          {item.isAvailable && (
            <View style={styles.feeContainer}>
              <View style={styles.viewInfoDomain}>
                <CheckIcon size={16} color={themeColors.primary} />
                <AppText style={[styles.feeText, isActive && { color: themeColors.whiteColor }]}>
                  {`Phần lệ phí đăng ký và phí duy trì: ${formatPriceVND(calculateDisplayedPrice(item.price))}`}
                </AppText>
              </View>

              <View style={styles.viewInfoDomain}>
                <CheckIcon size={16} color={themeColors.primary} />
                <AppText style={[styles.feeText, isActive && { color: themeColors.whiteColor }]}>
                  Dịch vụ TKQT tên miền năm đầu (Gồm 10% VAT): 0 ₫
                </AppText>
              </View>
            </View>
          )}
          {/* Show price only if isAvailable is true */}
          {item.isAvailable && (
            <AppText style={[styles.price, isActive && { color: themeColors.whiteColor }]}>
              {formatPriceVND(calculateDisplayedPrice(item.price))}
            </AppText>
          )}
        </View>
        {/* Show select button if isAvailable is true, else show registered info */}
      </View>

      {!item.isAvailable && (
        <View style={styles.registeredContainer}>
          <AppText style={styles.registeredText}>Tên miền đã được đăng ký</AppText>
        </View>
      )}
    </View>
  );
};

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      padding: 10,
      gap: Spacing.width8,
      marginBottom: Spacing.width16,
      borderRadius: Spacing.width8,
      backgroundColor: themeColors.background,
      ...Shadow.normal,
    },
    containerActive: {
      overflow: 'hidden',
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: Spacing.width8,
    },
    viewInfo: {
      flex: 1,
      gap: Spacing.width8,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width4,
    },
    name: {
      flex: 1,
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_700,
      color: themeColors.text,
    },
    nameActive: {
      fontSize: FontSize.FontSize18,
      ...FontWithFamily.FontWithFamily_700,
      color: themeColors.whiteColor,
    },
    info: {},
    viewInfoDomain: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.width8,
    },
    infoIcon: {
      fontSize: FontSize.FontSize16,
      color: themeColors.primary,
    },
    price: {
      fontSize: FontSize.FontSize16,
      ...FontWithFamily.FontWithFamily_700,
      color: themeColors.primary,
      textAlign: 'right',
    },
    viewButtonSelect: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    feeContainer: {
      marginTop: Spacing.width4,
      gap: Spacing.width4
    },
    feeText: {
      fontSize: FontSize.FontSize12,
      color: themeColors.text,
      ...FontWithFamily.FontWithFamily_400,
      marginBottom: Spacing.width4,
    },
    registeredContainer: {

    },
    registeredText: {
      fontSize: FontSize.FontSize14,
      color: themeColors.primary,
      ...FontWithFamily.FontWithFamily_400,
    },
    // New styles for available case
    giftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      gap: Spacing.width8,
      backgroundColor: '#f6e3e3',
      padding: 5,
      borderRadius: 5,
    },
    giftText: { fontSize: 12, marginRight: 5, color: 'red' },
    button: {
      backgroundColor: themeColors.primary,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: { color: '#fff' },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: themeColors.background,
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalText: {
      fontSize: FontSize.FontSize16,
      color: themeColors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalCloseButton: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    modalCloseText: {
      fontSize: FontSize.FontSize14,
      color: themeColors.primary,
    },
  });

export default SearchDomainItem;
