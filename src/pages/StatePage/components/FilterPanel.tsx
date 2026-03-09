import { useState } from "react";
import type { User, AppliedFilter } from "../../../types/User";
import SelectDropdown from "../../../components/SelectDropdown";
import Button from "../../../components/Button";
import { getFieldOptions, getValueOptions, parseFilterValue } from "../../../utils/getFilterUnique";

interface FilterPanelProps {
  users: User[];
  appliedFilter: AppliedFilter;
  setAppliedFilter: React.Dispatch<React.SetStateAction<AppliedFilter>>;
}

const FilterPanel = ({ users, appliedFilter, setAppliedFilter }: FilterPanelProps) => {
  const [selectField, setSelectField] = useState<string | null>(null);
  const [selectValue, setSelectValue] = useState<string | number | null>(null);

  return (
    <div>
      <div>
        <h2>Filters</h2>
      </div>
      <SelectDropdown
        label="Select Field:"
        value={selectField ?? ""}
        onChange={(e) => {
          const val = e.target.value || null;
          setSelectField(val);
          setSelectValue(null);
        }}
        options={getFieldOptions()}
        defaultOption="Select Field"
      />
      <br />
      <SelectDropdown
        label="Select Value:"
        value={selectValue ?? ""}
        onChange={(e) => setSelectValue(parseFilterValue(e.target.value, selectField))}
        options={getValueOptions(users, selectField)}
        defaultOption="Select Value"
      />
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          label="Filter"
          onClick={() => {
            if (selectField && selectValue != null) {
              setAppliedFilter({
                field: selectField as keyof Omit<User, "id">,
                uniqueVal: String(selectValue),
              });
            }
          }}
        />
        <Button
          label="All"
          onClick={() => {
            setSelectField(null);
            setSelectValue(null);
            setAppliedFilter({ field: null, uniqueVal: "" });
          }}
        />
      </div>
    </div>
  );
};

export default FilterPanel;