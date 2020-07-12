const webpack = require('webpack');
const express = require('express');
const http = require('http');
const path = require('path');
const app = require('./app');
const {createWebSocket} = require('./websockets/websockets');
const db = require('./db/mongoose');
const {webpackBuildResult} = require('../../tools/utils')
const webConfig = require('../../webpack.config.dev');
const workletConfig = require('../../webpack.config.worklets');


const compilerWeb = webpack(webConfig);
const compilerWorklet = webpack(workletConfig);

app.use(express.static(path.join(__dirname, '../../dist')));

webpackBuildResult(compilerWeb)
.then(() => {
  return webpackBuildResult(compilerWorklet);
})
.then(() => {
  return db.connectToDb(false);
})
.then(() => {
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
  });

  createWebSocket(server);
})
.catch(err => {
  console.log(err);
});
