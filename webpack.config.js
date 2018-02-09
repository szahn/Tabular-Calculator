const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve('wwwroot'),
    filename: 'index.js'
  },
  devtool:'eval-source-map',
  externals:{
    'react': 'React',
    "react-dom": 'ReactDOM',
    'redux': 'Redux'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}