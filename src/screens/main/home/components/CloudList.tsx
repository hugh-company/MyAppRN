import { AppButton, AppImage, AppText } from '@components';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface CloudItem {
  title: string;
  price: string;
  cpuModel: string;
  ram: string;
  storage: string;
  ipv4: string;
  dataTransfer: string;
  imgSrc: string;
  extra: string;
  onPress: () => void;
}

interface CloudListProps {
  title: string;
  items: CloudItem[];
}

export function CloudList({ title, items }: CloudListProps) {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const renderItem = ({ item }: { item: CloudItem }) => (
    <View style={styles.card}>
      <AppImage
        uri={item.imgSrc}
        style={styles.image}
        isBase={false}
        resizeMode='contain'
      />

      <View>
        <AppText style={styles.title}>{item.title}</AppText>
        <AppText style={styles.extra}>{item.extra}</AppText>
        <AppText style={styles.price}>{item.price}</AppText>
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>CPU Model:</AppText>
            <AppText style={styles.detailValue}>{item.cpuModel}</AppText>
          </View>
          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>RAM:</AppText>
            <AppText style={styles.detailValue}>{item.ram}</AppText>
          </View>
          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Storage:</AppText>
            <AppText style={styles.detailValue}>{item.storage}</AppText>
          </View>
          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>IPv4:</AppText>
            <AppText style={styles.detailValue}>{item.ipv4}</AppText>
          </View>
          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Data Transfer:</AppText>
            <AppText style={styles.detailValue}>{item.dataTransfer}</AppText>
          </View>
        </View>
      </View>
      <AppButton
        style={styles.orderButton}
        label="Đặt hàng"
        onPress={item.onPress}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <AppText style={styles.header}>{title}</AppText>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

export const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    marginTop: Spacing.width32,
  },
  header: {
    fontWeight: 'bold',
    fontSize: FontSize.FontSize16,
    flex: 1,
    paddingHorizontal: Spacing.width16,
    marginBottom: Spacing.width16,
  },
  list: {
    paddingHorizontal: 16,
    overflow: 'visible',
  },
  card: {
    width: Spacing.width240,
    borderRadius: 8,
    backgroundColor: themeColors.whiteColor,
    marginRight: 16,
    paddingTop: Spacing.width66, // tăng paddingTop để không bị che bởi ảnh nổi
    // overflow: 'visible',
    // alignItems: 'center',
    paddingHorizontal: Spacing.width8,
    elevation: 3,
    borderWidth: 1,
    borderColor: themeColors.border,
    paddingBottom: Spacing.width8,
    justifyContent: 'space-between'
  },
  image: {
    width: Spacing.width90,
    height: Spacing.width96,
    position: 'absolute',
    top: -Spacing.width64,

    zIndex: 10,
  },
  title: {
    fontSize: FontSize.FontSize16,
    fontWeight: 'bold',
    // flex: 1,
    paddingTop: Spacing.width66,
    textAlign: 'center',
  },
  extra: {
    fontSize: FontSize.FontSize12,
    color: themeColors.text,
    textAlign: 'center',
    marginBottom: Spacing.width16,
  },
  price: {
    fontSize: FontSize.FontSize16,
    color: themeColors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.width8,
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: FontSize.FontSize12,
    fontWeight: 'bold',
    color: '#333',
  },
  detailValue: {
    fontSize: 12,
    color: '#555',
  },
  orderButton: {

    alignItems: 'center',
    height: Spacing.width40,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
