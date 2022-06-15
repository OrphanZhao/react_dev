import React from "react";
import { Tabs, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { MenuModel } from "../../model";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

export default observer(() => {
  const { panes, current, changeCurrent, currentEffect } = MenuModel;
  let navigate = useNavigate();

  return (
    <Tabs
      type="card"
      onTabClick={(key) => {
        if (!key) return;
        if (key === current) return;
        changeCurrent(key);
        navigate(key);
      }}
      activeKey={current}
    >
      {panes.map((pane) => (
        <TabPane
          tab={
            <Space>
              <span>{pane.label}</span>
              <span>
                {pane.closable && (
                  <CloseOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!pane.key) return;
                      currentEffect("REMOVE", pane);
                      navigate(panes.at(-1).key);
                    }}
                  />
                )}
              </span>
            </Space>
          }
          key={pane.key}
        />
      ))}
    </Tabs>
  );
});
