import { combineReducers } from "@reduxjs/toolkit";
import { todoSlice } from "../screens";

const rootReducer = combineReducers({
  todo: todoSlice.reducer,
});

export default rootReducer;
