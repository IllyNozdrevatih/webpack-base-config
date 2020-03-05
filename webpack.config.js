const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, 
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          }, 
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }    
    ]
  },
  devServer: {
    overlay: true,
    contentBase: path.join(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  //   new BrowserSyncPlugin({
  //     // browse to http://localhost:3000/ during development,
  //     // ./public directory is being served
  //     host: 'localhost',
  //     port: 3000,
  //     files: './dist/*.html',
  //     server: { baseDir: 'dist', index: "index.html" }
  //   })
  ]
};