/*
* @Author: ibl
* @Date:   2017-08-10 15:04:46
* @Last Modified by:   ibl
* @Last Modified time: 2017-08-10 17:45:16
*/

'use strict';


const path = require('path');
const webpack = require('webpack');
const debug = require('debug')('app:config:webpack');

const webpackConfig = {
  name   : 'client',
  target : 'web',
  devtool: 'source-map',
  resolve: {
    root:
  }

};

module.exports = {
  entry: './src/app/main.jsx',
  output: {path: __dirname, filename: 'bundle.js'},

  module: {
    loaders: [
      {
        test    : /\.(js|jsx)$/,
        exclude : /node_modules/,
        loader  : 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}

