import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, FormData, AppliedFilter } from "../types/User";

type UserState = {
  users: User[];
  formValue: FormData;
  selectedId: number | null;
  mode: "save" | "update";
  appliedFilter: AppliedFilter;
  selectValue: string | number | null;
  selectField: string | null;
};

const initialState: UserState = {
  users: [],
  formValue: { userName: "", city: "", age: 0 },
  selectedId: null,
  mode: "save",
  appliedFilter: { field: null, uniqueVal: "" },
  selectValue: null,
  selectField: null,
};

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (
      state,
      action: PayloadAction<{ formData: FormData; id: number }>,
    ) => {
      const { formData, id } = action.payload;
      const index = state.users.findIndex((u) => u.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...formData };
      }
      state.mode = "save";
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      state.formValue = { userName: "", city: "", age: 0 };
      state.mode = "save";
      state.selectedId = null;
    },

    changeFormValue: (
      state,
      action: PayloadAction<{ field: keyof FormData; value: string | number }>,
    ) => {
      const { field, value } = action.payload;
      if (field === "age") {
        state.formValue[field] = Number(value);
      } else {
        state.formValue[field] = value as string;
      }
    },
    selectId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
      state.mode = "update";
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        state.formValue = {
          userName: user.userName,
          city: user.city,
          age: user.age,
        };
      }
    },
    selectIdNull: (state) => {
      state.selectedId = null;
      state.mode = "save";
    },
    clearInputData: (state) => {
      state.formValue = { userName: "", city: "", age: 0 };
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  changeFormValue,
  selectId,
  selectIdNull,
  clearInputData,
} = UserSlice.actions;

export default UserSlice.reducer;