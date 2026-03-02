import {  useState } from "react";
import type { FormData, User } from "../types/User.ts";

const StatePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectField, setSelectField] = useState<keyof FormData | null>(null);
  const [selectValue, setSelectValue] = useState<any>();
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    city: "",
    age: Number(0),
  });
  const [mode, setMode] = useState<string>("save");

  const getFilterUnique = (): string[] => {
    if (!selectField) return [];
    const newUser = users.map((user) =>
      String(user[selectField]).toLowerCase(),
    );
    return [...new Set(newUser)];
  };

  // HANDLING THE SUBMIT
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const data = new FormData(e.currentTarget); //this will give me the current form html element

    const userName = (data.get("userName") as string).trim();
    const city = (data.get("cityName") as string).trim();
    const age = Number(data.get("ageData") as string);

    if (!userName || !city || age <= 0) {
      alert("Please Enter valid input data");
      console.log("Please Enter valid input data");
      return;
    }
    if (mode === "save") {
      setUsers((prev) => [...prev, { id: +new Date(), userName, city, age }]);
      console.log("upd state", users);
    }
    if (mode === "update") {
      const updUser = users.find((user) => user.id === selectedId);
      if (!updUser) {
        alert("No user found for this userID");
        console.log("No user found for this userID");
        return;
      }
      // if it found then
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedId ? { ...user, userName, city, age } : user,
        ),
      );
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

  // HANDLING THE SELECTED ID
  const handleSelectedId = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const id = Number(e.target.value);
    if (!id) {
      setSelectedId(null);
      setMode("save");
      setFormData({
        userName: "",
        city: "",
        age: 0,
      });
      return;
    }
    setSelectedId(id);
    console.log("selected id", id);
    // fill the input field by finding the id in the user array
    const user = users.find((user) => user.id === id);
    setFormData({
      userName: user?.userName ?? "",
      city: user?.city ?? "",
      age: user?.age ?? 0,
    });
    setMode("update");
    console.log("found user", user);
    console.log("users State", users);
  };

  //   HANDLE DELETE
  const handleDelete = () => {
    setUsers((prev) => prev.filter((user) => user.id !== selectedId));
    setFormData({ userName: "", city: "", age: 0 });
    setMode("save");
    setSelectedId(null);
  };
  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log("select Field event", e.target.value);
    const field = e.target.value as keyof FormData;
    if (!field) {
      setSelectField(null);
      return;
    }
    setSelectValue("");
    setSelectField(field);
    // setSelectValue(getFilterUnique)
  };
  // here we pass the selectField State to the select value option so as state changes we dynamically set the option
  // now just we have to create the onchange to change the option value
  const handleUniqueValue = (e : React.ChangeEvent<HTMLOptionElement>) : void => {
    console.log("select Value event", e.target.value);
    setSelectValue(e.target.value);

  };

  const handleFilter = () => {
    
  }

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
            type="text"
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

      <div>
        <label>Select based on ID: </label>
        <select onChange={handleSelectedId} value={selectedId ?? ""}>
          <option value="">Select Id</option>
          {users &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id}
              </option>
            ))}
        </select>
      </div>
      <div>
        <h2>Filters</h2>
        <div>
          <label>Select Fields: </label>
          <select value={selectField ?? ""} onChange={handleSelectField}>
            <option value="">Select Field</option>
            <option value="userName">Name</option>
            <option value="city">City</option>
            <option value="age">Age</option>
          </select>{" "}
        </div>
        <br />
        <div>
          <label>Unique Values: </label>
          <select value={selectValue ?? ""} onChange={handleUniqueValue}>
            <option value={""}>Select Value</option>
            {selectField &&
              getFilterUnique().map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
          </select>
        </div> <br />
        <div style={{display:"flex", gap:"10px"}}>
            <button>Filter</button> 
            <button>All</button>
        </div>
      </div>
      <div>
        <h2>Table</h2>
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>{user.city}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatePage;
// here the issue is i have to render the unique values like if one user enters "Keval" and another "keval" then in unique value we have to always show one value not duplicate and in unique value we always return in options in small
// but im selecting unique value based on field dynamically.
