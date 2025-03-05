import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useLocation} from '@hooks';
import {getGameTrendingLocal} from '@redux';
import {getDetailUserApi} from '@services';
import {useTheme} from '@theme';
import {UserItemInterface} from '@types';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {createStyles} from './styles';
export interface ModalUserInfoProps {
  user: UserItemInterface;
  refModal: React.RefObject<BottomSheetModal> | null;
}
export const useInfoUser = (props: ModalUserInfoProps) => {
  const {user, refModal} = props;
  console.log({user});

  const [data, setData] = useState(user);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const {getDistanceLocation} = useLocation();
  const games = useSelector(getGameTrendingLocal);

  useEffect(() => {
    if (user) {
      callApiDetailUser();
    }
  }, [user]);
  const callApiDetailUser = async () => {
    const response = await getDetailUserApi(user.id);
    console.log({response});
    setData(response?.data);
  };
  return {data, themeColors, styles, games, getDistanceLocation, refModal};
};
