var path = require('path')
var nodeModulesDir = path.resolve(__dirname, 'node_modules')

module.exports = {
  entry: {
    index: ['webpack/hot/dev-server', './example/index.jsx']
  },
  output: {
    path: './example',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015-loose', 'stage-1'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass?sourceMap'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './example'
  }
}
