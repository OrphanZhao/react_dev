const express = require("express");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const history = require("connect-history-api-fallback");
const config = require("./webpack.config");

const compiler = webpack(config);
const app = express();
const port = 3000;

app.use(history());
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, function () {
  console.log(`devServer: http://localhost:${port}`);
});
