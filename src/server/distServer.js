/**
 * Created by Lu on 8/12/2018.
 */
const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression');
const app = require('./app');
const db = require('./db/mongoose');

app.use(compression());
app.use(express.static(path.join(__dirname, '../../dist')));


db.connectToDb(false)
.then(() => {
  app.get('*', function(req, res){
    return res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
  
  const port = process.env.PORT || 3000;
  const server = http.createServer(app);
  
  server.listen(port, function(err){
    if(err){
      console.log(err);
    }
  });
});
