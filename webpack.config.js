// @ts-check
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {webpack.Configuration} */
const _export = {
  target: "web",
  context: path.resolve(__dirname, "src"),
  entry: {
    app: [path.resolve(__dirname, "src/components", "index.tsx")],
  },
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js.?|tsx|ts)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },

      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]",
              },
            },
          },
        ],
      },

      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)?$/,
        use: "url-loader?name=externals/[name]-[hash].[ext]",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".yaml"],
    modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")],
    alias: {
      ReactDOM: path.resolve(__dirname, "./node_modules/react-dom/"),
    },
  },
  externals: {},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Bookmarks",
      template: path.resolve(__dirname, "dist", "template.html"),
    }),
  ],
  node: {
    fs: "empty",
  },
  devServer: {
    hot: true,
    host: "0.0.0.0",
    // publicPath: path.join(__dirname, "dist", "assets"),
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: {
      index: "index.html",
    },
  },
};

module.exports = _export;
