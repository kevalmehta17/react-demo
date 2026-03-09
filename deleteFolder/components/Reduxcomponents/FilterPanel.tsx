import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../src/pages/ReduxPage/store/UserStore";
import {
  changeField,
  changeValue,
  handleFilterButton,
  handleAllButton,
} from "../../../src/pages/ReduxPage/store/FilterSlice";
import SelectDropdown from "../../../src/components/SelectDropdown";
import Button from "../../../src/components/Button";
import { getFieldOptions, getValueOptions, parseFilterValue } from "../../../src/utils/userFormHandlers";

const FilterPanel = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const selectField = useSelector((state: RootState) => state.filter.selectField);
  const selectValue = useSelector((state: RootState) => state.filter.selectValue);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <h2>Filters</h2>
      </div>
      <SelectDropdown
        label="Select Field:"
        value={selectField ?? ""}
        onChange={(e) => dispatch(changeField(e.target.value || null))}
        options={getFieldOptions()}
        defaultOption="Select Field"
      />
      <br />
      <SelectDropdown
        label="Select Value:"
        value={selectValue ?? ""}
        onChange={(e) => dispatch(changeValue(parseFilterValue(e.target.value, selectField)))}
        options={getValueOptions(users, selectField)}
        defaultOption="Select Value"
      />
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          label="Filter"
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
        />
        <Button label="All" onClick={() => dispatch(handleAllButton())} />
      </div>
    </div>
  );
};

export default FilterPanel;