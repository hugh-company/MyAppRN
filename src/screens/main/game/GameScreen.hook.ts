import {getGamesModuleLocal, setGames} from '@redux';
import {getPostDashboardApi} from '@services';
import {useTheme} from '@theme';
import {PostTypeKey, TabInterface, TypeKeyListApi} from '@types';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStyles} from './styles';

export const useGameScreen = () => {
  const {themeColors} = useTheme();
  const games = useSelector(getGamesModuleLocal);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const styles = createStyles(themeColors);
  const [tabSelect, setTabSelect] = useState<TabInterface | undefined>({
    id: 0,
    name: '',
    type: '',
  });
  useEffect(() => {
    if (games?.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [games]);
  // Call Api
  useEffect(() => {
    callApi();
  }, []);
  const callApi = async (filter?: string) => {
    try {
      const params = {
        filter: filter,
      };
      const response = await getPostDashboardApi(PostTypeKey.GAMES, params);

      dispatch(setGames(response.data?.modules || []));

      const category: any = response.data?.modules.find(
        item => item.type === TypeKeyListApi.TYPE_TABS,
      );
      // console.log({tabSelect: tabSelect?.name});

      if (category && category?.items?.[0] && tabSelect?.name === undefined) {
        setTabSelect(category?.items?.[0]);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const onRefresh = () => {
    callApi();
  };
  const handleCategorySelect = (item: TabInterface) => {
    setTabSelect(item);
  };
  return {
    games,
    themeColors,
    styles,
    loading,
    onRefresh,
    tabSelect,
    handleCategorySelect,
  };
};
