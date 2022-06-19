import React from "react";
import { model, ModelContext } from "./model";
import ComA from "./Components/ComA";
import ComB from "./Components/ComB";
import { useSelector, useDispatch } from "react-redux";
import { changeState } from "@/store/slice/countSlice";
import nameSpace, { count as countType } from "@/store/nameSpace";
import { Button, Spin } from "antd";
import { useQuery } from "../../../utils";
import axios from "axios";

export default function () {
  const Store = model();
  const { count, loading } = useSelector(
    (state) => state[nameSpace[countType]]
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      changeState({
        loading: true,
      })
    );
    useQuery(() => axios.get("/user/list/v"))
      .then((res) =>
        dispatch(
          changeState({
            loading: false,
            count: 10,
          })
        )
      )
      .catch(() =>
        dispatch(
          changeState({
            loading: false,
          })
        )
      );
  }, []);

  return (
    <ModelContext.Provider value={{ ...Store }}>
      <Spin spinning={loading} />
      <div>{count}</div>
      <div>hooks</div>
      <ComA />
      <ComB />
    </ModelContext.Provider>
  );
}
