import { useReducer, useState, type ReactNode } from "react";
import UserContext from "./UserContext.tsx";

const initialState = {
  users: [],
  formData: { userName: "", city: "", age: 0 },
  selectedId: null,
  mode: "save",
  appliedFilter: {
    field: null,
    uniqueVal: "",
  },
  selectValue: "",
};

const reducerFun = (state, action) => {

  //   FOR ADDING USER TO USERS ARRAY
  if (action.type === "ADD_USER") {
    return { ...state, users: [...state.users, action.payload] };
    
   
  }
  //    FOR UPDATING USER IN USERS ARRAY
  if (action.type === "UPDATE_USER") {
    const updatedUsers = state.users.map((user) => {
      if (user.id === action.id) {
        return { ...user, ...action.payload };
      }
      return user;
    });
    return { ...state, mode : "save", users: updatedUsers };
  }

    //    FOR DELETING USER IN USERS ARRAY
    if(action.type === "DELETE_USER"){
        const updatedUser = state.users.filter((user) => user.id !== action.id)
        return {...state, mode : "save", users: updatedUser};
    }

    //  FOR DISPLAYING USER DETAIL BASED ON ID IN INPUT FIELD
    // if(action.type === "SELECT_USER"){

    // }

};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducerFun, initialState);
  const [selectId, setSelectId] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ state, dispatch, selectId, setSelectId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
