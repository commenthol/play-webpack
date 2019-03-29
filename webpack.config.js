const webpack = require('webpack')
const path = require('path')

const autoprefixer = require('autoprefixer')
const precss = require('precss')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [precss, autoprefixer]
							}
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
						}
					}
				]
			}
		]
	},

	devtool: 'source-map',

	plugins: [
		new HtmlWebpackPlugin(),
		new CleanWebpackPlugin()
	],

	entry: {
		app: './src/app'
	},

	output: {
		filename: '[name].[chunkhash].js',
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
