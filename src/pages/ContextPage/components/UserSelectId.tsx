import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import SelectDropdown from "../../../components/SelectDropdown";

const UserSelectId = () => {
  const context = useContext(UserContext);
  if (!context) return null;
  const { state, dispatch } = context;
  const { users, selectedId } = state;

  const options = users.map((user) => ({
    label: String(user.id),
    value: user.id,
  }));

  return (
    <div>
      <SelectDropdown
        label="Select based on ID:"
        value={selectedId ?? ""}
        onChange={(e) => dispatch({ type: "SELECT_ID", payload: Number(e.target.value) })}
        options={options}
        defaultOption="Select ID"
      />
    </div>
  );
};

export default UserSelectId;