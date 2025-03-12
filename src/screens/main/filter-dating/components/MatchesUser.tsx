import { CloseBigIcon, HeadIcon, StarActiveIcon } from '@assets';
import { AppSwipeProfile, ModalInfoUser } from '@components';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ColorsApp, Spacing } from '@theme';
import { UserFindInterface } from '@types';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export interface ListUserDatingProps {
  data: UserFindInterface[];
  onSendAction: (type: string, user: UserFindInterface) => void;
}

export function MatchesUser(props: ListUserDatingProps) {
  const { data } = props;
  const { bottom } = useSafeAreaInsets();
  const swipeRef = React.useRef<{ triggerSwipe: (action: string) => void }>(null);
  const [profiles, setProfiles] = React.useState(data);
  console.log({ data });
  const bottomModal = React.useRef<BottomSheetModal>(null);
  const [selectUser, setSelectUser] = React.useState<UserFindInterface | null>(null);
  useEffect(() => {
    setProfiles(data);
  }, [data]);
  const handleSwipeAction = (type: string, user?: UserFindInterface) => {
    console.log('handleSwipeAction', type, user);
    setProfiles((prev) => prev.slice(1));
    props.onSendAction(type, user); // Call the callback
  };

  const onClickAction = (type: string) => {
    console.log('onClickAction', type);
    swipeRef.current?.triggerSwipe(type);
  };
  const onDetailUser = (user: UserFindInterface) => {
    // console.log('onDetailUser', user);
    setSelectUser(user);
    // setTimeout(() => {

    bottomModal.current?.present();
    // }, 500);
  };
  console.log({ selectUser });

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <AppSwipeProfile
          ref={swipeRef}
          items={profiles}
          onSwipe={(type, user) => handleSwipeAction(type, user)}
          onDetailUser={(user) => onDetailUser(user)}
        />
      </View>

      {profiles.length > 0 && (
        <View style={[styles.bottomOption, { paddingBottom: bottom || Spacing.width16 }]}>
          <TouchableOpacity style={styles.iconLike} onPress={() => onClickAction('dislike')}>
            <CloseBigIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconSuPerLike} onPress={() => onClickAction('superlike')}>
            <StarActiveIcon color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconLike} onPress={() => onClickAction('like')}>
            <HeadIcon width={Spacing.width40} color={ColorsApp.primary} />
          </TouchableOpacity>
        </View>
      )}

      <ModalInfoUser user={selectUser} refModal={bottomModal} />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  bottomOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.width16,
  },
  iconLike: {
    width: Spacing.width78,
    height: Spacing.width78,
    borderRadius: Spacing.width78,
    backgroundColor: ColorsApp.btnSocial,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSuPerLike: {
    width: Spacing.width99,
    height: Spacing.width99,
    borderRadius: Spacing.width99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorsApp.primary,
  },
  btnFavorite: {
    width: Spacing.width78,
    height: Spacing.width78,
    borderRadius: Spacing.width78,
    backgroundColor: ColorsApp.btnSocial,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
