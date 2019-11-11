const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const scoreRouter = require('./routers/score');
// connect db
require('./db/mongoose');

app.use(express.json());

// use routers
app.use(userRouter);
app.use(scoreRouter);

module.exports = app;
