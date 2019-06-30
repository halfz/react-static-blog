/* eslint-disable no-restricted-syntax,no-unused-vars,guard-for-in,no-param-reassign */
import {
  cancel,
  fork,
  join,
  take,
} from 'redux-saga/effects';

export const EFFECTS = {
  LATEST: 'LATEST',
  EVERY: 'EVERY',
  LEADING: 'LEADING',
};

class LazyCleanerDict {
  constructor(defaultValueProvider, cleaner = ((v) => v)) {
    return new Proxy({}, {
      get: (target, name) => {
        if (name in target) {
          // eslint-disable-next-line no-param-reassign
          target[name] = cleaner(target[name]);
          return target[name];
        }
        // eslint-disable-next-line no-param-reassign
        target[name] = defaultValueProvider();
        return target[name];
      },
    });
  }
}


function makeActionCleaner(actionSpecs, runningTasksForActionType, cleanupCandidates = []) {
  return function* () {
    for (const idx in cleanupCandidates) {
      const actionType = cleanupCandidates[idx];
      const [user] = actionSpecs[actionType];
      if (user === 0) {
        const tasks = runningTasksForActionType[actionType];
        for (const j in tasks) {
          yield cancel(tasks[j]);
        }
      }
    }
  };
}

function* taskCallback(task, action, callback) {
  try {
    const result = yield join(task);
    if (callback) {
      yield fork(
        callback,
        {
          action,
          result,
        },
      );
    }
  } catch (error) {
    if (callback) {
      yield fork(
        callback,
        {
          action,
          error,
        },
      );
    }
  }
}

function* runSaga(saga, ...args) {
  if (Array.isArray(saga)) {
    const results = {};
    for (const idx in saga) {
      const task = yield fork(saga[idx], ...args, results);
      results[idx] = yield join(task);
    }
  } else {
    // saga should be function
    if (!saga.apply) {
      console.error(args);
    }
    yield saga(...args);
  }
}

function* runTask(saga, args, action, tasks, callbacks, verbose) {
  try {
    const task = yield fork(runSaga, saga, ...args.concat(action));
    tasks.push(task);
    if (callbacks.length > 0) {
      for (const idx in callbacks) {
        const [, callback] = callbacks[idx];
        if (callback) {
          yield fork(taskCallback, task, action, callback);
        }
      }
    }
  } catch (e) {
    if (verbose) {
      console.error(`${saga.toString()} throws error!`);
      console.error(e);
    }
  }
}


function makeActionTaker(actionManager) {
  const {
    actionSpecs, runningTasksForActionType, callbacksForActionType, verbose, listenersForActionType,
  } = actionManager;
  return function* () {
    while (true) {
      const action = yield take('*');
      const callbacks = action.type in callbacksForActionType ? Object.entries(callbacksForActionType[action.type]) : [];
      const listeners = action.type in listenersForActionType ? Object.entries(listenersForActionType[action.type]) : [];
      if (action.type && actionSpecs[action.type]) {
        const [user, saga, effect, argsInData] = actionSpecs[action.type];

        if (saga) {
          const args = argsInData || [];

          if (user > 0) {
            const tasks = runningTasksForActionType[action.type];

            if (effect === EFFECTS.LATEST) {
              for (const idx in tasks) {
                yield cancel(tasks[idx]);
              }
              yield fork(runTask, saga, args, action, tasks, callbacks, verbose);
            } else if (effect === EFFECTS.LEADING) {
              if (tasks.length === 0) {
                yield fork(runTask, saga, args, action, tasks, callbacks, verbose);
              }
            } else {
              // default takeEvery;
              yield fork(runTask, saga, args, action, tasks, callbacks, verbose);
            }
          }
        }
      }
      for (const idx in listeners) {
        const [, callback] = listeners[idx];
        if (callback) {
          yield fork(
            callback,
            action,
          );
        }
      }
    }
  };
}


export default class SagaActionManager {
  constructor(verbose = false) {
    this.actionSpecs = {};
    this.actionGenerators = {};
    this.callbacksForActionType = new LazyCleanerDict(() => ({}));
    this.listenersForActionType = new LazyCleanerDict(() => ({}));

    this.runningTasksForActionType = new LazyCleanerDict(() => [], (tasks) => tasks.filter((task) => task.isRunning()));
    this.runner = null;
    this.verbose = verbose;
  }

  bind(runner) {
    this.runner = runner;
    this.runner(makeActionTaker(this));
  }

  // https://redux-saga.js.org/docs/api/
  define(actionType, saga, effect = EFFECTS.EVERY, ...args) {
    if (actionType in this.actionSpecs && this.verbose) {
      console.warn(`${actionType} is already defined`);
    }
    this.actionSpecs[actionType] = [0, saga, effect, args];
  }

  defineActionGenerator(actionType, actionGenerator) {
    if (!actionGenerator) {
      actionGenerator = () => ({ type: actionType });
    }
    this.actionGenerators[actionType] = (...params) => {
      const ret = actionGenerator(...params);
      ret.type = actionType;
      return ret;
    };
  }

  defineEvery(actionType, saga, ...args) {
    this.define(actionType, saga, EFFECTS.EVERY, ...args);
  }

  defineLatest(actionType, saga, ...args) {
    this.define(actionType, saga, EFFECTS.LATEST, ...args);
  }

  defineLeading(actionType, saga, ...args) {
    this.define(actionType, saga, EFFECTS.LEADING, ...args);
  }

  disuse(actionTypes) {
    if (!actionTypes) {
      return;
    }
    const cleanupCandidates = [];
    actionTypes.forEach((actionType) => {
      if (this.actionSpecs[actionType]) {
        this.actionSpecs[actionType][0] -= 1;
        if (this.actionSpecs[actionType][0] === 0) {
          cleanupCandidates.push(actionType);
        }
      } else if (this.verbose) {
        console.warn(`ActionType ${actionType} is not defined, check SagaActionManager.define first`);
      }
    });
    if (this.runner) {
      if (cleanupCandidates.length > 0) {
        this.runner(makeActionCleaner(this.actionSpecs, this.runningTasksForActionType, cleanupCandidates, this.verbose));
      }
    }
  }

  disuseCallback(key) {
    if (!key) {
      return;
    }
    const evictions = [];
    Object.entries(this.callbacksForActionType).forEach(([k, v]) => {
      if (key in v) {
        delete v[key];
      }
      if (v.length === 0) {
        evictions.push(k);
      }
    });
    evictions.forEach((k) => {
      delete this.callbacksForActionType[k];
    });
  }

  disuseListener(key) {
    if (!key) {
      return;
    }
    const evictions = [];
    Object.entries(this.listenersForActionType).forEach(([k, v]) => {
      if (key in v) {
        delete v[key];
      }
      if (v.length === 0) {
        evictions.push(k);
      }
    });
    evictions.forEach((k) => {
      delete this.listenersForActionType[k];
    });
  }

  disuseLocal(task) {
    this.runner(cancel(task));
  }

  generateActionCreators(actionMap) {
    const ret = {};
    Object.entries(actionMap).forEach(([i, v]) => {
      ret[i] = this.actionGenerators[v] || (() => ({ type: v }));
    });
    return ret;
  }

  generateMapDispatch(actionMap) {
    const actonCreators = this.generateActionCreators(actionMap);
    return (dispatch) => {
      const ret = {};
      Object.entries(actonCreators).forEach(([i, v]) => {
        ret[i] = (...args) => dispatch(v(...args));
      });
      return ret;
    };
  }

  generateUniqueId = () => Math.random().toString(36).substring(2)
    + (new Date()).getTime().toString(36);

  use(actionTypes) {
    if (!actionTypes) {
      return;
    }
    actionTypes.forEach((actionType) => {
      if (this.actionSpecs[actionType]) {
        this.actionSpecs[actionType][0] += 1;
      } else if (this.verbose) {
        console.warn(`ActionType ${actionType} is not defined, check SagaActionManager.define first`);
      }
    });
  }

  useCallback(callbackDefines) {
    const uid = this.generateUniqueId();
    callbackDefines.forEach((callbackDefine) => {
      const [actionType, callback] = callbackDefine;
      this.callbacksForActionType[actionType][uid] = callback;
    });
    return uid;
  }

  useListener(actionType, handler) {
    const uid = this.generateUniqueId();
    this.listenersForActionType[actionType][uid] = handler;
    return uid;
  }

  useLocal(actionManager) {
    return this.runner(makeActionTaker(actionManager));
  }
}


export const sharedActionManager = new SagaActionManager();
