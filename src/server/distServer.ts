import express from 'express';
import path from 'path';
import http from 'http';
import compression from 'compression';
import app from './app';
import db from './db/mongoose';

app.use(compression());
app.use(express.static(path.join(__dirname, '../../dist')));
app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

db.connectToDb(false)
.then(() => {
  console.log('mongodb is connected!');
  server.listen(port, () => {
    console.log(`violin helper listening at ${port}`)
  });
})
.catch(err => {
  console.log(err);
});
