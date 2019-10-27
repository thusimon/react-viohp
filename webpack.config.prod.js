/**
 * Created by Lu on 8/12/2018.
 */
const webpackCommonConfig = require('./webpack.config.common');

module.exports = Object.assign(webpackCommonConfig, {
  mode: "production",
  devtool: 'source-map',
});
