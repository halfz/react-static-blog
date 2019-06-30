// https://redux.js.org/api/bindactioncreators
import { useReduxStore } from 'halfz/react-hook-redux';
import {
  useEffect,
  useMemo,
} from 'react';
import { bindActionCreators } from 'redux';
import { sharedActionManager } from './SagaActionManager';


export default (actionMap, {
  store = undefined,
  actionManager = sharedActionManager,
  initializer = undefined,
} = {}) => {
  if (!store) {
    // eslint-disable-next-line no-param-reassign
    store = useReduxStore();
  }

  const ret = useMemo(() => bindActionCreators(actionManager.generateActionCreators(actionMap), store.dispatch), [actionMap]);

  useEffect(() => {
    const actions = Object.values(actionMap);
    sharedActionManager.use(actions);
    if (initializer) {
      initializer(ret);
    }
    return () => {
      sharedActionManager.disuse(actions);
    };
  }, []);

  return ret;
};
