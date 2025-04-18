import {useLocation} from '@hooks';
import {goBack, navigate, SCREEN_ROUTE} from '@navigation';
import {useNavigationState, useRoute} from '@react-navigation/native';
import {getGameTrendingLocal, getUserInfo} from '@redux';
import {getDetailUserApi} from '@services';
import {useTheme} from '@theme';
import {UserItemInterface} from '@types';
import {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';
interface DetailUserInterface {
  user?: UserItemInterface;
}
export const useDetailUser = () => {
  const router = useRoute();
  const {user} = (router.params as DetailUserInterface) || {};
  const profile = useSelector(getUserInfo);
  const [data, setData] = useState(user || profile);
  const isMyProfile = data?.id === profile?.id; // Check if the user is the logged-in user
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const {getDistanceLocation} = useLocation();
  const games = useSelector(getGameTrendingLocal);
  const navigationState = useNavigationState(state => state);
  useEffect(() => {
    callApiDetailUser();
  }, []);
  const callApiDetailUser = async () => {
    const response = await getDetailUserApi(data.id);
    console.log({response});
    setData(response?.data);
  };
  const goToScreenMessage = () => {
    const previousRoute = navigationState.routes[navigationState.index - 1];
    if (previousRoute?.name === SCREEN_ROUTE.CHAT) {
      goBack();
    } else {
      navigate(SCREEN_ROUTE.CHAT, {
        message: {
          other_user: {
            id: data?.id,
            fullname: data?.fullname,
            avatar: data?.avatar,
          },
        },
      });
    }
  };
  const onSelectGame = item => {
    DeviceEventEmitter.emit('SendGame', {
      game: item,
    });
    goToScreenMessage();
  };
  return {
    data: isMyProfile ? profile : data, // Use the user data or the logged-in user's data
    isMyProfile, // Expose the check result
    themeColors,
    styles,
    games,
    getDistanceLocation,
    onSelectGame,
    goToScreenMessage,
  };
};
