import React from "react";
import type { FormData } from "../../types/User";

interface AppliedFilter {
  field: keyof FormData | null;
  uniqueVal: string;
}

interface FilterPanelProps {
  selectField: keyof FormData | null;
  selectValue: string | number | null;
  setSelectField: React.Dispatch<React.SetStateAction<keyof FormData | null>>;
  setSelectValue: React.Dispatch<React.SetStateAction<string | number>>;
  setAppliedFilter: React.Dispatch<React.SetStateAction<AppliedFilter>>;
  getFilterUnique: () => (string | number)[];
}

const FilterPanel = ({
  selectField,
  selectValue,
  setSelectField,
  setSelectValue,
  setAppliedFilter,
  getFilterUnique,
}: FilterPanelProps) => {


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
    console.log("fieldVal Active", fieldVal);
  };
  // here we pass the selectField State to the select value option so as state changes we dynamically set the option
  // now just we have to create the onchange to change the option value
  const handleUniqueValue = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log("select Value event", e.target.value);
    const uniqueValue = e.target.value;
    setSelectValue(uniqueValue);
    console.log("uniqueValue", uniqueValue);
  };
  const handleFilterButton = () => {
    if (!selectField || !selectValue) {
      alert("Please select both field and value to apply filter");
      return;
    }
    setAppliedFilter({
      field: selectField,
      uniqueVal: String(selectValue).toLowerCase(),
    });
  };

  const handleAllButton = () => {
    setAppliedFilter({ field: null, uniqueVal: "" });
    setSelectField(null);
    setSelectValue("");
  };
  return (
    <div>
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
      <div></div>
    </div>
  );
};

export default FilterPanel;
