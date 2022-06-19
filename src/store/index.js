import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./slice/countSlice";
import nameSpace, { count } from "./nameSpace";

export const store = configureStore({
  reducer: {
    [nameSpace[count]]: countReducer,
  },
});
