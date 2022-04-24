const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const webpack = require('webpack');

module.exports = () => {
  const configs = {
    context: __dirname,
    mode: process.env.NODE_ENV,
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
    },
    module: {
      rules: [
        {
          test: [/\.css$/, /\.scss$/, /\.sass$/],
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'thread-loader',
              options: {
                workers: 2,
                workerParallelJobs: 40,
                workerNodeArgs: ['--max-old-space-size=512'],
                name: 'ts-loader-pool',
              },
            },
            {
              loader: require.resolve('ts-loader'),
              options: {
                getCustomTransformers: {
                  before: [ReactRefreshTypeScript()],
                },
                // ref: https://stackoverflow.com/questions/52570597/webpack-thread-loader-with-ts-loader
                happyPackMode: true,
                // `ts-loader` does not work with HMR unless `transpileOnly` is used.
                // If you need type checking, `ForkTsCheckerWebpackPlugin` is an alternative.
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    ],
    devServer: {
      hot: true,
    },
  };

  return configs;
};
