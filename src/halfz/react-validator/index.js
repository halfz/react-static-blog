import isCallable from 'is-callable';
import PropTypes from 'prop-types';
import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';

const isNullOrUndefined = (value) => value === null || value === undefined;


const Validator = ({ children, value, validator, validOnEmpty, onChange }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!(validOnEmpty && isNullOrUndefined(value))) {
      setError(validator(value));
      return;
    }
    setError(null);
  }, [value]);

  useEffect(() => {
    if (onChange) {
      onChange(error === null, {
        value,
        error,
      });
    }
  }, [error]);
  return (
    <Fragment>
      {isCallable(children) ? children(error === null, {
        value,
        error,
      }) : children}
    </Fragment>
  );
};


Validator.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  value: PropTypes.any,
  validator: PropTypes.func,
  validOnEmpty: PropTypes.bool,
  onChange: PropTypes.func,
};

Validator.defaultProps = {
  validOnEmpty: true,
};


export default Validator;
