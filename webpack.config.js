const path = require('path');

const webpack = require('webpack');
const sourcePath = path.resolve(__dirname) + '/';
const buildPath = path.resolve(__dirname, 'public');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcMapPlugin = new webpack.NormalModuleReplacementPlugin(/^\/src/, function (file) {
  file.request = path.resolve(file.request.replace(/^\/src/, './src'));
});

const config = {
  entry: [path.join(__dirname, '/src/app/index.js')],
  resolve: {
    //When require, do not have to add these extensions to file's name
    extensions: ['.js', '.jsx', '.png'],
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  //Render source-map file for final build
  devtool: 'source-map',
  //output config
  output: {
    path: buildPath,    //Path of output file
    filename: 'js/bundle.js'  //Name of output file
  },
  plugins: [
    //Set node env to production to build with faster React
    new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
    }),
    //Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
    // Enabling absolute paths
    srcMapPlugin,
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoEmitOnErrorsPlugin(),
    // ves files
    new TransferWebpackPlugin([
      { from: 'www' },
    ], path.resolve(__dirname, 'src')),
    // Copy files to build output for AWS
    new CopyWebpackPlugin([
      { from: sourcePath + 'app.js', to: buildPath + '/app.js' },
      { from: sourcePath + '.ebextensions/*', to: buildPath + '/', toType: 'dir' },
      { from: sourcePath + 'package.json', to: buildPath + '/package.json' }
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //All .js and .jsx files
        loaders: ['babel-loader'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      {
        test  : /\.css$/,
          use: [
              {
                  loader: 'style-loader'
              },
              {
                  loader: 'css-loader',
                  options: {
                      modules: true,
                      localIdentName: '[name]__[local]'
                  }
              }
          ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
      }
    ]
  },
};

module.exports = config;
