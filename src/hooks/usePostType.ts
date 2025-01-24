import {
  setComics,
  setDataSetting,
  setGames,
  setHome,
  setMovies,
  setSearch,
} from '@redux';
import {getDataDashboardApi, getPostDashboardApi} from '@services';
import {ItemListDashboard, PostTypeKey} from '@types';
import {useDispatch} from 'react-redux';

export function usePostType() {
  const dispatch = useDispatch();
  const callApiHome = async () => {
    const responseHome: any = await getDataDashboardApi();
    dispatch(setHome(responseHome?.data?.home || []));
    dispatch(
      setDataSetting({
        notices: responseHome?.data?.notices || [],
        bottomNavigation: responseHome?.data?.navbar || [],
        dataDrawer: responseHome?.data?.menus || [],
      }),
    );
  };
  const callApiSearchDashboard = async () => {
    const response = await getPostDashboardApi(ItemListDashboard.SEARCH);
    const dataSearch = response?.data?.modules || [];
    dispatch(setSearch(dataSearch));
  };

  const callApiMovieDashboard = async () => {
    const response = await getPostDashboardApi(PostTypeKey.MOVIES);
    const dataMovie = response?.data?.modules || [];
    dispatch(setMovies(dataMovie));
  };
  const callApiComicDashboard = async () => {
    const response = await getPostDashboardApi(PostTypeKey.COMIC);
    const dataComic = response?.data?.modules || [];
    dispatch(setComics(dataComic));
  };
  const callApiGameDashboard = async () => {
    const response = await getPostDashboardApi(PostTypeKey.GAMES);
    const dataGame = response?.data?.modules || [];
    dispatch(setGames(dataGame));
  };
  const callApiApiDashboard = async () => {
    Promise.all([
      callApiSearchDashboard(),
      callApiMovieDashboard(),
      callApiComicDashboard(),
      callApiGameDashboard(),
    ]);
  };

  return {
    callApiSearchDashboard,
    callApiHome,
    callApiApiDashboard,
  };
}
