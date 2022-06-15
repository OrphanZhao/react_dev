const axios = require("axios");
const path = require("path");
const webpack = require("webpack");
const express = require("express");
const config = require("./webpack.config");
const history = require("connect-history-api-fallback");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

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

/**
 * `proxy`
 */
axios.defaults.baseURL = " http://82.156.172.89:3000";
app.all("*", async (req, res) => {
  const { url, method } = req;
  axios[method.toLowerCase()](url)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, function () {
  console.log(`devServer: http://localhost:${port}`);
});
