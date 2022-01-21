const { HotModuleReplacementPlugin } = require('webpack');
const webpackCommonConfig = require('./webpack.config.common');

const webpackDevConfig =  Object.assign(webpackCommonConfig, {
  mode: 'development',
  devtool: 'inline-source-map'
});

webpackDevConfig.plugins.push(new HotModuleReplacementPlugin());

module.exports = webpackDevConfig;
