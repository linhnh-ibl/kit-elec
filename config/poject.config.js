/*
* @Author: ibl
* @Date:   2017-08-10 17:44:55
* @Last Modified by:   ibl
* @Last Modified time: 2017-08-10 18:04:17
*/

'use strict';

const path = require('path');
const argv = require('yargs').argv;

const config = {
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src/app',
  dir_dist: 'dist',
  dir_public: 'public',
};

console.log(config.path_base);

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
  client: base.bind(null, config.dir_client)
};
console.log(config.paths);

module.exports = config;
