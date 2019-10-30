/*eslint-disable no-console */
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.prod');

console.log('Generating minified bundle for production via webpack, please wait...');

webpack(webpackConfig).run((err, stats) => {
  if (err){
    console.log(err);
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors){
    return jsonStats.errors.map(err=>console.log(err));
  }
  if (jsonStats.hasWarnings){
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning=>console.log(warning));
  }
  console.log(`Webpack stats: ${stats}`);
  console.log('Your app has been compiled in production mode and written to dist');
  return 0;
});
