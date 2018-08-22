const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
  mode,
  entry: {
    script: './src/entries/script',
    editor: './src/entries/editor',
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,

  resolve: {
    extensions: ['.ts'],
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './dist'),
  },

  plugins: [
    new CopyWebpackPlugin([{ from: './static', to: './' }]),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./dist'] },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        query: {
          silent: true,
          useCache: true,
        },
      },
    ],
  },
}
