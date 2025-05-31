import { AppImage } from '@components';
import { Spacing, useTheme } from '@theme';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface NavControlItem {
  name: string;
  img: string;
  url: string;
}

export interface NavControlServiceProps {
  title: string;
  items: NavControlItem[];
}

export const NavControlService: React.FC<NavControlServiceProps> = ({ title, items }) => {
  const { themeColors } = useTheme();

  const handlePress = (url: string) => {
    if (url && url !== 'javascript:;') {
      Linking.openURL(url);
    }
  };

  // Đặt paddingHorizontal cho container, marginHorizontal cho item, width dạng phần trăm (number) để đảm bảo đều
  const itemPerRow = Math.min(items.length, 4);
  const itemWidth = 100 / itemPerRow;

  return (
    <View style={styles.container}>
      <View style={[styles.row, { justifyContent: 'center' }]}>
        {items.map((item, idx) => (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.item,
              { width: `${itemWidth}%` },
              idx === 0 ? { marginLeft: 0 } : {},
              idx === items.length - 1 ? { marginRight: 0 } : {},
              { marginHorizontal: 4 }
            ]}
            onPress={() => handlePress(item.url)}
            disabled={item.url === 'javascript:;'}
            activeOpacity={0.7}
          >
            <View style={styles.buttonImage}>
              <LinearGradient
                colors={["#4ABAB9", themeColors.primary]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFillObject}
                pointerEvents="none"
              />
              <AppImage uri={item.img} isBase={false} style={styles.image} resizeMode="cover" />
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    // padding: 16,
    marginVertical: Spacing.width16,

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.width16,
    width: '100%',
  },
  item: {
    alignItems: 'center',
  },
  buttonImage: {
    width: Spacing.width60,
    height: Spacing.width60,
    marginBottom: 8,
    borderRadius: Spacing.width8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Spacing.width40,
    height: Spacing.width40,

  },
  name: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
