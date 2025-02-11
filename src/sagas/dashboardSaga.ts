import {
  setComics,
  setDataSetting,
  setGames,
  setGamesTrending,
  setHome,
  setLoadingDashboard,
  setMovies,
  setSearch,
} from '@redux';
import {
  getDataDashboardApi,
  getListGamesTrendingApi,
  getPostDashboardApi,
} from '@services';
import {ItemListDashboard, PostTypeKey} from '@types';
import {all, call, put, takeEvery} from 'redux-saga/effects';

function* fetchHomeData(): Generator<any, void, any> {
  try {
    // yield put(setLoadingDashboard(true));
    const response = yield call(getDataDashboardApi);

    yield put(setHome(response.data.modules || []));
    yield put(
      setDataSetting({
        notices: response.data.notices || [],
        bottomNavigation: response.data.navbar || [],
        dataDrawer: response.data.menus || [],
      }),
    );
  } catch (error) {
    yield put(setLoadingDashboard(false));
    console.error('Error fetching home data', error);
  }
}
function* fetchGamesTrendingSaga(): Generator<any, void, any> {
  try {
    console.log('fetchGamesTrendingSaga');

    // yield put(setLoadingDashboard(true));
    const response = yield call(getListGamesTrendingApi);
    yield put(setGamesTrending(response.data.data || []));
  } catch (error) {
    //yield put(setLoadingDashboard(false));
    console.error('Error fetching games trending data', error);
  }
}
function* fetchMoviesData(action): Generator<any, void, any> {
  try {
    console.log({action: action});

    // yield put(setLoadingDashboard(true));
    const response = yield call(
      getPostDashboardApi,
      PostTypeKey.MOVIES,
      action.payload,
    );
    console.log({response: response});

    yield put(setMovies(response.data.modules || []));
  } catch (error) {
    //yield put(setLoadingDashboard(false));
    console.error('Error fetching movies data', error);
  }
}

function* fetchSearchData(action): Generator<any, void, any> {
  try {
    // yield put(setLoadingDashboard(true));
    const response = yield call(
      getPostDashboardApi,
      ItemListDashboard.SEARCH,
      action.payload,
    );
    yield put(setSearch(response.data.modules || []));
  } catch (error) {
    //yield put(setLoadingDashboard(false));
    console.error('Error fetching search data', error);
  }
}

function* fetchComicsData(action): Generator<any, void, any> {
  try {
    // yield put(setLoadingDashboard(true));
    const response = yield call(
      getPostDashboardApi,
      PostTypeKey.COMIC,
      action.payload,
    );
    console.log({response: response});

    yield put(setComics(response.data.modules || []));
  } catch (error) {
    //yield put(setLoadingDashboard(false));
    console.error('Error fetching comics data', error);
  }
}

function* fetchGamesData(action): Generator<any, void, any> {
  try {
    // yield put(setLoadingDashboard(true));
    const response = yield call(
      getPostDashboardApi,
      PostTypeKey.GAMES,
      action.payload,
    );
    yield put(setGames(response.data.modules || []));
  } catch (error) {
    //yield put(setLoadingDashboard(false));
    console.error('Error fetching games data', error);
  }
}

// function* fetchDatingData(): Generator<any, void, any> {
//   try {
//     yield put(setLoadingDashboard(true));
//     const response = yield call(getPostDashboardApi, PostTypeKey.DATING);
//     yield put(setDating(response.data.modules || []));
//   } catch (error) {
//     //yield put(setLoadingDashboard(false));
//     console.error('Error fetching dating data', error);
//   }
// }

function* watchFetchHomeData() {
  yield takeEvery('FETCH_HOME_DATA', fetchHomeData);
}

function* watchFetchMoviesData() {
  yield takeEvery('FETCH_MOVIES_DATA', fetchMoviesData);
}

function* watchFetchSearchData() {
  yield takeEvery('FETCH_SEARCH_DATA', fetchSearchData);
}

function* watchFetchComicsData() {
  yield takeEvery('FETCH_COMICS_DATA', fetchComicsData);
}

function* watchFetchGamesData() {
  yield takeEvery('FETCH_GAMES_DATA', fetchGamesData);
}
function* watchFetchGamesTrending() {
  yield takeEvery('FETCH_GAMES_TRENDING', fetchGamesTrendingSaga);
}

// function* watchFetchDatingData() {
//   yield takeEvery('FETCH_DATING_DATA', fetchDatingData);
// }

export default function* dashboardSaga() {
  yield all([
    watchFetchHomeData(),
    watchFetchMoviesData(),
    watchFetchSearchData(),
    watchFetchComicsData(),
    watchFetchGamesData(),
    watchFetchGamesTrending(),
    // watchFetchDatingData(),
  ]);
}
