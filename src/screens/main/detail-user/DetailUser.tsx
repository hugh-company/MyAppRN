import { BriefcaseIcon, CalenderIcon, ChatIcon, FacebookIcon, HeadIcon, IconMessager, InstagramIcon, LocationIcon, PhoneIcon, ProfileIcon, ShapeIcon, ZaloIcon } from '@assets';
import { AppHeader, AppImage, AppText, BannerUser, HorizontalList } from '@components';
import { Spacing } from '@theme';
import { PostTypeKey } from '@types';
import { formatDate, getAge } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { FlatList, Linking, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDetailUser } from './DetailUser.hook';
import ItemGame from './components/ItemGame';

export const DetailUser = () => {
  const { data, themeColors, styles, games, getDistanceLocation, onSelectGame, goToScreenMessage } = useDetailUser();
  const { bottom } = useSafeAreaInsets();
  const renderItem = ({ item }) => {
    return <ItemGame item={item} onPress={() => onSelectGame(item)} />;
  };




  return (

    <View style={styles.container}>
      <AppHeader rightComponent={<TouchableOpacity onPress={goToScreenMessage}>
        <IconMessager width={Spacing.width30} height={Spacing.width30} color="white" />
      </TouchableOpacity>} />

      <FlatList
        data={[data]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={() => (
          <>
            <View style={{ minHeight: 200 }}>
              <BannerUser
                data={data.galleries?.length > 0 ? data?.galleries : [data?.avatar]} />
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
            <View style={[{ padding: Spacing.width16, gap: Spacing.width16 }]}>
              <TouchableOpacity onPress={() => goToScreenMessage()} style={styles.btnChat}>
                <AppText style={styles.txtChat} numberOfLines={1}>{t('chatWith')} {data?.fullname}</AppText>
                <ChatIcon />
              </TouchableOpacity>
              <View style={[styles.btnStatus, { flex: 1 }]}>
                <HeadIcon width={Spacing.width32} height={Spacing.width32} color={themeColors.primary} />
                <AppText style={styles.txtBtnStatus}>{t('message.single')}</AppText>
              </View>
            </View>

            <View style={styles.viewAbout_me}>
              <ShapeIcon />
              <AppText style={styles.titleAboutMe}>{t('titleAboutMe')}</AppText>
            </View>
            <View style={styles.valueAbout_me}>
              <AppText  >{data?.about_me}</AppText>
            </View>
            <HorizontalList data={games} type={PostTypeKey.GAMES} title={'Game chơi cùng'} renderItem={renderItem} />

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
        ListFooterComponent={<View style={{ paddingBottom: bottom || Spacing.width16 }} />}
      />
    </View>
  );
};
