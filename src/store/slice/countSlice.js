import { createSlice } from "@reduxjs/toolkit";
import nameSpace, { count } from "../nameSpace";

const countSlice = createSlice({
  name: nameSpace[count],
  initialState: {
    count: 0,
  },
  reducers: {
    changeState: (state, action) =>
      (state = {
        ...state,
        ...action.payload,
      }),
  },
});

console.log(countSlice);

export const { changeState } = countSlice.actions;

export default countSlice.reducer;
