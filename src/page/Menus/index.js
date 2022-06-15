import React, { useEffect } from "react";
import { Menu } from "antd";
import { MenuModel } from "../../model";
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from "react-router-dom";

export default observer(({ className }) => {
  /**
   * model state
   */
  const { menuList, current, getFlatMenuList, currentEffect } = MenuModel;

  /**
   *
   * @param {string} key
   * @returns
   */
  function commonEffect(key) {
    if (!key) return;
    if (key === current) return;
    let temp = getFlatMenuList.filter((v) => v.key === key);
    currentEffect("NORMAL", ...(temp || []));
  }

  /**
   * 根据路由匹配 `menu` `tab`
   */
  let location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    commonEffect(pathname);
  }, [location]);

  /**
   * 菜单跳转相应  `route` `tab`
   */
  let navigate = useNavigate();
  const onClick = (e) => {
    typeof e.domEvent.stopPropagation === "function" &&
      e.domEvent.stopPropagation();
    commonEffect(e.key);
    navigate(e.key);
  };

  return (
    <div className={className}>
      <Menu
        onClick={onClick}
        selectedKeys={current ? [current] : []}
        mode="horizontal"
        items={menuList}
      />
    </div>
  );
});
