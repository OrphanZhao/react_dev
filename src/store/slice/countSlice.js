import { createSlice } from "@reduxjs/toolkit";
import nameSpace, { count } from "../nameSpace";

const countSlice = createSlice({
  name: nameSpace[count],
  initialState: {
    loading: false,
    count: 0,
  },
  reducers: {
    changeState: (state, action) => {
      console.log(state, action);
      return (state = {
        ...state,
        ...action.payload,
      });
    },
  },
});

export const { changeState } = countSlice.actions;
export default countSlice.reducer;
