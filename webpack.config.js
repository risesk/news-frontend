const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/index.js',
    about: './src/about/about.js',
    saved: './src/saved-articles/saved-articles.js',
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
        (isDev ? 'style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options:
            {
              publicPath: '../',
            },
        }),
        'css-loader',
        'postcss-loader',
      ],
    },
    {
      test: /\.(png|jpe?g|gif|ico|svg)$/,
      use: [
        isDev ? 'file-loader?name=./images/[name].[ext]' : 'file-loader?name=images/[name].[ext]',
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
        template: './src/index.html',
        filename: 'index.html',
      },
    ),
    new HtmlWebpackPlugin(
      {
        inject: false,
        template: './src/saved-articles/saved.html',
        filename: './saved/index.html',
      },
    ),
    new HtmlWebpackPlugin(
      {
        inject: false,
        template: './src/about/about.html',
        filename: './about/index.html',
      },
    ),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
