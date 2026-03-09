import type { SelectDropdownProps } from "../types/User";

const SelectDropdown = ({
  label,
  value,
  onChange,
  options,
  defaultOption = "Select", 
}: SelectDropdownProps) => {
  return (
    <div>
      <label>{label} </label>
      <select value={value} onChange={onChange}>
        <option value="">{defaultOption}</option>
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;