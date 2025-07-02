import { MarketingIcon } from '@assets';
import { AppText } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ServiceItem {
  name: string;
  Icon: React.ElementType; // Changed from icon to Icon to match services.ts
  url?: string; // Assuming url might be optional or added later
}

interface ServiceCarouselProps {
  items: ServiceItem[];
  title?: string;
}

export const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ items, title }) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MarketingIcon color={themeColors.primary} />
        {title ? <AppText style={styles.title}>{title}</AppText> : null}

      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {items.map((item, idx) => (
          <TouchableOpacity
            key={item.name + idx}
            style={styles.carouselItem}
            onPress={() => {
              // Assuming navigation might need item details, adjust as necessary
              navigate(SCREEN_ROUTE.DETAIL, item);
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
              {item.Icon && React.createElement(item.Icon, { width: Spacing.width24, height: Spacing.width24, fill: themeColors.primary })}
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
      gap: Spacing.width8,
      marginBottom: Spacing.width8,
    },
    logo: {
      width: Spacing.width30,
      height: Spacing.width30,
    },
    title: {
      fontSize: FontSize.FontSize16,
      fontWeight: 'bold',
    },
    scrollContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start', // Align items to the top
    },
    carouselItem: {
      width: Spacing.width80, // Adjust width as needed for horizontal items
      alignItems: 'center',
      marginRight: Spacing.width12, // Spacing between items
      padding: Spacing.width4,
      borderRadius: Spacing.width8,
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
    name: {
      fontSize: FontSize.FontSize10,
      textAlign: 'center',
      // Ensure text wraps if too long, or adjust item width
      flexWrap: 'wrap',
    },
  });
