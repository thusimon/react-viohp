/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production via webpack, please wait...');

webpack(webpackConfig).run((err, stats) => {
  if (err){
    console.log(err);
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors){
    return jsonStats.errors.map(error=>console.log(err));
  }
  if (jsonStats.hasWarnings){
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning=>console.log(warning));
  }
  console.log(`Webpack stats: ${stats}`);
  console.log('Your app has been compiled in production mode and written to dist');
  return 0;
});
