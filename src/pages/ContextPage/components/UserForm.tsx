import { useContext } from "react";
import UserContext from "../store/UserContext.tsx";

const UserForm = () => {
  const { state, dispatch } = useContext(UserContext);

  const modeVal = state?.mode || "save";
  console.log("mode val we got", modeVal);
  console.log("added User list is", state.users);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userName = (data.get("userName") as string).trim();
    const city = (data.get("city") as string).trim();
    const age = Number(data.get("age"));

    if (!userName || !city || age <= 0) {
      alert("Enter all data properly");
      console.log("Enter all data properly");
      return;
    }
    if (modeVal === "save") {
      const formData = { id: +new Date(), userName, city, age };
      console.log("the formData we got is", formData);
      dispatch({ type: "ADD_USER", payload: formData });
    }
    if (modeVal === "update") {
      const formData = { userName, city, age };
      console.log("the formData we got is", formData);
      console.log("the id we are dispatching is", state.selectedId);
      dispatch({
        type: "UPDATE_USER",
        payload: formData,
        id: state.selectedId,
      });
    }
    const resetForm = e.currentTarget;
    resetForm.reset();
    dispatch({ type: "CLEAR_INPUT_DATA" });
  };

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const findInputName = e.target.name;
    console.log("findInputName", findInputName);
    const valueToChange = e.target.value;
    console.log("valueToChange", valueToChange);
    dispatch({
      type: "CHANGE_FORM_VALUE",
      field: findInputName,
      value: valueToChange,
    });
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_USER", payload: state.selectedId });
    dispatch({ type: "CLEAR_INPUT_DATA" });
  };

  return (
    <div>
      <h1>Context Route</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="userName"
            value={state.formValue.userName ?? ""}
            onChange={handleFormValue}
            required
          />
        </div>
        <div>
          <label>City: </label>
          <input
            type="text"
            name="city"
            value={state.formValue.city ?? ""}
            onChange={handleFormValue}
            required
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="number"
            name="age"
            value={state.formValue.age ?? ""}
            onChange={handleFormValue}
            required
          />
        </div>{" "}
        <br />
        <div>
          {/* we have to dispatch action from state to show save or update-delete */}
          {modeVal === "save" && <button type="submit">Save</button>}
          {modeVal === "update" && (
            <>
              <button type="submit">Update</button>
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </form>
      <hr />
    </div>
  );
};

export default UserForm;
