const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    main: ['regenerator-runtime/runtime.js', './src/index.jsx'],
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'main.html',
      inject: true,
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
      alwaysWriteToDisk: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
});
