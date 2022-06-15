import React from "react";
import model from "./model";
import { observer } from "mobx-react-lite";
import { toJS, runInAction } from "mobx";
import ComA from "./Components/ComA";
import ComB from "./Components/ComB";
import classNames from "classnames";
import s from "./index.less";

export default observer(function () {
  const { list } = model;
  React.useEffect(() => {
    model.getList().then((res) => {
      runInAction(() => {
        model.list = res.data.data;
        model.count = res.data.count;
      });
    });
  }, []);
  return (
    <div>
      formily
      <div
        className={classNames(s["tr"], {
          [s["h"]]: toJS(list).length > 0,
        })}
      >
        {toJS(list).map((v) => (
          <div key={`${v.name}-${v.age}`}>
            <span>{v.name}：</span>
            <span>{v.age}</span>
          </div>
        ))}
      </div>
      <ComA />
      <ComB />
    </div>
  );
});
