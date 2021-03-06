const path = require('path');

module.exports = {
  entry: {
    ['record-worklet']: path.resolve(__dirname, './src/components/audio/record-worklet')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist/worklets'),
    publicPath: '/',
    filename: '[name].js'
  },
  mode: "development",
  devtool: 'inline-source-map',
  optimization: {
    noEmitOnErrors: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', ".ts", ".tsx"],
  }
};
