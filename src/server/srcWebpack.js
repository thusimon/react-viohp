const webpack = require('webpack');
const webConfig = require('../../webpack.config.dev');
const workletConfig = require('../../webpack.config.worklets');
const {webpackBuildResult} = require('../../tools/utils')

const compilerWeb = webpack(webConfig);
const compilerWorklet = webpack(workletConfig);

Promise.all([
  webpackBuildResult(compilerWeb, 'web app'),
  webpackBuildResult(compilerWorklet, 'web worker')
]);
