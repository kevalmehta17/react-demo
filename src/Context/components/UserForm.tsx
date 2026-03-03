import { useContext } from "react";
import UserContext from "../store/UserContext.tsx";

const UserForm = () => {
  const { state, dispatch, selectId, setSelectId, formData } = useContext(UserContext);

  const modeVal = state?.mode || "save";
  console.log("mode val we got", modeVal);
  console.log("added User list is", state.users);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userName = (data.get("userName") as string).trim();
    const city = (data.get("cityName") as string).trim();
    const age = Number(data.get("ageData"));

    if (!userName || !city || !age) {
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
      dispatch({ type: "UPDATE_USER", payload: formData, id: selectId });
    }
    const resetForm = e.currentTarget;
    resetForm.reset();
  };
  return (
    <div>
      <h1>Context Route</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="userName" value={formData.userName ?? ""} 
          onChange={(e) => dispatch()}
          required />
        </div>
        <div>
          <label>City: </label>
          <input type="text" name="cityName" value={formData.city ?? ""} required />
        </div>
        <div>
          <label>Age: </label>
          <input type="number" name="ageData" value={formData.age ?? ""} required />
        </div>{" "}
        <br />
        <div>
          {/* we have to dispatch action from state to show save or update-delete */}
          {modeVal === "save" && <button type="submit">Save</button>}
          {modeVal === "update" && (
            <>
              <button type="submit">Update</button>
              <button
                type="button"
                onClick={() => dispatch({ type: "DELETE_USER", id: selectId })}
              >
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
