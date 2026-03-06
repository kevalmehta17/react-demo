import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"
import filterReducer from "./FilterSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter : filterReducer
  },
});
