import { useContext } from "react";
import { UserContext } from "../../contextStore/UserContext";
import UserForm from "../../components/UserForm";
import FilterPanel from "../../components/FilterPanel";
import UserSelectId from "../../components/UserSelectId";
import UserTable from "../../components/UserTable";
import { userColumns } from "../../constants/userColumns";
import { getFilteredUsers } from "../../utils/userFormHandlers";

console.log("inside context")

const ContextPageContent = () => {
  const context = useContext(UserContext);
  if (!context) return null;
  const { state, dispatch } = context;
  const { users, formValue, mode, selectedId, appliedFilter, selectField, selectValue } = state;

  const filteredUsers = getFilteredUsers(users, appliedFilter);

  return (
    <div>
      <UserForm
        title="Context Route"
        formValue={formValue}
        mode={mode}
        selectedId={selectedId}
        onChangeField={(field, value) =>
          dispatch({ type: "CHANGE_FORM_VALUE", field, value })
        }
        onAdd={(user) => dispatch({ type: "ADD_USER", payload: user })}
        onUpdate={(id, formData) =>
          dispatch({ type: "UPDATE_USER", id, payload: formData })
        }
        onClear={() => dispatch({ type: "CLEAR_INPUT_DATA" })}
        onDeselectId={() => dispatch({ type: "SELECT_ID_NULL" })}
        onDelete={(id) => dispatch({ type: "DELETE_USER", payload: id })}
      />
      <UserSelectId
        users={users}
        selectedId={selectedId}
        onSelectId={(id) => dispatch({ type: "SELECT_ID", payload: id })}
        onDeselectId={() => dispatch({ type: "SELECT_ID_NULL" })}
        onClear={() => dispatch({ type: "CLEAR_INPUT_DATA" })}
      />
      <FilterPanel
        users={users}
        selectField={selectField}
        selectValue={selectValue}
        onChangeField={(field) =>
          dispatch({ type: "CHANGE_FIELD", payload: field as any })
        }
        onChangeValue={(value) =>
          dispatch({ type: "CHANGE_VALUE", payload: value })
        }
        onFilter={() => dispatch({ type: "HANDLE_FILTER_BUTTON" })}
        onAll={() => dispatch({ type: "HANDLE_ALL_BUTTON" })}
      />
      <UserTable users={filteredUsers} columns={userColumns} />
    </div>
  );
};

export default ContextPageContent;

