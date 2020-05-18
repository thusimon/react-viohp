//const webpack = require('webpack');
const http = require('http');
//const path = require('path');
const app = require('./app');
//const config = require('../../webpack.config.dev');

/* eslint-disable no-console */
//const compiler = webpack(config);

/*
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));


app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  return res.sendFile(path.join( __dirname, '../index.html'));
});
*/

const port = process.env.PORT || '3000';
const server = http.createServer(app);

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started on ${port}`);
  }
});
