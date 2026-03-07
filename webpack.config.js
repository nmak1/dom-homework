const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    'gnom-game': './packages/gnom-game/src/index.js',
    'movie-table-data': './packages/movie-table-data/src/index.js',
    'movie-table-memory': './packages/movie-table-memory/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.json$/,
        type: 'json'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './packages/gnom-game/src/index.html',
      filename: 'gnom-game/index.html',
      chunks: ['gnom-game']
    }),
    new HtmlWebpackPlugin({
      template: './packages/movie-table-data/src/index.html',
      filename: 'movie-table-data/index.html',
      chunks: ['movie-table-data']
    }),
    new HtmlWebpackPlugin({
      template: './packages/movie-table-memory/src/index.html',
      filename: 'movie-table-memory/index.html',
      chunks: ['movie-table-memory']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'packages/gnom-game/src/img', to: 'images/gnom-game', noErrorOnMissing: true },
        { from: 'packages/movie-table-data/src/data', to: 'data', noErrorOnMissing: true },
        { from: 'packages/movie-table-memory/src/data', to: 'data', noErrorOnMissing: true }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 8081,
    open: true,
    hot: true,
    historyApiFallback: true
  }
};