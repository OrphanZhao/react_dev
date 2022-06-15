import React from "react";
import classNames from "classnames";
import logoImg from "../../../public/images/logo-512x512.png";
import s from "./index.less";

export default ({ className }) => (
  <div className={className}>
    <img className={classNames(s["img"])} src={logoImg} alt="logo" />
  </div>
);
