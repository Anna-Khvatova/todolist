const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/index.tsx"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      inject: true
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    client: {
      overlay: false
    }
  },
};