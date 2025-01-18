import {GlobalService} from '@components';
import {findUserApi} from '@services';
import {useTheme} from '@theme';
import {UserFindInterface} from '@types';
import {useState} from 'react';
import {createStyles} from './styles';

export const useFilterDating = () => {
  const [data, setData] = useState<UserFindInterface[]>([]);
  const {themeColors} = useTheme();
  const styles = createStyles(themeColors);
  const [isFilter, setIsFilter] = useState(true);
  const [filter, setFilter] = useState({
    age: [18, 30],
    distance: [0],
    gender: '',
  });

  const onFilterApi = async (value: any) => {
    GlobalService.showLoading();
    setFilter(value);
    try {
      const params = {
        age: value.age.join('-'),
        distance: value.distance[0],
        gender: value.gender,
      };
      const response: any = await findUserApi(params);
      console.log({response});
      setData(response.data);
    } catch (error) {
    } finally {
      GlobalService.hideLoading();
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
  };
};
