import UserForm from "../../components/UserForm";
import FilterPanel from "../../components/FilterPanel";
import UserSelectId from "../../components/UserSelectId";
import UserTable from "../../components/UserTable";
import { userColumns } from "../../constants/userColumns";
import useContextUserManager from "../../hooks/useContextUserManager";

const ContextPageContent = () => {
  const {
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
  } = useContextUserManager();

  return (
    <div>
      <UserForm
        title="Context Route"
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
        onChangeId={handleChangeSelectedId}
      />
      <FilterPanel
        fieldOptions={fieldOptions}
        valueOptions={valueOptions}
        selectField={selectField}
        selectValue={selectValue}
        onChangeField={handleChangeFilterField}
        onChangeValue={handleChangeFilterValue}
        onFilter={handleFilter}
        onAll={handleAll}
      />
      <UserTable users={filteredUsers} columns={userColumns} />
    </div>
  );
};

export default ContextPageContent;