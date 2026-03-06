import { useDispatch, useSelector } from "react-redux";
import { changeField, changeValue, handleAllButton, handleFilterButton } from "../store/FilterSlice";
import type { UserStringOnly } from "../../types/User";

const FilterPanel = () => {
  const fields = ["userName", "city", "age"];
  const dispatch = useDispatch();
  const selectingField = useSelector((state) => state.filter.selectField);
  const allUser = useSelector((state)=> state.user.users);
  const selectingValue = useSelector((state) => state.filter.selectValue);
  console.log("selectingField", selectingField);

  // HANDLE SELECT FIELD
  const handleSelectField = (e : React.ChangeEvent<HTMLSelectElement>) : void => {
    const field = e.target.value;
    console.log("handleSelectField", e.target.value);
    dispatch(changeField(field));
  }
  // HANDLE SELECT VALUE
  const handleSelectValue = (e : React.ChangeEvent<HTMLSelectElement>) : void => {
    const value = e.target.value;
    console.log("handleSelectValue", e.target.value);
    dispatch(changeValue(value));
  }

  // GET UNIQUE VALUES
  const getUniqueValues = () : (string | number)[] => {
    if(!selectingField) return [];
    if(selectingField === "age"){
      const newUser = allUser.map((user : { age: number }) => user[selectingField]);
      return [...new Set(newUser)];
    }
    else{
    const newUser = allUser.map((user : UserStringOnly) =>
        user[selectingField].toString().toLowerCase(),
      );
      return [...new Set(newUser)];
    }
  }

  // HANDLE FILTER
  const handleFilter = () : void => {
    if(!selectingField || !selectingValue){
      alert("Please Fill all the input field");
      return;
    }
    dispatch(handleFilterButton({selectingField, selectingValue}));
  }

  const handleAll = () : void =>{
    dispatch(handleAllButton());
  }

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <label>Select Fields: </label>
        <select value={selectingField ?? ""} onChange={handleSelectField}>
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
        <select value={selectingValue ?? ""} onChange={handleSelectValue}>
          <option value="">Select Value</option>
          {getUniqueValues().map((userData) => (
            <option key={userData} value={userData}>{userData}</option>
          ))}
        </select>
      </div><br />
      <div style={{display:"flex", gap:"10px"}}>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleAll}>All</button>
      </div>
    </div>
  );
};

export default FilterPanel;
