const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].[hash].js',
    publicPath: '',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/scripts/vendor/tweakpane.js', to: 'tweakpane.js' },
        { from: './src/scripts/vendor/three.r124.min.js', to: 'three.r124.min.js' },
        { from: './src/scripts/vendor/cannon.js', to: 'cannon.js' },
        { from: './src/scripts/vendor/debugger.js', to: 'debugger.js' },
        { from: './src/scripts/vendor/transform.js', to: 'transform.js' },
        { from: './src/scripts/vendor/OrbitControls.js', to: 'OrbitControls.js' },
        { from: './src/scripts/vendor/gsap.3.6.0.min.js', to: 'gsap.3.6.0.min.js' },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ]
};
