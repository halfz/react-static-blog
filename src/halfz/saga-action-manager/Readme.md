# Saga Action Manager

## Example

```javascript
// some.constants.js
export const SOME_ACTION_0 = 'SOME_ACTION_0';
export const SOME_ACTION_1 = 'SOME_ACTION_1';
export const SOME_ACTION_2 = 'SOME_ACTION_2';

// some.action.js 
export const actionGenerator0 = (param0, param1) = ({
  param_rename: param0,
  param1: param1,
})

// some.saga.js 
// type should be SOME_ACTION_0,
export function* actionHandler0({type, param_rename, param1}) {
  /* Do Something */
}

// global.action.define.js
import ActionManager from 'halfz/saga-action-manager';

ActionManager.defineLatest(SOME_ACTION_0, actionHandler0);
ActionManager.defineLatest(SOME_ACTION_1, actionHandler1);
ActionManager.definnEvery(SOME_ACTION_2, actionHandler2);

ActionManager.defineActionGenerator(SOME_ACTION_0, actionGenerator0);
ActionManager.defineActionGenerator(SOME_ACTION_1, actionGenerator1);
ActionManager.defineActionGenerator(SOME_ACTION_2, actionGenerator2);

```
---
```javascript
// SomeComponent.js
// Saga Injector, provide the feature that allows run saga only for mounted components.
import { bindSagaActions, useActionManager } from 'halfz/saga-action-manager';

const SomeComponent = () => {
  
  
  const {
    someAction0, someAction1, someAction2,
  } = useActionManager({
    someAction0: SOME_ACTION_0,
    someAction1: SOME_ACTION_1,
    someAction2: SOME_ACTION_2,
  });
  
  return (
    <div onClick={() => getApplication(param0, param1)}>
      asdsad
    </div>
  )
}

const withSagaActions = bindSagaActions([
  SOME_ACTION_1,
  SOME_ACTION_2,
]);

// Compose Saga injected component
export default compose(
  withSagaActions,
)(SomeComponent);

``` 
---
```javascript
// SomeComponent2.js
// Saga Injector, provide the feature that allows run saga only for mounted components.
import { bindSagaActions } from 'halfz/saga-action-manager';

const withSagaActions = bindSagaActions([
  SOME_ACTION_0,
  SOME_ACTION_2,
]);
// Compose Saga injected component
export default compose(
  withSagaActions,
)(SomeComponent2);
``` 

In this case, 
* Edit `1` files to inject saga for each `Saga Injected Compoent`.
* We can reuse the bind of `actionType` and `action's saga`.

You can check examples in files,

`app/shared/sagas/actionDefines.js`
`app/web/pageContainers/InvestorSubFormContainer/index.js`


## Why?

`Saga Injected Component`

* A component with saga method that the saga runs only during the component mounted.

We used the `injectSaga` style from `react-boliorplate` to optimize saga. However, it makes us hard to build a `compoennt` with `saga`.  

For example, we usually used the code like below,

```javascript
// some.constants.js
export const SOME_ACTION_0 = 'SOME_ACTION_0';
export const SOME_ACTION_1 = 'SOME_ACTION_1';
export const SOME_ACTION_2 = 'SOME_ACTION_2';

// some.actions.js 
export function* actionHandler0() {
  /* Do Something */
}
```
---

```javascript
// SomeComponent.saga.js
// Saga Function
const saga = function* () {
  yield all([
    takeLatest(SOME_ACTION_1, actionHandler1),
    takeEvery(SOME_ACTION_2, actionHandler2),
  ]);
};


// SomeComponent.js
// Saga Injector, provide the feature that allows run saga only for mounted components.
const withSaga = injectSaga({
  key: 'UniqueKey',
  saga,
});
export default compose(
  withSaga,
)(SomeComponent);
```

---
```javascript
// SomeComponent2.saga.js
// Saga Function
const saga = function* () {
  yield all([
    takeLatest(SOME_ACTION_0, actionHandler0),
    takeEvery(SOME_ACTION_2, actionHandler2),
  ]);
};

// SomeComponent2.js
// Saga Injector, provide the feature that allows run saga only for mounted components.
const withSaga = injectSaga({
  key: 'UniqueKey2',
  saga,
});
export default compose(
  withSaga,
)(SomeComponent2);

``` 

In this case, 
* Edit `2` files to inject saga for each `Saga Injected Compoent`. 

## New Proposal

```javascript
// some.constants.js
export const SOME_ACTION_0 = 'SOME_ACTION_0';
export const SOME_ACTION_1 = 'SOME_ACTION_1';
export const SOME_ACTION_2 = 'SOME_ACTION_2';

// some.actions.js 
export function* actionHandler0() {
  /* Do Something */
}

// global.action.define.js
import ActionManager from 'halfz/saga-action-manager';

ActionManager.defineLatest(SOME_ACTION_0, actionHandler0);
ActionManager.defineLatest(SOME_ACTION_1, actionHandler1);
ActionManager.definnEvery(SOME_ACTION_2, actionHandler2);
```
---
```javascript
// SomeComponent.js
// Saga Injector, provide the feature that allows run saga only for mounted components.
import { bindSagaActions } from 'halfz/saga-action-manager';

const withSagaActions = bindSagaActions([
  SOME_ACTION_1,
  SOME_ACTION_2,
]);

// Compose Saga injected component
export default compose(
  withSagaActions,
)(SomeComponent);

``` 
---
```javascript
// SomeComponent2.js
// Saga Injector, provide the feature that allows run saga only for mounted components.
import { bindSagaActions } from 'halfz/saga-action-manager';

const withSagaActions = bindSagaActions([
  SOME_ACTION_0,
  SOME_ACTION_2,
]);
// Compose Saga injected component
export default compose(
  withSagaActions,
)(SomeComponent2);
``` 

In this case, 
* Edit `1` files to inject saga for each `Saga Injected Compoent`.
* We can reuse the bind of `actionType` and `action's saga`.

You can check examples in files,

`app/shared/sagas/actionDefines.js`
`app/web/pageContainers/InvestorSubFormContainer/index.js`

## How it works.

* `bindSagaAction` will modify `Component`'s `componentWillMount` and `componentWillunMount` as below

```javascript
    componentWillMount() {
      ActionManager.use(actionTypes);
    }

    componentWillUnmount() {
      ActionManager.disuse(actionTypes);
    }
```

* `ActionManager.define` defines a `ActionType`'s saga behavior.

```javascript
 
export function* actionHandler0() {
  yield something();
}

ActionManager.define(SOME_ACTION_1, actionHandler1, EFFECTS.LATEST);
```

* `AcitonManager.use` makes `actionTypes' status` active.

* `ActionManager` has a global saga generator as below. 

```javascript
// Pseudo Code

function * actionTaker() {
  while (true) {
    const action = yield take('*');
    const actionType = action.type;
    if(isActionTypeActive(actionType)){ // check the actionType is active!
      const runningTasksForActionType = getRunningTasksForActionType(actionType);
      // check takeLatest at https://redux-saga.js.org/docs/api/
      if(isLatest(actionType)){
        yield cancelTasks(runningTasksForActionType);
        yield runDefinedSagaForAction(action);
      } 
      // check takeLeading at https://redux-saga.js.org/docs/api/
      else if(isLeading(actionType)){
        if (runningTasksForActionType.length === 0) {
          yield runDefinedSagaForAction(action);
        }
      }
      else{
        yield runDefinedSagaForAction(action);
      }
    }
  } 
}
``` 

You can check those files,

`app/halfz/saga-action-manager/SagaActionManager.js`
`app/halfz/saga-action-manager/bindSagaActions.js`

