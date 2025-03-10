function* rootSaga(): Generator<any, void, any> {
  try {
    // yield all([call(socketSaga)]);
  } catch (error) {
    // console.error('Error in rootSaga', error);
    console.log('Error in rootSaga', error);
  }
}

export default rootSaga;
