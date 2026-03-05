import { useContext } from "react";
import UserContext from "../store/UserContext";

const UserSelectId = () => {
  const { state, dispatch } = useContext(UserContext);

  const handleId = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const id = Number(e.target.value);
    console.log("id is:-", id);

    dispatch({ type: "SELECT_ID", payload: id });
    dispatch({ type: "SHOW_INPUT_DATA", payload: id });
  };
  return (
    <div>
      <div>
        <label>Select based on ID: </label>
        <select value={state.selectedId ?? ""} onChange={handleId}>
          <option value="">Select Id</option>
          {state?.users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.id}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserSelectId;
