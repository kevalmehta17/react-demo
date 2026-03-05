import { useReducer, useState, type ReactNode } from "react";
import UserContext from "./UserContext.tsx";
import type { FormData, User } from "../../types/User.ts";

const initialState = {
  users: [],
  formValue: { userName: "", city: "", age: 0 },
  selectedId: null,
  mode: "save",
  appliedFilter: {
    field: null,
    uniqueVal: "",
  },
  selectField: null,
  selectValue: "",
};

const reducerFun = (state, action) => {

  //   FOR ADDING USER TO USERS ARRAY
  if (action.type === "ADD_USER") {
    return { ...state, users: [...state.users, action.payload] };
  }
  //    FOR UPDATING USER IN USERS ARRAY
  if (action.type === "UPDATE_USER") {
    const updatedUsers = state.users.map((user : User) => {
      if (user.id === action.id) {
        return { ...user, ...action.payload };
      }
      return user;
    });
    console.log('inside upd', updatedUsers);
    return { ...state, mode: "save", users: updatedUsers, selectedId : null};
  }

  //    FOR DELETING USER IN USERS ARRAY
  if (action.type === "DELETE_USER") {
    const updatedUser = state.users.filter((user : User) => user.id !== action.payload);
    return { ...state, mode: "save", users: updatedUser, selectedId : null };
  }

  
  // FOR UPDATING INPUT VALUE AT EACH KEY STROKE
  if (action.type === "CHANGE_FORM_VALUE") {
    console.log("formvalue", state.formValue);
    return {
      ...state,
      formValue: { ...state.formValue, [action.field]: action.value },
    };
  }

  //  FOR DISPLAYING USER DETAIL BASED ON ID IN INPUT FIELD
  if(action.type === "SELECT_ID"){
    state.selectedId = action.payload;
    console.log("state is", state);
    return {...state};
  }

  // SHOW INPUT DATA INPUT FIELD
  if(action.type === "SHOW_INPUT_DATA"){
    const showData = state.users.find((user : User) =>  user.id === action.payload);
    state.formValue = {userName : showData.userName, city: showData.city, age:showData.age};
    return {...state, mode:"update"}
  }

  // CLEAR THE INPUT FIELD DATA
  if(action.type === "CLEAR_INPUT_DATA"){
    return {...state, formValue : {userName: "", city: "", age:0}};
  }

  // HANDLE CHANGE FIELD DATA
  if(action.type === "CHANGE_FIELD"){
    state.selectValue = "";
    return {...state, selectField : action.payload};
  }
  // HANDLE CHANGE VALUE DATA
  if(action.type === "CHANGE_VALUE"){
    return {...state, selectValue : action.payload};
  }

  // HANDLE FILTER BUTTON
  if(action.type === "HANDLE_FILTER_BUTTON"){
    state.appliedFilter.field = state.selectField;
    state.appliedFilter.uniqueVal = state.selectValue;
    return {...state};
  }

  // HANDLE ALL BUTTON
  if(action.type === "HANDLE_ALL_BUTTON"){
    state.appliedFilter.field = "";
    state.appliedFilter.uniqueVal = "";
    state.selectField = "";
    state.selectValue = "";
    console.log("after all", state);
    return {...state};
  }

  // HANDLE NO ID SELECTED
  if(action.type === "SELECT_ID_NULL"){
    console.log("inside the SELECT_ID_NULL");
    state.formValue = {userName : "", city: "", age : 0};
    return {...state, selectedId : null, mode:"save"};
  }
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducerFun, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
