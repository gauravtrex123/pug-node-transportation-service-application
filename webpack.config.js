const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './public/javascripts/custom.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						}
					}
				]
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					'css-loader'
				],
			},
			{
				test: /\.(png|svg|jpe?g|gif)(\?[a-z0-9=.]+)?$/,
				use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/',
							publicPath: 'images/'
						  }
					}
				]
			},
			{
				test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/',
						publicPath: 'fonts/',
					}
				}]
			},
			{
				test: /\.pug$/,
				include: path.join(__dirname, 'public'),
				use: ['pug-loader']
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: isProd ? '[name].[hash].css' : '[name].css',
			chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
		}),
		new HtmlWebpackPlugin({
			template: './views/layout.pug',
			filename: 'layout.pug'
		}),
		new HtmlWebpackPugPlugin(),
		new CleanWebpackPlugin()
	]
};