import { HeadIcon, LocationIcon2, MessageIcon } from '@assets';
import { AppImage, AppText } from '@components';
import { getUserInfo } from '@redux';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SlideImage } from './SlideImage';
export interface ListHorizontalUserProps {
  data: any[]
}

export function ListHorizontalUser(props: ListHorizontalUserProps) {
  const { data } = props;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const profile = useSelector(getUserInfo);
  const renderImageNearYou = (item) => {
    return (
      <View style={styles.viewImageNearYou}>
        <SlideImage data={item.items} style={styles.imageNearYou} />
        <View style={styles.dots} />
        <View style={styles.location}>
          <LocationIcon2 />
        </View>
      </View>
    );
  };

  const renderInfoUser = () => {
    return (
      <View style={[styles.item, { marginRight: 0 }]}>
        <AppImage uri={profile?.avatar} style={styles.viewProfile} />
        <AppText style={styles.txt}>{t('profile')}</AppText>
      </View>
    );
  };
  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity style={styles.item}>
        {item?.type === 'near_you' ? renderImageNearYou(item) : <View>

          <AppImage uri={item?.items?.[0]} style={styles.image} isBase={false} />
          <View style={styles.icon}>
            {item?.type === 'like' ? <HeadIcon height={Spacing.width32} width={Spacing.width32} /> : <MessageIcon />}
          </View>
        </View>}
        <AppText style={styles.txt}>{item.name}</AppText>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        style={styles.list}

        keyExtractor={(item) => `list_category_${item.id}`}
      />
      {renderInfoUser()}
    </View>
  );
}
const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    list: {
      paddingVertical: Spacing.width16,
    },
    image: {
      width: Spacing.width56,
      height: Spacing.width56,
      borderRadius: Spacing.width56,

    },
    wrapper: {
      gap: Spacing.width16,
    },
    item: {
      marginRight: Spacing.width16,
      gap: Spacing.width12,
      alignItems: 'center',
    },
    viewProfile: {
      width: Spacing.width56,
      height: Spacing.width56,
      borderRadius: Spacing.width56,
      borderWidth: 1,
      borderColor: themeColors.whiteColor,
    },
    viewImageNearYou: {
      shadowColor: themeColors.primary,
      // backgroundColor: themeColors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.27,
      shadowRadius: 0.65,
      borderRadius: Spacing.width56,
      elevation: 1,
      //

    },
    imageNearYou: {
      borderWidth: 3,
      borderColor: themeColors.primary,

    },
    dots: {
      width: Spacing.width12,
      height: Spacing.width12,
      borderRadius: Spacing.width12,
      backgroundColor: themeColors.primary,
      position: 'absolute',
      top: 0,
      right: 0,
    },
    txt: {
      fontSize: FontSize.FontSize10,
      color: themeColors.whiteColor,

    },
    location: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
