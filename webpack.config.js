var webpack = require('webpack');

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader?stage=0', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel-loader?stage=0', exclude: /node_modules/},
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
