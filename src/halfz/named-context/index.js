import { createContext } from 'react';

const contexts = {};

export default (name, initialValue = undefined) => {
  if (contexts[name]) {
    return contexts[name];
  }
  contexts[name] = createContext(initialValue);
  return contexts[name];
};
