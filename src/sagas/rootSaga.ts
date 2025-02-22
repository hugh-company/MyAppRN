import {all, call} from 'redux-saga/effects';
import dashboardSaga from './dashboardSaga';
import socketSaga from './socketSaga';

function* rootSaga(): Generator<any, void, any> {
  try {
    yield all([call(dashboardSaga), call(socketSaga)]);
  } catch (error) {
    console.error('Error in rootSaga', error);
  }
}

export default rootSaga;
