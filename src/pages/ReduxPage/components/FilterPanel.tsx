import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/UserStore";
import type { User } from "../../../types/User";
import {
  changeField,
  changeValue,
  handleFilterButton,
  handleAllButton,
} from "../store/FilterSlice";

const FilterPanel = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const selectField = useSelector(
    (state: RootState) => state.filter.selectField,
  );
  const selectValue = useSelector(
    (state: RootState) => state.filter.selectValue,
  );
  const dispatch = useDispatch();

  const fields: (keyof Omit<User, "id">)[] = ["userName", "city", "age"];

  const uniqueValues: (string | number)[] = selectField
    ? [...new Set(users.map((u) => u[selectField as keyof User]))].map((v) =>
        typeof v === "number" ? v : String(v),
      )
    : [];

  return (
    <div>
      <div>
        <h2>Filters</h2>
      </div>
      <div>
        <label>Select Field: </label>
        <select
          value={selectField ?? ""}
          onChange={(e) => dispatch(changeField(e.target.value || null))}
        >
          <option value="">Select Field</option>
          {fields.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label>Select Value: </label>
        <select
          value={selectValue ?? ""}
          onChange={(e) => dispatch(changeValue(e.target.value || null))}
        >
          <option value="">Select Value</option>
          {uniqueValues.map((v) => (
            <option key={String(v)} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div> <br /> 
      <div style={{display:"flex", gap:"10px"}}>
        <button
          onClick={() => {
            if (selectField && selectValue != null) {
              dispatch(
                handleFilterButton({
                  selectingField: selectField,
                  selectingValue: selectValue,
                }),
              );
            }
          }}
        >
          Filter
        </button>
        <button onClick={() => dispatch(handleAllButton())}>All</button>
      </div>
    </div>
  );
};

export default FilterPanel;
