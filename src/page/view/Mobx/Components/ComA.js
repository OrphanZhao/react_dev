import React, { useEffect } from "react";
import classNames from "classnames";
import s from "../index.less";

export default function () {
  return (
    <div>
      ComA
      <div className={classNames(s["block"])}>block</div>
    </div>
  );
}
