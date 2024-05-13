const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = () => {
  const envKeys = dotenv?.config()?.parsed;
  return {
    entry: './src/index.tsx',
    output: {
      filename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, './build'),
      publicPath: '/',
    },
    mode: process.env.NODE_ENV,
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
          test: /\.module\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
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
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
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
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: './assets/images/favicon.svg',
        minify: true,
        inject: 'body',
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        process: {
          env: envKeys ? JSON.stringify(envKeys) : JSON.stringify({}),
        },
      }),
      new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: 'write-references',
        },
      }),
    ],
  };
};
