const express = require('express');
const app = express();
const userRouter = require('./routers/user');

// connect db
require('./db/mongoose');

app.use(express.json());

// use routers
app.use(userRouter);

module.exports = app;
