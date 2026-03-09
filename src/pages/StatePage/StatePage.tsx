import { useState, type FormEvent } from "react";
import type { User, FormData, AppliedFilter } from "../../types/User";
import UserForm from "../../components/UserForm";
import FilterPanel from "../../components/FilterPanel";
import UserSelectId from "../../components/UserSelectId";
import UserTable from "../../components/UserTable";
import { userColumns } from "../../constants/userColumns";
import { getFilteredUsers, shouldResetFilterAfterDelete } from "../../utils/userFormHandlers";

const initialFormData: FormData = { userName: "", city: "", age: 0 };
const initialFilter: AppliedFilter = { field: null, uniqueVal: "" };

const StatePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mode, setMode] = useState<"save" | "update">("save");
  const [appliedFilter, setAppliedFilter] = useState<AppliedFilter>(initialFilter);
  const [selectField, setSelectField] = useState<string | null>(null);
  const [selectValue, setSelectValue] = useState<string | number | null>(null);

  const filteredUsers = getFilteredUsers(users, appliedFilter);

  const resetFormState = () => {
    setFormData(initialFormData);
    setSelectedId(null);
    setMode("save");
  };

  const handleChangeField = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.userName || !formData.city || formData.age <= 0) {
    alert("Fill Every Field");
    return;
  }

  if (mode === "save") {
    const newUser: User = {
      id: Date.now(),
      ...formData
    };

    setUsers(prev => [...prev, newUser]);
  }

  if (mode === "update" && selectedId !== null) {
    setUsers(prev =>
      prev.map(user =>
        user.id === selectedId
          ? { ...user, ...formData }
          : user
      )
    );

    setSelectedId(null);
  }

  setFormData(initialFormData);
  setMode("save");
};


  const handleDelete = () => {
  if (selectedId === null) return;

  const { resetValue } = shouldResetFilterAfterDelete(
    users,
    selectedId,
    appliedFilter
  );

  setUsers(prev => prev.filter(u => u.id !== selectedId));

  if (resetValue) {
    setSelectValue(null);
    setAppliedFilter(initialFilter);
  }

  setSelectedId(null);
  setFormData(initialFormData);
  setMode("save");
};

  return (
    <div>
      <UserForm
        title="State Route"
        formValue={formData}
        mode={mode}
        selectedId={selectedId}
        onChangeField={handleChangeField}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />

      <UserSelectId
        users={users}
        selectedId={selectedId}
        onSelectId={(id) => {
          setSelectedId(id);
          setMode("update");
          const user = users.find((u) => u.id === id);
          if (user) setFormData({ userName: user.userName, city: user.city, age: user.age });
        }}
        onDeselectId={() => {
          setSelectedId(null);
          setMode("save");
        }}
        onClear={() => setFormData(initialFormData)}
      />

      <FilterPanel
        users={users}
        selectField={selectField}
        selectValue={selectValue}
        onChangeField={(field) => {
          setSelectField(field);
          setSelectValue(null);
        }}
        onChangeValue={setSelectValue}
        onFilter={() => {
          if (selectField && selectValue != null) {
            setAppliedFilter({
              field: selectField as keyof FormData,
              uniqueVal: String(selectValue),
            });
          }
        }}
        onAll={() => {
          setSelectField(null);
          setSelectValue(null);
          setAppliedFilter(initialFilter);
        }}
      />

      <UserTable users={filteredUsers} columns={userColumns} />
    </div>
  );
};

export default StatePage;