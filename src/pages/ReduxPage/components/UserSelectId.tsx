import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/UserStore";
import { selectId } from "../store/UserSlice";
import SelectDropdown from "../../../components/SelectDropdown";

const UserSelectId = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const selectedId = useSelector((state: RootState) => state.users.selectedId);
  const dispatch = useDispatch();

  const options = users.map((user) => ({
    label: String(user.id),
    value: user.id,
  }));

  return (
    <div>
      <SelectDropdown
        label="Select based on ID:"
        value={selectedId ?? ""}
        onChange={(e) => dispatch(selectId(Number(e.target.value)))}
        options={options}
        defaultOption="Select ID"
      />
    </div>
  );
};

export default UserSelectId;