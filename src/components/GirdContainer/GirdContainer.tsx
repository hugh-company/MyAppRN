import { AppImage, AppText } from '@components';
import { Spacing, useTheme, WidthScreen } from '@theme';
import React from 'react';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';
import { createStyles } from './styles';
export interface GirdContainerProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  data?: { image: string, id: number, name: string }[];
  numberOfColumns?: number;
}
const GirdContainer = ({ style, title, data, numberOfColumns = 3 }: GirdContainerProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const widthItem = (WidthScreen - (Spacing.width16) * (numberOfColumns + 1)) / numberOfColumns;
  const renderItem = ({ item }: any) => {
    return (
      <View style={[styles.btnItem, { width: widthItem }]}>
        <AppImage uri={item.image} style={[styles.image, { width: widthItem, height: widthItem }]} resizeMode={'cover'} />
        <View style={styles.viewName}>
          <AppText style={styles.txtName}>{item.name}</AppText>
        </View>
      </View>
    );
  };
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.title}>
        {title}
      </AppText>
      <FlatList
        data={data}

        numColumns={numberOfColumns}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{ marginBottom: Spacing.width16, gap: Spacing.width16 }}
        keyExtractor={(item) => `child_${title}${item?.id?.toString()}`}
        renderItem={renderItem} />
    </View>
  );
};

export default GirdContainer;
