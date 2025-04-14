import { FilterIcon } from '@assets';
import { AppHeader } from '@components';
import { goBack, NavigationUtils, SCREEN_ROUTE } from '@navigation';
import { useNavigationState } from '@react-navigation/native';
import { Spacing } from '@theme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useFilterDating } from './FilterDating.hook';
import { MatchesUser } from './components/MatchesUser';
import { ModalFilterDating } from './components/ModalFilterDating';

export const FilterDating: React.FC = () => {
  const { data, styles, isFilter, setIsFilter, filter, onFilterApi,
    handleSwipe, loading, onLoadMore, setUsers, page,
  } = useFilterDating();
  const navigationState = useNavigationState(state => state);

  return (
    <View style={styles.container}>
      <AppHeader
        onBack={() => {
          const previousRoute = navigationState.routes[navigationState.index - 1];
          if (previousRoute?.name === SCREEN_ROUTE.SETTING_FAVORITE) {
            NavigationUtils.pop(3);

          } else {
            goBack();
          }
        }}
        rightComponent={<TouchableOpacity onPress={() => setIsFilter(true)} style={styles.btnFilter}>
          <FilterIcon size={Spacing.width28} color="white" />
        </TouchableOpacity>} />
      <MatchesUser
        loading={loading}
        onLoadMore={() => onLoadMore()}
        data={data || []} onSendAction={handleSwipe}
        setProfiles={setUsers}
      />
      <ModalFilterDating
        visible={isFilter}
        filter={filter}
        onClose={() => setIsFilter(false)}
        onFilter={(value) => {
          onFilterApi(value);
        }} />

    </View>
  );
};

