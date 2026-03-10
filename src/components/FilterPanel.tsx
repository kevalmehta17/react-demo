import SelectDropdown from "./SelectDropdown";
import Button from "./Button";

interface FilterPanelProps {
  fieldOptions: { label: string; value: string }[]
  valueOptions: { label: string; value: string | number }[]

  selectField: string | null
  selectValue: string | number | null

  onChangeField: (field: string | null) => void
  onChangeValue: (value: string | number | null) => void

  onFilter: () => void
  onAll: () => void
}

const FilterPanel = ({
  fieldOptions,
  valueOptions,
  selectField,
  selectValue,
  onChangeField,
  onChangeValue,
  onFilter,
  onAll,
}: FilterPanelProps) => {
  return (
    <div>
      <h2>Filters</h2>

      <SelectDropdown
        label="Select Field:"
        value={selectField ?? ""}
        onChange={(e) => onChangeField(e.target.value || null)}
        options={fieldOptions}
        defaultOption="Select Field"
      />

      <br />

      <SelectDropdown
        label="Select Value:"
        value={selectValue ?? ""}
        onChange={(e) => onChangeValue(e.target.value || null)}
        options={valueOptions}
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