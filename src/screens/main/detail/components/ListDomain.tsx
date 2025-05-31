import { AppText, } from '@components';
import { FontSize, FontWithFamily, Spacing, ThemeColors, useTheme } from '@theme';
import { ListDomainData } from '@types';
import { getDomainExtStyle } from '@utils';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface ListDomainProps {
  data: ListDomainData;
}

export const ListDomain: React.FC<ListDomainProps> = ({ data }) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{data.title}</AppText>
      <FlatList
        data={data.items}
        keyExtractor={(item) => item.ext}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={[styles.viewDomain, getDomainExtStyle(item.ext)]}>
              <AppText style={[styles.ext, getDomainExtStyle(item.ext)]}>
                {item.ext}
              </AppText>
            </View>
            <View style={styles.viewInfo}>
              <AppText style={styles.label}>{item.label}</AppText>
              <AppText style={styles.price}>{item.price}</AppText>
              {item.note ? <AppText style={styles.note}>{item.note}</AppText> : null}
            </View>

          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  container: {
    marginTop: Spacing.width16


  },
  title: {
    fontSize: FontSize.FontSize14,
    ...FontWithFamily.FontWithFamily_600,
    color: themeColors.primary,
    marginBottom: Spacing.width16,
    marginHorizontal: Spacing.width8

  },
  list: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.surface,
    gap: Spacing.width8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    padding: Spacing.width8,
    marginBottom: Spacing.width12
  },
  viewDomain: {
    width: Spacing.width60,
    height: Spacing.width60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.width8,
  },
  ext: {
    fontSize: FontSize.FontSize20,
    ...FontWithFamily.FontWithFamily_600
  },
  viewInfo: {
    gap: Spacing.width8,
    justifyContent: 'center'

  },
  label: {
    // flex: 1,
    ...FontWithFamily.FontWithFamily_500,
    color: themeColors.text
  },
  price: {
    ...FontWithFamily.FontWithFamily_700,
    color: themeColors.primary
  },
  note: {
    fontSize: 12,
    color: themeColors.error,
    fontStyle: 'italic',
  },
});
