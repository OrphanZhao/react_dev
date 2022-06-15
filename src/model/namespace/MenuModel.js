import React from "react";
import { makeAutoObservable, observable, computed } from "mobx";
import { HomeOutlined, Html5Outlined, GlobalOutlined } from "@ant-design/icons";
let initPanes = { label: "首页", key: "/home" };

/**
 * 深层对象比较用默认deep
 * 浅层用shadow
 * 数组直接 shdow ref
 */
class MenuModel {
  constructor() {
    this.menuList = [
      {
        ...initPanes,
        label: "首页",
        key: "/home",
        icon: <HomeOutlined />,
      },
      {
        label: "hooks",
        key: "/hooks",
        icon: <Html5Outlined />,
      },
      {
        label: "mobx",
        key: "/mobx",
        icon: <GlobalOutlined />,
      },
    ];
    this.panes = [];
    this.current = "";
    makeAutoObservable(
      this,
      {
        menuList: observable.shallow,
        panes: observable.ref,
        getFlatMenuList: computed,
      },
      {
        autoBind: true,
      }
    );
  }

  get getFlatMenuList() {
    const recursion = (pre = [], cur) => {
      let arr = cur || [];
      pre.forEach((v) => {
        if (Array.isArray(v.children)) {
          recursion(v.children, arr);
        } else {
          arr.push({
            label: v.label,
            key: v.key,
          });
        }
      });
      return arr;
    };
    return recursion(this.menuList);
  }

  currentEffect(type = "NORMAL", v) {
    if (!v) return;
    let index = this.panes.findIndex((k) => k.key === v.key);
    let strategy = {
      ADD: () => {
        if (this.panes.length === 0) {
          this.panes.push({
            ...initPanes,
          });
        }
        v.key !== initPanes["key"] &&
          this.panes.push({
            closable: v.key !== initPanes["key"],
            ...v,
          });
        this.changeCurrent(v.key);
      },
      REMOVE: () => {
        this.panes.splice(index, 1);
        this.changeCurrent(this.panes.at(-1).key);
      },
      NORMAL: () => {
        if (index === -1) {
          strategy["ADD"]();
        } else {
          this.changeCurrent(v.key);
        }
      },
    };
    strategy[type]();
  }

  changeMenuList(v) {
    Array.isArray(v) && (this.menuList = v);
  }

  changeCurrent(v) {
    typeof v === "string" && (this.current = v);
  }

  changePanes(v) {
    Array.isArray(v) && (this.panes = v);
  }
}

export default new MenuModel();
