/*
* @Author: ibl
* @Date:   2017-08-10 15:04:46
* @Last Modified by:   Linh Nguyen
* @Last Modified time: 2017-08-11 12:19:34
*/

'use strict';

const path = require('path');
const webpack = require('webpack');
const debug = require('debug')('app:config:webpack');
const project = require('./config/project.config');

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;

const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : project.compiler_devtool,
  resolve : {
    modules       : [__dirname, project.paths.client()],
    extensions : ['*', '.js', '.jsx', '.json'],
  },
  module : {},
};

/**
 * Entry points
 */
const APP_ENTRY =project.paths.client('main.jsx');

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor: project.compiler_vendors,
};

/**
 * Bundle Output
 */
webpackConfig.output = {
  filename: `[name].[${project.compiler_hash_type}].js`,
  path: project.paths.dist(),
  publicPath: project.compiler_public_path,
};

/**
 * Externals
 */
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;

/**
 * Plugins
 */
webpackConfig.plugins = [
  new webpack.DefinePlugin(project.globals),
  new HtmlWebpackPlugin({
    template : project.paths.client('index.ejs'),
    hash     : false,
    filename : 'index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : true,
    },
    title: project.seo.title,
    author: project.seo.author,
    description: project.seo.description,
    googleAdClientId: project.googleAd.clientId,
    keywords: project.seo.keywords,
    sentryUrl: project.sentry.publicUrl,
    collectWindowErrors: project.sentry.clientConfig.collectWindowErrors,
    gtmContainerId: project.googleTagManager.containerId,
  }),
];

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else if (__PROD__) {
  debug('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false,
      },
    })
  );
}

/**
 * Loader
 */
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: project.compiler_babel,
}, {
  test: /\.json$/,
  loader:'json'
}];

module.exports = webpackConfig;

// module.exports = {
//   entry: './src/app/main.jsx',
//   output: {path: __dirname, filename: 'bundle.js'},

//   module: {
//     loaders: [
//       {
//         test    : /\.(js|jsx)$/,
//         exclude : /node_modules/,
//         loader  : 'babel-loader',
//         query: {
//           presets: ['es2015', 'react']
//         }
//       }
//     ]
//   }
// }

