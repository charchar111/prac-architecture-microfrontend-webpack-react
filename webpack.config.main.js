//zeta-main의 웹팩 설정 파일 - 참고용
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;
const packageJson = require("./package.json");
const path = require("path");
const fs = require("fs");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const webpack = require("webpack");

module.exports = (_, argv) => {
  const envFilePath =
    argv.mode === "production" ? "./.env.production" : "./.env.local";

  return {
    output: {
      publicPath: "http://localhost:9000/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      // alias: {
      //   mainComponents: path.resolve(__dirname, "./src/components"), // mainComponents라능 이름으로 폴더 공유
      // },
    },

    entry: {
      app: "./src/index.ts",
    },
    devServer: {
      port: 9000,
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk: true,
      },
      hot: true, // HMR 활성화
      liveReload: false, // 무한 새로고침 방지
      headers: {
        "Access-Control-Allow-Origin": "*", // CORS 설정 추가
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: ["file-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/fonts/[name].[hash].[ext]",
                // publicPath: "/", // 서버에서 폰트 파일을 찾는 경로
                outputPath: "assets/fonts/", // 빌드된 폰트 파일의 경로
                publicPath: "/assets/fonts/", // HTML에서 폰트 파일을 참조하는 경로
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "main",
        filename: "main.js",
        exposes: {},
        shared: {
          // ...packageJson.dependencies,
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: deps["react-router-dom"],
          },
          "@emotion/react": {
            singleton: true,
            requiredVersion: deps["@emotion/react"],
          },
          "@emotion/styled": {
            singleton: true,
            requiredVersion: deps["@emotion/styled"],
          },
          "@mui/material": {
            singleton: true,
            requiredVersion: deps["@mui/material"],
          },
          "styled-components": {
            singleton: true,
            requiredVersion: deps["styled-components"],
          },
          ol: {
            singleton: true,
            requiredVersion: deps["ol"],
          },
          proj4: {
            singleton: true,
            requiredVersion: deps["proj4"],
          },
        },
      }),
      // hot module replacement를 위한 플러그인
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv({
        path: envFilePath,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshPlugin({
        exclude: [/node_modules/, /bootstrap\.tsx$/],
      }),
      new ReactRefreshWebpackPlugin(),
    ],
  };
};
