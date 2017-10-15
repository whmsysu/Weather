var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: `../weather-build`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      },
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CopyWebpackPlugin(
    [{
      from: './*.html',
      to: `../weather-build`
    },
    {
      from: './style',
      to: `../weather-build/style`
    }])
  ]
};
