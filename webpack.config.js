const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'wishmaster.js',
    path: path.resolve(__dirname, 'public')
  },

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },

  // plugins:[
  //   new webpack.optimize.UglifyJsPlugin({
  //       compress: {
  //           warnings: false,
  //       },
  //       output: {
  //           comments: false,
  //       },
  //   }),
  // ]

};