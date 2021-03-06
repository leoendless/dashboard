const { resolve } = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const postCssOptions = require('./postcss.options');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build/'),
    publicPath: '/',
    pathinfo: true,
  },
  module: {
    rules: [
      ...baseConfig.moduleRules,
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 1,
              localIdentName: '[folder]__[local]--[hash:base64:5]',
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssOptions,
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 2,
              localIdentName: '[folder]__[local]--[hash:base64:5]',
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: baseConfig.resolve,
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.WatchIgnorePlugin([
      resolve(__dirname, 'lib'),
      resolve(__dirname, 'server'),
      resolve(__dirname, 'build'),
      resolve(__dirname, 'dist'),
    ]),
    new webpack.DefinePlugin({
      'process.env.DEV': true,
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
