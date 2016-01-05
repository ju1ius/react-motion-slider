var path = require('path')
var webpack = require('webpack')
var TARGET = process.env.TARGET || null

var config = {
  entry: {
    index: './src/react-motion-slider.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-motion-slider.js',
    sourceMapFilename: 'react-motion-slider.sourcemap.js',
    library: 'Slider',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015-loose', 'stage-1']
        }
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-motion': 'ReactMotion'
  }
}

if(TARGET === 'minify') {
  config.output.filename = 'react-motion-slider.min.js'
  config.output.sourceMapFilename = 'react-motion-slider.min.js'
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'Spring', 'Slider']
    }
  }))
}

module.exports = config

