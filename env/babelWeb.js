const babelCommon = require('./babelCommon');

module.exports = (api, type = 'web') => {
  api.cache.using(() => process.env.NODE_ENV === 'development');

  const babelShared = babelCommon(api, type);
  const isProd = api.env('production');
  return {
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          displayName: !isProd,
        },
      ],
      ...babelShared.plugins,
    ],
    presets: [
      ...babelShared.presets,
      '@babel/preset-react',
    ],
    env: {
      production: {
        plugins: [
          'transform-react-remove-prop-types',
          '@babel/plugin-transform-react-inline-elements',
          '@babel/plugin-transform-react-constant-elements',
        ],
      },
      test: {
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          'dynamic-import-node',
          [
            'styled-components',
            {
              displayName: !isProd,
            },
          ],
        ],
      },
    },
  };
};
