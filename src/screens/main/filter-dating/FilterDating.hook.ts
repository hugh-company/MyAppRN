import {GlobalService} from '@components';
import {getLocations, sendMatchSaga} from '@redux';
import {findUserApi} from '@services';
import {useTheme} from '@theme';
import {UserFindInterface} from '@types';
import {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';
enum ActionType {
  LIKE = 'like',
  DISLIKE = 'dislike',
  SUPER_LIKE = 'super_like',
}
export const useFilterDating = () => {
  const [data, setData] = useState<UserFindInterface[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [isFilter, setIsFilter] = useState(true);
  const location = useSelector(getLocations);
  const [matchUser, setMatchUser] = useState<UserFindInterface | null>(null);
  const swipeRef = useRef<{triggerSwipe: (action: string) => void}>(null);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<any>({
    age: [18, 30],
    distance: [0],
    gender: '',
  });

  const onFilterApi = async (value: any): Promise<void> => {
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
      console.log({response});
      setData(response.data);
    } catch (error) {
      console.log({error});
    } finally {
      GlobalService.hideLoading();
    }
  };

  const handleSwipe = (direction: string, user: UserFindInterface): void => {
    console.log(`Swiped ${direction}`, user);
    if (direction === 'like') {
      handleLike(user);
    } else if (direction === 'dislike') {
      handleDislike(user);
    } else if (direction === 'superlike') {
      handleSuperLike(user);
    }
  };

  const handleSwipeAction = (action: string): void => {
    if (swipeRef.current) {
      swipeRef.current.triggerSwipe(action);
    }
  };

  const handleLike = (user: UserFindInterface): void => {
    setMatchUser(user);
  };

  const handleDislike = (user: UserFindInterface): void => {
    console.log('Disliked');
    // Add your dislike logic here
  };

  const handleSuperLike = (user: UserFindInterface): void => {
    console.log('Super Liked');
    // Add your super like logic here
  };

  const callApiActionMatch = async (
    user: UserFindInterface,
    type: ActionType,
  ) => {
    try {
      // like, dislike, super_like
      dispatch(sendMatchSaga({user_id: user.id}));
    } catch (e) {
      console.log(e);
    }
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
    handleSwipeAction,
    matchUser,
    setMatchUser,
  };
};
