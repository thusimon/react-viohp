const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const scoreRouter = require('./routers/score');
const audioRouter = require('./routers/audio');
app.use(express.json());

// use routers
app.use(userRouter);
app.use(scoreRouter);
app.use(audioRouter);

module.exports = app;
