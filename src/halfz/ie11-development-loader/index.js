/* eslint-disable */

// https://github.com/styled-components/styled-components/issues/1449
module.exports = (source) => {
  const hasStyled = source.indexOf('styled(') >= 0;
  if (hasStyled) {
    if (!(/import[\s]+[^;]*React[^;]+from 'react';\n/.test(source))) {
      source = 'import React from \'react\';' + source;
    }
    return source.replace(/styled\(([a-zA-Z0-9\\.]+)\)/g, 'styled((props) => <$1 {...props} />)');
  }
  return source;
};
