const path = require("path");
const Dotenv = require("dotenv-webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV !== "production";
  const envPath = isDevelopment
    ? path.resolve(__dirname, ".env.development")
    : path.resolve(__dirname, ".env.production");

  return {
    entry: "./src/index.tsx", // 애플리케이션의 진입점. 번들링 시 가장 먼저 시작하는 파일

    // 번들링 결과물
    output: {
      filename: "bundle.js", // 파일 이름
      path: path.resolve(__dirname, "dist"), // 빌드된 파일이 저장되는 경로
      publicPath: "/", // 브라우저에서 빌드된 프론트엔드 파일에 접근하는 url경로
      clean: true, // 빌드 시, 이전 빌드 파일을 삭제함. 불필요한 파일이 누적되는 걸 방지
    },

    // 모듈의 경로나 파일 타입을 해석하는 방식을 결정
    // import나 require로 모듈 삽입 시, 경로를 정의하는 방식
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"], // 확장자가 생략된 경우 가져올 모듈의 파일 확장자 지정
      // extensions: [".js", ".jsx"],
      modules: ["src", "node_modules"], // 모듈을 찾을 때 참조할 디렉토리의 목록을 정의. 자동으로 절대경로로 src와 node_modules부터 사용가능함

      // 특정 경로에 대한 절대경로를 별칭으로 설정
      // ex: import publicImage1 from @public/image/publicImage1.png;
      alias: {
        "@src": path.resolve(__dirname, "src"),
        "@public": path.resolve(__dirname, "public"),
        "@asset": path.resolve(__dirname, "src", "asset"),
      },
    },
    // 개발용 로컬 서버
    devServer: {
      port: 3000, // 포트번호
      hot: true, // hmr 기능 활성화
      static: [
        {
          directory: path.join(__dirname, "public"),
          publicPath: "/public",
        },
      ],
    },

    // eval-source-map: 번들 파일 내에 소스맵이 포함. 디버깅 시 원본 소스에 가까운 코드를 제공하나 무거우므로 성능이 느림 => 개발에 적합
    // source-map: 디버깅 시 번들 파일과 별도의 소스 맵을 제공함. eval-source-map보다 원본이 변형되었으나 성능이 빠름 => 배포에 적합
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    // optimization: {
    //   splitChunks: {
    //     chunks: "all", // 모든 청크에서 공통 모듈 추출
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/, // .ts, .tsx, .js, .jsx 확장자에 대해
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader", // TypeScript 로더
              options: {
                transpileOnly: true, // 타입 검사만 하기. 컴파일 검사를 하지 않음
              },
            },
            {
              loader: "babel-loader", // JavaScript 변환을 위한 Babel 로더
            },
          ],
        },
        {
          test: /\.(css|s[ac]ss)$/i, // .scss 및 .sass 파일을 처리
          use: [
            "style-loader", // DOM에 스타일 추가
            "css-loader", // CSS를 모듈로 변환
            "sass-loader", // Sass 파일을 CSS로 변환
          ],
        },
        {
          test: /\.svg$/, // .svg 확장자를 가진 파일에 대해 설정을 적용

          //  확장자 패턴에 대해 복수의 로더 중 하나만 적용하는 분기처리 옵션
          oneOf: [
            {
              use: ["@svgr/webpack"], // @svgr/webpack 로더를 사용하여 SVG를 React 컴포넌트로 변환 - svg 태그로 삽입
              issuer: /\.[jt]sx?$/, // JavaScript 또는 TypeScript 파일(.js, .jsx, .ts, .tsx) 안에서만 이 설정을 적용. svg의 동적 스타일링을 위함
              resourceQuery: { not: [/url/] }, // 모듈 경로에서 url이 포함되어 있을 시, 모듈 적용 x
            },
            {
              // img.src 태그로 삽입하기 위해 svg 파일 모듈을 url로 변환
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]", // 파일 경로와 이름을 그대로 유지
              },
              resourceQuery: /url/, // *.svg?url.
            },
          ],
        },
        // 만약 svg 확장자를 분기처리 없이 리엑트 컴포넌트로만 다룰 경우, 아래 설정 사용
        // {
        //   test: /\.svg$/i,
        //   issuer: /\.[jt]sx?$/,
        //   use: ["@svgr/webpack"],
        // },
        {
          test: /\.(png|jpe?g|gif|ico)$/i, // 이미지 파일 확장자 처리
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]", // 파일 경로와 이름을 그대로 유지
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Dotenv({ path: envPath }),
      new CopyWebpackPlugin({ patterns: [{ from: "public", to: "public" }] }),
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
    ],
  };
};
