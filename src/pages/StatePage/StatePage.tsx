import { useState } from "react";
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

  return (
    <div>
      <UserForm
        title="State Route"
        formValue={formData}
        mode={mode}
        selectedId={selectedId}
        onChangeField={(field, value) =>
          setFormData((prev) => ({ ...prev, [field]: value }))
        }
        onAdd={(user) => setUsers((prev) => [...prev, user])}
        onUpdate={(id, updatedData) =>
          setUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, ...updatedData } : u))
          )
        }
        onClear={() => {
          setFormData(initialFormData);
          setMode("save");
        }}
        onDeselectId={() => setSelectedId(null)}
        onDelete={(id) => {
          const { resetValue } = shouldResetFilterAfterDelete(
            users,
            id,
            appliedFilter,
            selectField
          );

          // delete the user
          setUsers((prev) => prev.filter((u) => u.id !== id));

          // if no more users match the filter, reset value but keep field
          if (resetValue) {
            setSelectValue(null);
            setAppliedFilter({
              field: null,
              uniqueVal: "",
            });
          }
        }}
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