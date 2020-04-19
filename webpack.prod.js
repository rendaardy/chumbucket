const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, "node_modules/")],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "minify"],
            },
          },
        ],
      },
    ],
  },
});
