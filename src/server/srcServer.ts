import express from 'express';
import http from 'http';
import path from 'path';
import app from './app';
//import { createWebSocket } from './websockets/websockets';
import db from './db/mongoose';

app.use(express.static(path.join(__dirname, '../../dist')));

db.connectToDb(false)
.then(() => {
  app.get('*', function(req, res) {
    return res.sendFile(path.join( __dirname, '../../dist/index.html'));
  });
  
  const port = process.env.PORT || '3000';
  // const server = http.createServer(app);

  // server.listen(port, function(err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(`server started on ${port}`);
  //   }
  // });

  app.listen(port, () => {
    console.log(`violin helper listening at ${port}`)
  })

  //createWebSocket(server);
})
.catch(err => {
  console.log(err);
});
