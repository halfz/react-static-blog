import path from 'path';

export default () => ({
  webpack: (currentWebpackConfig, state) => {
    // eslint-disable-next-line no-param-reassign
    currentWebpackConfig.module.rules[0].oneOf[3].exclude.splice(0, 0, /\.(jpg|png|gif)$/);
    currentWebpackConfig.module.rules[0].oneOf[3].exclude.splice(0, 0, /\.svg$/);

    currentWebpackConfig.module.rules.splice(0, 0,
      {
        test: /\.svg$/,
        // svg -> svg react -> add halfz react hook -> to es5 with babel, written by mark
        use: [
          {
            loader: 'babel-loader',
          },
          path.join(state.config.paths.ROOT, './internal/halfz/svg-fill-var-loader'),
          path.join(state.config.paths.ROOT, './internal/halfz/svg-viewbox-loader'),
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              svgo: {
                // https://github.com/smooth-code/svgr/blob/f476c8ec7e928efd5c11324bed95a8110214dc79/packages/plugin-svgo/src/index.js
                // https://github.com/smooth-code/svgr/issues/52
                // https://github.com/svg/svgo remove prefixIds option
                // https://github.com/smooth-code/svgr/issues/307
                // Not work now!!!! T_T
                plugins: [{ prefixIds: false }],
              },
            },
          },
          'url-loader',
        ],
      });

    currentWebpackConfig.module.rules.splice(0, 0,
      {
        test: /\.svg$/,
        // svg -> svg react -> add halfz react hook -> to es5 with babel, written by mark
        use: [
          {
            loader: 'babel-loader',
          },
          path.join(state.config.paths.ROOT, './internal/halfz/svg-fill-var-loader'),
          path.join(state.config.paths.ROOT, './internal/halfz/svg-viewbox-loader'),
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              svgo: {
                // https://github.com/smooth-code/svgr/blob/f476c8ec7e928efd5c11324bed95a8110214dc79/packages/plugin-svgo/src/index.js
                // https://github.com/smooth-code/svgr/issues/52
                // https://github.com/svg/svgo remove prefixIds option
                // https://github.com/smooth-code/svgr/issues/307
                // Not work now!!!! T_T
                plugins: [{ prefixIds: false }],
              },
            },
          },
          'file-loader?name=static/[hash].[ext]',
        ],
      });

    currentWebpackConfig.module.rules.splice(0, 0, {
      test: /\.(jpg|png|gif)$/,
      use: [
        'file-loader?name=static/[hash].[ext]',
        {
          loader: 'image-webpack-loader',
          options: {
            query: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              gifsicle: {
                interlaced: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
              webp: {
                quality: 75,
              },
            },
          },
        },
      ],
    });

    currentWebpackConfig.module.rules.splice(0, 0, {
      test: /\.md/,
      use: [
        'raw-loader',
      ],
    });
    currentWebpackConfig.module.rules.splice(0, 0, {
      test: /node_module\/auto-bind/,
      use: [
        'babel-loader',
      ],
    });
    return currentWebpackConfig;
  },
});
