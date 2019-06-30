import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import { sharedActionManager } from './SagaActionManager';

/**
 * @param actionTypes
 * @param localActionDefines
 */
export default (actionTypes, {
  callbackDefines,
  ActionManager = sharedActionManager,
} = {}) => (WrappedComponent) => {
  if (!actionTypes) {
    return WrappedComponent;
  }

  const displayName = `withSagaActions(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;


  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;

    static displayName = displayName;

    constructor(props) {
      super(props);
      this.callbackId = null;
    }

    componentWillMount() {
      ActionManager.use(actionTypes);
      if (callbackDefines) {
        this.callbackId = ActionManager.useCallback(callbackDefines);
      }
    }

    componentWillUnmount() {
      ActionManager.disuse(actionTypes);
      ActionManager.disuseCallback(this.callbackId);
    }


    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
