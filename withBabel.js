const argv = require('minimist')(process.argv.slice(2));
require('@babel/register')({
  cache: true,
});
require('core-js/stable');
require('regenerator-runtime/runtime');
require(argv.entry);
