import webpack from 'webpack';
import path from 'path';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const { NODE_ENV } = process.env;

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
];

const filename = `redux-thunk${NODE_ENV === 'production' ? '.min' : ''}.js`;

export default {
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },

  entry: [
    './src/index',
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    library: 'ReduxThunk',
    libraryTarget: 'umd',
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  plugins,
};
