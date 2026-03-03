import { useState } from "react";
import type { FormData, User } from "../types/User.ts";

const StatePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectField, setSelectField] = useState<keyof FormData | null>(null);
  const [selectValue, setSelectValue] = useState<any>();
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    city: "",
    age: 0,
  });
  const [mode, setMode] = useState<string>("save");
  const [appliedFilter, setAppliedFilter] = useState<{
    field: keyof FormData | null;
    uniqueVal: string;
  }>({
    field: null,
    uniqueVal: "",
  });

  const displayUsers: User[] =
    appliedFilter.field && appliedFilter.uniqueVal
      ? users.filter((user) => {
          if (appliedFilter.field === "age") {
            return user.age === Number(appliedFilter.uniqueVal);
          } else {
            return (
              user[appliedFilter.field as keyof User]
                .toString()
                .toLowerCase() === appliedFilter.uniqueVal
            );
          }
        })
      : users;

  const handleFilterButton = () => {
    if (!selectField || !selectValue) {
      alert("Please select both field and value to apply filter");
      return;
    }
    setAppliedFilter({
      field: selectField,
      uniqueVal: selectValue.toLowerCase(),
    });
  };
    

  const handleAllButton = () => {
    setAppliedFilter({ field: null, uniqueVal: "" });
    setSelectField(null);
    setSelectValue("");
  };

  const getFilterUnique = (): (string | number)[] => {
    if (!selectField) return [];
    if (selectField === "age") {
      const newUser = users.map((user) => user[selectField]);
      return [...new Set(newUser)];
    } else {
      const newUser = users.map((user) => user[selectField].toLowerCase());
      return [...new Set(newUser)];
    }
  };

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
      // IF IT FOUND THEN
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

  // HANDLE DELETE
  const handleDelete = () => {
    setUsers((prev) => prev.filter((user) => user.id !== selectedId));
    setFormData({ userName: "", city: "", age: 0 });
    setMode("save");
    setSelectedId(null);
  };
  // HANDLING THE SELECT FIELD
  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log("select Field event", e.target.value);
    const fieldVal = e.target.value as keyof FormData;
    if (!fieldVal) {
      setSelectField(null);
      return;
    }
    setSelectValue("");
    setSelectField(fieldVal);
    console.log("fieldVal Active", fieldVal)
  };
  // here we pass the selectField State to the select value option so as state changes we dynamically set the option
  // now just we have to create the onchange to change the option value
  const handleUniqueValue = (e: React.ChangeEvent<HTMLOptionElement>): void => {
    console.log("select Value event", e.target.value);
    const uniqueValue = e.target.value;
    setSelectValue(uniqueValue);
    console.log("uniqueValue", uniqueValue)
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
        </div>{" "}
        <br />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleFilterButton}>Filter</button>
          <button onClick={handleAllButton}>All</button>
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
              displayUsers.map((user) => (
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
// in statePage issue is when filter is applied then if i enter new user i dont have to show new user data untill all aplied and field and value become empty, and also when filter applied and user update data then again i have to re-render table based on it bcz what if current filtered showinf data changes then? give me hint just how to write in plain english and solve my self?
