const path = require('path');
const webpack = require('webpack');
const webpackCommonConfig = require('./webpack.config.common');


const webpackConfig =  Object.assign(webpackCommonConfig, {
  mode: "development",
  devtool: 'inline-source-map'
});

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = webpackConfig;
