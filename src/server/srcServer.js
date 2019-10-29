const open = require('open');
const http = require('http');
const path = require('path');
const app = require('./app');

/* eslint-disable no-console */

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../index.html'));
});

const port = process.env.PORT || '3000';
const server = http.createServer(app);

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started on ${port}`);
    open(`http://localhost:${port}`);
  }
});
