const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src/public/infernode/'),

  entry: {
    app: './index.tsx',
  },

  output: {
    path: path.resolve(__dirname, './dist/assets/'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, './src/assets/index.html'),
      inject: false,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      // {
      //   test: /\.(jpg|jpeg|png|gif|mp3)$/,
      //   // use: ["file-loader"],
      // },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
},
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
};