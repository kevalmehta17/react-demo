import UserForm from '../../components/UserForm';
import UserSelectId from '../../components/UserSelectId';
import FilterPanel from '../../components/FilterPanel';
import UserTable from '../../components/UserTable';
import { userColumns } from '../../constants/userColumns';
import useUserManager from '../../hooks/useUserManager';

const StatePage = () => {
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
  } = useUserManager();

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

export default StatePage;