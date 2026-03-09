import type { User } from "../types/User";
import SelectDropdown from "./SelectDropdown";
import Button from "./Button";
import { getFieldOptions, getValueOptions, parseFilterValue } from "../utils/userFormHandlers";

interface FilterPanelProps {
  users: User[];
  selectField: string | null;
  selectValue: string | number | null;
  onChangeField: (field: string | null) => void;
  onChangeValue: (value: string | number | null) => void;
  onFilter: () => void;
  onAll: () => void;
}

const FilterPanel = ({
  users,
  selectField,
  selectValue,
  onChangeField,
  onChangeValue,
  onFilter,
  onAll,
}: FilterPanelProps) => {
  return (
    <div>
      <div>
        <h2>Filters</h2>
      </div>
      <SelectDropdown
        label="Select Field:"
        value={selectField ?? ""}
        onChange={(e) => onChangeField(e.target.value || null)}
        options={getFieldOptions()}
        defaultOption="Select Field"
      />
      <br />
      <SelectDropdown
        label="Select Value:"
        value={selectValue ?? ""}
        onChange={(e) => onChangeValue(parseFilterValue(e.target.value, selectField))}
        options={getValueOptions(users, selectField)}
        defaultOption="Select Value"
      />
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <Button label="Filter" onClick={onFilter} />
        <Button label="All" onClick={onAll} />
      </div>
    </div>
  );
};

export default FilterPanel;