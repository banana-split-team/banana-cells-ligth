'use strict';

var env = (process.env.NODE_ENV || 'development');
var isDevEnv = env === 'development' || env === 'test';

module.exports = {

  livereload: process.env.LIVE_RELOAD,
  isDevEnv: isDevEnv,
  indexFile: require.resolve(isDevEnv ?
    '../client/index.html' : '../client/build/es5-bundled/index.html'),
};
