const webpack = require('webpack');

const path = require('path');

const TransferWebpackPlugin = require('transfer-webpack-plugin');

const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const srcMapPlugin = new webpack.NormalModuleReplacementPlugin(/^\/src/, function (file) {
  file.request = path.resolve(file.request.replace(/^\/src/, './src'));
});

const config = {
  // Entry points to the project
  entry: [
    path.join(__dirname, '/src/app/index.js'),
  ],
  // Config options on how to interpret requires imports
  resolve: {
    extensions: ['.js', '.jsx', '.png'],
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  // Server Configuration options
  devServer: {
    contentBase: 'src/www',  // Relative directory for base of server
    hot: true,        // Live-reload
    historyApiFallback: true,
    inline: true,
    port: 8085,        // Port Number
  },
  output: {
    path: buildPath,    // Path of output file
    filename: 'js/bundle.js',
  },
  plugins: [
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
  ],
  module: {
    // Loaders to interpret non-vanilla javascript code as well as most other
    // extensions including images and text.
    /* preLoaders: [
      {
        // Eslint loader
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, 'src/app')],
        exclude: [nodeModulesPath],
      },
    ], */
    loaders: [
      {
        // React-hot loader and
        test: /\.(js|jsx)$/,  // All .js and .jsx files
        loaders: ['babel-loader?presets[]=react'],
        exclude: [nodeModulesPath],
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
      },
    ],
  },
};
module.exports = config;
