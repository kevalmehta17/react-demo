import { useDispatch, useSelector } from "react-redux";
import { clearInputData, selectId, selectIdNull, showInputData } from "../store/UserSlice";

interface User {
  id: string | number;
}

const UserSelectId = () => {
  const getAllId = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  console.log("getAllId", getAllId);
  const selectedId = useSelector((state) => state.user.selectedId);

  const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const id = Number(e.target.value);
    console.log("selectedId is", id);
    if(!id){
        dispatch(selectIdNull());
        dispatch(clearInputData());
        console.log("after selectIdNull", id);
        return;
    }
    dispatch(selectId(id));
    dispatch(showInputData());
  };
  return (
    <div>
      <label>Select based on ID:</label>
      <select onChange={handleIdChange} value={selectedId ?? ""}>
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
