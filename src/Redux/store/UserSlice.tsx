import { createSlice, current } from "@reduxjs/toolkit";
import type { User, FormData } from "../../types/User";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  users: [] as User[],
  formValue: { userName: "", city: "", age: 0 },
  mode: "save",
  selectedId: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      console.log("after add user", current(state.users));
    },
    updateUser: (
      state,
      action: PayloadAction<{ formData: FormData; id: number }>,
    ) => {
      const { formData, id } = action.payload;
      // const findUser = state.users.find((user) => user.id === id);
      state.users = state.users.map((user) =>
        user.id === id ? { ...user, ...formData } : user,
      );
      console.log("after update user", state.users);
      state.mode = "save";
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
      console.log("after delete user", state.users);
    },
    changeFormValue: (state, action: PayloadAction<FormData>) => {
      state.formValue[action.payload.field] = action.payload.value;
      console.log("field value", current(state.formValue));
    },
    selectId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
      state.mode = "update";
      // console.log("after selectedId", state)
    },
    showInputData: (state) => {
      const findUser = state.users.find((user) => user.id === state.selectedId);
      if (!findUser) return;
      state.formValue = {
        userName: findUser.userName,
        city: findUser.city,
        age: findUser.age,
      };
      console.log("after showInputData", state.formValue);
    },

    clearInputData: (state) => {
      state.formValue = { userName: "", city: "", age: 0 };
      console.log("clear", current(state));
    },

    selectIdNull: (state) => {
      state.selectedId = null;
      state.mode = "save";
    },
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
  selectIdNull,
} = UserSlice.actions;

export default UserSlice.reducer;
