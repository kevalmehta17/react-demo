import { useContext } from "react";
import UserContext from "../store/UserContext";

const UserSelectId = () => {
  const { state, dispatch, selectId, setSelectId } = useContext(UserContext);

  const handleId = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const id = Number(e.target.value)
    setSelectId(id);
    // dispatch({type: "SELECT_USER", id: id});
  };
  return (
    <div>
      <div>
        <label>Select based on ID: </label>
        <select value={selectId ?? ""} onChange={handleId}>
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
