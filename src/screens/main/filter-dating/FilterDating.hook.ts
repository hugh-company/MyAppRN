import {GlobalService} from '@components';
import {useLocation} from '@hooks';
import {getLocations, sendMatchSaga} from '@redux';
import {useFindUserApi} from '@services';
import {useTheme} from '@theme';
import {genderInterface, UserFindInterface} from '@types';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useFilterDating = () => {
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
    distance: [50],
    gender: genderInterface.OTHER,
  });
  //
  const {data, isLoading, refetch} = useFindUserApi(
    {
      age: filter.age.join('-'),
      distance: filter.distance[0],
      gender: filter.gender,
      location: {
        latitude: location?.latitude ?? 0,
        longitude: location?.longitude ?? 0,
      },
    },
    false,
  );

  //

  useEffect(() => {
    checkLocation();
  }, []);

  const handleSwipe = (direction: string, user: UserFindInterface): void => {
    console.log(`Swiped ${direction}`, user);
    dispatch(
      sendMatchSaga({
        recipient_id: user.id,
        relation_type: direction,
      }),
    );
  };
  const onFilterApi = async (value: any): Promise<void> => {
    console.log({location});
    const check = await checkLocation();
    if (!check) {
      return;
    }
    await setFilter({
      ...value,
      location: {...location},
    });
    GlobalService.showLoading();
    await refetch();
    GlobalService.hideLoading();
  };

  return {
    data: data?.data || [],
    themeColors,
    styles,
    isFilter,
    setIsFilter,
    filter,
    setFilter,
    onFilterApi,

    swipeRef,
    handleSwipe,
    loading: isLoading,
    matchUser,
    setMatchUser,
  };
};
