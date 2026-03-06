import { useState } from "react";
import type { FormData, User } from "../../types/User.ts";
import UserForm from "../components/UserForm.tsx";

import FilterPanel from "../components/FilterPanel.tsx";
import UserTable from "../components/UserTable.tsx";
import UserSelectId from "../components/UserSelectId.tsx";

const StatePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectField, setSelectField] = useState<keyof FormData | null>(null);
  const [selectValue, setSelectValue] = useState<string | number>("");
  const [mode, setMode] = useState<string>("save");
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    city: "",
    age: 0,
  });

  const [appliedFilter, setAppliedFilter] = useState<{
    field: keyof FormData | null;
    uniqueVal: string;
  }>({
    field: null,
    uniqueVal: "",
  });

  const displayUsers = (): User[] => {
    return appliedFilter.field && appliedFilter.uniqueVal
      ? users.filter((user) => {
          if (appliedFilter.field === "age") {
            return user.age === Number(appliedFilter.uniqueVal);
          } else {
            return (
              user[appliedFilter.field as keyof User]
                .toString()
                .toLowerCase() === appliedFilter.uniqueVal
            );
          }
        })
      : users;
  };

  const getFilterUnique = (): (string | number)[] => {
    if (!selectField) return [];
    if (selectField === "age") {
      const newUser = users.map((user) => user[selectField]);
      return [...new Set(newUser)];
    } else {
      const newUser = users.map((user) => user[selectField].toLowerCase());
      return [...new Set(newUser)];
    }
  };

  return (
    <div>
      <UserForm
        users={users}
        setUsers={setUsers}
        formData={formData}
        setFormData={setFormData}
        mode={mode}
        setMode={setMode}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        appliedFilter={appliedFilter}
        setAppliedFilter={setAppliedFilter}
        setSelectValue={setSelectValue}
      />
      <UserSelectId
        users={users}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        setMode={setMode}
        setFormData={setFormData}
      />
      <FilterPanel
        selectField={selectField}
        selectValue={selectValue}
        setSelectField={setSelectField}
        setSelectValue={setSelectValue}
        setAppliedFilter={setAppliedFilter}
        getFilterUnique={getFilterUnique}
      />
      <UserTable displayUsers={displayUsers} />
    </div>
  );
};

export default StatePage;
