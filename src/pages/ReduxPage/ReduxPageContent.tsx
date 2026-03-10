import UserForm from "../../components/UserForm";
import FilterPanel from "../../components/FilterPanel";
import UserSelectId from "../../components/UserSelectId";
import UserTable from "../../components/UserTable";
import { userColumns } from "../../constants/userColumns";
import useReduxUserManager from "../../hooks/useReduxUserManager";

const ReduxPageContent = () => {
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
  } = useReduxUserManager();

  return (
    <div>
      <UserForm
        title="Redux Route"
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

export default ReduxPageContent;