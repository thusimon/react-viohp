import TerserPlugin from 'terser-webpack-plugin';
import webpackCommonConfig from './webpack.config.common';

const webpackProdConfig =  Object.assign({}, webpackCommonConfig, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
});

export default webpackProdConfig;
