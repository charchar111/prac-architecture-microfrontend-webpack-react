const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV !== "production";

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devServer: {
      port: 3000,
      hot: true,
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/, // .ts 또는 .tsx 확장자에 대해
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader", // Babel 로더를 먼저 사용
            },
            {
              loader: "ts-loader", // TypeScript 로더
              options: {
                transpileOnly: true, // 타입 검사를 위해
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
    ],
  };
};
