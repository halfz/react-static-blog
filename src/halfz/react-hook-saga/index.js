import { useReduxStore } from 'halfz/react-hook-redux';
import { useEffect } from 'react';
import { ReactReduxContext } from 'react-redux';
import { all } from 'redux-saga/effects';


export const useRunSaga = (saga, context = ReactReduxContext) => {
  const store = useReduxStore(context);
  useEffect(() => {
    const task = store.runSaga(saga);
    return () => {
      task.cancel();
    };
  }, []);
};


export const useRunSagaAll = (effects, context = ReactReduxContext) => {
  const store = useReduxStore(context);

  useEffect(() => {

    const sagaAll = function* () {
      yield all(effects);
    };

    const task = store.runSaga(sagaAll);
    return () => {
      task.cancel();
    };
  }, []);
};
