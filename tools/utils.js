const webpackBuildResult = (compiler, name) => {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err){
        console.log(err);
        compiler.close((_) => {});
        reject(err);
      }
      const jsonStats = stats.toJson();
      if (jsonStats.hasErrors){
        return jsonStats.errors.map(err=>console.log(err));
      }
      if (jsonStats.hasWarnings){
        console.log(`Webpack ${name} generated the following warnings: `);
        jsonStats.warnings.map(warning=>console.log(warning));
      }
      console.log(`Webpack ${name} stats: ${stats}`);
      console.log(`${name} has been compiled and written to dist`);
      compiler.close((_) => {});
      resolve();
    });
  });
}

module.exports = {
  webpackBuildResult
}