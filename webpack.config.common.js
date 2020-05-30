const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index.tsx')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  optimization: {
    noEmitOnErrors: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.join(__dirname, './src/resources/images'),
          to: path.join(__dirname, './dist/resources/images')
        }
      ],
    }),
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
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
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
  },
  resolve: {
    extensions: ['.js', '.jsx', ".ts", ".tsx"],
  }
};
