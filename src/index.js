import React from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/antd.less";
import "./index.less";
import App from "./page/App";

createRoot(document.getElementById("app")).render(<App />);

const port = 3000;
