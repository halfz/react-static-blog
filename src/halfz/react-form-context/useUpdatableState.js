import isCallable from 'is-callable';
import { useState } from 'react';

export default (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    (field) => (processOrVal) => {
      if (isCallable(processOrVal)) {
        const newVal = processOrVal(value[field]);
        return setValue({
          ...value,
          [field]: newVal,
        });
      }
      return setValue({
        ...value,
        [field]: processOrVal,
      });
    },
    (processOrVal) => {
      if (isCallable(processOrVal)) {
        const newVal = processOrVal(value);
        return setValue(newVal);
      }
      return setValue(processOrVal);
    },
  ];
};
