import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../ReduxStore/UserStore.tsx"
import type { FormEvent } from "react";
import type { FormData } from "../types/User";
import {
  addUser,
  updateUser,
  deleteUser,
  changeFormValue,
  selectId,
  selectIdNull,
  clearInputData,
} from "../ReduxStore/UserSlice";
import {
  changeField,
  changeValue,
  handleFilterButton,
  handleAllButton,
  resetFilterValue,
} from "../ReduxStore/FilterSlice.ts"
import {
  getFilteredUsers,
  getFieldOptions,
  getValueOptions,
  parseFilterValue,
  shouldResetFilterAfterDelete,
  isFilterStillValid,
} from "../utils/userFormHandlers";

const useReduxUserManager = () => {
  const dispatch = useDispatch();
  const { users, formValue, mode, selectedId } = useSelector(
    (state: RootState) => state.users
  );
  const { selectField, selectValue, appliedFilter } = useSelector(
    (state: RootState) => state.filter
  );

  const filteredUsers = getFilteredUsers(users, appliedFilter);
  const fieldOptions = getFieldOptions();
  const valueOptions = getValueOptions(users, selectField);

  const handleChangeField = (field: keyof FormData, value: string | number) => {
    dispatch(changeFormValue({ field, value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValue.userName || !formValue.city || formValue.age <= 0) {
      alert("Fill Every Field");
      return;
    }
    if (mode === "save") {
      dispatch(addUser({ id: Date.now(), ...formValue }));
    }
    if (mode === "update" && selectedId !== null) {
      const updatedUsers = users.map((u) =>
        u.id === selectedId ? { ...u, ...formValue } : u,
      );
      dispatch(updateUser({ formData: formValue, id: selectedId }));
      dispatch(selectIdNull());

      if (!isFilterStillValid(updatedUsers, appliedFilter)) {
        dispatch(resetFilterValue());
      }
    }
    dispatch(clearInputData());
  };

  const handleDelete = (id: number) => {
    const { resetValue } = shouldResetFilterAfterDelete(users, id, appliedFilter);
    dispatch(deleteUser(id));
    if (resetValue) {
      dispatch(resetFilterValue());
    }
  };

  const handleChangeSelectedId = (id: number | null) => {
    if (id === null) {
      dispatch(selectIdNull());
      dispatch(clearInputData());
      return;
    }
    dispatch(selectId(id));
  };

  const handleChangeFilterField = (field: string | null) => {
    dispatch(changeField(field));
  };

  const handleChangeFilterValue = (value: string | number | null) => {
    if (value === null) {
      dispatch(changeValue(null));
      return;
    }
    const parsed = parseFilterValue(String(value), selectField);
    dispatch(changeValue(parsed));
  };

  const handleFilter = () => {
    if (selectField && selectValue != null) {
      dispatch(
        handleFilterButton({
          selectingField: selectField,
          selectingValue: selectValue,
        })
      );
    }
  };

  const handleAll = () => {
    dispatch(handleAllButton());
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

export default useReduxUserManager;