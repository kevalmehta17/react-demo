import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "./store/UserStore";
import {
  addUser,
  updateUser,
  deleteUser,
  changeFormValue,
  selectId,
  selectIdNull,
  clearInputData,
} from "./store/UserSlice";
import {
  changeField,
  changeValue,
  handleFilterButton,
  handleAllButton,
  resetFilterValue,
} from "./store/FilterSlice";
import UserForm from "../../components/UserForm";
import FilterPanel from "../../components/FilterPanel";
import UserSelectId from "../../components/UserSelectId";
import UserTable from "../../components/UserTable";
import { userColumns } from "../../constants/userColumns";
import { getFilteredUsers, shouldResetFilterAfterDelete } from "../../utils/userFormHandlers";

const ReduxPageContent = () => {
  const dispatch = useDispatch();
  const { users, formValue, mode, selectedId } = useSelector(
    (state: RootState) => state.users
  );
  const { selectField, selectValue, appliedFilter } = useSelector(
    (state: RootState) => state.filter
  );

  const filteredUsers = getFilteredUsers(users, appliedFilter);
  return (
    <div>
      <UserForm
        title="Redux Route"
        formValue={formValue}
        mode={mode}
        selectedId={selectedId}
        onChangeField={(field, value) =>
          dispatch(changeFormValue({ field, value }))
        }
        onAdd={(user) => dispatch(addUser(user))}
        onUpdate={(id, formData) => dispatch(updateUser({ formData, id }))}
        onClear={() => dispatch(clearInputData())}
        onDeselectId={() => dispatch(selectIdNull())}
        onDelete={(id) => {
          const { resetValue } = shouldResetFilterAfterDelete(
            users,
            id,
            appliedFilter,
            selectField
          );

          // delete the user
          dispatch(deleteUser(id));

          // if no more users match the filter, reset value but keep field
          if (resetValue) {
            dispatch(resetFilterValue());
          }
        }}
      />
      <UserSelectId
        users={users}
        selectedId={selectedId}
        onSelectId={(id) => dispatch(selectId(id))}
        onDeselectId={() => dispatch(selectIdNull())}
        onClear={() => dispatch(clearInputData())}
      />
      <FilterPanel
        users={users}
        selectField={selectField}
        selectValue={selectValue}
        onChangeField={(field) => dispatch(changeField(field))}
        onChangeValue={(value) => dispatch(changeValue(value))}
        onFilter={() => {
          if (selectField && selectValue != null) {
            dispatch(
              handleFilterButton({
                selectingField: selectField,
                selectingValue: selectValue,
              })
            );
          }
        }}
        onAll={() => dispatch(handleAllButton())}
      />
      <UserTable users={filteredUsers} columns={userColumns} />
    </div>
  );
};

export default ReduxPageContent;