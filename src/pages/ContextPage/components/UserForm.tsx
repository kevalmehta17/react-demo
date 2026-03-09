import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { handleFormSubmit, handleFormChange, handleFormDelete } from "../../../utils/userFormHandlers";

const UserForm = () => {
  const context = useContext(UserContext);
  if (!context) return null;
  const { state, dispatch } = context;
  const { formValue, mode, selectedId } = state;

  return (
    <div>
      <div>
        <h1>Context Route</h1>
      </div>
      <div>
        <form
          onSubmit={(e) =>
            handleFormSubmit({
              e,
              mode,
              selectedId,
              onAdd: (user) => dispatch({ type: "ADD_USER", payload: user }),
              onUpdate: (id, formData) => dispatch({ type: "UPDATE_USER", id, payload: formData }),
              onClear: () => dispatch({ type: "CLEAR_INPUT_DATA" }),
              onDeselectId: () => dispatch({ type: "SELECT_ID_NULL" }),
            })
          }
        >
          <Input label="Name:" type="text" name="userName" value={formValue.userName ?? ""} onChange={(e) => handleFormChange(e, (field, value) => dispatch({ type: "CHANGE_FORM_VALUE", field, value }))} />
          <Input label="City:" type="text" name="city" value={formValue.city ?? ""} onChange={(e) => handleFormChange(e, (field, value) => dispatch({ type: "CHANGE_FORM_VALUE", field, value }))} />
          <Input label="Age:" type="number" name="age" value={formValue.age ?? 0} onChange={(e) => handleFormChange(e, (field, value) => dispatch({ type: "CHANGE_FORM_VALUE", field, value }))} />
          <br />
          {mode === "save" && <Button type="submit" label="Save" />}
          {mode === "update" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <Button type="submit" label="Update" />
              <Button
                type="button"
                label="Delete"
                onClick={() =>
                  handleFormDelete({
                    selectedId,
                    onDelete: (id) => dispatch({ type: "DELETE_USER", payload: id }),
                    onClear: () => dispatch({ type: "CLEAR_INPUT_DATA" }),
                    onDeselectId: () => dispatch({ type: "SELECT_ID_NULL" }),
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