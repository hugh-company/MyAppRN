import {useLocation} from '@hooks';
import {getLocations, sendMatchSaga} from '@redux';
import {getFindUserApi} from '@services';
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
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserFindInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setNext] = useState(false);
  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await getFindUserApi({
      age: filter.age.join('-'),
      distance: filter.distance[0],
      gender: filter.gender === genderInterface.OTHER ? null : filter.gender,
      location: {
        latitude: location?.latitude ?? 0,
        longitude: location?.longitude ?? 0,
      },
      paged: page,
    });
    console.log({response});
    // setNext(response.isNext);
    setNext(response?.data?.is_next);
    setUsers(prevUsers => [...prevUsers, ...(response.data?.data || [])]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (page > 1) {
      console.log({page});

      fetchUsers();
    }
  }, [page]);

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
    fetchUsers();
  };

  const onLoadMore = () => {
    if (isNext) {
      setPage(prev => prev + 1);
    }
  };
  return {
    data: users,
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
    setPage,
    setUsers,
    page,
    onLoadMore,
  };
};
