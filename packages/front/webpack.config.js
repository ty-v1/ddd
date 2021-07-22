const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'production',
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: [/\.css$/, /\.scss$/, /\.sass$/],
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 40,
              workerNodeArgs: ['--max-old-space-size=512'],
              name: 'css-loader-pool',
            },
          },
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 80,
              workerNodeArgs: ['--max-old-space-size=512'],
              name: 'ts-loader-pool',
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'ts',
              minify: true,
              target: 'es2015',
            },
          },
        ],
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 80,
              workerNodeArgs: ['--max-old-space-size=512'],
              name: 'tsx-loader-pool',
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              minify: true,
              target: 'es2015',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
