const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/scripts/index.js',
    // about: './src/about.js',
    // saved: './src/saved.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[chunkhash].js',
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: 'babel-loader' },
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: [
        (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
        'css-loader',
        'postcss-loader',
      ],
    },
    {
      test: /\.(png|jpe?g|gif|ico|svg)$/,
      use: [
        'file-loader?name=./images/[name].[ext]',
        {
          loader: 'image-webpack-loader',
          options: { },
        },
      ],
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin(
      {
        inject: false,
        hash: true,
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      },
      // {
      //   inject: false,
      //   hash: true,
      //   template: './src/pages/about.html',
      //   filename: 'about.html',
      // },
      // {
      //   inject: false,
      //   hash: true,
      //   template: './src/pages/saved.html',
      //   filename: 'saved.html',
      // },
    ),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
