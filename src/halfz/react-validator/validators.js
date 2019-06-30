const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordMinStrengthRegEx = /^(?=.{8,}$).*/; // Needs UpperCase LowerCase and a number, at least 8 char long
const passwordMedStrengthRegEx = /^(?=.{8,}$)(?=.*[a-zA-Z])(?=.*[0-9]).*/; // Needs UpperCase LowerCase and a number, at least 8 char long
const passwordHiStrengthRegEx = /^(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*/; // Needs UpperCase LowerCase and a number, at least 8 char long


export const StringValidatorBuilder = (minLength = 0, maxLength = Math.Infinity) => (value) => {
  if (typeof value !== 'string') {
    return 'type';
  }
  if (value.length < minLength) {
    return 'min-length';
  }
  if (value.length > maxLength) {
    return 'max-length';
  }
  return null;
};

export const RegularExpressionValidatorBuilder = (regEx) => (value) => {
  if (typeof value !== 'string') {
    return 'type';
  }
  if (!regEx.test(String(value).toLowerCase())) {
    return 'mismatch';
  }
  return null;
};

export const ArraySizeValidatorBuilder = (minLength = 0, maxLength = Math.Infinity) => (value) => {
  if (!Array.isArray(value)) {
    return 'type';
  }
  if (value.length < minLength) {
    return 'min-length';
  }
  if (value.length > maxLength) {
    return 'max-length';
  }
  return null;
};
export const EmailValidator = RegularExpressionValidatorBuilder(emailRegEx);
export const BoolValidator = (value) => {
  if (!value) {
    return 'mismatch';
  }
  return null;
};

export const PasswordValidator = RegularExpressionValidatorBuilder(passwordMinStrengthRegEx);
export const PasswordStrength = (value) => {
  if (passwordHiStrengthRegEx(value)) {
    return 'hi';
  }
  if (passwordMedStrengthRegEx(value)) {
    return 'med';
  }
  if (passwordMinStrengthRegEx(value)) {
    return 'low';
  }
  return false;
};

export const PassConfirmValidator = (value) => {
  if (value) {
    return true;
  }
  return false;
};
