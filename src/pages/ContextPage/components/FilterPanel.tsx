import { useContext } from "react";
import type { User } from "../../../types/User";
import { UserContext } from "../store/UserContext";
import SelectDropdown from "../../../components/SelectDropdown";
import Button from "../../../components/Button";
import { getFieldOptions, getValueOptions, parseFilterValue } from "../../../utils/getFilterUnique";

const FilterPanel = () => {
  const context = useContext(UserContext);
  if (!context) return null;
  const { state, dispatch } = context;
  const { users, selectField, selectValue } = state;

  return (
    <div>
      <div>
        <h2>Filters</h2>
      </div>
      <SelectDropdown
        label="Select Field:"
        value={selectField ?? ""}
        onChange={(e) =>
          dispatch({ type: "CHANGE_FIELD", payload: (e.target.value as keyof Omit<User, "id">) || null })
        }
        options={getFieldOptions()}
        defaultOption="Select Field"
      />
      <br />
      <SelectDropdown
        label="Select Value:"
        value={selectValue ?? ""}
        onChange={(e) =>
          dispatch({ type: "CHANGE_VALUE", payload: parseFilterValue(e.target.value, selectField) })
        }
        options={getValueOptions(users, selectField)}
        defaultOption="Select Value"
      />
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <Button label="Filter" onClick={() => dispatch({ type: "HANDLE_FILTER_BUTTON" })} />
        <Button label="All" onClick={() => dispatch({ type: "HANDLE_ALL_BUTTON" })} />
      </div>
    </div>
  );
};

export default FilterPanel;