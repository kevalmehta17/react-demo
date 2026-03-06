import React from "react";
import type { FormData, User, UserFormProps } from "../../types/User.ts";

const UserForm = ({
  users,
  setUsers,
  formData,
  setFormData,
  mode,
  setMode,
  selectedId,
  setSelectedId,
  appliedFilter,
  setAppliedFilter,
  setSelectValue,
}: UserFormProps) => {
 
  // HANDLING THE SUBMIT
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const data = new FormData(e.currentTarget); //this will give me the current form html element

    const userName = (data.get("userName") as string).trim();
    const city = (data.get("cityName") as string).trim();
    const age = Number(data.get("ageData"));

    if (!userName || !city || age <= 0) {
      alert("Please Enter valid input data");
      console.log("Please Enter valid input data");
      return;
    }
    // WORKING WITH SAVE MODE:-
    if (mode === "save") {
      setUsers((prev) => [...prev, { id: +new Date(), userName, city, age }]);
      console.log("state after save", users);
    }
    // WORKING WITH UPDATE MODE:-
    if (mode === "update") {
      const updUser = users.find((user) => user.id === selectedId);
      if (!updUser) {
        alert("No user found for this userID");
        console.log("No user found for this userID");
        return;
      }
      // IF IT FOUND THEN UPDATE THE USER
      const nextUsers = users.map((user) =>
        user.id === selectedId ? { ...user, userName, city, age } : user,
      );
      resetFilterIfNoMatch(nextUsers);
      setUsers(nextUsers);
      setMode("save");
    }
    const resetForm = e.currentTarget;
    // resetting the form state value
    setFormData({
      userName: "",
      city: "",
      age: 0,
    });
    // reset the whole form & selectedID
    setSelectedId(null);
    resetForm.reset();
  };
  // HANDLE DELETE
  const handleDelete = () => {
    const nextUsers = users.filter((user) => user.id !== selectedId);
    resetFilterIfNoMatch(nextUsers);
    setUsers(nextUsers);
    setFormData({ userName: "", city: "", age: 0 });
    setMode("save");
    setSelectedId(null);
  };
  // checks if nextUsers still has any match for appliedFilter; resets filter if not
  const resetFilterIfNoMatch = (nextUsers: User[]) => {
    if (!appliedFilter.field || !appliedFilter.uniqueVal) return;
    const stillMatches = nextUsers.some((user) => {
      if (appliedFilter.field === "age") {
        return user.age === Number(appliedFilter.uniqueVal);
      }
      return (
        user[appliedFilter.field as keyof User].toString().toLowerCase() ===
        appliedFilter.uniqueVal
      );
    });
    if (!stillMatches) {
      setAppliedFilter((prev) => ({ ...prev, uniqueVal: "" }));
      setSelectValue("");
    }
  };

  return (
    <div>
      <h1>State Route</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={(e) =>
              setFormData((pre) => ({ ...pre, userName: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label>City: </label>
          <input
            type="text"
            name="cityName"
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="number"
            name="ageData"
            value={formData.age}
            onChange={(e) =>
              setFormData((pre) => ({ ...pre, age: Number(e.target.value) }))
            }
            required
          />
        </div>{" "}
        <br />
        <div>
          {mode === "save" && <button type="submit">Save</button>}
          {mode === "update" && (
            <>
              <button type="submit">Update</button>
              <button type="button" onClick={() => handleDelete()}>
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
