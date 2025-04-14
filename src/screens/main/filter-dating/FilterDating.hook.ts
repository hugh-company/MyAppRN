import {GlobalService} from '@components';
import {useLocation} from '@hooks';
import {getLocations, RootState, sendMatchSaga, setFilterCache} from '@redux';
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
  const filterCache = useSelector(
    (state: RootState) => state.settingSlice.filterCache,
  );
  const [matchUser, setMatchUser] = useState<UserFindInterface | null>(null);
  const swipeRef = useRef<{triggerSwipe: (action: string) => void}>(null);
  const dispatch = useDispatch();
  const {checkLocation} = useLocation();

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserFindInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setNext] = useState(false);
  const fetchUsers = async (newFilter?: any) => {
    try {
      let params: any = {
        age: filterCache.age.join('-'),
        distance: filterCache.distance[0],
        gender:
          filterCache?.gender === genderInterface.OTHER
            ? null
            : filterCache?.gender,
        location: {
          latitude: location?.latitude ?? 0,
          longitude: location?.longitude ?? 0,
        },
        paged: page,
      };
      console.log({params});

      if (newFilter) {
        params = {
          age: newFilter?.age.join('-'),
          distance: newFilter?.distance[0],
          gender:
            newFilter?.gender === genderInterface.OTHER
              ? null
              : newFilter.gender,
          location: {...location},
          paged: 1,
        };
      }
      const response: any = await getFindUserApi(params);
      console.log({response});
      // setNext(response.isNext);
      setNext(response?.data?.is_next);
      if (response?.data?.page === 1) {
        setUsers(response.data?.data || []);
        setIsLoading(false);
        return;
      }
      setUsers(prevUsers => [...prevUsers, ...(response.data?.data || [])]);
      setIsLoading(false);
    } catch (error) {
      console.log({error});
      setIsLoading(false);
      GlobalService.hideLoading();
    }
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
    console.log({value});
    const check = await checkLocation();
    if (!check) {
      return;
    }
    const params = {
      ...value,
      location: {...location},
    };
    setPage(1);
    setIsLoading(true);
    console.log({value});

    dispatch(setFilterCache(value));
    fetchUsers(params);
  };
  useEffect(() => {
    if (isLoading) {
      GlobalService.showLoading();
    } else {
      GlobalService.hideLoading();
    }
  }, [isLoading]);
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
    filter: filterCache,
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
