const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const openBrowser = require('react-dev-utils/openBrowser');
const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
  const envKeys = dotenv?.config()?.parsed;
  return {
    entry: './src/index.tsx',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, './build'),
      publicPath: '/',
    },
    mode: process.env.NODE_ENV,
    devServer: {
      static: path.join(__dirname, 'build'),
      historyApiFallback: true,
      port: 4015,
      // this option will open a new tab in the browser anytime we run the webpack dev server
      // it is in comment because we use the openBrowser in the onAfterSetupMiddleware
      // open: true,
      hot: true,
      onAfterSetupMiddleware: () => {
        openBrowser('http://localhost:4015');
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              envName: process.env.NODE_ENV,
            },
          },
        },
        {
          // this rule is for scss modules
          test: /\.module\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  // turn class names to have folder and original naming in them
                  localIdentName: '[folder]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          include: /\.module\.scss$/,
        },
        {
          // this rule is for global scss. we need a separate rule for it because
          // we don't want the naming for class names to be like in module scss
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          exclude: /\.module\.scss$/,
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: true,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        inject: 'body',
      }),
      new CleanWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
      new webpack.DefinePlugin({
        process: {
          env: envKeys ? JSON.stringify(envKeys) : JSON.stringify({}),
        },
      }),
      env.ts_check &&
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            diagnosticOptions: {
              semantic: true,
              syntactic: true,
            },
            mode: 'write-references',
          },
        }),
    ].filter(Boolean),
  };
};
