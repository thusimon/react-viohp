import express from 'express';
import path from 'path';
import http from 'http';
import app from './app';
import { createWebSocket } from './websockets/websockets';
import db from './db/mongoose';

app.use(express.static(path.join(__dirname, '../../dist')));
app.get('*', (req, res) => {
  return res.sendFile(path.join( __dirname, '../../dist/index.html'));
});

const port = process.env.PORT || '3000';
const server = http.createServer(app);

db.connectToDb(false)
.then(() => {
  console.log('mongodb is connected!');
  server.listen(port, () => {
    console.log(`violin helper listening at ${port}`)
  });

  createWebSocket(server);
})
.catch(err => {
  console.log(err);
});
