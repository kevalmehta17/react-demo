import { useReducer } from "react";
import type { InitialStateType, UserAction } from "../../../types/User";
import { UserContext } from "./UserContext";

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
      return { ...state, users: updatedUsers, mode: "save" };
    }

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
        mode: "save",
      };

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