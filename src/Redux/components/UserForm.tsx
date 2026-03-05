import React from "react";

const UserForm = () => {
  const modeVal: "save" | "update" = "save";

  return (
    <div>
      <div>
        <h1>Redux Route</h1>
      </div>
      <div>
        <form>
          <div>
            <label>Name: </label>
            <input type="text" name="userName" required />
          </div>
          <div>
            <label>City: </label>
            <input type="text" name="city" required />
          </div>
          <div>
            <label>Age: </label>
            <input type="number" name="age" required />
          </div>
          <br />
          {modeVal === "save" && <button type="submit">Save</button>}
          {modeVal === "update" && (
            <>
              <button type="submit">Update</button>
              <button type="button">Delete</button>
            </>
          )}
        </form>
        <hr />
      </div>
    </div>
  );
};

export default UserForm;
