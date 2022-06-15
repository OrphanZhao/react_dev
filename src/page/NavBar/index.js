import React from "react";
import classNames from "classnames";
import Logo from "../Logo";
import Menus from "../Menus";
import Login from "../Login";
import s from "./index.less";

export default () => {
  return (
    <div className={classNames(s["con"])}>
      <Logo className={classNames(s["logo-con"], s["bb"])} />
      <Menus className={classNames(s["menu-con"])} />
      <Login className={classNames(s["login-con"], s["bb"])} />
    </div>
  );
};
