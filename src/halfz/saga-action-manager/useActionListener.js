// https://redux.js.org/api/bindactioncreators
import { sharedActionManager } from 'halfz/saga-action-manager/SagaActionManager';
import { useEffect } from 'react';

export default (actionType, handler, inputs = [], {
  actionManager = sharedActionManager,
} = {}) => {
  useEffect(() => {
    const listnerId = actionManager.useListener(actionType, handler);
    return () => {
      actionManager.disuseListener(listnerId);
    };
  }, inputs);
};
