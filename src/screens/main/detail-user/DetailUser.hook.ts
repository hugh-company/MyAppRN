import {useLocation} from '@hooks';
import {useRoute} from '@react-navigation/native';
import {getGameTrendingLocal} from '@redux';
import {getDetailUserApi} from '@services';
import {useTheme} from '@theme';
import {UserItemInterface} from '@types';
import {useEffect, useState} from 'react';
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

  useEffect(() => {
    callApiDetailUser();
  }, []);
  const callApiDetailUser = async () => {
    const response = await getDetailUserApi(user.id);
    console.log({response});
    setData(response?.data);
  };
  return {data, themeColors, styles, games, getDistanceLocation};
};
