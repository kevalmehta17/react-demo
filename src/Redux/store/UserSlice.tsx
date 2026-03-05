import { createSlice, current } from "@reduxjs/toolkit";
import type { User, FormData } from "../../types/User";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  users: [] as User[],
  formValue: { userName: "", city: "", age: 0 },
  mode: "save",
  appliedFilter: { field: "", uniqueVal: "" },
  selectedId: null,
  selectField: null,
  selectValue: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      console.log("after add user", current(state.users));
    },
    updateUser: (state) => {},
    deleteUser: (state) => {},
    changeFormValue: (state, action: PayloadAction<FormData>) => {
      state.formValue[action.payload.field] = action.payload.value;
      console.log("field value", current(state.formValue));
    },
    selectId: (state,action : PayloadAction<number>) => {
        state.selectedId = action.payload;
        // console.log("after selectedId", state)
    },
    showInputData: (state) => {},

    clearInputData: (state) => {
      state.formValue = { userName: "", city: "", age: 0 };
      console.log("clear", current(state));
    },
    changeField: (state) => {},
    changeValue: (state) => {},
    handleFilterButton: (state) => {},
    handleAllButton: (state) => {},
    selectIdNull: (state) => {},
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  changeFormValue,
  selectId,
  showInputData,
  clearInputData,
  changeField,
  changeValue,
  handleFilterButton,
  handleAllButton,
  selectIdNull,
} = UserSlice.actions;

export default UserSlice.reducer;
