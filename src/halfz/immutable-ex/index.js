const toJS = (value) => value && value.toJS ? value.toJS() : value;
const toJSMulti = (immutableMap, selectorMap) => {
  if (!immutableMap) {
    return {};
  }
  if (typeof selectorMap === 'string') {
    return {
      [selectorMap]: toJS(immutableMap.get(selectorMap)),
    };
  }
  if (Array.isArray(selectorMap)) {
    const ret = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const i in selectorMap) {
      Object.assign(ret, toJSMulti(immutableMap, selectorMap[i]));
    }
    return ret;
  }
  const ret = {};
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const i in selectorMap) {
    const v = selectorMap[i];
    if (Array.isArray(v)) {
      ret[i] = toJS(immutableMap.getIn(v));
    } else if (typeof v === 'object') {
      ret[i] = toJSMulti(immutableMap.get(i), v);
    } else {
      ret[i] = toJS(immutableMap.get(v));
    }
  }
  return ret;
};

export {
  toJS,
  toJSMulti,
};
