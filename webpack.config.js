const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const appDirectory = path.resolve(__dirname, './');
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.

  include: [
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'App.js'),
    path.resolve(appDirectory, 'node_modules'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-function-bind',
      ],
      presets: ['babel-preset-expo', '@babel/preset-env', '@babel/react'],
    },
  },
};
const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: [
    path.resolve(appDirectory, 'assets/fonts'),
    path.resolve(appDirectory, 'node_modules/expo'),
    path.resolve(appDirectory, 'node_modules/@expo'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(appDirectory, 'node_modules/native-base'),
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module = Object.assign({}, config.module, {
    rules: [
      ttfLoaderConfiguration,
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  });


  // Finally return the new config for the CLI to use.
  return config;
};
