const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isProduction = process.env.NODE_ENV === 'production'
const useMocks = process.env.USE_MOCKS && !isProduction

const alias = {}
if (useMocks) alias['./resources/resources'] = path.resolve('./src/resources/__mocks__/resources')
if (!isProduction) alias['react-dom'] = '@hot-loader/react-dom'

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.ejs',
  }),
]
if (process.env.BUNDLE_ANALYSER) plugins.push(new BundleAnalyzerPlugin())

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['./src/index.jsx'],
  output: {
    path: path.resolve('./dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias,
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  devtool: !isProduction && 'eval-source-map',
}
