const baseWebpackConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const customerConfig = require('../config/dev.env')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// module.exports = merge(baseWebpackConfig, {
const devConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',

  module: {
    rules: [
      /*            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader?modules&localIdentName=[name]-[hash:base64:5]', 'postcss-loader', 'sass-loader']
            }, */

      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: false
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        exclude: [/node_modules/],
        use: ['style-loader','css-loader', 'postcss-loader', 'sass-loader']
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    /*        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }), */
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new ExtractTextPlugin({
      filename: 'static/css/style.[contenthash].css'
    })
  ],
  devServer: {
    /*        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {from: /.*!/, to: 'index.html'},
            ],
        },
        // contentBase:'dist',
        contentBase:false,
        hot: true, */
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
})

module.exports = merge(devConfig, customerConfig)
