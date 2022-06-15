import React from "react";
import classNames from "classnames";
import s from "./index.less";

export default () => (
  <div className={classNames(s["common-con"], s["con"])}>
    <span className={classNames(s["text"])}>Home</span>
  </div>
);
