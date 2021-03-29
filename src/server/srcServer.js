const express = require('express');
const http = require('http');
const path = require('path');
const app = require('./app');
const {createWebSocket} = require('./websockets/websockets');
const db = require('./db/mongoose');

app.use(express.static(path.join(__dirname, '../../dist')));

db.connectToDb(false)
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
