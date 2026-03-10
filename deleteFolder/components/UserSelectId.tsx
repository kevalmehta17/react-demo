import { useContext } from "react";
import { UserContext } from "../../src/contextstore/UserContext"
import SelectDropdown from "../../src/components/SelectDropdown";
import type { User } from "../../src/types/User";

const UserSelectId = () => {
  const context = useContext(UserContext);
  if (!context) return null;
  const { state, dispatch } = context;
  const { users, selectedId } = state;

  const options = users.map((user : User) => ({
    label: String(user.id),
    value: user.id,
  }));

  return (
    <div>
      <SelectDropdown
        label="Select ID:"
        value={selectedId ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          if (!val) {
            dispatch({ type: "SELECT_ID_NULL" });
            dispatch({ type: "CLEAR_INPUT_DATA" });
            return;
          }
          dispatch({ type: "SELECT_ID", payload: Number(val) });
        }}
        options={options}
        defaultOption="Select ID"
      />
  
    </div>
  );
};

export default UserSelectId;