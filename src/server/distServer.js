/**
 * Created by Lu on 8/12/2018.
 */
const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression');
const app = require('./app');
/* eslint-disable no-console */

app.use(compression());
app.use(express.static(path.join(__dirname, '../../dist')));

console.log(11, __dirname, path.join(__dirname, '../../dist'));
app.get('*', function(req, res){
  console.log(path.join(__dirname, '../../dist/index.html'));
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

const port = process.env.PORT || '3000';
const server = http.createServer(app);

server.listen(port, function(err){
  if(err){
    console.log(err);
  }
});
