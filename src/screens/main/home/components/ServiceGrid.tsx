import { LogoIcon } from '@assets';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppImage } from '../../../../components/AppImage/AppImage';

interface ServiceItem {
  name: string;
  img: string;
  url: string;
}

interface ServiceGridProps {
  items: ServiceItem[];
  title?: string;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ items, title }) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <AppImage
          defaultSource={LogoIcon}
          style={styles.logo} />
      </View>
      <View style={styles.gridContainer}>
        {items.map((item, idx) => (
          <TouchableOpacity
            key={item.name + idx}
            style={styles.gridItem}
            onPress={() => {
              navigate(SCREEN_ROUTE.DETAIL, item)
            }}
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

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: Spacing.width16,
      backgroundColor: themeColors.whiteColor,
      paddingTop: Spacing.width16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
      gap: Spacing.width8,
    },
    logo: {
      width: Spacing.width30,
      height: Spacing.width30,
    },
    buttonImage: {
      width: Spacing.width50,
      height: Spacing.width50,
      borderRadius: Spacing.width12,
      overflow: 'hidden',
      marginBottom: Spacing.width8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: Spacing.width24,
      height: Spacing.width24,

    },
    title: {
      fontSize: FontSize.FontSize16,
      fontWeight: 'bold',
      marginBottom: 8,
      marginTop: 8,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    gridItem: {
      width: '23%',
      aspectRatio: 1,
      marginBottom: 8,
      alignItems: 'center',
      borderRadius: 8,
      padding: 6,

      gap: Spacing.width4,
    },

    name: {
      fontSize: FontSize.FontSize10,
      textAlign: 'center',
    },
  });
