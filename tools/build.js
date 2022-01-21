/*eslint-disable no-console */
const webpack = require('webpack');
const { webpackBuildResult } = require('./utils');
const webConfig = require('../webpack.config.prod');
const workletConfig = require('../webpack.config.worklets');

console.log('Generating minified bundle for production via webpack, please wait...');

const compilerWeb = webpack(webConfig);
const compilerWorklet = webpack(workletConfig);

Promise.all([
  webpackBuildResult(compilerWeb, 'web app'),
  webpackBuildResult(compilerWorklet, 'web worker')
])
.then(() => {
  console.log('build is done!');
});
