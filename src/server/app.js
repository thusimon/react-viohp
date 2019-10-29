const webpack = require('webpack');
const config = require('../../webpack.config.dev');
const express = require('express');
const app = express();
const userRouter = require('./routers/user');

// connect db
require('./db/mongoose');

app.use(express.json());

// use routers
app.use(userRouter);

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));


app.use(require('webpack-hot-middleware')(compiler));

module.exports = app;
