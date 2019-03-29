const webpack = require('webpack')
const path = require('path')

const autoprefixer = require('autoprefixer')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isProdBuild = process.argv.includes('-p')

// const hashname = '[name]-[hash].'
const hashname = '[name].'

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          plugins: [
            'syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties'
          ],
          presets: [
            ['@babel/preset-env', { modules: false }],
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './'
            }
          },
          // { /// do not use with MiniCssExtractPlugin
          //  loader: 'style-loader'
          // },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            }
          },
          /// do not use resolve-url-loader with MiniCssExtractPlugin
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [
                // precss, /// does not work with @import
                autoprefixer
              ]
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/' + hashname + '[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/' + hashname + '[ext]'
            }
          }
        ]
      }
    ]
  },

  devtool: isProdBuild ? 'none' : 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: hashname + 'css'
    })
  ],

  entry: {
    app: './src/app'
  },

  output: {
    filename: hashname + 'js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },

  mode: 'development',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/](?!lodash)/,
          name: 'vendors',
          chunks: 'all'
        }
      },
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
}
