import { useDispatch, useSelector } from "react-redux";
import { selectId } from "../store/UserSlice";

interface User {
  id: string | number;
}

const getAllId = useSelector((state) => state.user.users);
const dispatch = useDispatch();

const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
  const id = Number(e.target.value)
  console.log("selectedId is", id);
  dispatch(selectId(id))
  
};

const UserSelectId = () => {
  console.log("getAllId", getAllId);
  return (
    <div>
      <label>Select based on ID:</label>
      <select onChange={handleIdChange}>
        <option value="">Select Id</option>
        {getAllId.map((user: User) => (
          <option key={user.id} value={user.id}>
            {user.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelectId;
