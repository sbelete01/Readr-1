const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const htmlPlugin = new HtmlWebPackPlugin({
  template: './client/src/index.html',
  filename: './index.html',
});

module.exports = {
  devtool: 'eval-source-map',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  plugins: [
    htmlPlugin,
    new webpack.DefinePlugin(envKeys),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
    ],
  },
};
