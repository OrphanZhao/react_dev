import React from "react";
import classNames from "classnames";
import s from "./index.less";

export default function () {
  return (
    <div className={classNames(s["common-con"], s["error-404"])}>
      404 not found
    </div>
  );
}
