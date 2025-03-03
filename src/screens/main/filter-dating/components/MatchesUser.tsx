import { CloseBigIcon, HeadIcon, StarActiveIcon } from '@assets';
import { AppSwipeProfile } from '@components';
import { ColorsApp, Spacing } from '@theme';
import { UserFindInterface } from '@types';
import React from 'react';
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

  const handleSwipeAction = (type: string, user?: UserFindInterface) => {
    console.log('handleSwipeAction', type, user);
    setProfiles((prev) => prev.slice(1));
  };

  const onClickAction = (type: string) => {
    console.log('onClickAction', type);
    swipeRef.current?.triggerSwipe(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <AppSwipeProfile
          ref={swipeRef}
          items={profiles}
          onSwipe={(type, user) => handleSwipeAction(type, user)}
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
