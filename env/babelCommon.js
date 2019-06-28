// https://www.npmjs.com/package/babel-plugin-module-resolver
/*
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "*": ["app/*"],
    }
  }
}
* */
module.exports = () => ({
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
      },
      'preval',
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '58',
          ie: '11',
        },
        corejs: '3',
        useBuiltIns: 'entry',
      },
    ],
  ],
});
