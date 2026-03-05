const FilterPanel = () => {
  const fields = ["useName", "city", "age"];
  return (
    <div>
      <h2>Filters</h2>
      <div>
        <label>Select Fields: </label>
        <select>
          <option value={""}>Select Field</option>
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>
        <br />
      <div style={{display:"flex", gap:"5px"}}>
        <label>Unique Values:</label>
        <select>
          <option value="">Select Value</option>
        </select>
      </div><br />
      <div style={{display:"flex", gap:"10px"}}>
        <button>Filter</button>
        <button>All</button>
      </div>
    </div>
  );
};

export default FilterPanel;
