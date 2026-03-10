import { useReducer } from "react";
import type { User, FormData, AppliedFilter } from "../types/User";
import { UserContext } from "./UserContext";

export interface InitialStateType {
  users: User[];
  formValue: FormData;
  selectedId: number | null;
  mode: "save" | "update";
  appliedFilter: AppliedFilter;
  selectField: string | null;
  selectValue: string | number | null;
}

export type UserContextType = {
  state: InitialStateType;
  dispatch: React.Dispatch<UserAction>;
};

export type UserAction =
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; id: number; payload: Partial<FormData> }
  | { type: "DELETE_USER"; payload: number }
  | { type: "CHANGE_FORM_VALUE"; field: keyof FormData; value: string | number }
  | { type: "SELECT_ID"; payload: number }
  | { type: "SHOW_INPUT_DATA"; payload: number }
  | { type: "CLEAR_INPUT_DATA" }
  | { type: "CHANGE_FIELD"; payload: keyof FormData | null }
  | { type: "CHANGE_VALUE"; payload: string | number | null }
  | { type: "HANDLE_FILTER_BUTTON" }
  | { type: "HANDLE_ALL_BUTTON" }
  | { type: "SELECT_ID_NULL" };

const initialState: InitialStateType = {
  users: [],
  formValue: { userName: "", city: "", age: 0 },
  selectedId: null,
  mode: "save",
  appliedFilter: { field: null, uniqueVal: "" },
  selectField: null,
  selectValue: null,
};

function reducer(state: InitialStateType, action: UserAction): InitialStateType {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };

    case "UPDATE_USER": {
      const updatedUsers = state.users.map((u) =>
        u.id === action.id ? { ...u, ...action.payload } : u,
      );

      const matchAfterUpdate = state.appliedFilter.field
        ? updatedUsers.some(
            (u) =>
              String(u[state.appliedFilter.field as keyof User]).toLowerCase() ===
              String(state.appliedFilter.uniqueVal).toLowerCase()
          )
        : true;

      return {
        ...state,
        users: updatedUsers,
        mode: "save",
        ...(matchAfterUpdate
          ? {}
          : { selectValue: null, appliedFilter: { field: null, uniqueVal: "" } }),
      };
    }

    // ...existing code...

case "DELETE_USER": {
  const deletedId = action.payload;
  const remaining = state.users.filter((u) => u.id !== deletedId);

  const stillHasMatch = state.appliedFilter.field
    ? remaining.some(
        (u) =>
          String(u[state.appliedFilter.field as keyof User]).toLowerCase() ===
          String(state.appliedFilter.uniqueVal).toLowerCase()
      )
    : true;

  return {
    ...state,
    users: remaining,
    formValue: { userName: "", city: "", age: 0 },
    mode: "save",
    selectedId: null,
    selectValue: stillHasMatch ? state.selectValue : null,
    appliedFilter: stillHasMatch
      ? state.appliedFilter
      : { field: null, uniqueVal: "" },
  };
}
    case "CHANGE_FORM_VALUE": {
      const { field, value } = action;
      return {
        ...state,
        formValue: {
          ...state.formValue,
          [field]: field === "age" ? Number(value) : value,
        },
      };
    }

    case "SELECT_ID": {
      const user = state.users.find((u) => u.id === action.payload);
      return {
        ...state,
        selectedId: action.payload,
        mode: "update",
        formValue: user
          ? { userName: user.userName, city: user.city, age: user.age }
          : state.formValue,
      };
    }

    case "SHOW_INPUT_DATA": {
      const user = state.users.find((u) => u.id === action.payload);
      return {
        ...state,
        formValue: user
          ? { userName: user.userName, city: user.city, age: user.age }
          : state.formValue,
        selectedId: action.payload,
        mode: "update",
      };
    }

    case "CLEAR_INPUT_DATA":
      return {
        ...state,
        formValue: { userName: "", city: "", age: 0 },
        mode: "save",
      };

    case "CHANGE_FIELD":
      return { ...state, selectField: action.payload, selectValue: null };

    case "CHANGE_VALUE":
      return { ...state, selectValue: action.payload };

    case "HANDLE_FILTER_BUTTON":
      return {
        ...state,
        appliedFilter: {
          field: state.selectField,
          uniqueVal: state.selectValue ?? "",
        },
      };

    case "HANDLE_ALL_BUTTON":
      return {
        ...state,
        selectField: null,
        selectValue: null,
        appliedFilter: { field: null, uniqueVal: "" },
      };

    case "SELECT_ID_NULL":
      return { ...state, selectedId: null, mode: "save" };

    default:
      return state;
  }
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;