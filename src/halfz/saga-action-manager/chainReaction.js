import { put } from 'redux-saga/effects';

const defaultGenerator = (action) => action;

export default (actionType, generator = defaultGenerator) => function* (action, results) {
  yield put({
    ...generator(
      action,
      results,
    ),
    type: actionType,
  });
};
