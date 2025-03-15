import {useLocation} from '@hooks';
import {goBack, navigate, SCREEN_ROUTE} from '@navigation';
import {useNavigationState, useRoute} from '@react-navigation/native';
import {getGameTrendingLocal} from '@redux';
import {getDetailUserApi} from '@services';
import {useTheme} from '@theme';
import {UserItemInterface} from '@types';
import {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';
interface DetailUserInterface {
  user: UserItemInterface;
}
export const useDetailUser = () => {
  const router = useRoute();
  const {user} = router.params as DetailUserInterface;
  const [data, setData] = useState(user);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const {getDistanceLocation} = useLocation();
  const games = useSelector(getGameTrendingLocal);
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    callApiDetailUser();
  }, []);
  const callApiDetailUser = async () => {
    const response = await getDetailUserApi(user.id);
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
    data,
    themeColors,
    styles,
    games,
    getDistanceLocation,
    onSelectGame,
    goToScreenMessage,
  };
};
