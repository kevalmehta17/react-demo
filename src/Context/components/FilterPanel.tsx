
const FilterPanel = () => {
  return (
    <div>
      <h2>Filters</h2>
      <div>
        <div>
          <label>Select Field: </label>
          <select>
            <option value="">Select Field</option>
          </select>
        </div>{" "}
        <br />
        <div>
          <label>Unique Value: </label>
          <select>
            <option value="">Select Value</option>
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
