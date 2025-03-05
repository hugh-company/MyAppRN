import { BriefcaseIcon, CalenderIcon, FacebookIcon, HeadIcon, InstagramIcon, LocationIcon, PhoneIcon, ProfileIcon, ShapeIcon, ZaloIcon } from '@assets';
import { AppImage, AppText, BannerUser, ItemGame } from '@components';
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { HeightScreen, Spacing, useTheme } from '@theme';
import { formatDate, getAge } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
import { ModalUserInfoProps, useInfoUser } from './useInfoUser.hook';

export const ModalInfoUser = (props: ModalUserInfoProps) => {
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);
  const { data, games, getDistanceLocation, refModal } = useInfoUser(props);
  // const { bottom } = useSafeAreaInsets();



  const renderItem = ({ item }) => {
    return <ItemGame item={item} />;
  };

  const goToScreenMessage = () => {
    navigate(SCREEN_ROUTE.CHAT, {
      message: {
        other_user: {
          id: data?.id,
          fullname: data?.fullname,
          avatar: data?.avatar,
        },
      },
    });
  };
  console.log({ data });

  return (
    <BottomSheetModal
      ref={refModal}

      backgroundStyle={styles.modalContainer}
      snapPoints={[0.7 * HeightScreen, 1 * HeightScreen]}
      onAnimate={(fromIndex, toIndex) => {
        if (toIndex === -1) {
          setTimeout(() => refModal?.current?.dismiss(), 0);
        }
      }}
    >

      {/* <AppHeader rightComponent={<TouchableOpacity onPress={goToScreenMessage}>
        <IconMessager width={Spacing.width30} height={Spacing.width30} color="white" />
      </TouchableOpacity>} /> */}

      <BottomSheetFlatList
        data={[data]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <>
            <View>
              {data?.galleries?.length > 0 &&
                <BannerUser
                  data={data.galleries} />}
              <View style={styles.info}>
                <AppText style={styles.name}>{[data?.fullname, getAge(data?.birthday)].join(', ')}</AppText>
                {data?.job && <AppText style={styles.profession}>{data?.job}</AppText>}
              </View>
              {/* location */}
              {data?.location && <View style={styles.viewLocation}>
                <LocationIcon />
                <AppText style={styles.txtLocation}>{getDistanceLocation(data?.location)}</AppText>
              </View>}


            </View>
            <View style={styles.btnStatus}>
              <HeadIcon width={Spacing.width32} height={Spacing.width32} color={themeColors.primary} />
              <AppText style={styles.txtBtnStatus}>Đang độc thân</AppText>
            </View>

            <View style={styles.viewAbout_me}>
              <ShapeIcon />
              <AppText style={styles.titleAboutMe}>{t('titleAboutMe')}</AppText>
            </View>
            <View style={styles.valueAbout_me}>
              <AppText  >{data?.about_me}</AppText>
            </View>
            {/* <HorizontalList data={games} type={PostTypeKey.GAMES} title={'Game chơi cùng'} renderItem={renderItem} /> */}

            <View style={styles.viewInfo} >
              <View style={styles.view_contact}>
                <View style={styles.viewIcon}>
                  {data?.socials?.facebook && <TouchableOpacity onPress={() => Linking.openURL(data?.socials?.facebook)}>
                    <FacebookIcon size={Spacing.width32} />
                  </TouchableOpacity>}
                  {data?.socials?.instagram && <TouchableOpacity onPress={() => Linking.openURL(data?.socials?.instagram)}>
                    <InstagramIcon />
                  </TouchableOpacity>}
                  {data?.socials?.zalo && <TouchableOpacity onPress={() => Linking.openURL(data?.socials?.zalo)}>
                    <AppImage defaultSource={ZaloIcon} style={{ width: Spacing.width32, height: Spacing.width32 }} />
                  </TouchableOpacity>}

                </View>

                {/* <TouchableOpacity onPress={() => goToScreenMessage()} style={styles.btnChat}>
                    <AppText style={styles.txtChat}>{t('chatWith')} {data?.fullname}</AppText>
                    <ChatIcon />
                  </TouchableOpacity> */}
              </View>

              <View style={styles.viewListInfo}>
                {data?.gender && <View style={styles.viewInfoItem}>
                  <ProfileIcon />
                  <AppText>{data?.gender}</AppText>
                </View>}
                {data?.job && <View style={styles.viewInfoItem}>
                  <BriefcaseIcon />
                  <AppText>{data?.job}</AppText>
                </View>}
                {data?.phone && <View style={styles.viewInfoItem}>
                  <PhoneIcon />
                  <AppText>{`(+84) *** *** ${data?.phone.slice(-3)}`}</AppText>
                </View>}
                {data?.birthday && <View style={styles.viewInfoItem}>
                  <CalenderIcon />
                  <AppText>{formatDate(data?.birthday, 'DD-MM-YYYY')}</AppText>
                </View>}

                {data?.favorites && <View style={styles.viewInfoItem}>
                  <HeadIcon width={Spacing.width24} height={Spacing.width24} />
                  <AppText>{data?.favorites?.join(', ')}</AppText>
                </View>}
              </View>
            </View>
          </>
        )}

      />

    </BottomSheetModal>
  );
};

