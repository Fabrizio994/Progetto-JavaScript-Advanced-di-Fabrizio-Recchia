const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Applicazione webpack",
      template: "./src/index.html",
    }),
  ],
  devServer: {
    port: 5000,
    open: true,
    static: path.resolve(__dirname, "dist"),
  },
  mode: "production",
};
