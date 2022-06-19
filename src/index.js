import React from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/antd.less";
import "./index.less";
import App from "./page/App";
import { store } from "./store";
import { Provider } from "react-redux";

// @ts-ignore
createRoot(document.getElementById("app")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
