
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import filterReducer from "./FilterSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;