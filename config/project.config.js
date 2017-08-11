/*
* @Author: ibl
* @Date:   2017-08-10 17:44:55
* @Last Modified by:   Linh Nguyen
* @Last Modified time: 2017-08-11 11:50:09
*/

'use strict';

const path = require('path');
const argv = require('yargs').argv;
const debug = require('debug')('app:config:project');

require('babel-core/register')({
  plugins: [
    'transform-class-properties',
    'transform-runtime',
    [
      'module-resolver',
      {
        root: ['./src/app'],
        alias: {
          '$config': '/config',
        },
      },
    ],
  ],
  presets: ['react', 'es2015', 'stage-0'],
});

const config = {
  env: process.env.NODE_ENV || 'development',

  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src/app',
  dir_dist: 'dist',
  dir_public: 'public',
  compiler_hash_type: 'hash',
  compiler_public_path: 'http://localhost:' + (process.env.PORT || 3000) + '/',
  compiler_vendors: [
    'react',
    'react-redux',
    'react-router',
    'redux',
  ],
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  compiler_babel: {
    cacheDirectory: true,
    plugins: [
      'transform-class-properties',
      'transform-runtime',
      [
        'module-resolver',
        {
          root: ['./src/app'],
          alias: {
            '$config': '/config',
          },
        },
      ],
    ],
    presets: ['react', 'es2015', 'stage-0'],
  },
  compiler_fail_on_warning: false,
};

console.log(config.path_base);

const pkg = require('../package.json');

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true;

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from \`compiler_vendors\` in ~/config/index.js`
    );
  });

/**
 * Utilities
 */
function base() {
  const args = [config.path_base].concat([].slice.call(arguments));
  console.log(path.resolve.apply(path, args));
  return path.resolve.apply(path, args);
}

config.paths = {
  base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist),
};
console.log(config.paths);

config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env),
  },
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test',
  __COVERAGE__: !argv.watch && config.env === 'test',
  __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
};

module.exports = config;
