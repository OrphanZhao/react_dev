import { createContext } from "react";
import axios from "axios";
import { useAtom, useQuery } from "./utils";

const ModelContext = createContext({});

const initialState = {
  count: 0,
  loading: false,
  list: [],
};
function model() {
  const [state, changeState] = useAtom(initialState);

  const effects = {
    getList: (params) =>
      useQuery(() => axios.get("/user/list", { params })).then((res) =>
        changeState({
          list: res.data.data,
          count: res.data.count,
        })
      ),
  };

  return {
    ...state,
    changeState,
    ...effects,
  };
}

export { ModelContext, model };
