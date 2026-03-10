import { useContext, type FormEvent } from "react";
import { UserContext } from "../contextstore/UserContext";
import type { FormData } from "../types/User";
import {
  getFilteredUsers,
  getFieldOptions,
  getValueOptions,
  parseFilterValue,
} from "../utils/userFormHandlers";

const useContextUserManager = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useContextUserManager must be used within UserProvider");
  const { state, dispatch } = context;
  const { users, formValue, mode, selectedId, appliedFilter, selectField, selectValue } = state;

  const filteredUsers = getFilteredUsers(users, appliedFilter);
  const fieldOptions = getFieldOptions();
  const valueOptions = getValueOptions(users, selectField);

  const handleChangeField = (field: keyof FormData, value: string | number) => {
    dispatch({ type: "CHANGE_FORM_VALUE", field, value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValue.userName || !formValue.city || formValue.age <= 0) {
      alert("Fill Every Field");
      return;
    }
    if (mode === "save") {
      dispatch({ type: "ADD_USER", payload: { id: Date.now(), ...formValue } });
    }
    if (mode === "update" && selectedId !== null) {
      dispatch({ type: "UPDATE_USER", id: selectedId, payload: formValue });
      dispatch({ type: "SELECT_ID_NULL" });
    }
    dispatch({ type: "CLEAR_INPUT_DATA" });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_USER", payload: id });
  };

  const handleChangeSelectedId = (id: number | null) => {
    if (id === null) {
      dispatch({ type: "SELECT_ID_NULL" });
      dispatch({ type: "CLEAR_INPUT_DATA" });
      return;
    }
    dispatch({ type: "SELECT_ID", payload: id });
  };

  const handleChangeFilterField = (field: string | null) => {
    dispatch({ type: "CHANGE_FIELD", payload: field as keyof FormData | null });
  };

  const handleChangeFilterValue = (value: string | number | null) => {
    if (value === null) {
      dispatch({ type: "CHANGE_VALUE", payload: null });
      return;
    }
    const parsed = parseFilterValue(String(value), selectField);
    dispatch({ type: "CHANGE_VALUE", payload: parsed });
  };

  const handleFilter = () => {
    if (selectField && selectValue != null) {
      dispatch({ type: "HANDLE_FILTER_BUTTON" });
    }
  };

  const handleAll = () => {
    dispatch({ type: "HANDLE_ALL_BUTTON" });
  };

  return {
    users,
    formData: formValue,
    selectedId,
    mode,
    filteredUsers,
    fieldOptions,
    valueOptions,
    selectField,
    selectValue,
    handleChangeField,
    handleSubmit,
    handleDelete,
    handleChangeFilterField,
    handleChangeFilterValue,
    handleAll,
    handleFilter,
    handleChangeSelectedId,
  };
};

export default useContextUserManager;