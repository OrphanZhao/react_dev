import React from "react";
import { model, ModelContext } from "./model";
import ComA from "./Components/ComA";
import ComB from "./Components/ComB";
import { useSelector, useDispatch } from "react-redux";
import { changeState } from "@/store/slice/countSlice";
import nameSpace, { count as countType } from "@/store/nameSpace";
import { Button } from "antd";

export default function () {
  const Store = model();
  const { count } = useSelector((state) => state[nameSpace[countType]]);
  const dispatch = useDispatch();

  return (
    <ModelContext.Provider value={{ ...Store }}>
      {count}
      <div>
        <Button
          type="primary"
          onClick={() =>
            dispatch(
              changeState({
                count: 9,
              })
            )
          }
        >
          click
        </Button>
      </div>
      <div>hooks</div>
      <ComA />
      <ComB />
    </ModelContext.Provider>
  );
}
