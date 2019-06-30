import {
  useContext,
  useMemo,
} from 'react';
import { ReactReduxContext } from 'react-redux';
import { bindActionCreators } from 'redux';

export const useReduxStore = (context = ReactReduxContext) => useContext(context).store;

export const useReduxProps = (mapStateToProps, mapDispatchToProps, ownProps, store = undefined) => {
  if (!store) {
    // eslint-disable-next-line no-param-reassign,react-hooks/rules-of-hooks
    store = useReduxStore();
  }
  let reduxProps = { ...ownProps };
  if (mapStateToProps) {
    reduxProps = {
      ...reduxProps,
      ...mapStateToProps(store.getState(), reduxProps),
    };
  }
  return useMemo(() => {
    if (mapDispatchToProps) {
      mapDispatchToProps(store.dispatch, reduxProps);
    }
    return reduxProps;
  }, [store]);
};

export const useMapState = (mapStateToProps, {
  ownProps, watchSelector = undefined, watchPropSelector = undefined, store = undefined,
} = {}) => {
  if (!store) {
    // eslint-disable-next-line no-param-reassign,react-hooks/rules-of-hooks
    store = useReduxStore();
  }

  const watches = [watchSelector ? watchSelector(store.getState()) : mapStateToProps(store.getState()), watchPropSelector ? watchPropSelector(ownProps) : ownProps];

  return useMemo(() => mapStateToProps(store.getState(), ownProps), watches);
};


export const useMapStateImmutable = (mapStateImmutableToProps, {
  ownProps, watchSelector = undefined, watchPropSelector = undefined, store = undefined,
} = {}) => {
  if (!store) {
    // eslint-disable-next-line no-param-reassign,react-hooks/rules-of-hooks
    store = useReduxStore();
  }

  const watches = [watchSelector ? watchSelector(store.getState()) : store.getState(), watchPropSelector ? watchPropSelector(ownProps) : ownProps];

  return useMemo(() => {
    const props = {};
    Object.keys(mapStateImmutableToProps).forEach((key) => {
      props[key] = store.getState().getIn(mapStateImmutableToProps[key]);
    });
    return props;
  }, watches);
};


export const useMapDispatch = (mapDispatchToProps, {
  ownProps, watchSelector = undefined, watchPropSelector = undefined, store = undefined,
} = {}) => {
  if (!store) {
    // eslint-disable-next-line no-param-reassign,react-hooks/rules-of-hooks
    store = useReduxStore();
  }

  const watches = [watchSelector ? watchSelector(store.getState()) : store.getState(), watchPropSelector ? watchPropSelector(ownProps) : ownProps];

  return useMemo(() => mapDispatchToProps(store.dispatch, ownProps), watches);
};


// https://redux.js.org/api/bindactioncreators
export const useBindActionCreators = (actions, {
  store = undefined,
} = {}) => {
  if (!store) {
    // eslint-disable-next-line no-param-reassign,react-hooks/rules-of-hooks
    store = useReduxStore();
  }
  return useMemo(() => bindActionCreators(actions, store.dispatch), [actions]);
};
