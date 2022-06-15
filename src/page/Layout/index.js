import React from "react";
import classNames from "classnames";
import s from "./index.less";

/**
 * 基础的容器布局
 */
export default ({ navBar, tab, content }) => {
  return (
    <div className={classNames(s["con"])}>
      {navBar}
      <div className={classNames(s["content"])}>
        <div className={classNames(s["tab-con"])}>{tab}</div>
        <div className={classNames(s["route"])}>{content}</div>
      </div>
    </div>
  );
};
