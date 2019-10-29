const path = require('path');
const webpack = require('webpack');
const webpackCommonConfig = require('./webpack.config.common');


const webpackConfig =  Object.assign(webpackCommonConfig, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    publicPath: path.resolve(__dirname, './dist'),
    noInfo: false,
    hot: true
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
});

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = webpackConfig;
