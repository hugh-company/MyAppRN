import {all, call} from 'redux-saga/effects';
import socketSaga from './socketSaga';

function* rootSaga(): Generator<any, void, any> {
  console.log('Root saga is running'); // Debugging log to ensure rootSaga is executed
  try {
    yield all([call(socketSaga)]);
  } catch (error) {
    console.log('Error in rootSaga', error);
  }
}

export default rootSaga;
