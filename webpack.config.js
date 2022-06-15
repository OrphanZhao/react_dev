const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/**
 * 文件夹
 */
let dir = `cst`;

/**
 * 开发 or 生产
 * node.js 环境变量
 */
let mode =
  process.env.NODE_ENV === "development" ? "development" : "production";
let plugins = [
  new webpack.DefinePlugin({
    REACT_ENV: JSON.stringify(process.env.NODE_ENV),
  }),
  new HtmlWebpackPlugin({
    template: "./public/index.html",
    title: "Development",
  }),
  new HappyPack({
    loaders: ["babel-loader"],
  }),
  new webpack.HotModuleReplacementPlugin(),
];
/**
 * 生产环境 `样式文件` 抽离
 */
if (mode === "production") {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: `${dir}/css/[name].[contenthash].css`,
      chunkFilename: `${dir}/css/[name].[contenthash].css`,
    })
  );
}
/**
 * 生产添加 `build chunk` 📦 打包分析
 */
if (process.env.NODE_ENV === "analyzer") {
  plugins.push(new BundleAnalyzerPlugin());
}
/**
 * 添加构建进度提示
 */
plugins.push(new WebpackBar());
/**
 * 开发添加报错文件位置定位
 */
let devtool = process.env.NODE_ENV === "development" ? "source-map" : false;

const config = {
  mode,
  devtool,
  target: "web",
  entry:
    mode === "development"
      ? [
          "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr",
          path.resolve(__dirname, "./src/index.js"),
        ]
      : path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: `${dir}/js/[name].[contenthash].js`,
    chunkFilename: `${dir}/js/[name].[contenthash].js`,
    clean: true,
    publicPath: "/", // 防止二级路由不匹配404
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components)/,
        use: ["happypack/loader"],
      },
      // 全局样式
      {
        test: /\.(less|css)$/,
        include: [
          path.resolve(__dirname, "src/index.less"),
          path.resolve(__dirname, "node_modules"),
        ],
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
              modules: false,
              importLoaders: 1,
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // 模块化样式
      {
        test: /\.(less|css)$/,
        exclude: [
          path.resolve(__dirname, "src/index.less"),
          path.resolve(__dirname, "node_modules"),
        ],
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
              modules: true,
              importLoaders: 1,
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)/,
        type: "asset/resource",
        generator: {
          filename: `${dir}/public/images/[name].[contenthash][ext]`,
        },
      },
    ],
  },
  plugins,
  resolve: {
    extensions: [".js", ".jsx", ".css", ".less"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@@": path.resolve(__dirname),
    },
  },
};

/**
 * 优化
 * `libarry` 代码基本保持不变
 * 删除打印
 */
if (mode === "production") {
  config.optimization = {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  };
}

module.exports = config;
