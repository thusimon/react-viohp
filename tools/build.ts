/*eslint-disable no-console */
import webpack, { Configuration } from 'webpack';
import { webpackBuildResult } from './utils';
import webDevConfig from '../webpack.config.dev';
import webProdConfig from '../webpack.config.prod';
import workletConfig from '../webpack.config.worklets';

const args = process.argv.slice(2);
const mode = args[0];
const webConfig = mode === 'prod' ? webProdConfig : webDevConfig;

console.log(`Generating minified bundle for ${mode} via webpack, please wait...`);

//TODO: second webpack will clean the dist folder
const compilerWeb = webpack(webConfig as Configuration);
const compilerWorklet = webpack(workletConfig as Configuration);

Promise.all([
  webpackBuildResult(compilerWeb, 'web app'),
  webpackBuildResult(compilerWorklet, 'web worker')
])
.then(() => {
  console.log('build is done!');
});
