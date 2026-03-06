import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/UserStore";
import { selectId } from "../store/UserSlice";

const UserSelectId = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const selectedId = useSelector((state: RootState) => state.users.selectedId);
  const dispatch = useDispatch();

  return (
    <div>
      <label>Select ID: </label>
      <select
        value={selectedId ?? ""}
        onChange={(e) => dispatch(selectId(Number(e.target.value)))}
      >
        <option value="">Select</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelectId;