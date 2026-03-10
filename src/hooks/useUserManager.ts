import { useState, type FormEvent } from 'react';
import type { User, FormData, AppliedFilter } from '../types/User';
import {
  getFilteredUsers,
  shouldResetFilterAfterDelete,
  isFilterStillValid,
  getFieldOptions,
  getValueOptions,
  parseFilterValue,
} from '../utils/userFormHandlers';

const initialFormData: FormData = { userName: '', city: '', age: 0 };
const initialFilter: AppliedFilter = { field: null, uniqueVal: '' };

const useUserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mode, setMode] = useState<'save' | 'update'>('save');
  const [appliedFilter, setAppliedFilter] =
    useState<AppliedFilter>(initialFilter);
  const [selectField, setSelectField] = useState<string | null>(null);
  const [selectValue, setSelectValue] = useState<string | number | null>(null);

  const filteredUsers = getFilteredUsers(users, appliedFilter);
  const fieldOptions = getFieldOptions();
  const valueOptions = getValueOptions(users, selectField);

  const handleChangeField = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.userName || !formData.city || formData.age <= 0) {
      alert('Fill Every Field');
      return;
    }
    if (mode === 'save') {
      const newUser: User = { id: Date.now(), ...formData };
      setUsers((prev) => [...prev, newUser]);
    }
    if (mode === 'update' && selectedId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === selectedId ? { ...user, ...formData } : user,
      );
      setUsers(updatedUsers);

      if (!isFilterStillValid(updatedUsers, appliedFilter)) {
        setSelectValue(null);
        setAppliedFilter(initialFilter);
      }

      setSelectedId(null);
    }
    setFormData(initialFormData);
    setMode('save');
  };

  const handleDelete = (id: number) => {
    const { resetValue } = shouldResetFilterAfterDelete(
      users,
      id,
      appliedFilter,
    );
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (resetValue) {
      setSelectValue(null);
      setAppliedFilter(initialFilter);
    }
    setSelectedId(null);
    setFormData(initialFormData);
    setMode('save');
  };

  const handleChangeFilterField = (field: string | null) => {
    setSelectField(field);
    setSelectValue(null);
  };

  const handleChangeFilterValue = (value: string | number | null) => {
    if (value === null) {
      setSelectValue(null);
      return;
    }
    const parsed = parseFilterValue(String(value), selectField);
    setSelectValue(parsed);
  };

  const handleAll = () => {
    setSelectField(null);
    setSelectValue(null);
    setAppliedFilter(initialFilter);
  };

  const handleFilter = () => {
    if (selectField && selectValue != null) {
      setAppliedFilter({
        field: selectField as keyof FormData,
        uniqueVal: String(selectValue),
      });
    }
  };

  const handleChangeSelectedId = (id: number | null) => {
    if (id === null) {
      setSelectedId(null);
      setMode('save');
      setFormData(initialFormData);
      return;
    }

    const user = users.find((u) => u.id === id);
    if (!user) return;

    setSelectedId(id);
    setMode('update');
    setFormData({
      userName: user.userName,
      city: user.city,
      age: user.age,
    });
  };

  return {
    users,
    formData,
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

export default useUserManager;