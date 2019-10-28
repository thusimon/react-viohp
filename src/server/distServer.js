/**
 * Created by Lu on 8/12/2018.
 */
const express = require('express');
const path = require('path');
const compression = require('compression');

/* eslint-disable no-console */

const port = process.env.PORT || '3000';
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err){
  if(err){
    console.log(err);
  }
});
