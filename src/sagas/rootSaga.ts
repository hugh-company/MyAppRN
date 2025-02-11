import {all, call} from 'redux-saga/effects';
import dashboardSaga from './dashboardSaga';
import socketSaga from './socketSaga';

function* rootSaga() {
  try {
    yield all([call(socketSaga), call(dashboardSaga)]);
  } catch (error) {
    console.error('Error in rootSaga', error);
  }
}

export default rootSaga;
