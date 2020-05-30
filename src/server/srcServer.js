const webpack = require('webpack');
const express = require('express');
const http = require('http');
const path = require('path');
const app = require('./app');
const db = require('./db/mongoose');
const config = require('../../webpack.config.dev');

const compiler = webpack(config);

const webpackBuildResult = new Promise((resolve, reject) => {
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
    console.log('Your app has been compiled in dev mode and written to dist');
    resolve();
  });
});

app.use(express.static(path.join(__dirname, '../../dist')));

webpackBuildResult.then(()=> {
  return db.connectToDb();
}).then(() => {
  app.get('*', function(req, res) {
    return res.sendFile(path.join( __dirname, '../../dist/index.html'));
  });
  
  
  const port = process.env.PORT || '3000';
  const server = http.createServer(app);
  
  server.listen(port, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`server started on ${port}`);
    }
  })
}).catch(err => {
  
})
/*
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));


app.use(require('webpack-hot-middleware')(compiler));
*/

