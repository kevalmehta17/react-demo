import { useContext } from "react";
import UserContext from "../store/UserContext.tsx";

const FilterPanel = () => {
  const { state, dispatch } = useContext(UserContext);
  console.log("state inside filterPanel", state);
  const fieldData = ["userName", "city", "age"];

  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("event for field", e.target.value);
    dispatch({ type: "CHANGE_FIELD", payload: e.target.value });
  };

  const handleSelectValue = (e: React.ChangeEvent<HTMLOptionElement>) => {
    console.log("event for option", e.target.value);
    dispatch({type: "CHANGE_VALUE", payload: e.target.value});
  };

  const getFilterUnique = (): (string | number)[] => {
    if (!state.selectField) return [];
    if (state.selectField === "age") {
      const newUser = state.users.map((user) => user[state.selectField]);
      // console.log("newUser")
      return [...new Set(newUser)];
    } else {
      const newUser = state.users.map((user) =>
        user[state.selectField].toLowerCase(),
      );
      return [...new Set(newUser)];
    }
  };

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
          <select>
            <option value="">Select Value</option>
            {getFilterUnique().map((user) => (
              <option value={user} key={user}>{user}</option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <button>Filter</button>
        <button>All</button>
      </div>
    </div>
  );
};

export default FilterPanel;
