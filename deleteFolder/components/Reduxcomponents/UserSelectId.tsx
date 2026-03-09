import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../src/pages/ReduxPage/store/UserStore";
import { selectId, selectIdNull, clearInputData } from "../../../src/pages/ReduxPage/store/UserSlice";
import SelectDropdown from "../../../src/components/SelectDropdown";

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
        label="Select ID:"
        value={selectedId ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          if (!val) {
            dispatch(selectIdNull());
            dispatch(clearInputData());
            return;
          }
          dispatch(selectId(Number(val)));
        }}
        options={options}
        defaultOption="Select ID"
      />
    </div>
  );
};

export default UserSelectId;