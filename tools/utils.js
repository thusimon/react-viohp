const webpackBuildResult = (compiler) => {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err){
        console.log(err);
        reject(err);
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
      console.log('Your app has been compiled and written to dist');
      resolve();
    });
  });
}

module.exports = {
  webpackBuildResult
}