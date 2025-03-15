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
  onLoadMore?: () => void;
  setProfiles: React.Dispatch<React.SetStateAction<UserFindInterface[]>>;
  loading?: boolean;
  page?: number;
}

export function MatchesUser(props: ListUserDatingProps) {
  const { data, onLoadMore, setProfiles, loading, page } = props;
  const { bottom } = useSafeAreaInsets();
  const swipeRef = React.useRef<{ triggerSwipe: (action: string) => void }>(null);
  const [profiles, setProfilesState] = React.useState(data);

  const bottomModal = React.useRef<BottomSheetModal>(null);
  const [selectUser, setSelectUser] = React.useState<UserFindInterface | null>(null);
  useEffect(() => {

    if (page === 1) {
      setProfilesState(data);
    } else {
      setProfilesState(prevProfiles => [...prevProfiles, ...data]);

    }
    return () => {
      setProfilesState([]);
    };
  }, [data, page]);
  const handleSwipeAction = (type: string, user?: UserFindInterface) => {
    console.log('handleSwipeAction', type, user);
    setProfiles((prev) => prev.slice(1)); // Update profiles using setProfiles
    props.onSendAction(type, user); // Call the callback
  };

  const onClickAction = (type: string) => {
    swipeRef.current?.triggerSwipe(type);
  };
  const onDetailUser = (user: UserFindInterface) => {
    setSelectUser(user);
    bottomModal.current?.present();
  };

  useEffect(() => {
    if (profiles.length <= 3) {
      console.log('phân trang');

      onLoadMore && onLoadMore();
    }
  }, [profiles]);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <AppSwipeProfile
          ref={swipeRef}
          items={profiles}
          onSwipe={(type, user) => handleSwipeAction(type, user)}
          onDetailUser={(user) => onDetailUser(user)}
          setProfiles={setProfilesState}
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

      {selectUser && <ModalInfoUser user={selectUser} refModal={bottomModal} />}

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
