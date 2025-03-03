import {GlobalService} from '@components';
import {useLocation} from '@hooks';
import {getLocations, sendMatchSaga} from '@redux';
import {findUserApi} from '@services';
import {useTheme} from '@theme';
import {UserFindInterface} from '@types';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useFilterDating = () => {
  const [data, setData] = useState<UserFindInterface[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [isFilter, setIsFilter] = useState(true);
  const location = useSelector(getLocations);
  const [matchUser, setMatchUser] = useState<UserFindInterface | null>(null);
  const swipeRef = useRef<{triggerSwipe: (action: string) => void}>(null);
  const dispatch = useDispatch();
  const {checkLocation} = useLocation();

  const [filter, setFilter] = useState<any>({
    age: [18, 30],
    distance: [0],
    gender: '',
  });
  console.log({location});
  useEffect(() => {
    checkLocation();
  }, []);
  const onFilterApi = async (value: any): Promise<void> => {
    const check = await checkLocation();
    if (!check) {
      return;
    }
    GlobalService.showLoading();
    setFilter(value);
    try {
      const params: any = {
        age: value.age.join('-'),
        distance: value.distance[0],
        gender: value.gender,
        location: {...location},
      };
      const response: any = await findUserApi(params);
      console.log({responseFindUser: response});
      setData(response.data);
    } catch (error) {
      console.log({error});
    } finally {
      GlobalService.hideLoading();
    }
  };

  const handleSwipe = (direction: string, user: UserFindInterface): void => {
    console.log(`Swiped ${direction}`, user);
    dispatch(
      sendMatchSaga({
        recipient_id: user.id,
        relation_type: direction,
      }),
    );
  };

  return {
    data,
    themeColors,
    styles,
    isFilter,
    setIsFilter,
    filter,
    setFilter,
    onFilterApi,

    swipeRef,
    handleSwipe,

    matchUser,
    setMatchUser,
  };
};
