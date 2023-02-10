const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = () => ({
  entry: path.resolve('./src/index.ts'),
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /build/],
        loader: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve('./tsconfig.json') })],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  output: {
    path: path.resolve('build'),
    filename: 'client.js',
  },
});
