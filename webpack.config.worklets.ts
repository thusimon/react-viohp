import path from 'path';

export default {
  entry: {
    ['record-worklet']: path.resolve(__dirname, './src/components/audio/record-worklet')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist/worklets'),
    publicPath: '/',
    filename: '[name].js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    emitOnErrors: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts'],
  }
};
