import { useDispatch, useSelector } from "react-redux";
// import type { FormData as UserFormData } from "../../../types/User";
import type { RootState } from "../../../src/pages/ReduxPage/ReduxStore/UserStore";
import {
  addUser,
  changeFormValue,
  clearInputData,
  deleteUser,
  selectIdNull,
  updateUser,
} from "../../../src/pages/ReduxPage/ReduxStore/UserSlice";
import Input from "../../../src/components/Input";
import Button from "../../../src/components/Button";
import { handleFormSubmit, handleFormChange, handleFormDelete } from "../../../src/utils/userFormHandlers";

const UserForm = () => {
  const modeVal = useSelector((state: RootState) => state.users.mode);
  const formValue = useSelector((state: RootState) => state.users.formValue);
  const id = useSelector((state: RootState) => state.users.selectedId);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <h1>Redux Route</h1>
      </div>
      <div>
        <form
          onSubmit={(e) =>
            handleFormSubmit({
              e,
              mode: modeVal,
              selectedId: id,
              onAdd: (user) => dispatch(addUser(user)),
              onUpdate: (uid, formData) => dispatch(updateUser({ formData, id: uid })),
              onClear: () => dispatch(clearInputData()),
              onDeselectId: () => dispatch(selectIdNull()),
            })
          }
        >
          <Input label="Name:" type="text" name="userName" value={formValue.userName ?? ""} onChange={(e) => handleFormChange(e, (field, value) => dispatch(changeFormValue({ field, value })))} />
          <Input label="City:" type="text" name="city" value={formValue.city ?? ""} onChange={(e) => handleFormChange(e, (field, value) => dispatch(changeFormValue({ field, value })))} />
          <Input label="Age:" type="number" name="age" value={formValue.age ?? 0} onChange={(e) => handleFormChange(e, (field, value) => dispatch(changeFormValue({ field, value })))} />
          <br />
          {modeVal === "save" && <Button type="submit" label="Save" />}
          {modeVal === "update" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <Button type="submit" label="Update" />
              <Button
                type="button"
                label="Delete"
                onClick={() =>
                  handleFormDelete({
                    selectedId: id,
                    onDelete: (uid) => dispatch(deleteUser(uid)),
                    onClear: () => dispatch(clearInputData()),
                    onDeselectId: () => dispatch(selectIdNull()),
                  })
                }
              />
            </div>
          )}
        </form>
        <hr />
      </div>
    </div>
  );
};

export default UserForm;