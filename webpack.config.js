const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MODE = process.env.NODE_ENV || "development";
console.log('Environment NODE_ENV: ', process.env.NODE_ENV)
console.log('Setting webpack mode: ', MODE)

module.exports = {
  entry: './src/public/infernode/index.tsx',
  mode: MODE,

  output: {
    path: path.resolve(__dirname, './dist/assets/'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.resolve(__dirname, './src/assets/index.html'),
      inject: false,
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './assets/'),
    },
    compress: true,
    port: 8080,
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },

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
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
};