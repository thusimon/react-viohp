/**
 * Created by Lu on 8/12/2018.
 */
const TerserPlugin = require('terser-webpack-plugin');
const webpackCommonConfig = require('./webpack.config.common');

module.exports = Object.assign(webpackCommonConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
});
