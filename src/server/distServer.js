const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression');
const app = require('./app');
const db = require('./db/mongoose');

app.use(compression());
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', function(req, res){
  return res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

db.connectToDb(false)
.then(() => {
  console.log('mongodb is connected!');
  server.listen(port, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log(`server started on ${port}`);
    }
  });
});
