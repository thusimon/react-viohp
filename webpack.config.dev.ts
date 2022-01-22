import { HotModuleReplacementPlugin, webpack } from 'webpack';
import webpackCommonConfig from './webpack.config.common';

const webpackDevConfig =  Object.assign({}, webpackCommonConfig, {
  mode: 'development',
  devtool: 'inline-source-map'
});

const configPlugins: Array<object> = webpackDevConfig.plugins;
configPlugins.push(new HotModuleReplacementPlugin());

export default webpackDevConfig;
