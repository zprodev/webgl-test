const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve('src', 'index.js')
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              'targets': {
                'node': 'current',
                'browsers': 'last 2 versions'
              }
            }]
          ]
        }
      },
      {
        test: /\.(frag|vert)$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('src'),
      'node_modules'
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: 8000,
    open: true,
    contentBase: path.resolve('dist'),
    watchContentBase: true
  }
};
