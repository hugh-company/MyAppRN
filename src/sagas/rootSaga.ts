import {all, call} from 'redux-saga/effects';
import socketSaga from './socketSaga';

function* rootSaga(): Generator<any, void, any> {
  try {
    yield all([call(socketSaga)]);
  } catch (error) {
    console.error('Error in rootSaga', error);
  }
}

export default rootSaga;
