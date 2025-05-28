import { RightIcon } from '@assets';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DomainItem {
  ext: string;
  img: string;
  url: string;
  price: string;
  oldPrice?: string;
  note?: string;
}

interface DomainListProps {
  title: string;
  description?: string;
  items: DomainItem[];
  onPressSeeMore?: () => void;
}

export const DomainList: React.FC<DomainListProps> = ({ title, description, items, onPressSeeMore }) => {
  const { themeColors: ThemeColors } = useTheme();
  const styles = createStyles(ThemeColors);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.ext}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image source={{ uri: item.img }} style={styles.img} resizeMode="contain" />
            <Text
              style={[
                styles.priceValue,
                item.ext === '.com' && { color: '#E53935' }, // đỏ
                item.ext === '.vn' && { color: '#1976D2' },   // xanh dương
                item.ext === '.id.vn' && { color: '#43A047' }, // xanh lá
                item.ext === '.ai.vn' && { color: '#8E24AA' }, // tím
                item.ext === '.online' && { color: '#F9A825' }, // vàng
                item.ext === '.store' && { color: '#00897B' }, // teal
                item.ext === '.site' && { color: '#6D4C41' }, // nâu
                item.ext === '.top' && { color: '#D81B60' }, // hồng
                // Thêm màu cho các ext khác nếu muốn
              ]}
            >
              {item.price}

            </Text>
          </View>
        )}
        scrollEnabled={false}
      />
      <TouchableOpacity style={styles.seeMoreBtn} onPress={onPressSeeMore}>
        <Text style={styles.seeMoreText}>Xem thêm</Text>
        <RightIcon size={Spacing.width16} color={ThemeColors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    backgroundColor: themeColors.background,
    paddingHorizontal: Spacing.width16,
    paddingTop: Spacing.width32,
  },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.FontSize14,

    ...FontWithFamily.FontWithFamily_500
  },
  description: {
    fontSize: FontSize.FontSize14,
    color: themeColors.text,
    ...FontWithFamily.FontWithFamily_500,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'space-between',
    borderColor: themeColors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: Spacing.width16,
    marginBottom: Spacing.width16,
  },
  img: {
    width: Spacing.width80,
    height: Spacing.width50,
    marginRight: 16,
  },

  priceValue: {
    fontSize: Spacing.width16,
    fontWeight: 'bold',
  },


  seeMoreBtn: {
    marginVertical: Spacing.width16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    gap: Spacing.width8,

  },
  seeMoreText: {
    color: themeColors.primary,

  },
});
