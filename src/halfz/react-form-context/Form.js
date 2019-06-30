/* eslint-disable no-underscore-dangle,no-param-reassign */
import autoBind from 'auto-bind';
import FormField from 'halfz/react-form-context/FormField';
import isCallable from 'is-callable';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import keys from 'lodash/keys';
import map from 'lodash/map';
import merge from 'lodash/merge';
import update from 'lodash/update';

export default class Form {
  static of(fieldMap) {
    return new Form(fieldMap);
  }

  static getValue(data, path) {
    const value = data[path];
    if (value instanceof FormField) {
      return value.getValue();
    }
    if (typeof value === 'object') {
      return map(value, (v, key) => Form.getValue(value, key));
    }
    return value;
  }

  static extractPathMap(fieldMap, base = '') {
    let ret = [];
    forEach(fieldMap, (v, k) => {
      if (v instanceof FormField) {
        ret.push(base + k);
      } else {
        ret = ret.concat(this.extractPathMap(v, `${k}.`));
      }
    });
    return ret;
  }

  constructor(fieldMap, options = {}) {
    this.options = merge(options, {});
    this.fieldMap = fieldMap;
    this.setDirty = () => null;
    autoBind(this);
    this.reset();
  }

  setRefresher(refreshMethod) {
    this.setDirty = refreshMethod;
  }

  setError(path, error) {
    this._setError(path, error);
    this.setDirty();
  }

  getError(path) {
    path = path.replace(/\\./g, '___');
    if (this.pathMap.indexOf(path) < 0) {
      return null;
    }
    return get(this.errors, path);
  }

  _reset() {
    this.pathMap = Form.extractPathMap(this.fieldMap);
    this.errors = {};
    this.value = {};
    this.valueModified = {};
    keys(this.fieldMap).forEach((k) => {
      this.value[k] = Form.getValue(this.fieldMap, k);
    });
    this.refreshValidation();
  }

  _setError(path, error) {
    path = path.replace(/\\./g, '___');
    if (this.pathMap.indexOf(path) < 0) {
      return;
    }
    this.errors[path] = error;
  }

  isAllValid() {
    let valid = true;
    forEach(this.errors, (v, k) => {
      if (!this.isValid(k)) {
        valid = false;
      }
    });
    return valid;
  }

  isValid(path) {
    path = path.replace(/\\./g, '___');
    const value = get(this.errors, path);
    return !value;
  }

  refreshValidation() {
    forEach(this.pathMap, (path) => {
      const { validator } = get(this.fieldMap, path);
      this._setError(path, validator ? validator(get(this.value, path)) : null);
    });
  }

  reset() {
    this._reset();
    this.setDirty();
  }

  update(path, updater) {
    if (this.pathMap.indexOf(path) < 0) {
      return;
    }
    if (isCallable(updater)) {
      update(this.value, path, updater);
    } else {
      update(this.value, path, () => updater);
    }
    update(this.valueModified, path, true);
    const { validator } = get(this.fieldMap, path);
    this._setError(path, validator ? validator(get(this.value, path)) : null);
    this.setDirty();
  }

  wasModified() {
    return !!Object.entries(this.valueModified).length;
  }
}
