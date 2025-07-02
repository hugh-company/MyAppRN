import { LogoIcon } from '@assets';
import { AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppImage } from '../../../../components/AppImage/AppImage';
import { SERVICES } from '../../../../constants/services';

interface ServiceItem {
  name: string;
  Icon: React.ElementType; // Changed from string
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
        <AppImage
          defaultSource={LogoIcon}
          style={styles.logo} />
        {title ? <AppText style={styles.title}>{title}</AppText> : null}

      </View>
      <View style={styles.gridContainer}>
        {SERVICES.map((item, idx) => {
          const { Icon } = item;
          return (
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
                {/* <CloudServerIcon /> */}
                <Icon style={styles.image} />
              </View>
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )
        })}
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
      width: Spacing.width20,
      height: Spacing.width20,
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
