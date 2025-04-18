import { BriefcaseIcon, CalenderIcon, ChatIcon, EditUser, FacebookIcon, HeadIcon, IconMessager, InstagramIcon, LocationIcon, PhoneIcon, ProfileIcon, ShapeIcon, ZaloIcon } from '@assets';
import { AppHeader, AppImage, AppText, BannerUser, HorizontalList } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { Spacing } from '@theme';
import { PostTypeKey } from '@types';
import { formatDate, getAge, goToListView } from '@utils';
import { t } from 'i18next';
import React from 'react';
import { FlatList, Linking, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDetailUser } from './DetailUser.hook';
import ItemGame from './components/ItemGame';

export const DetailUser = () => {
  const { data, themeColors, styles, games, isMyProfile, getDistanceLocation, onSelectGame, goToScreenMessage } = useDetailUser();
  const { bottom } = useSafeAreaInsets();
  const renderItem = ({ item }) => {
    return <ItemGame item={item} onPress={() => onSelectGame(item)} />;
  };


  console.log('data', data);

  const dataSosial = isMyProfile ? data?.personal?.socials : data?.socials;
  return (

    <View style={styles.container}>
      <AppHeader rightComponent={<TouchableOpacity onPress={() => {
        if (isMyProfile) {
          navigate(SCREEN_ROUTE.CREATE_PROFILE);
        } else {
          goToScreenMessage();
        }
      }}>
        {isMyProfile ? <EditUser /> : <IconMessager width={Spacing.width30} height={Spacing.width30} color="white" />}
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
              <TouchableOpacity
                onPress={() => {
                  if (!isMyProfile) {
                    goToScreenMessage();
                  }
                }}
                style={[styles.btnChat]}
                disabled={isMyProfile}>
                <AppText style={styles.txtChat} numberOfLines={1}>
                  {t('chatWith')} {data?.fullname}
                </AppText>
                <ChatIcon />
              </TouchableOpacity>
              <View style={[styles.btnStatus, { flex: 1 }]}>
                <HeadIcon width={Spacing.width32} height={Spacing.width32} color={themeColors.primary} />
                <AppText style={styles.txtBtnStatus}>{t(`${data?.rel_status}`)}</AppText>
              </View>
            </View>

            <View style={styles.viewAbout_me}>
              <ShapeIcon />
              <AppText style={styles.titleAboutMe}>{t('titleAboutMe')}</AppText>
            </View>
            <View style={styles.valueAbout_me}>
              <AppText  >{data?.about_me}</AppText>
            </View>
            {!isMyProfile && <HorizontalList data={games} type={PostTypeKey.GAMES} title={'Game chơi cùng'} renderItem={renderItem} onViewMore={() => {
              //   {
              //     "label": "Game thịnh hành",
              //     "type": "linkpage",
              //     "data": {
              //         "title": "Game phổ biến",
              //         "type": "lists",
              //         "posttype": "game",
              //         "api": "/posts/lists/game/"
              //     },
              //     "paged": 1,
              //     "sortby": "views_day__desc"
              // }
              goToListView({
                label: 'Game thịnh hành',
                type: 'linkpage',
                data: {
                  title: 'Game phổ biến',
                  type: 'lists',
                  posttype: PostTypeKey.GAMES,
                  api: '/posts/lists/game/',
                },
                paged: 1,
                sortby: 'views_day__desc',
              });
            }} />}

            <View style={styles.viewInfo} >
              <View style={styles.view_contact}>
                <View style={styles.viewIcon}>
                  {dataSosial?.facebook && <TouchableOpacity onPress={() => Linking.openURL(`https://www.facebook.com/${data?.socials?.facebook}`)}>
                    <FacebookIcon size={Spacing.width32} />
                  </TouchableOpacity>}
                  {dataSosial?.instagram && <TouchableOpacity onPress={() => Linking.openURL(`https://www.instagram.com/${data?.socials?.instagram}`)}>
                    <InstagramIcon />
                  </TouchableOpacity>}
                  {dataSosial?.zalo && <TouchableOpacity onPress={() => Linking.openURL(`https://zalo.me/${data?.socials?.zalo}`)}>
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
