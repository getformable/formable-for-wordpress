const webpack = require('webpack');
const path = require('path');

module.exports = (env = {}) => ({
  entry: './assets/js/index.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'formable.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      }
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
        FORMABLE_URL: JSON.stringify(env.appUrl ? env.appUrl : 'https://app.getformable.com'),
    }),
  ],
});