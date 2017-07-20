const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  entry: './src/index.js',
  module: {
    loaders: [
      {
        loader: 'webpack-glsl-loader',
        test: /\.glsl$/,
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin([{from: 'src/index.html'}]),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}
