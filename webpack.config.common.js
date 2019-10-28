const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index.js')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].[hash].bundle.js'
  },
  optimization: {
    noEmitOnErrors: true
  },
  plugins: [
    new CopyWebpackPlugin([
      { 
        from: path.join(__dirname, './src/resources/images'),
        to: path.join(__dirname, './dist/resources/images')
      }
    ]),
    new HtmlWebpackPlugin({
      hash: true,
      inject: 'body',
      filename: path.join(__dirname, './dist/index.html'),
      template: path.join(__dirname, './src/assets/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/, 
        include: path.join(__dirname, 'src'), 
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-react"]
        }
      },
      {
        test: [/.css$|.scss$/],
        use:[
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: {loader: 'svg-inline-loader'}}
    ]
  }
};
