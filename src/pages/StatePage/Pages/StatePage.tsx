import { useState } from "react";
import type { User, FormData, AppliedFilter } from "../../../types/User";
import UserForm from "../components/UserForm";
import UserSelectId from "../components/UserSelectId";
import FilterPanel from "../components/FilterPanel";
import UserTableList from "../components/UserTable";

const StatePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>({ userName: "", city: "", age: 0 });
  const [mode, setMode] = useState<string>("save");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [appliedFilter, setAppliedFilter] = useState<AppliedFilter>({ field: null, uniqueVal: "" });
  const [selectValue, setSelectValue] = useState<string | number>("");

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
        users={users}
        appliedFilter={appliedFilter}
        setAppliedFilter={setAppliedFilter}
      />
      <UserTableList users={users} appliedFilter={appliedFilter} />
    </div>
  );
};

export default StatePage;
