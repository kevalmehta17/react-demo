import { useContext } from "react";
import UserContext from "../store/UserContext.tsx";
import type { FormData, User } from "../../../types/User.ts";

const FilterPanel = () => {

  const { state  , dispatch } = useContext(UserContext)!;
  // console.log("state inside filterPanel", state);
  console.log("re-rendering")
  const fieldData = ["userName", "city", "age"];

  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("event for field", e.target.value);
    dispatch({ type: "CHANGE_FIELD", payload: e.target.value as keyof FormData });
  };

  const handleSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) : void => {
    console.log("event for option", e.target.value);
    dispatch({type: "CHANGE_VALUE", payload: e.target.value});
  };

  const getFilterUnique = (): (string | number)[] => {
    if (!state.selectField) return [];
    const field = state.selectField as keyof User;
    if (state.selectField === "age") {
      const newUser = state.users.map((user : User) => user[field]);
      return [...new Set(newUser)] as (number)[];
    } else {
      const newUser = state.users.map((user : User) =>
        user[field].toString().toLowerCase(),
      );
      return [...new Set(newUser)] as (string)[];
    }
  };

  const handleFilter = () => {
    if(!state.selectField || !state.selectValue){
      alert("Please Fill all the input field");
      return;
    }
    dispatch({type:"HANDLE_FILTER_BUTTON"})
  }

  const handleAll = () => {
    dispatch({type : "HANDLE_ALL_BUTTON"});
  }

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <div>
          <label>Select Field: </label>
          <select value={state.selectField ?? ""} onChange={handleSelectField}>
            <option value="">Select Field</option>
            {fieldData.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>{" "}
        <br />
        <div>
          <label>Unique Value: </label>
          <select value={state.selectValue ?? ""} onChange={handleSelectValue}>
            <option value="">Select Value</option>
            {getFilterUnique().map((user) => (
              <option value={user} key={user}>{user}</option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleAll}>All</button>
      </div>
    </div>
  );
};

export default FilterPanel;
