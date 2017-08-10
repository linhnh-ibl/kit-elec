/*
* @Author: ibl
* @Date:   2017-08-10 14:29:10
* @Last Modified by:   ibl
* @Last Modified time: 2017-08-10 14:37:10
*/

'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './../src/app/main.jsx',
  output: {path: __dirname, filename: 'bundle.js'},

  module: {
    loaders: [
      {
        test    : /\.(js|jsx)$/,
        exclude : /node_modules/,
        loader  : 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
